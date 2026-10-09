/* ==========================================================================
   Content data: store catalogue + job postings (FR / EN side by side).
   Prices are intentionally "on quote": B2B fire-safety pricing depends on
   quantity, building and installation. Add `price: 89.99` to any item to
   show a fixed price instead.
   ========================================================================== */
(function () {
  /* ---------- Product illustrations (inline SVG, brand-consistent) ---------- */
  const art = {
    extinguisher({ body = "#d3271f", label = "ABC", horn = false, steel = false } = {}) {
      const bodyFill = steel ? "url(#gSteel)" : body;
      return `<svg viewBox="0 0 200 260" aria-hidden="true">
        <defs>
          <linearGradient id="gSteel" x1="0" x2="1"><stop offset="0" stop-color="#9aa0a6"/><stop offset=".45" stop-color="#e9ecef"/><stop offset="1" stop-color="#8a9096"/></linearGradient>
          <linearGradient id="gShade" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".18"/><stop offset=".35" stop-color="#000" stop-opacity="0"/><stop offset=".8" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></linearGradient>
        </defs>
        <rect x="58" y="72" width="84" height="172" rx="36" fill="${bodyFill}"/>
        <rect x="58" y="72" width="84" height="172" rx="36" fill="url(#gShade)"/>
        <rect x="70" y="92" width="10" height="130" rx="5" fill="#fff" opacity=".28"/>
        <rect x="66" y="134" width="68" height="58" rx="8" fill="#fff"/>
        <text x="100" y="172" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="26" fill="#0e0d0d">${label}</text>
        <rect x="66" y="134" width="68" height="10" rx="4" fill="#ee9527"/>
        <rect x="86" y="52" width="28" height="24" rx="5" fill="#2a2725"/>
        <path d="M84 40h40l22 10-4 8-22-8H84z" fill="#1d1b1a"/>
        <path d="M88 34h30l3 8H86z" fill="#3a3633"/>
        <circle cx="126" cy="64" r="9" fill="#fff" stroke="#2a2725" stroke-width="3"/>
        <path d="M126 64l4-4" stroke="#1f9d55" stroke-width="2.5" stroke-linecap="round"/>
        ${horn
          ? `<path d="M86 48c-22 0-34 14-34 34v40" fill="none" stroke="#1d1b1a" stroke-width="7" stroke-linecap="round"/><path d="M40 118h24l8 44H32z" fill="#1d1b1a"/>`
          : `<path d="M86 46c-24 2-36 18-36 40v92c0 10 6 16 14 16" fill="none" stroke="#1d1b1a" stroke-width="7" stroke-linecap="round"/><rect x="58" y="186" width="16" height="20" rx="4" fill="#1d1b1a"/>`}
      </svg>`;
    },
    emergencyLight() {
      return `<svg viewBox="0 0 220 200" aria-hidden="true">
        <rect x="40" y="70" width="140" height="96" rx="16" fill="#f4f1ec" stroke="#d9d2c7" stroke-width="3"/>
        <rect x="40" y="70" width="140" height="22" rx="10" fill="#e6e0d6"/>
        <circle cx="168" cy="146" r="5" fill="#1f9d55"/>
        <rect x="88" y="138" width="44" height="10" rx="5" fill="#d9d2c7"/>
        <g><rect x="44" y="34" width="44" height="40" rx="10" fill="#0e0d0d"/><circle cx="66" cy="54" r="13" fill="#fff6d6"/><circle cx="66" cy="54" r="7" fill="#ffd25e"/></g>
        <g><rect x="132" y="34" width="44" height="40" rx="10" fill="#0e0d0d"/><circle cx="154" cy="54" r="13" fill="#fff6d6"/><circle cx="154" cy="54" r="7" fill="#ffd25e"/></g>
        <path d="M30 40l-14-8M28 58H12M30 74l-14 8M190 40l14-8M192 58h16M190 74l14 8" stroke="#ee9527" stroke-width="4" stroke-linecap="round"/>
      </svg>`;
    },
    exitSign({ combo = false } = {}) {
      return `<svg viewBox="0 0 240 200" aria-hidden="true">
        <rect x="20" y="${combo ? 70 : 50}" width="200" height="104" rx="12" fill="#fff" stroke="#d9d2c7" stroke-width="3"/>
        <rect x="32" y="${combo ? 82 : 62}" width="176" height="80" rx="6" fill="#0f8a47"/>
        <g transform="translate(${combo ? 0 : 0} ${combo ? 20 : 0})" fill="#fff">
          <rect x="44" y="72" width="34" height="60" rx="3" fill="#e9fff2" opacity=".9"/>
          <circle cx="112" cy="78" r="8"/>
          <path d="M104 90l-14 10 4 6 12-8 4 14-12 18 6 4 14-18 10 12 6-4-12-18-4-16 12 6 8-12-6-4-6 8-14-8z"/>
          <path d="M150 102h36l-12-12M186 102l-12 12" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        ${combo ? `<g><rect x="40" y="26" width="40" height="34" rx="9" fill="#0e0d0d"/><circle cx="60" cy="43" r="10" fill="#ffd25e"/><rect x="160" y="26" width="40" height="34" rx="9" fill="#0e0d0d"/><circle cx="180" cy="43" r="10" fill="#ffd25e"/></g>` : ""}
      </svg>`;
    },
    battery() {
      return `<svg viewBox="0 0 220 200" aria-hidden="true">
        <rect x="40" y="60" width="140" height="100" rx="12" fill="#0e0d0d"/>
        <rect x="62" y="46" width="24" height="16" rx="3" fill="#d3271f"/>
        <rect x="134" y="46" width="24" height="16" rx="3" fill="#2a2725"/>
        <rect x="54" y="84" width="112" height="44" rx="6" fill="#ee9527"/>
        <path d="M114 92l-16 22h12l-4 14 16-22h-12z" fill="#0e0d0d"/>
        <text x="110" y="150" text-anchor="middle" font-family="Barlow, sans-serif" font-weight="700" font-size="12" fill="#9a928a">12 V</text>
      </svg>`;
    },
    smokeDetector({ co = false } = {}) {
      if (co) {
        return `<svg viewBox="0 0 200 200" aria-hidden="true">
          <rect x="44" y="30" width="112" height="140" rx="26" fill="#f7f5f1" stroke="#d9d2c7" stroke-width="3"/>
          <rect x="64" y="56" width="72" height="36" rx="6" fill="#1d2b22"/>
          <text x="100" y="82" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="22" fill="#5ef59a">0 ppm</text>
          <g fill="#c9c1b5">${[0, 1, 2, 3, 4].map((i) => `<rect x="${66 + i * 14}" y="108" width="8" height="34" rx="4"/>`).join("")}</g>
          <circle cx="100" cy="154" r="6" fill="#1f9d55"/>
        </svg>`;
      }
      return `<svg viewBox="0 0 200 200" aria-hidden="true">
        <ellipse cx="100" cy="128" rx="82" ry="22" fill="#d9d2c7"/>
        <ellipse cx="100" cy="112" rx="82" ry="26" fill="#f7f5f1" stroke="#d9d2c7" stroke-width="3"/>
        <path d="M18 112v12c0 14 37 26 82 26s82-12 82-26v-12" fill="#ece7df"/>
        <ellipse cx="100" cy="106" rx="54" ry="15" fill="#efe9e0"/>
        <ellipse cx="100" cy="104" rx="34" ry="9" fill="#e2dbd0"/>
        <ellipse cx="100" cy="102" rx="16" ry="4.5" fill="#d1c8bb"/>
        <circle cx="152" cy="118" r="4.5" fill="#d3271f"/>
      </svg>`;
    },
    pullStation() {
      return `<svg viewBox="0 0 200 220" aria-hidden="true">
        <rect x="46" y="20" width="108" height="180" rx="14" fill="#d3271f"/>
        <rect x="46" y="20" width="108" height="180" rx="14" fill="url(#gShadePS)"/>
        <defs><linearGradient id="gShadePS" x1="0" x2="1"><stop offset="0" stop-opacity=".15"/><stop offset=".4" stop-opacity="0"/><stop offset="1" stop-opacity=".2"/></linearGradient></defs>
        <text x="100" y="62" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="28" fill="#fff">FEU</text>
        <text x="100" y="86" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="18" fill="#fff" opacity=".85">FIRE</text>
        <rect x="70" y="104" width="60" height="52" rx="8" fill="#a51d17"/>
        <path d="M80 118h40v14H80z" fill="#fff"/>
        <rect x="94" y="132" width="12" height="18" rx="3" fill="#fff"/>
        <text x="100" y="182" text-anchor="middle" font-family="Barlow, sans-serif" font-weight="700" font-size="11" fill="#fff" opacity=".8">TIREZ · PULL</text>
      </svg>`;
    },
    hornStrobe() {
      return `<svg viewBox="0 0 200 200" aria-hidden="true">
        <rect x="40" y="30" width="120" height="140" rx="14" fill="#d3271f"/>
        <rect x="64" y="46" width="72" height="46" rx="10" fill="#f9f6f0" opacity=".95"/>
        <rect x="72" y="54" width="56" height="30" rx="6" fill="#fffbe8"/>
        <path d="M100 52v34" stroke="#ffd25e" stroke-width="4" opacity=".7"/>
        <g fill="#a51d17">${[0, 1, 2, 3].map((i) => `<rect x="60" y="${106 + i * 12}" width="80" height="6" rx="3"/>`).join("")}</g>
        <text x="100" y="164" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="13" fill="#fff">FEU · FIRE</text>
      </svg>`;
    },
    cabinet() {
      return `<svg viewBox="0 0 200 240" aria-hidden="true">
        <rect x="36" y="16" width="128" height="208" rx="10" fill="#e9e4dc" stroke="#cfc7ba" stroke-width="3"/>
        <rect x="50" y="30" width="100" height="180" rx="6" fill="#cfe3ea" opacity=".75"/>
        <rect x="76" y="70" width="48" height="118" rx="22" fill="#d3271f"/>
        <rect x="88" y="54" width="24" height="18" rx="4" fill="#2a2725"/>
        <rect x="82" y="112" width="36" height="28" rx="4" fill="#fff"/>
        <path d="M58 40l40 0-40 50z" fill="#fff" opacity=".35"/>
        <rect x="140" y="110" width="6" height="26" rx="3" fill="#8f877c"/>
      </svg>`;
    },
    bracket() {
      return `<svg viewBox="0 0 200 200" aria-hidden="true">
        <rect x="70" y="24" width="60" height="150" rx="8" fill="#3a3633"/>
        <rect x="80" y="36" width="40" height="8" rx="4" fill="#5a5450"/>
        <path d="M60 110h80v18c0 8-6 14-14 14H74c-8 0-14-6-14-14z" fill="#2a2725"/>
        <path d="M58 70h84" stroke="#ee9527" stroke-width="10" stroke-linecap="round"/>
        <circle cx="100" cy="160" r="5" fill="#9a928a"/>
      </svg>`;
    },
    signage() {
      return `<svg viewBox="0 0 200 220" aria-hidden="true">
        <rect x="40" y="20" width="120" height="180" rx="10" fill="#d3271f"/>
        <rect x="52" y="32" width="96" height="156" rx="6" fill="none" stroke="#fff" stroke-width="3" opacity=".6"/>
        <rect x="84" y="62" width="32" height="88" rx="15" fill="#fff"/>
        <rect x="92" y="48" width="16" height="16" rx="3" fill="#fff"/>
        <path d="M92 52c-16 0-22 12-22 26v30" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>
        <text x="100" y="178" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="16" fill="#fff">EXTINCTEUR</text>
      </svg>`;
    },
    service(icon, tone = "dark") {
      const bg = tone === "fire" ? "url(#gFireSvc)" : "#0e0d0d";
      return `<svg viewBox="0 0 200 200" aria-hidden="true">
        <defs><linearGradient id="gFireSvc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ee9527"/><stop offset=".6" stop-color="#e2601b"/><stop offset="1" stop-color="#d3271f"/></linearGradient></defs>
        <rect x="30" y="30" width="140" height="140" rx="40" fill="${bg}"/>
        <svg x="64" y="64" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="${tone === "fire" ? "#fff" : "#ee9527"}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><use href="#i-${icon}"/></svg>
      </svg>`;
    },
  };

  /* ---------- Remote photo sources (licensed; see credits.html) ----------
     If a remote photo ever fails to load, the card falls back to the
     illustration below automatically — nothing breaks. */
  const wm = (file, w = 900) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${w}`;
  const local = (name) => `assets/img/${name}.webp`;

  /* ---------- Categories ---------- */
  const categories = [
    { id: "all", fr: "Tout", en: "All" },
    { id: "extinguishers", fr: "Extincteurs", en: "Extinguishers" },
    { id: "lighting", fr: "Éclairage d'urgence", en: "Emergency lighting" },
    { id: "detection", fr: "Alarme & détection", en: "Alarm & detection" },
    { id: "accessories", fr: "Accessoires", en: "Accessories" },
    { id: "services", fr: "Services", en: "Services" },
  ];

  const L = (fr, en) => ({ fr, en });

  /* ---------- Catalogue ---------- */
  const products = [
    {
      id: "ext-abc-5", cat: "extinguishers", photo: wm("Fire_Extinguisher_ABC.jpg"), badge: L("Populaire", "Popular"),
      name: L("Extincteur ABC 5 lb", "ABC extinguisher, 5 lb"),
      desc: L("Poudre polyvalente pour bureaux, logements, cuisines résidentielles et véhicules.", "Multipurpose dry chemical for offices, units, home kitchens and vehicles."),
      specs: [[L("Agent", "Agent"), L("Poudre chimique ABC", "ABC dry chemical")], [L("Classes de feu", "Fire classes"), L("A · B · C", "A · B · C")], [L("Usage", "Use"), L("Bureaux, logements, véhicules", "Offices, units, vehicles")], [L("Inclus", "Included"), L("Support mural + étiquette d'inspection", "Wall bracket + inspection tag")]],
      art: () => art.extinguisher({ label: "ABC" }),
    },
    {
      id: "ext-abc-10", cat: "extinguishers", photo: local("hero-extinguishers"),
      name: L("Extincteur ABC 10 lb", "ABC extinguisher, 10 lb"),
      desc: L("Le format de référence pour les commerces, les aires communes et les entrepôts.", "The go-to size for retail, common areas and warehouses."),
      specs: [[L("Agent", "Agent"), L("Poudre chimique ABC", "ABC dry chemical")], [L("Classes de feu", "Fire classes"), L("A · B · C", "A · B · C")], [L("Usage", "Use"), L("Commerces, corridors, entrepôts", "Retail, corridors, warehouses")], [L("Inclus", "Included"), L("Support mural + étiquette d'inspection", "Wall bracket + inspection tag")]],
      art: () => art.extinguisher({ label: "ABC" }),
    },
    {
      id: "ext-abc-20", cat: "extinguishers",
      name: L("Extincteur ABC 20 lb", "ABC extinguisher, 20 lb"),
      desc: L("Capacité accrue pour les garages, ateliers et sites industriels.", "Extra capacity for garages, shops and industrial sites."),
      specs: [[L("Agent", "Agent"), L("Poudre chimique ABC", "ABC dry chemical")], [L("Classes de feu", "Fire classes"), L("A · B · C", "A · B · C")], [L("Usage", "Use"), L("Garages, ateliers, industrie", "Garages, shops, industrial")]],
      art: () => art.extinguisher({ label: "ABC" }),
    },
    {
      id: "ext-co2-10", cat: "extinguishers", photo: wm("10lb._CO2_Fire_Extinguisher.jpg"), badge: L("Sans résidu", "No residue"),
      name: L("Extincteur CO₂ 10 lb", "CO₂ extinguisher, 10 lb"),
      desc: L("Pour salles électriques, salles de serveurs et laboratoires\u00a0: aucun résidu.", "For electrical rooms, server rooms and labs — leaves no residue."),
      specs: [[L("Agent", "Agent"), L("Dioxyde de carbone", "Carbon dioxide")], [L("Classes de feu", "Fire classes"), L("B · C", "B · C")], [L("Usage", "Use"), L("Électrique, serveurs, labos", "Electrical, servers, labs")]],
      art: () => art.extinguisher({ body: "#1d1b1a", label: "CO₂", horn: true }),
    },
    {
      id: "ext-k-6", cat: "extinguishers",
      name: L("Extincteur classe K 6 L", "Class K extinguisher, 6 L"),
      desc: L("Agent humide pour les cuisines commerciales\u00a0: graisses et huiles de cuisson.", "Wet agent for commercial kitchens — cooking oils and fats."),
      specs: [[L("Agent", "Agent"), L("Agent humide (acétate de potassium)", "Wet chemical (potassium acetate)")], [L("Classes de feu", "Fire classes"), L("A · K", "A · K")], [L("Usage", "Use"), L("Restaurants, cuisines commerciales", "Restaurants, commercial kitchens")]],
      art: () => art.extinguisher({ steel: true, label: "K" }),
    },
    {
      id: "light-twin", cat: "lighting", photo: wm("Emergency_light.JPG"), badge: L("DEL", "LED"),
      name: L("Unité d'éclairage d'urgence, 2 têtes", "Twin-head emergency light"),
      desc: L("Éclairage DEL autonome avec batterie et bouton de test, pour corridors et escaliers.", "Self-contained LED unit with battery and test button for corridors and stairs."),
      specs: [[L("Source", "Source"), L("DEL orientables", "Adjustable LED heads")], [L("Autonomie", "Run time"), L("Selon les exigences du code", "As required by code")], [L("Montage", "Mounting"), L("Mural", "Wall")], [L("Installation", "Installation"), L("Par nos électriciens", "By our electricians")]],
      art: () => art.emergencyLight(),
    },
    {
      id: "exit-led", cat: "lighting", photo: wm("Running_Man_Exit_Right_Sign_Canada.jpg"),
      name: L("Enseigne de sortie DEL", "LED exit sign"),
      desc: L("Pictogramme vert «\u00a0personnage qui court\u00a0», flèches configurables.", "Green running-man pictogram, configurable arrows."),
      specs: [[L("Pictogramme", "Pictogram"), L("Vert, personnage qui court", "Green running man")], [L("Flèches", "Arrows"), L("Gauche / droite / aucune", "Left / right / none")], [L("Montage", "Mounting"), L("Mur, plafond ou extrémité", "Wall, ceiling or end")]],
      art: () => art.exitSign(),
    },
    {
      id: "exit-combo", cat: "lighting",
      name: L("Combo sortie + éclairage d'urgence", "Exit sign + emergency light combo"),
      desc: L("Deux fonctions dans un seul boîtier\u00a0: idéal pour les rénovations.", "Two functions, one housing — ideal for retrofits."),
      specs: [[L("Fonctions", "Functions"), L("Enseigne + 2 têtes DEL", "Sign + 2 LED heads")], [L("Batterie", "Battery"), L("Intégrée", "Built-in")]],
      art: () => art.exitSign({ combo: true }),
    },
    {
      id: "battery", cat: "lighting",
      name: L("Batterie de remplacement", "Replacement battery"),
      desc: L("Pour unités d'urgence existantes. Nos techniciens confirment le modèle compatible.", "For existing emergency units — our techs confirm the compatible model."),
      specs: [[L("Tension", "Voltage"), L("6 V ou 12 V selon l'unité", "6 V or 12 V per unit")], [L("Compatibilité", "Compatibility"), L("Vérifiée avant livraison", "Checked before delivery")]],
      art: () => art.battery(),
    },
    {
      id: "smoke-det", cat: "detection", photo: wm("Smoke_detector.JPG"),
      name: L("Détecteur de fumée photoélectrique", "Photoelectric smoke detector"),
      desc: L("Pour systèmes adressables ou conventionnels — compatibilité confirmée avec votre panneau.", "For addressable or conventional systems — compatibility confirmed with your panel."),
      specs: [[L("Technologie", "Technology"), L("Photoélectrique", "Photoelectric")], [L("Système", "System"), L("Adressable ou conventionnel", "Addressable or conventional")], [L("Installation", "Installation"), L("Vérification CAN/ULC-S537 incluse", "CAN/ULC-S537 verification included")]],
      art: () => art.smokeDetector(),
    },
    {
      id: "co-alarm", cat: "detection", photo: wm("CO_DETECTOR.JPG"),
      name: L("Avertisseur de monoxyde de carbone", "Carbon monoxide alarm"),
      desc: L("Pour logements avec appareil à combustion ou garage attenant.", "For units with fuel-burning appliances or an attached garage."),
      specs: [[L("Affichage", "Display"), L("Numérique (ppm)", "Digital (ppm)")], [L("Usage", "Use"), L("Résidentiel et multilogement", "Residential & multi-unit")]],
      art: () => art.smokeDetector({ co: true }),
    },
    {
      id: "pull-station", cat: "detection",
      name: L("Déclencheur manuel", "Manual pull station"),
      desc: L("Station manuelle bilingue pour système d'alarme incendie.", "Bilingual manual station for fire alarm systems."),
      specs: [[L("Action", "Action"), L("Simple ou double", "Single or dual action")], [L("Inscription", "Marking"), L("Bilingue FR / EN", "Bilingual FR / EN")]],
      art: () => art.pullStation(),
    },
    {
      id: "horn-strobe", cat: "detection", photo: wm("System_Sensor_SpectrAlert_Classic_Horn_Strobe.jpg"),
      name: L("Avertisseur sonore et visuel", "Horn / strobe"),
      desc: L("Signal sonore et stroboscopique pour une évacuation claire, même dans le bruit.", "Audible and visual signal for clear evacuation, even in noisy areas."),
      specs: [[L("Signal", "Signal"), L("Sonore + stroboscope", "Horn + strobe")], [L("Montage", "Mounting"), L("Mur ou plafond", "Wall or ceiling")]],
      art: () => art.hornStrobe(),
    },
    {
      id: "cabinet", cat: "accessories",
      name: L("Armoire pour extincteur", "Extinguisher cabinet"),
      desc: L("Encastrée, semi-encastrée ou en saillie, avec vitre ou panneau plein.", "Recessed, semi-recessed or surface-mounted, glass or solid door."),
      specs: [[L("Montage", "Mounting"), L("Encastré / semi / saillie", "Recessed / semi / surface")], [L("Porte", "Door"), L("Vitre ou pleine", "Glass or solid")]],
      art: () => art.cabinet(),
    },
    {
      id: "bracket", cat: "accessories",
      name: L("Support mural ou véhicule", "Wall or vehicle bracket"),
      desc: L("Fixation robuste pour extincteurs de 2,5 à 20 lb.", "Heavy-duty mount for 2.5 to 20 lb extinguishers."),
      specs: [[L("Format", "Fits"), L("2,5 à 20 lb", "2.5 to 20 lb")], [L("Usage", "Use"), L("Mur, camion, chariot", "Wall, truck, forklift")]],
      art: () => art.bracket(),
    },
    {
      id: "signage", cat: "accessories",
      name: L("Affiche d'identification d'extincteur", "Extinguisher ID sign"),
      desc: L("Repérage visible de loin, pour corridors et aires ouvertes.", "Visible from a distance in corridors and open areas."),
      specs: [[L("Format", "Format"), L("Plat ou en V (3D)", "Flat or V-shape (3D)")]],
      art: () => art.signage(),
    },
    {
      id: "svc-estimate", cat: "services", photo: local("technician"), badge: L("Gratuit", "Free"), badgeFire: true, priceLabel: L("Gratuit", "Free"),
      name: L("Estimation gratuite", "Free estimate"),
      desc: L("Un technicien évalue vos systèmes et vous remet une soumission claire.", "A technician reviews your systems and gives you a clear quote."),
      specs: [[L("Pour", "For"), L("Installation, mise à niveau, contrat", "Install, upgrade, contract")], [L("Coût", "Cost"), L("Aucun", "None")]],
      art: () => art.service("file-check", "fire"),
    },
    {
      id: "svc-alarm-insp", cat: "services", photo: local("fire-alarm-panel"),
      name: L("Inspection annuelle d'alarme incendie", "Annual fire alarm inspection"),
      desc: L("Inspection et essais selon CAN/ULC-S536, rapport conforme remis à votre assureur.", "Inspection and testing to CAN/ULC-S536, compliant report for your insurer."),
      specs: [[L("Norme", "Standard"), L("CAN/ULC-S536", "CAN/ULC-S536")], [L("Livrable", "Deliverable"), L("Rapport d'inspection", "Inspection report")], [L("Rappel", "Reminder"), L("Annuel, automatique", "Annual, automatic")]],
      art: () => art.service("bell"),
    },
    {
      id: "svc-sprinkler-insp", cat: "services", photo: local("sprinkler-room"),
      name: L("Inspection de gicleurs", "Sprinkler inspection"),
      desc: L("Systèmes sous eau, sous air, préaction et déluge — avant le gel et toute l'année.", "Wet, dry, pre-action and deluge systems — before the freeze and all year."),
      specs: [[L("Systèmes", "Systems"), L("Sous eau, sous air, préaction, déluge", "Wet, dry, pre-action, deluge")], [L("Norme", "Standard"), L("NFPA 25", "NFPA 25")]],
      art: () => art.service("droplets"),
    },
    {
      id: "svc-ext-maint", cat: "services", photo: wm("Fire_extinguisher_with_ID_sign,_call_point_and_fire_action_sign.JPG"),
      name: L("Inspection d'extincteurs sur place", "On-site extinguisher inspection"),
      desc: L("Inspection annuelle, étiquetage et remplacement au besoin, dans tout le bâtiment.", "Annual inspection, tagging and replacement as needed, building-wide."),
      specs: [[L("Fréquence", "Frequency"), L("Annuelle", "Annual")], [L("Inclus", "Included"), L("Étiquette + registre", "Tag + log")]],
      art: () => art.service("fire-extinguisher"),
    },
    {
      id: "svc-recharge", cat: "services", photo: local("extinguisher-shop"), badge: L("Atelier", "In-house"),
      name: L("Recharge et essai hydrostatique", "Recharge & hydrostatic testing"),
      desc: L("Entretien à 6 ans et essai hydrostatique à 12 ans, faits dans notre atelier.", "6-year maintenance and 12-year hydrostatic test, done in our own shop."),
      specs: [[L("Entretien", "Maintenance"), L("1, 6 et 12 ans", "1, 6 and 12 years")], [L("Lieu", "Location"), L("Atelier de Saint-Laurent", "Saint-Laurent shop")]],
      art: () => art.service("wrench"),
    },
  ];

  /* ---------- Careers ---------- */
  const jobs = [
    {
      id: "fire-alarm-technician",
      open: true,
      title: L("Technicien(ne) en alarme incendie", "Fire alarm technician"),
      tags: [L("Temps plein", "Full-time"), L("40 h / semaine", "40 h / week"), L("Saint-Laurent + chantiers", "Saint-Laurent + job sites"), L("À partir de 23 $/h selon l'expérience", "From $23/h based on experience")],
      summary: L(
        "Rejoignez une équipe en croissance qui inspecte, entretient et dépanne les systèmes d'alarme incendie de bâtiments commerciaux, industriels et résidentiels.",
        "Join a growing team that inspects, services and troubleshoots fire alarm systems in commercial, industrial and residential buildings."
      ),
      duties: [
        L("Inspections et essais de systèmes d'alarme incendie", "Fire alarm system inspections and testing"),
        L("Entretien préventif et dépannage", "Preventive maintenance and troubleshooting"),
        L("Vérifier la conformité aux codes applicables", "Ensure compliance with applicable codes"),
        L("Rédiger des rapports de service précis", "Write accurate service reports"),
      ],
      requirements: [
        L("Bilingue français et anglais", "Bilingual French and English"),
        L("Expérience en inspection, service ou installation\u00a0: un atout", "Inspection, service or installation experience: an asset"),
        L("Certification ACAI (CFAA)\u00a0: un atout — nous formons la bonne personne", "CFAA certification: an asset — we train the right person"),
        L("Fiable, motivé(e), à l'aise sur les chantiers", "Reliable, motivated, comfortable on job sites"),
      ],
      benefits: [
        L("REER avec contribution de l'employeur", "RRSP with employer matching"),
        L("Assurance santé complémentaire", "Supplementary health insurance"),
        L("Stationnement sur place", "On-site parking"),
        L("Horaire flexible et heures supplémentaires possibles", "Flexible schedule and overtime opportunities"),
        L("Formation ACAI (CFAA) soutenue et formation continue", "CFAA training support and ongoing training"),
        L("Développement du leadership", "Leadership development"),
      ],
    },
  ];

  const trades = [
    { id: "sprinkler", icon: "droplets", name: L("Technicien(ne) en gicleurs", "Sprinkler technician") },
    { id: "electrician", icon: "zap", name: L("Électricien(ne)", "Electrician") },
    { id: "extinguisher", icon: "fire-extinguisher", name: L("Technicien(ne) en extincteurs (atelier)", "Extinguisher technician (shop)") },
    { id: "security", icon: "shield", name: L("Installateur(-trice) sécurité & accès", "Security & access installer") },
    { id: "apprentice", icon: "graduation", name: L("Apprenti(e) / aide-technicien(ne)", "Apprentice / technician helper") },
    { id: "office", icon: "briefcase", name: L("Bureau & coordination", "Office & coordination") },
  ];

  window.SPARTAN_DATA = { art, categories, products, jobs, trades, wm, local };
})();
