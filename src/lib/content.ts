// Site-wide content + config for Wood Crafting — reclaimed-wood project sourcing LP.
// Single source of truth for copy, phone, address, form options, and tracking IDs.

export const PHONE = "(845) 373-8020";
export const PHONE_HREF = "tel:8453738020";

export const CTA = {
  primary: "Request a Project Quote",
  secondary: "Call (845) 373-8020",
  formAnchor: "#quote",
  heroFormAnchor: "#hero",
};

export const BRAND = {
  company: "Wood Crafting",
  legalName: "Wood Crafting LLC",
  tagline: "Authentic reclaimed wood, supplied at project scale.",
  region: "Serving the Northeast",
  email: "info@woodcraftingllc.com",
  emailHref: "mailto:info@woodcraftingllc.com",
};

export const CURRENT_YEAR = new Date().getFullYear();

// ─── Hero ───
export const HERO = {
  chips: [
    "100% reclaimed material",
    "Locally salvaged — Northeast & Midwest",
    "Project-scale supply",
  ],
  h1Lead: "Authentic reclaimed wood,",
  h1Accent: "supplied at the scale your project demands.",
  subhead:
    "Wood Crafting is the professional sourcing partner for project-scale reclaimed wood in the Northeast — barn beams, siding, board, and corral fencing pulled from centuries-old structures and milled to your spec. Not a retail lumber yard. Not a DIY marketplace. The material, the volume, and the know-how to spec an entire build.",
};

// ─── Trust / credibility bar ───
export const TRUST_STATS = [
  {
    icon: "leaf",
    value: "100% Reclaimed",
    label: "Every board salvaged from real structures — never new-cut or imitation.",
  },
  {
    icon: "map",
    value: "Locally Salvaged",
    label: "Barns, corrals, and agricultural buildings across the Northeast & Midwest.",
  },
  {
    icon: "layers",
    value: "Project Scale",
    label: "Volume and consistency to spec an entire elevation, frame, or interior.",
  },
  {
    icon: "mill",
    value: "Custom Milling",
    label: "Milled to your profiles and processed as-is, de-nailed, or power-washed.",
  },
];

// ─── Product lines (each gets full 80–150 word body copy) ───
export const PRODUCTS = [
  {
    id: "reclaimed-beams",
    eyebrow: "Structural & feature timber",
    title: "Reclaimed Beams",
    image: "/images/beams-interior.jpg",
    imageAlt:
      "Reclaimed timber-frame beams spanning a vaulted great room interior",
    body: "Hand-hewn and sawn timbers pulled from 19th- and early-20th-century barns and agricultural structures across the Northeast and Midwest. Every beam carries the marks of its working life — axe scores, mortise pockets, weathered patina, and the density that only old-growth timber delivers. We identify and match the species that define reclaimed barn stock, and we carry the volume to supply a full timber-frame or feature-beam package rather than a one-off stick. Specify them as-is for maximum character, de-nailed and cleaned for interior exposure, or power-washed to bring the grain forward. Send us your spans and profiles and we source to your drawings.",
    specs: ["Hand-hewn & sawn", "Old-growth density", "Custom spans & profiles"],
  },
  {
    id: "siding-paneling",
    eyebrow: "Exterior & interior cladding",
    title: "Siding & Paneling",
    image: "/images/siding-red-texture.jpg",
    imageAlt: "Authentic weathered red barn-board siding with original paint",
    body: "Weathered exterior siding and interior paneling with the original paint, patina, and saw texture intact — the surface you cannot fake with a stain or a wire brush. We supply authentic red, gray, and mixed-tone boards in runs consistent enough to clad a full elevation or wrap an interior feature wall, sorted for the color story your design calls for. Because the material is reclaimed, every board reads differently in raking light, giving finished walls the depth that manufactured products only imitate. Choose your processing level and milling profile, from raw as-found character to a cleaned, install-ready face, and we'll pull to quantity for the whole scope.",
    specs: ["Original paint & patina", "Sorted by color", "As-is → install-ready"],
  },
  {
    id: "reclaimed-barn-board",
    eyebrow: "Weathered surface board",
    title: "Reclaimed Barn Board",
    image: "/images/barnboard-gray-texture.jpg",
    imageAlt: "Reclaimed gray barn board showing knots and weathered grain",
    body: "Sun- and weather-grayed barn board with the knots, checks, and grain that come only from decades exposed to Northeast winters. This is the workhorse of a reclaimed project — accent walls, ceilings, millwork, cabinetry faces, and casework — supplied in the widths and lengths a real installation needs, not a bundle of hobby offcuts. We grade and sort for tone and texture so your crew opens consistent material on site, and we de-nail and process to the level your application requires. When you need more, we can match back to the same salvage character so a phase-two order reads as one continuous run.",
    specs: ["Naturally grayed", "Graded & sorted", "De-nailed on request"],
  },
  {
    id: "reclaimed-corral-fencing",
    eyebrow: "Rugged salvaged stock",
    title: "Reclaimed Corral Fencing",
    image: "/images/corral-exterior.jpg",
    imageAlt:
      "Reclaimed corral and gray board cladding on a premium home exterior with stone base",
    body: "Boards salvaged from working horse corrals and livestock enclosures — the most weathered, character-dense material we source. Years of use, sun, and stock contact give these boards a depth of texture that reads as instantly authentic on exterior cladding, entry features, and rugged interior accents. Because it is genuine corral stock, the grain, checking, and worn edges are real, not distressed by machine. We sort and process for the finish you want and supply the quantity to carry a feature or a full exterior, so the character stays consistent from the first board to the last. Tell us the look you're after and we'll source to match.",
    specs: ["Genuine corral stock", "Deep worn texture", "Sorted to quantity"],
  },
];

// ─── Why Wood Crafting (differentiators) ───
export const WHY = {
  headline: "Authentic material, at project scale, from people who know the wood.",
  intro:
    "Reclaimed wood is easy to claim and hard to actually supply. What separates a professional sourcing partner is provenance you can trace, volume you can build on, and the expertise to spec it correctly the first time.",
  pillars: [
    {
      icon: "leaf",
      title: "Genuine authenticity",
      body: "Every board is 100% reclaimed from a real structure — never new lumber distressed to look old, never printed imitation. The patina, paint, and wear are the record of the wood's working life.",
    },
    {
      icon: "map",
      title: "Traceable provenance",
      body: "We salvage from barns, horse corrals, and agricultural buildings across the Northeast and Midwest — structures that stood for generations. You get material with a real origin, not an anonymous mixed lot.",
    },
    {
      icon: "compass",
      title: "Species-level expertise",
      body: "We identify species, read grain and density, and match tone and texture across a run — so what ships is right for the application and reads as one consistent material on site.",
    },
    {
      icon: "layers",
      title: "Project-scale capability",
      body: "We carry the volume and the custom-milling capacity to supply an entire elevation, frame, or interior package — with the consistency a professional install demands.",
    },
  ],
};

// ─── How it works — sourcing & processing story ───
export const HOW_IT_WORKS = {
  intro:
    "From a standing structure to material on your site, every step is handled by people who source and process reclaimed wood for a living.",
  steps: [
    {
      n: "01",
      title: "Salvage at the source",
      body: "We reclaim from barns, corrals, and agricultural structures across the Northeast and Midwest — carefully deconstructing so the wood keeps the character that centuries of use gave it.",
    },
    {
      n: "02",
      title: "Sort, grade & identify",
      body: "Incoming stock is sorted by species, tone, and texture and graded for its best use — beams, siding, board, or corral stock — so your order arrives consistent, not a random mix.",
    },
    {
      n: "03",
      title: "Process to your spec",
      body: "Choose the finish: as-is for maximum character, de-nailed for safe handling and interior use, or power-washed to open up the grain. Then we mill to the profiles and dimensions your drawings call for.",
    },
    {
      n: "04",
      title: "Supply to quantity",
      body: "We pull to the volume your scope needs and can match back to the same salvage character for later phases — so the whole project reads as one continuous material.",
    },
  ],
  processing: ["As-is", "De-nailed", "Power-washed", "Custom-milled profiles"],
};

// ─── Who we serve (segments — NO fabricated testimonials) ───
export const WHO_WE_SERVE = {
  intro:
    "Wood Crafting supplies the professionals who specify and install reclaimed wood on real projects. If you're bringing a build to life, we're built to be your material partner.",
  segments: [
    {
      icon: "hardhat",
      title: "Builders & general contractors",
      body: "Consistent material, delivered to quantity, so a reclaimed spec doesn't become a scheduling risk.",
    },
    {
      icon: "compass",
      title: "Architects",
      body: "Real provenance and species-level detail to specify with confidence and back up your drawings.",
    },
    {
      icon: "building",
      title: "Developers",
      body: "Project-scale volume and repeatable character for multi-unit and estate-level work.",
    },
    {
      icon: "ruler",
      title: "Interior & exterior designers",
      body: "Sorted tone and texture to hit the exact color story and finish your concept calls for.",
    },
    {
      icon: "hammer",
      title: "Specialty contractors",
      body: "Custom-milled profiles and processing options tuned to how your crew installs.",
    },
  ],
};

// ─── Project gallery / lifestyle installations ───
export const GALLERY = {
  intro:
    "Reclaimed material from Wood Crafting, installed at scale — exterior cladding, timber-frame interiors, and full estate-level builds.",
  images: [
    {
      src: "/images/hero-reclaimed-barn.jpg",
      alt: "Reclaimed-wood barn estate at dusk with warmly lit windows",
      caption: "Full reclaimed-wood estate exterior",
      span: "wide",
    },
    {
      src: "/images/estate-aerial.jpg",
      alt: "Aerial view of a reclaimed-wood clad estate and clubhouse",
      caption: "Estate & clubhouse, aerial",
      span: "tall",
    },
    {
      src: "/images/beams-interior.jpg",
      alt: "Reclaimed timber-frame beams in a vaulted great room",
      caption: "Timber-frame great room",
      span: "normal",
    },
    {
      src: "/images/siding-gray.jpg",
      alt: "Reclaimed gray siding installed on a building exterior",
      caption: "Reclaimed gray siding, installed",
      span: "normal",
    },
    {
      src: "/images/barnboard-gray-2.jpg",
      alt: "Gray reclaimed board cladding detail",
      caption: "Gray board cladding detail",
      span: "normal",
    },
  ],
};

// ─── FAQ ───
export const FAQ = [
  {
    q: "Do you supply reclaimed wood at project scale?",
    a: "Yes — that's our focus. Wood Crafting sources and processes reclaimed material in the volume and consistency an entire project needs: a full elevation of siding, a timber-frame package, an interior scope. We're a professional sourcing partner, not a single-board retail counter.",
  },
  {
    q: "Where does your reclaimed wood come from?",
    a: "We salvage from barns, horse corrals, and agricultural structures across the Northeast and Midwest — buildings that stood for generations. Everything we supply is 100% reclaimed with a real origin. We never sell new lumber distressed to look old or printed imitation product.",
  },
  {
    q: "What processing and finishing options do you offer?",
    a: "You choose the level of processing for each order: as-is for maximum salvaged character, de-nailed for safe handling and interior exposure, or power-washed to open up the grain. We also mill to custom profiles and dimensions so the material arrives ready for your install.",
  },
  {
    q: "Can you match a specific species, color, or profile?",
    a: "We identify species and grade incoming stock by tone and texture, then sort to the color story and finish your design calls for. Because we carry volume, we can match back to the same salvage character for later phases so a project reads as one continuous run.",
  },
  {
    q: "Who do you work with?",
    a: "Builders, general contractors, architects, developers, interior and exterior designers, and specialty contractors — the professionals specifying and installing reclaimed wood on real projects. Share your scope and we'll source to it.",
  },
  {
    q: "How do I get pricing and get started?",
    a: "Send us your project details — the product lines you need, rough quantities, and what you're building — through the quote form. Because pricing depends on species, processing, milling, and volume, we scope each inquiry to the actual project and respond with real numbers for your build.",
  },
];

// ─── Final CTA ───
export const FINAL_CTA = {
  headline: "Spec your reclaimed wood with a partner who knows the material.",
  body: "Tell us what you're building and the products you need. We'll scope your project — species, processing, milling, and volume — and come back with real numbers. Every complete inquiry reaches our team directly.",
};

// ─── Form select options (wired to the LeadFormField contract) ───
export const PRODUCT_OPTIONS = [
  "Reclaimed Beams",
  "Siding & Paneling",
  "Reclaimed Barn Board",
  "Reclaimed Corral Fencing",
  "Not sure",
  "Multiple products",
];

// ─── Mega tracking — real Wood Crafting IDs. ───
export const TRACKING = {
  siteKey: "ow4y6fr52u7t9tsf",
  siteId: "6d8d3034-7300-47cb-8871-e4be86ab2cea",
  gtmId: "GTM-PQBFMM3K",
  metaPixelId: "1494879215999837",
};

// Mega submission API expects snake_case keys: customer_id, site_id, source_provider.
// Routing to Keystone CRM (notify info@woodcraftingllc.com) is wired server-side by
// site_id; no separate customer_id was provisioned for this LP, so we key on site_id.
export const FORM = {
  customerId: "6d8d3034-7300-47cb-8871-e4be86ab2cea",
  siteId: "6d8d3034-7300-47cb-8871-e4be86ab2cea",
  sourceProvider: "wood-crafting-landing",
};
