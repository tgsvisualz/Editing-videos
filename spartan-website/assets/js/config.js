/* ==========================================================================
   Site configuration — edit these values, no other file needs to change.
   ========================================================================== */
window.SPARTAN_CONFIG = {
  company: "Spartan Protection Incendie",
  companyEn: "Spartan Fire Protection",
  legalName: "9360-1516 Québec inc.",
  rbq: "5739-1203-01",

  phone: "514-772-6600",
  phoneHref: "tel:+15147726600",

  // Leave empty to hide e-mail links everywhere. Example: "info@spartanfire.ca"
  email: "",

  address: {
    street: "5637, chemin Saint-François",
    city: "Saint-Laurent (Montréal)",
    region: "QC",
    postal: "H4S 1W6",
    mapsQuery: "5637 Chemin Saint-François, Saint-Laurent, QC H4S 1W6",
  },

  // Social pages (managed by TGS). Leave a value empty to hide that network.
  social: {
    instagram: "https://www.instagram.com/spartanincendie/",
    facebook: "https://www.facebook.com/p/Spartan-Protection-Incendie-100063527651581/",
    linkedin: "https://www.linkedin.com/company/spartan-protection-incendie/",
  },

  /* Form delivery
     -------------
     Every form on the site (inspection request, contact, careers, quote cart)
     POSTs its fields as multipart FormData to this URL. Works out of the box
     with Formspree (https://formspree.io), Basin, Getform, a Netlify/Vercel
     function, or your own endpoint. The field "_form" tells you which form
     was submitted.

     While empty, the site runs in DEMO mode: forms validate and show the
     success screen, and the payload is printed to the browser console. */
  formEndpoint: "",

  // Design-preview mode: shows a "TGS design preview" banner on every page and
  // tells visitors that forms send nothing. Keep false on the live site.
  previewMode: false,

  // French first (Charter of the French Language / Bill 96). English is the option.
  defaultLang: "fr",
};
