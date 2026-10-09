/* ==========================================================================
   Forms: validation, delivery (config.formEndpoint), success states.
   Any <form data-form="name"> on a page is handled automatically.
   ========================================================================== */
(function () {
  "use strict";
  const S = window.Spartan;
  const C = window.SPARTAN_CONFIG;

  const MSG = {
    required: () => S.tt("Ce champ est requis.", "This field is required."),
    email: () => S.tt("Entrez une adresse courriel valide.", "Enter a valid email address."),
    tel: () => S.tt("Entrez un numéro de téléphone valide.", "Enter a valid phone number."),
    choice: () => S.tt("Choisissez une option pour continuer.", "Choose an option to continue."),
    consent: () => S.tt("Votre consentement est requis pour envoyer la demande.", "Your consent is required to send the request."),
    file: () => S.tt("Fichier trop volumineux (10 Mo maximum).", "File too large (10 MB max)."),
    failed: () => S.tt("L'envoi a échoué. Réessayez ou appelez-nous au ", "Sending failed. Try again or call us at ") + C.phone + ".",
  };
  S.MSG = MSG;

  function fieldWrap(el) { return el.closest(".field, .consent-wrap, .choice-group") || el.parentElement; }

  function setError(el, msg) {
    const wrap = fieldWrap(el);
    if (!wrap) return;
    wrap.classList.toggle("has-error", !!msg);
    let err = wrap.querySelector(":scope > .field-error");
    if (msg) {
      if (!err) {
        err = document.createElement("p");
        err.className = "field-error";
        err.setAttribute("role", "alert");
        wrap.appendChild(err);
      }
      err.textContent = msg;
    }
    if (el.setAttribute) el.setAttribute("aria-invalid", msg ? "true" : "false");
  }
  S.setError = setError;

  function validateField(el) {
    if (el.disabled || el.type === "hidden" || el.closest(".hp")) return true;
    const v = (el.value || "").trim();
    let msg = "";
    if (el.type === "checkbox" && el.required && !el.checked) msg = el.dataset.consent != null ? MSG.consent() : MSG.required();
    else if (el.type === "file") {
      const f = el.files && el.files[0];
      if (el.required && !f) msg = MSG.required();
      else if (f && f.size > 10 * 1024 * 1024) msg = MSG.file();
    } else if (el.required && !v) msg = MSG.required();
    else if (v && el.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = MSG.email();
    else if (v && el.type === "tel" && v.replace(/\D/g, "").length < 10) msg = MSG.tel();
    setError(el, msg);
    return !msg;
  }
  S.validateField = validateField;

  /* Validate a container (form or wizard step). Radio/checkbox groups use
     [data-required-group] on their wrapper (.choice-group). */
  function validateIn(root) {
    let ok = true;
    let first = null;
    root.querySelectorAll("input, select, textarea").forEach((el) => {
      if (el.type === "radio" || (el.type === "checkbox" && el.closest("[data-required-group]"))) return;
      if (!validateField(el)) { ok = false; first = first || el; }
    });
    root.querySelectorAll("[data-required-group]").forEach((g) => {
      const any = g.querySelector("input:checked");
      const firstInput = g.querySelector("input");
      setError(firstInput, any ? "" : MSG.choice());
      if (!any) { ok = false; first = first || firstInput; }
    });
    if (first) {
      const target = fieldWrap(first) || first;
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      if (first.type !== "radio" && first.type !== "checkbox") setTimeout(() => first.focus({ preventScroll: true }), 300);
    }
    return ok;
  }
  S.validateIn = validateIn;

  /* Deliver a FormData payload. */
  S.send = async function (formName, fd) {
    fd.set("_form", formName);
    fd.set("_lang", S.lang());
    fd.set("_page", location.pathname);
    fd.set("_submitted_at", new Date().toISOString());
    const attr = S.attribution();
    Object.entries(attr).forEach(([k, v]) => fd.set("attr_" + k, v));
    if (fd.get("_gotcha")) return { ok: true, spam: true }; // honeypot filled: pretend success

    if (!C.formEndpoint) {
      const preview = {};
      fd.forEach((v, k) => { preview[k] = v instanceof File ? `[file] ${v.name}` : v; });
      console.info("%c[Spartan · DEMO] Form \"" + formName + "\" — set formEndpoint in assets/js/config.js to receive submissions.", "color:#e2601b;font-weight:bold", preview);
      await new Promise((r) => setTimeout(r, 900));
      return { ok: true, demo: true };
    }
    const res = await fetch(C.formEndpoint, { method: "POST", body: fd, headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error("HTTP " + res.status);
    return { ok: true };
  };

  function setLoading(btn, on) {
    if (!btn) return;
    if (on) {
      btn.dataset.label = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `<span>${S.tt("Envoi…", "Sending…")}</span>`;
    } else if (btn.dataset.label) {
      btn.disabled = false;
      btn.innerHTML = btn.dataset.label;
    }
  }
  S.setLoading = setLoading;

  function showSuccess(form) {
    const card = form.closest("[data-form-card]") || form.parentElement;
    const success = card.querySelector("[data-success]");
    if (!success) return;
    form.hidden = true;
    success.hidden = false;
    if (C.previewMode && !success.querySelector(".preview-note")) {
      success.insertAdjacentHTML("beforeend", `<p class="preview-note">${S.tt("Aperçu de conception : aucune donnée n'a été envoyée.", "Design preview: no data was sent.")}</p>`);
    }
    success.scrollIntoView({ behavior: "smooth", block: "center" });
    const h = success.querySelector("h2, h3");
    if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); }
  }
  S.showSuccess = showSuccess;

  function initForm(form) {
    form.noValidate = true;
    form.addEventListener("input", (e) => { if (fieldWrap(e.target)?.classList.contains("has-error")) validateField(e.target); });
    form.addEventListener("change", (e) => {
      const g = e.target.closest("[data-required-group]");
      if (g && g.classList.contains("has-error")) setError(g.querySelector("input"), "");
      if (e.target.type === "checkbox" || e.target.tagName === "SELECT") validateField(e.target);
    });
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!validateIn(form)) return;
      const btn = form.querySelector('[type="submit"]');
      setLoading(btn, true);
      try {
        await S.send(form.dataset.form, new FormData(form));
        showSuccess(form);
        form.reset();
        form.querySelectorAll(".file-name").forEach((n) => (n.textContent = ""));
      } catch (err) {
        S.toast(MSG.failed());
      } finally {
        setLoading(btn, false);
      }
    });
  }

  /* Drag & drop file fields */
  function initFileDrops(root = document) {
    root.querySelectorAll(".file-drop").forEach((drop) => {
      const input = drop.querySelector('input[type="file"]');
      const name = drop.querySelector(".file-name");
      const update = () => { if (name) name.textContent = input.files[0] ? input.files[0].name : ""; validateField(input); };
      input.addEventListener("change", update);
      ["dragenter", "dragover"].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add("is-drag"); }));
      ["dragleave", "drop"].forEach((ev) => drop.addEventListener(ev, () => drop.classList.remove("is-drag")));
      drop.addEventListener("drop", (e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length) { input.files = e.dataTransfer.files; update(); }
      });
    });
  }
  S.initFileDrops = initFileDrops;

  /* Prefill <select name=x> / inputs from ?x=value */
  function prefillFromQuery(form) {
    let p;
    try { p = new URLSearchParams(location.search); } catch (e) { return; }
    p.forEach((v, k) => {
      const el = form.querySelector(`[name="${CSS.escape(k)}"]`);
      if (el && (el.tagName === "SELECT" || el.tagName === "TEXTAREA" || el.type === "text")) el.value = v;
    });
  }

  S.ready(() => {
    document.querySelectorAll("form[data-form]").forEach((f) => { initForm(f); prefillFromQuery(f); });
    initFileDrops();
    document.querySelectorAll("[data-reset-form]").forEach((b) =>
      b.addEventListener("click", () => {
        const card = b.closest("[data-form-card]");
        card.querySelector("[data-success]").hidden = true;
        card.querySelector("form").hidden = false;
      })
    );
  });
})();
