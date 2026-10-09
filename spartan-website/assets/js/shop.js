/* ==========================================================================
   Shop: catalogue, filters, search, product modal and quote cart.
   The cart is stored in localStorage and sent as a quote request.
   ========================================================================== */
(function () {
  "use strict";
  const S = window.Spartan;
  const D = window.SPARTAN_DATA;
  const CART_KEY = "spartan-quote";

  const state = { cat: "all", q: "", cart: load() };

  function load() {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || "{}") || {}; } catch (e) { return {}; }
  }
  function save() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(state.cart)); } catch (e) { /* ignore */ }
  }
  const byId = (id) => D.products.find((p) => p.id === id);
  const catName = (id) => S.t(D.categories.find((c) => c.id === id));
  const priceLabel = (p) =>
    p.price != null
      ? new Intl.NumberFormat(S.lang() === "en" ? "en-CA" : "fr-CA", { style: "currency", currency: "CAD" }).format(p.price)
      : p.priceLabel ? S.t(p.priceLabel) : S.tt("Prix sur demande", "Price on request");
  const count = () => Object.values(state.cart).reduce((a, b) => a + b, 0);

  /* Product visual: real photo when available, illustration fallback. */
  function visual(p, cls = "product-photo") {
    return p.photo
      ? `<img class="${cls}" src="${p.photo}" alt="${S.esc(S.t(p.name))}" loading="lazy" data-art="${p.id}">`
      : p.art();
  }
  // Swap any failed product photo for its illustration.
  document.addEventListener("error", (e) => {
    const img = e.target;
    if (img && img.tagName === "IMG" && img.dataset.art) {
      const p = byId(img.dataset.art);
      if (p) img.insertAdjacentHTML("afterend", p.art()), img.remove();
    }
  }, true);

  /* ---------- Chrome: FAB, drawer, modal ---------- */
  function mountChrome() {
    document.body.insertAdjacentHTML("beforeend", `
      <button class="cart-fab is-empty" type="button" data-cart-open aria-haspopup="dialog">
        ${S.icon("clipboard")}<span data-cart-fab-label></span><span class="cart-count" data-cart-count>0</span>
      </button>
      <div class="overlay" data-overlay></div>
      <aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" data-drawer aria-hidden="true">
        <div class="drawer-head">
          <h2 id="cart-title" class="h4" data-cart-title></h2>
          <button class="icon-btn" type="button" data-close aria-label="Fermer">${S.icon("x")}</button>
        </div>
        <div class="drawer-body" data-form-card>
          <div data-cart-lines></div>
          <form data-cart-form novalidate style="margin-top:20px">
            <input type="text" name="_gotcha" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
            <div class="form-grid" data-cart-fields></div>
          </form>
          <div class="form-success" data-success hidden></div>
        </div>
        <div class="drawer-foot" data-cart-foot>
          <button class="btn btn-primary btn-block btn-lg" type="button" data-cart-submit></button>
        </div>
      </aside>
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="pm-title" data-modal aria-hidden="true"></div>`);

    document.addEventListener("click", (e) => {
      if (e.target.closest("[data-cart-open]")) openDrawer();
      if (e.target.closest("[data-close]") || e.target.matches("[data-overlay]")) closeAll();
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
  }

  let lastFocus = null;
  function openLayer(el) {
    lastFocus = document.activeElement;
    document.querySelector("[data-overlay]").classList.add("is-open");
    el.classList.add("is-open");
    el.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setTimeout(() => el.querySelector("button, a, input")?.focus({ preventScroll: true }), 50);
  }
  function closeAll() {
    document.querySelectorAll(".drawer.is-open, .modal.is-open, .overlay.is-open").forEach((el) => {
      el.classList.remove("is-open");
      el.setAttribute("aria-hidden", "true");
    });
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  /* ---------- Tabs + search ---------- */
  function renderTabs() {
    const seg = document.querySelector("[data-shop-tabs]");
    seg.querySelectorAll("button").forEach((b) => b.remove());
    seg.insertAdjacentHTML("beforeend", D.categories.map((c) =>
      `<button type="button" role="tab" data-cat="${c.id}" aria-selected="${c.id === state.cat}">${S.t(c)}</button>`).join(""));
    requestAnimationFrame(() => S.moveThumb(seg));
  }
  function setCat(cat, scroll) {
    state.cat = D.categories.some((c) => c.id === cat) ? cat : "all";
    const seg = document.querySelector("[data-shop-tabs]");
    seg.querySelectorAll("button").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.cat === state.cat)));
    S.moveThumb(seg);
    const active = seg.querySelector('[aria-selected="true"]');
    if (active && seg.scrollWidth > seg.clientWidth) seg.scrollTo({ left: active.offsetLeft - 24, behavior: "smooth" });
    renderGrid();
    try { history.replaceState(null, "", state.cat === "all" ? location.pathname + location.search : "#" + state.cat); } catch (e) { /* ignore */ }
    if (scroll) document.getElementById("catalogue").scrollIntoView({ behavior: "smooth" });
  }

  /* ---------- Grid ---------- */
  function renderGrid() {
    const grid = document.querySelector("[data-shop-grid]");
    const q = state.q.toLowerCase();
    const items = D.products.filter((p) =>
      (q || state.cat === "all" || p.cat === state.cat) &&
      (!q || [p.name.fr, p.name.en, p.desc.fr, p.desc.en, catName(p.cat)].join(" ").toLowerCase().includes(q)));
    grid.innerHTML = items.length
      ? items.map((p) => `
        <article class="product" tabindex="0" data-product="${p.id}" aria-label="${S.esc(S.t(p.name))}">
          <div class="product-art">${visual(p)}${p.badge ? `<span class="product-badge${p.badgeFire ? " is-fire" : ""}">${S.t(p.badge)}</span>` : ""}</div>
          <div class="product-body">
            <span class="product-cat">${catName(p.cat)}</span>
            <h3 class="product-name">${S.t(p.name)}</h3>
            <p class="product-desc">${S.t(p.desc)}</p>
            <div class="product-foot">
              <span class="product-price">${priceLabel(p)}</span>
              <button class="add-btn${state.cart[p.id] ? " is-added" : ""}" type="button" data-add="${p.id}" aria-label="${S.tt("Ajouter à la soumission", "Add to quote")} : ${S.esc(S.t(p.name))}">${S.icon(state.cart[p.id] ? "check" : "plus", "icon icon-sm")}</button>
            </div>
          </div>
        </article>`).join("")
      : `<div class="empty-state">${S.icon("search", "icon icon-lg")}<p style="margin-top:12px">${S.tt("Aucun produit ne correspond. Essayez un autre mot ou écrivez-nous.", "No product matches. Try another word or write to us.")}</p></div>`;
  }

  /* ---------- Modal ---------- */
  function openProduct(id) {
    const p = byId(id);
    if (!p) return;
    const modal = document.querySelector("[data-modal]");
    modal.innerHTML = `
      <button class="icon-btn modal-close" type="button" data-close aria-label="${S.tt("Fermer", "Close")}">${S.icon("x")}</button>
      <div class="modal-grid">
        <div class="modal-art" style="position:relative;overflow:hidden">${visual(p, "product-photo")}</div>
        <div class="modal-body">
          <span class="product-cat">${catName(p.cat)}</span>
          <h2 id="pm-title" class="h3">${S.t(p.name)}</h2>
          <p class="muted">${S.t(p.desc)}</p>
          <ul class="spec-list">${p.specs.map(([k, v]) => `<li><span>${S.t(k)}</span><span>${S.t(v)}</span></li>`).join("")}</ul>
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px">
            <strong>${priceLabel(p)}</strong>
            <div class="qty" data-modal-qty="1">
              <button type="button" data-mq="-1" aria-label="${S.tt("Moins", "Less")}">${S.icon("minus")}</button><span>1</span><button type="button" data-mq="1" aria-label="${S.tt("Plus", "More")}">${S.icon("plus")}</button>
            </div>
          </div>
          <button class="btn btn-primary btn-lg btn-block" type="button" data-modal-add="${p.id}">${S.icon("plus")}${S.tt("Ajouter à ma soumission", "Add to my quote")}</button>
          <div class="form-note">${S.icon("info")}<span>${S.tt("Installation et étiquetage offerts par nos techniciens certifiés.", "Installation and tagging available from our certified technicians.")}</span></div>
        </div>
      </div>`;
    openLayer(modal);
  }

  /* ---------- Cart ---------- */
  function add(id, qty = 1) {
    state.cart[id] = (state.cart[id] || 0) + qty;
    save();
    updateCart(true);
    renderGrid();
    S.toast(S.tt("Ajouté à votre soumission", "Added to your quote"));
  }
  function setQty(id, qty) {
    if (qty <= 0) delete state.cart[id];
    else state.cart[id] = qty;
    save();
    updateCart();
    renderGrid();
  }

  const FIELDS = () => [
    { n: "name", fr: "Nom complet", en: "Full name", req: true, ac: "name" },
    { n: "company", fr: "Entreprise / immeuble", en: "Company / building", ac: "organization" },
    { n: "email", fr: "Courriel", en: "Email", req: true, type: "email", ac: "email" },
    { n: "phone", fr: "Téléphone", en: "Phone", req: true, type: "tel", ac: "tel" },
    { n: "city", fr: "Ville du bâtiment", en: "Building city", full: true, ac: "address-level2" },
    { n: "install", fr: "Installation souhaitée\u00a0?", en: "Installation needed?", full: true, select: [["yes", "Oui, installez-les", "Yes, install them"], ["no", "Non, cueillette ou livraison", "No, pickup or delivery"], ["unsure", "À discuter", "Let's discuss"]] },
    { n: "notes", fr: "Notes (facultatif)", en: "Notes (optional)", full: true, area: true },
  ];

  function renderCartForm() {
    const wrap = document.querySelector("[data-cart-fields]");
    const keep = {};
    wrap.querySelectorAll("input, select, textarea").forEach((el) => (keep[el.name] = el.type === "checkbox" ? el.checked : el.value));
    wrap.innerHTML = FIELDS().map((f) => {
      const label = `<label for="cf-${f.n}">${S.tt(f.fr, f.en)}${f.req ? ' <span class="req">*</span>' : ""}</label>`;
      const ctl = f.select
        ? `<select class="select" id="cf-${f.n}" name="${f.n}">${f.select.map(([v, fr, en]) => `<option value="${v}">${S.tt(fr, en)}</option>`).join("")}</select>`
        : f.area
          ? `<textarea class="textarea" id="cf-${f.n}" name="${f.n}" style="min-height:90px"></textarea>`
          : `<input class="input" id="cf-${f.n}" name="${f.n}" type="${f.type || "text"}"${f.req ? " required" : ""} autocomplete="${f.ac || "off"}">`;
      return `<div class="field${f.full ? " full" : ""}">${label}${ctl}</div>`;
    }).join("") + `
      <div class="consent-wrap full"><label class="consent"><input type="checkbox" name="consent" value="yes" required data-consent>
        <span>${S.tt('J\'accepte que Spartan utilise ces renseignements pour préparer ma soumission (<a href="privacy.html" target="_blank">politique de confidentialité</a>).', 'I agree that Spartan uses this information to prepare my quote (<a href="privacy.html" target="_blank">privacy policy</a>).')}</span></label></div>`;
    Object.entries(keep).forEach(([k, v]) => {
      const el = wrap.querySelector(`[name="${k}"]`);
      if (!el) return;
      if (el.type === "checkbox") el.checked = v; else el.value = v;
    });
  }

  function updateCart(bump) {
    const n = count();
    const fab = document.querySelector("[data-cart-open]");
    fab.classList.toggle("is-empty", n === 0);
    fab.querySelector("[data-cart-count]").textContent = n;
    fab.querySelector("[data-cart-fab-label]").textContent = S.tt("Ma soumission", "My quote");
    if (bump) { fab.classList.remove("bump"); void fab.offsetWidth; fab.classList.add("bump"); }

    document.querySelector("[data-cart-title]").textContent = S.tt("Ma soumission", "My quote") + (n ? ` (${n})` : "");
    document.querySelector("[data-cart-submit]").innerHTML = S.icon("send") + S.tt("Envoyer ma demande de prix", "Send my price request");
    const lines = document.querySelector("[data-cart-lines]");
    const ids = Object.keys(state.cart).filter(byId);
    lines.innerHTML = ids.length
      ? ids.map((id) => {
          const p = byId(id);
          return `<div class="cart-line">
            <div class="cart-thumb">${p.art()}</div>
            <div><strong style="display:block;line-height:1.25">${S.t(p.name)}</strong><span class="small muted">${priceLabel(p)}</span><br>
              <button class="cart-remove" type="button" data-remove="${id}">${S.tt("Retirer", "Remove")}</button></div>
            <div class="qty"><button type="button" data-q="${id}" data-d="-1" aria-label="${S.tt("Moins", "Less")}">${S.icon("minus")}</button><span>${state.cart[id]}</span><button type="button" data-q="${id}" data-d="1" aria-label="${S.tt("Plus", "More")}">${S.icon("plus")}</button></div>
          </div>`;
        }).join("")
      : `<div class="empty-state" style="padding:40px 0">${S.icon("clipboard", "icon icon-lg")}<p style="margin-top:10px">${S.tt("Votre soumission est vide.", "Your quote is empty.")}</p></div>`;
    document.querySelector("[data-cart-form]").hidden = !ids.length;
    document.querySelector("[data-cart-foot]").hidden = !ids.length;
  }

  function openDrawer() {
    const d = document.querySelector("[data-drawer]");
    d.querySelector("[data-success]").hidden = true;
    updateCart();
    openLayer(d);
  }

  async function submitCart() {
    const form = document.querySelector("[data-cart-form]");
    if (!S.validateIn(form)) return;
    const btn = document.querySelector("[data-cart-submit]");
    S.setLoading(btn, true);
    try {
      const fd = new FormData(form);
      const items = Object.entries(state.cart).map(([id, q]) => `${q} × ${byId(id).name.fr} [${id}]`);
      fd.set("items", items.join("\n"));
      await S.send("shop-quote", fd);
      const success = document.querySelector("[data-drawer] [data-success]");
      success.innerHTML = `<span class="success-icon">${S.icon("check")}</span>
        <h3 class="h3">${S.tt("Demande envoyée.", "Request sent.")}</h3>
        <p class="muted">${S.tt("Merci ! Nous vous revenons avec un prix ferme, tout compris.", "Thank you! We'll get back to you with a firm, all-in price.")}</p>
        ${window.SPARTAN_CONFIG.previewMode ? `<p class="preview-note">${S.tt("Aperçu de conception : aucune donnée n'a été envoyée.", "Design preview: no data was sent.")}</p>` : ""}
        <button class="btn btn-dark" type="button" data-close>${S.tt("Continuer à magasiner", "Keep browsing")}</button>`;
      state.cart = {};
      save();
      form.reset();
      updateCart();
      document.querySelector("[data-cart-lines]").innerHTML = "";
      success.hidden = false;
      renderGrid();
    } catch (err) {
      S.toast(S.MSG.failed());
    } finally {
      S.setLoading(btn, false);
    }
  }

  /* ---------- Boot ---------- */
  S.ready(() => {
    mountChrome();
    renderTabs();
    renderCartForm();
    const initial = (location.hash || "").slice(1);
    setCat(initial || "all", false);
    updateCart();

    document.querySelector("[data-shop-tabs]").addEventListener("click", (e) => {
      const b = e.target.closest("[data-cat]");
      if (b) setCat(b.dataset.cat);
    });
    document.querySelectorAll("[data-shop-cat]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); setCat(a.dataset.shopCat, true); }));
    let t;
    document.querySelector("[data-shop-search]").addEventListener("input", (e) => {
      clearTimeout(t);
      t = setTimeout(() => {
        state.q = e.target.value.trim();
        // Searching looks across every category.
        if (state.q && state.cat !== "all") setCat("all"); else renderGrid();
      }, 120);
    });

    const grid = document.querySelector("[data-shop-grid]");
    grid.addEventListener("click", (e) => {
      const addBtn = e.target.closest("[data-add]");
      if (addBtn) { add(addBtn.dataset.add); return; }
      const card = e.target.closest("[data-product]");
      if (card) openProduct(card.dataset.product);
    });
    grid.addEventListener("keydown", (e) => {
      const card = e.target.closest("[data-product]");
      if (card && e.target === card && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openProduct(card.dataset.product); }
    });

    document.addEventListener("click", (e) => {
      const mq = e.target.closest("[data-mq]");
      if (mq) {
        const box = mq.closest("[data-modal-qty]");
        const v = Math.max(1, +box.dataset.modalQty + +mq.dataset.mq);
        box.dataset.modalQty = v;
        box.querySelector("span").textContent = v;
      }
      const madd = e.target.closest("[data-modal-add]");
      if (madd) {
        add(madd.dataset.modalAdd, +document.querySelector("[data-modal-qty]").dataset.modalQty);
        closeAll();
      }
      const q = e.target.closest("[data-q]");
      if (q) setQty(q.dataset.q, (state.cart[q.dataset.q] || 0) + +q.dataset.d);
      const rm = e.target.closest("[data-remove]");
      if (rm) setQty(rm.dataset.remove, 0);
      if (e.target.closest("[data-cart-submit]")) submitCart();
    });

    window.addEventListener("hashchange", () => setCat(location.hash.slice(1) || "all"));
    document.addEventListener("langchange", () => { renderTabs(); setCat(state.cat); renderCartForm(); updateCart(); });
  });
})();
