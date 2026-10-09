/* ==========================================================================
   Spartan — core: icons, FR/EN switching, header/footer, UI behaviours.

   Bilingual authoring: French lives in the HTML (French first), English sits
   next to it in a data attribute:
     <h2 data-en="One call for the whole building.">Un seul appel pour tout le bâtiment.</h2>
     <input placeholder="Votre nom" data-en-placeholder="Your name">
   Supported attributes: data-en-placeholder, -aria-label, -title, -alt, -content.
   ========================================================================== */
(function () {
  "use strict";
  const C = window.SPARTAN_CONFIG;
  const S = (window.Spartan = window.Spartan || {});
  const doc = document.documentElement;

  /* ---------- Icons (Lucide-style, MIT) ---------- */
  const ICONS = {
    "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    "arrow-up-right": '<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',
    "arrow-left": '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    droplets: '<path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>',
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
    "fire-extinguisher": '<path d="M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5"/><path d="M9 18h8"/><path d="M18 3h-3"/><path d="M11 3a6 6 0 0 0-6 6v11"/><path d="M5 13h4"/><path d="M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    key: '<path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/>',
    video: '<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    "map-pin": '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    clipboard: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4M12 16h4M8 11h.01M8 16h.01"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
    home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    factory: '<path d="M2 21h20"/><path d="M4 21V10l5 3v-3l5 3V5h4v16"/><path d="M8 17h1M12 17h1"/>',
    "hard-hat": '<path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><path d="M14 6a6 6 0 0 1 6 6v3"/>',
    "file-check": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m9 15 2 2 4-4"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="m9 16 2 2 4-4"/>',
    star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v12"/>',
    "chevron-down": '<path d="m6 9 6 6 6-6"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
    truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    trending: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
    parking: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>',
    graduation: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    siren: '<path d="M7 18v-6a5 5 0 1 1 10 0v6"/><path d="M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z"/><path d="M21 12h1M18.5 4.5 18 5M2 12h1M12 2v1M4.929 4.929l.707.707M12 12v6"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    gauge: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
    door: '<path d="M13 4h3a2 2 0 0 1 2 2v14"/><path d="M2 20h3"/><path d="M13 20h9"/><path d="M10 12v.01"/><path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z"/>',
    lightbulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6M10 22h4"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
    message: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  };

  function injectSprite() {
    const symbols = Object.entries(ICONS)
      .map(([id, p]) => `<symbol id="i-${id}" viewBox="0 0 24 24">${p}</symbol>`)
      .join("");
    document.body.insertAdjacentHTML("afterbegin", `<svg width="0" height="0" style="position:absolute" aria-hidden="true">${symbols}</svg>`);
  }
  S.icon = (id, cls = "icon") => `<svg class="${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;

  /* ---------- Language ---------- */
  const LANG_KEY = "spartan-lang";
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } },
  };
  S.store = store;
  S.lang = () => (doc.lang === "en" ? "en" : "fr");
  S.t = (o) => (o == null ? "" : typeof o === "string" ? o : o[S.lang()] != null ? o[S.lang()] : o.fr);
  S.tt = (fr, en) => (S.lang() === "en" ? en : fr);

  const I18N_ATTRS = ["placeholder", "aria-label", "title", "alt", "content"];

  function applyLang(lang, { animate = false, persist = true } = {}) {
    lang = lang === "en" ? "en" : "fr";
    doc.lang = lang;
    document.querySelectorAll("[data-en]").forEach((el) => {
      if (el.__fr === undefined) el.__fr = el.innerHTML;
      el.innerHTML = lang === "en" ? el.getAttribute("data-en") : el.__fr;
    });
    I18N_ATTRS.forEach((a) => {
      document.querySelectorAll(`[data-en-${a}]`).forEach((el) => {
        const k = "__fr_" + a;
        if (el[k] === undefined) el[k] = el.getAttribute(a) || "";
        el.setAttribute(a, lang === "en" ? el.getAttribute("data-en-" + a) : el[k]);
      });
    });
    document.querySelectorAll(".lang-toggle button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    if (persist) store.set(LANG_KEY, lang);

    // Keep the URL shareable in the current language.
    try {
      const url = new URL(location.href);
      if (lang === "en") url.searchParams.set("lang", "en");
      else url.searchParams.delete("lang");
      history.replaceState(null, "", url);
    } catch (e) { /* file:// */ }

    if (animate) {
      document.body.classList.add("lang-switching");
      setTimeout(() => document.body.classList.remove("lang-switching"), 400);
    }
    doc.classList.remove("pre-en");
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }
  S.setLang = (l) => applyLang(l, { animate: true });

  function initialLang() {
    let q = null;
    try { q = new URLSearchParams(location.search).get("lang"); } catch (e) { /* ignore */ }
    return q || store.get(LANG_KEY) || C.defaultLang || "fr";
  }

  /* ---------- Campaign attribution (UTM / click ids) ---------- */
  const ATTR_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"];
  function captureAttribution() {
    try {
      const p = new URLSearchParams(location.search);
      const found = {};
      ATTR_KEYS.forEach((k) => { if (p.get(k)) found[k] = p.get(k); });
      if (Object.keys(found).length) {
        found.landing_page = location.pathname;
        sessionStorage.setItem("spartan-attr", JSON.stringify(found));
      }
    } catch (e) { /* ignore */ }
  }
  S.attribution = () => {
    try { return JSON.parse(sessionStorage.getItem("spartan-attr") || "{}"); } catch (e) { return {}; }
  };

  /* ---------- Shared chrome ---------- */
  const NAV = [
    { href: "services.html", page: "services", fr: "Services", en: "Services" },
    { href: "shop.html", page: "shop", fr: "Boutique", en: "Shop" },
    { href: "careers.html", page: "careers", fr: "Carrières", en: "Careers" },
    { href: "about.html", page: "about", fr: "Entreprise", en: "About" },
    { href: "contact.html", page: "contact", fr: "Contact", en: "Contact" },
  ];
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  S.esc = esc;
  const bi = (fr, en, tag = "span", attrs = "") => `<${tag}${attrs ? " " + attrs : ""} data-en="${esc(en)}">${fr}</${tag}>`;
  S.bi = bi;

  /* Social links: icon buttons (footer, menu) or labelled cards ([data-socials]). */
  const SOCIALS = [
    ["instagram", "Instagram", "@spartanincendie"],
    ["facebook", "Facebook", "Spartan Protection Incendie"],
    ["linkedin", "LinkedIn", "Spartan Protection Incendie"],
  ];
  const activeSocials = () => SOCIALS.filter(([k]) => C.social && C.social[k]);
  function socialIcons() {
    return `<div class="socials">${activeSocials().map(([k, name]) =>
      `<a href="${C.social[k]}" target="_blank" rel="noopener" aria-label="${name}">${S.icon(k, "icon icon-sm")}</a>`).join("")}</div>`;
  }
  function socialCards() {
    return activeSocials().map(([k, name, handle]) =>
      `<a class="social-card" href="${C.social[k]}" target="_blank" rel="noopener">
        <span class="social-icon is-${k}">${S.icon(k)}</span>
        <span><strong>${name}</strong><small>${handle}</small></span>
        ${S.icon("arrow-up-right", "icon icon-sm social-arrow")}
      </a>`).join("");
  }
  S.socialIcons = socialIcons;

  function langToggle() {
    return `<div class="lang-toggle" role="group" aria-label="Langue / Language">
      <span class="lang-thumb" aria-hidden="true"></span>
      <button type="button" data-lang="fr" aria-pressed="true" lang="fr">FR</button>
      <button type="button" data-lang="en" aria-pressed="false" lang="en">EN</button>
    </div>`;
  }

  function renderHeader(page) {
    const links = NAV.map((n) => `<a href="${n.href}"${n.page === page ? ' aria-current="page"' : ""} data-en="${n.en}">${n.fr}</a>`).join("");
    const mlinks = NAV.map((n) => `<a href="${n.href}"${n.page === page ? ' aria-current="page"' : ""}>${bi(n.fr, n.en)}${S.icon("arrow-up-right")}</a>`).join("");
    const html = `
      <a class="skip-link" href="#main" data-en="Skip to content">Aller au contenu</a>
      <header class="site-header" id="top">
        <div class="container">
          <div class="nav">
            <a class="nav-brand" href="index.html" aria-label="Spartan Protection Incendie — accueil" data-en-aria-label="Spartan Fire Protection — home">
              <img src="assets/img/logo-wordmark.webp" alt="Spartan Protection Incendie" width="180" height="65">
            </a>
            <nav class="nav-links" aria-label="Principal" data-en-aria-label="Main">${links}</nav>
            <div class="nav-actions">
              ${langToggle()}
              <a class="btn btn-sm btn-emergency hide-md" href="emergency.html"${page === "emergency" ? ' aria-current="page"' : ""}><span class="pulse-dot" aria-hidden="true"></span>${bi("Urgence 24 h", "24/7 Emergency")}</a>
              <a class="btn btn-sm btn-dark hide-md" href="request.html">${bi("Demander une inspection", "Request an inspection")}</a>
              <button class="nav-burger" type="button" aria-label="Ouvrir le menu" data-en-aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">${S.icon("menu")}</button>
            </div>
          </div>
        </div>
      </header>
      <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
        <div class="mobile-menu-top">
          <a class="nav-brand" href="index.html"><img src="assets/img/logo-wordmark.webp" alt="Spartan Protection Incendie" style="height:28px;width:auto"></a>
          <button class="icon-btn" type="button" data-close-menu aria-label="Fermer le menu" data-en-aria-label="Close menu">${S.icon("x")}</button>
        </div>
        <nav aria-label="Mobile">${`<a href="index.html"${page === "home" ? ' aria-current="page"' : ""}>${bi("Accueil", "Home")}${S.icon("arrow-up-right")}</a>`}${mlinks}</nav>
        <div class="mobile-menu-foot">
          <a class="btn btn-primary btn-lg btn-block" href="request.html">${bi("Demander une inspection", "Request an inspection")}${S.icon("arrow-right", "icon icon-arrow")}</a>
          <a class="btn btn-emergency btn-lg btn-block" href="emergency.html">${S.icon("siren")}${bi("Signaler une urgence 24 h", "Report a 24/7 Emergency")}</a>
          <a class="btn btn-ghost btn-lg btn-block" href="${C.phoneHref}">${S.icon("phone")}${C.phone}</a>
          <div class="mobile-menu-meta">${langToggle()}${socialIcons()}</div>
        </div>
      </div>`;
    document.body.insertAdjacentHTML("afterbegin", html);
  }

  function renderPreviewBanner() {
    if (!C.previewMode) return;
    document.body.classList.add("preview-mode");
    document.body.insertAdjacentHTML("afterbegin",
      `<div class="preview-banner" role="note">${bi(
        "Aperçu de conception par TGS Productions pour Spartan Protection Incendie — ce n'est pas le site officiel. Les formulaires n'envoient rien.",
        "Design preview by TGS Productions for Spartan Fire Protection — not the official website. Forms send nothing.")}</div>`);
  }

  function renderActionBar(page) {
    if (page === "request" || page === "emergency") return;
    document.body.classList.add("has-action-bar");
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div class="action-bar" aria-label="Actions rapides" data-en-aria-label="Quick actions">
        <a class="btn btn-emergency" href="emergency.html">${S.icon("siren")}${bi("Urgence", "Emergency")}</a>
        <a class="btn btn-primary" href="request.html">${bi("Demande d'inspection", "Request inspection")}</a>
      </div>`
    );
  }

  function renderFooter() {
    const svc = [
      ["fire-alarm", "Alarme incendie", "Fire alarm"],
      ["sprinklers", "Gicleurs", "Sprinklers"],
      ["electrical", "Électricité", "Electrical"],
      ["extinguishers", "Extincteurs & éclairage", "Extinguishers & lighting"],
      ["security", "Sécurité & caméras", "Security & cameras"],
      ["access-control", "Contrôle d'accès", "Access control"],
    ].map(([id, fr, en]) => `<li><a href="services.html#${id}">${bi(fr, en)}</a></li>`).join("");
    const email = C.email ? `<li><a href="mailto:${C.email}">${C.email}</a></li>` : "";
    const year = new Date().getFullYear();
    const html = `
      <footer class="site-footer on-dark">
        <div class="container">
          <div class="footer-top">
            <div class="footer-brand">
              <img src="assets/img/logo-wordmark.webp" alt="Spartan Protection Incendie" width="200" height="72" loading="lazy">
              ${bi("Alarme incendie, gicleurs, électricité, extincteurs, sécurité et contrôle d'accès — un seul appel pour tout le bâtiment, partout dans le Grand Montréal.", "Fire alarm, sprinklers, electrical, extinguishers, security and access control — one call for the whole building, across Greater Montreal.", "p")}
              ${socialIcons()}
            </div>
            <div class="footer-col">${bi("Services", "Services", "h3")}<ul>${svc}</ul></div>
            <div class="footer-col">${bi("Entreprise", "Company", "h3")}<ul>
              <li><a href="about.html">${bi("Notre équipe", "Our team")}</a></li>
              <li><a href="careers.html">${bi("Carrières", "Careers")}</a></li>
              <li><a href="shop.html">${bi("Boutique", "Shop")}</a></li>
              <li><a href="request.html">${bi("Demande d'inspection", "Inspection request")}</a></li>
              <li><a href="emergency.html">${bi("Signaler une urgence", "Report an Emergency")}</a></li>
              <li><a href="contact.html">${bi("Contact", "Contact")}</a></li>
            </ul></div>
            <div class="footer-col">${bi("Nous joindre", "Reach us", "h3")}<ul>
              <li><a href="${C.phoneHref}"><strong style="color:#fff">${C.phone}</strong></a></li>
              <li><a href="emergency.html">${bi("Urgences 24 h / 7 j", "24/7 Emergencies")}</a></li>
              ${email}
              <li><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(C.address.mapsQuery)}" target="_blank" rel="noopener">${C.address.street}<br>${C.address.city}, ${C.address.region} ${C.address.postal}</a></li>
            </ul></div>
          </div>
          <div class="footer-word" aria-hidden="true">Spartan</div>
          <div class="footer-bottom">
            <span>© ${year} ${C.company} · ${C.legalName} · ${bi("Licence RBQ", "RBQ licence")} ${C.rbq}</span>
            <span><a href="privacy.html">${bi("Confidentialité", "Privacy")}</a> · <a href="credits.html">${bi("Crédits photo", "Photo credits")}</a></span>
          </div>
        </div>
      </footer>`;
    const main = document.getElementById("main");
    (main || document.body).insertAdjacentHTML("afterend", html);
  }

  /* ---------- Behaviours ---------- */
  function initMenu() {
    const menu = document.getElementById("mobile-menu");
    const burger = document.querySelector(".nav-burger");
    if (!menu || !burger) return;
    const set = (open) => {
      menu.classList.toggle("is-open", open);
      menu.setAttribute("aria-hidden", String(!open));
      burger.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
      if (open) menu.querySelector("nav a")?.focus({ preventScroll: true });
    };
    burger.addEventListener("click", () => set(true));
    menu.querySelector("[data-close-menu]").addEventListener("click", () => { set(false); burger.focus(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && menu.classList.contains("is-open")) set(false); });
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => set(false)));
  }

  function initLangToggles() {
    // Carry English across pages even where browser storage is unavailable.
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[href]");
      if (!a || S.lang() !== "en") return;
      const href = a.getAttribute("href");
      if (!/^[\w-]+\.html(\?[^#]*)?(#.*)?$/.test(href) || /[?&]lang=/.test(href)) return;
      const [path, hash = ""] = href.split("#");
      a.setAttribute("href", path + (path.includes("?") ? "&" : "?") + "lang=en" + (hash ? "#" + hash : ""));
    }, true);
    document.addEventListener("click", (e) => {
      const b = e.target.closest(".lang-toggle button");
      if (!b || b.dataset.lang === S.lang()) return;
      S.setLang(b.dataset.lang);
    });
  }

  function initScrollState() {
    const bar = document.querySelector(".action-bar");
    let ticking = false;
    const onScroll = () => {
      const y = window.scrollY;
      document.body.classList.toggle("is-scrolled", y > 12);
      if (bar) bar.classList.toggle("is-visible", y > 360);
      ticking = false;
    };
    window.addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
    onScroll();
  }

  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("is-in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach((el) => io.observe(el));
  }
  S.observeReveal = (root) => {
    root.querySelectorAll(".reveal:not(.is-in)").forEach((el) => el.classList.add("is-in"));
  };

  function initAccordions() {
    document.addEventListener("click", (e) => {
      const trig = e.target.closest(".acc-trigger");
      if (!trig) return;
      const item = trig.closest(".acc-item");
      const open = !item.classList.contains("is-open");
      item.classList.toggle("is-open", open);
      trig.setAttribute("aria-expanded", String(open));
    });
  }

  /* Segmented tabs: <div data-tabs> .segmented [role=tab][data-tab] … [data-panel] */
  function moveThumb(seg) {
    const thumb = seg.querySelector(".seg-thumb");
    const active = seg.querySelector('[aria-selected="true"]');
    if (!thumb || !active) return;
    thumb.style.left = active.offsetLeft + "px";
    thumb.style.width = active.offsetWidth + "px";
  }
  S.moveThumb = moveThumb;
  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach((root) => {
      const seg = root.querySelector(".segmented");
      const tabs = [...seg.querySelectorAll('[role="tab"]')];
      const select = (tab, focus) => {
        tabs.forEach((t) => {
          const on = t === tab;
          t.setAttribute("aria-selected", String(on));
          t.tabIndex = on ? 0 : -1;
          const panel = root.querySelector(`[data-panel="${t.dataset.tab}"]`);
          if (panel) panel.hidden = !on;
        });
        if (focus) tab.focus();
        moveThumb(seg);
      };
      tabs.forEach((t, i) => {
        t.addEventListener("click", () => select(t));
        t.addEventListener("keydown", (e) => {
          if (e.key === "ArrowRight") select(tabs[(i + 1) % tabs.length], true);
          if (e.key === "ArrowLeft") select(tabs[(i - 1 + tabs.length) % tabs.length], true);
        });
      });
      select(tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0]);
      window.addEventListener("resize", () => moveThumb(seg));
      document.addEventListener("langchange", () => requestAnimationFrame(() => moveThumb(seg)));
      if (document.fonts) document.fonts.ready.then(() => moveThumb(seg));
    });
  }

  /* Toast */
  let toastTimer;
  S.toast = (msg) => {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.innerHTML = S.icon("check") + `<span>${msg}</span>`;
    requestAnimationFrame(() => el.classList.add("is-visible"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-visible"), 2400);
  };

  /* Fill [data-c="phone"] etc. from config */
  function fillConfig() {
    document.querySelectorAll("[data-socials]").forEach((el) => (el.innerHTML = socialCards()));
    document.querySelectorAll("[data-c]").forEach((el) => {
      const k = el.dataset.c;
      const map = { phone: C.phone, rbq: C.rbq, street: C.address.street, city: `${C.address.city}, ${C.address.region} ${C.address.postal}`, legal: C.legalName };
      if (map[k] != null) el.textContent = map[k];
    });
    document.querySelectorAll("[data-c-href='phone']").forEach((a) => (a.href = C.phoneHref));
    document.querySelectorAll("[data-c-email]").forEach((el) => {
      if (!C.email) el.remove();
      else { el.querySelector("a").href = "mailto:" + C.email; el.querySelector("a").textContent = C.email; }
    });
  }

  /* ---------- Boot ---------- */
  function boot() {
    const page = document.body.dataset.page || "";
    injectSprite();
    renderHeader(page);
    renderFooter();
    renderActionBar(page);
    renderPreviewBanner();
    fillConfig();
    captureAttribution();
    initMenu();
    initLangToggles();
    initScrollState();
    initAccordions();
    applyLang(initialLang());
    initTabs();
    initReveal();
    S.booted = true;
    document.dispatchEvent(new CustomEvent("spartan:ready"));
  }
  S.ready = (fn) => (S.booted ? fn() : document.addEventListener("spartan:ready", fn, { once: true }));

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
