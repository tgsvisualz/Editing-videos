/* ==========================================================================
   Careers: job cards, open-application trades, position picker.
   Edit postings in assets/js/data.js (jobs / trades).
   ========================================================================== */
(function () {
  "use strict";
  const S = window.Spartan;
  const D = window.SPARTAN_DATA;
  const openJobs = new Set();

  function renderJobs() {
    const wrap = document.querySelector("[data-jobs]");
    wrap.innerHTML = D.jobs.map((j) => {
      const open = openJobs.has(j.id);
      const list = (arr) => `<ul class="feature-list small">${arr.map((x) => `<li>${S.icon("check")}<span>${S.t(x)}</span></li>`).join("")}</ul>`;
      return `
      <article class="job${open ? " is-open" : ""}" id="job-${j.id}">
        <button class="job-head" type="button" aria-expanded="${open}" data-job="${j.id}">
          <div>
            ${j.open ? `<span class="badge-open"><span class="pulse-dot"></span>${S.tt("Poste ouvert", "Now hiring")}</span>` : ""}
            <h3 class="job-title" style="margin-top:10px">${S.t(j.title)}</h3>
            <div class="job-meta">${j.tags.map((t) => `<span class="pill">${S.t(t)}</span>`).join("")}</div>
          </div>
          <span class="round-arrow" style="transform:rotate(${open ? 90 : 0}deg)">${S.icon("arrow-right", "icon icon-sm")}</span>
        </button>
        <div class="job-body"><div>
          <div class="job-content">
            <p class="lead" style="grid-column:1/-1;max-width:none">${S.t(j.summary)}</p>
            <div><h4>${S.tt("Le rôle", "The role")}</h4>${list(j.duties)}</div>
            <div><h4>${S.tt("Ce qu'on recherche", "What we're looking for")}</h4>${list(j.requirements)}</div>
            <div style="grid-column:1/-1"><h4>${S.tt("Avantages", "Benefits")}</h4>${list(j.benefits)}</div>
            <div class="job-actions btn-row"><a class="btn btn-primary" href="#apply" data-apply="${j.id}">${S.tt("Postuler à ce poste", "Apply for this job")}${S.icon("arrow-right", "icon icon-arrow")}</a></div>
          </div>
        </div></div>
      </article>`;
    }).join("");
  }

  function renderTrades() {
    document.querySelector("[data-trades]").innerHTML = D.trades.map((t) => `
      <a class="trade" href="#apply" data-apply="trade-${t.id}">
        <span class="icon-tile">${S.icon(t.icon)}</span><span>${S.t(t.name)}</span>
        <span class="round-arrow">${S.icon("arrow-right", "icon icon-sm")}</span>
      </a>`).join("");
  }

  function renderPositions() {
    const sel = document.getElementById("ap-position");
    const cur = sel.value;
    sel.innerHTML =
      `<option value="">${S.tt("Choisir…", "Choose…")}</option>` +
      D.jobs.map((j) => `<option value="${j.id}">${S.t(j.title)}</option>`).join("") +
      D.trades.map((t) => `<option value="trade-${t.id}">${S.t(t.name)} — ${S.tt("candidature spontanée", "open application")}</option>`).join("") +
      `<option value="other">${S.tt("Autre / candidature spontanée", "Other / open application")}</option>`;
    sel.value = cur;
  }

  S.ready(() => {
    if (D.jobs[0]) openJobs.add(D.jobs[0].id);
    renderJobs();
    renderTrades();
    renderPositions();

    document.addEventListener("click", (e) => {
      const head = e.target.closest("[data-job]");
      if (head) {
        const id = head.dataset.job;
        openJobs.has(id) ? openJobs.delete(id) : openJobs.add(id);
        const job = head.closest(".job");
        const open = openJobs.has(id);
        job.classList.toggle("is-open", open);
        head.setAttribute("aria-expanded", String(open));
        head.querySelector(".round-arrow").style.transform = `rotate(${open ? 90 : 0}deg)`;
      }
      const apply = e.target.closest("[data-apply]");
      if (apply) {
        const sel = document.getElementById("ap-position");
        sel.value = apply.dataset.apply;
        S.validateField(sel);
      }
    });

    document.addEventListener("langchange", () => { renderJobs(); renderTrades(); renderPositions(); });
  });
})();
