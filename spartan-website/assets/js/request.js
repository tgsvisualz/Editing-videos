/* ==========================================================================
   Inspection request wizard (request.html)
   Prefill from the URL: ?type=emergency|inspection|installation|repair|quote|contract
                         ?system=alarm|sprinklers|electrical|extinguishers|security|access
                         ?building=condo|commercial|industrial|rental|construction|house
   ========================================================================== */
(function () {
  "use strict";
  const S = window.Spartan;

  S.ready(() => {
    const form = document.getElementById("wizard");
    if (!form) return;
    const steps = [...form.querySelectorAll(".wizard-step")];
    const bar = form.querySelector(".wizard-progress span");
    const curEl = form.querySelector("[data-step-current]");
    const totEl = form.querySelector("[data-step-total]");
    const nameEl = form.querySelector("[data-step-name]");
    const prev = form.querySelector("[data-prev]");
    const next = form.querySelector("[data-next]");
    const submit = form.querySelector("[data-submit]");
    const callout = form.querySelector("[data-emergency-callout]");
    let i = 0;

    totEl.textContent = steps.length;

    function render(focus) {
      steps.forEach((s, k) => s.classList.toggle("is-active", k === i));
      curEl.textContent = i + 1;
      nameEl.textContent = steps[i].dataset[S.lang() === "en" ? "nameEn" : "nameFr"];
      bar.style.width = ((i + 1) / steps.length) * 100 + "%";
      prev.hidden = i === 0;
      next.hidden = i === steps.length - 1;
      submit.hidden = i !== steps.length - 1;
      if (i === steps.length - 1) buildSummary();
      if (focus) {
        const top = form.closest(".form-card").getBoundingClientRect().top + window.scrollY - 100;
        if (window.scrollY > top) window.scrollTo({ top, behavior: "smooth" });
        const h = steps[i].querySelector("h2");
        h.tabIndex = -1;
        h.focus({ preventScroll: true });
      }
    }

    const labelFor = (input) => {
      const t = input.closest(".choice")?.querySelector(".choice-title > span");
      return t ? t.textContent.trim() : input.value;
    };
    const optText = (sel) => (sel.value ? sel.options[sel.selectedIndex].text : "—");

    function buildSummary() {
      const v = (n) => (form.elements[n]?.value || "").trim();
      const checked = (n) => [...form.querySelectorAll(`[name="${n}"]:checked`)].map(labelFor).join(", ") || "—";
      const rows = [
        [S.tt("Besoin", "Need"), checked("type"), 0],
        [S.tt("Systèmes", "Systems"), checked("systems"), 1],
        [S.tt("Bâtiment", "Building"), [checked("building"), [v("address"), v("city")].filter(Boolean).join(", ")].filter((x) => x && x !== "—").join(" · ") || "—", 2],
        [S.tt("Étages · dernière inspection", "Floors · last inspection"), `${v("floors") || "—"} · ${optText(form.elements.last_inspection)}`, 2],
        [S.tt("Contact", "Contact"), [v("name"), v("phone"), v("email")].filter(Boolean).join(" · "), 3],
      ];
      if (v("message")) rows.push([S.tt("Message", "Message"), v("message"), 3]);
      const file = form.elements.attachment?.files?.[0];
      if (file) rows.push([S.tt("Pièce jointe", "Attachment"), file.name, 3]);
      form.querySelector("[data-summary]").innerHTML = rows
        .map(([k, val, step]) => `<div class="summary-row"><dt>${S.esc(k)}</dt><dd>${S.esc(val)}</dd><button type="button" data-goto="${step}">${S.tt("Modifier", "Edit")}</button></div>`)
        .join("");
    }

    next.addEventListener("click", () => {
      if (!S.validateIn(steps[i])) return;
      i = Math.min(i + 1, steps.length - 1);
      render(true);
    });
    prev.addEventListener("click", () => { i = Math.max(i - 1, 0); render(true); });
    form.addEventListener("click", (e) => {
      const g = e.target.closest("[data-goto]");
      if (g) { i = +g.dataset.goto; render(true); }
    });

    // Enter on a text field = Continue (not submit) until the last step.
    form.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.target.tagName === "INPUT" && e.target.type !== "checkbox" && i < steps.length - 1) {
        e.preventDefault();
        next.click();
      }
    });

    form.addEventListener("change", (e) => {
      if (e.target.name === "type") callout.hidden = e.target.value !== "emergency";
      const g = e.target.closest("[data-required-group]");
      if (g) S.setError(g.querySelector("input"), "");
      // Auto-advance on single-choice steps for a faster flow.
      if (e.target.type === "radio" && (e.target.name === "type") && e.target.value !== "emergency") {
        setTimeout(() => { if (steps[i].contains(e.target)) next.click(); }, 260);
      }
      // "Not sure" is exclusive with the specific systems.
      if (e.target.name === "systems") {
        const unsure = form.querySelector("#s-unsure");
        if (e.target === unsure && unsure.checked) form.querySelectorAll('[name="systems"]').forEach((c) => { if (c !== unsure) c.checked = false; });
        else if (e.target !== unsure && e.target.checked) unsure.checked = false;
      }
    });
    form.addEventListener("input", (e) => { if (e.target.closest(".field.has-error")) S.validateField(e.target); });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!S.validateIn(steps[i])) return;
      S.setLoading(submit, true);
      try {
        const fd = new FormData(form);
        fd.set("systems", fd.getAll("systems").join(", "));
        await S.send("inspection-request", fd);
        S.showSuccess(form);
      } catch (err) {
        S.toast(S.MSG.failed());
      } finally {
        S.setLoading(submit, false);
      }
    });

    // Prefill from query string
    try {
      const p = new URLSearchParams(location.search);
      const pick = (name, val) => { const el = form.querySelector(`[name="${name}"][value="${CSS.escape(val)}"]`); if (el) el.checked = true; return !!el; };
      if (p.get("type")) { pick("type", p.get("type")); callout.hidden = p.get("type") !== "emergency"; }
      (p.get("system") || "").split(",").filter(Boolean).forEach((s) => pick("systems", s));
      if (p.get("building")) pick("building", p.get("building"));
    } catch (err) { /* ignore */ }

    document.addEventListener("langchange", () => render(false));
    render(false);
  });
})();
