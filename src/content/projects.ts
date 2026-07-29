import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "meridian-banking-app",
    title: "Meridian Banking App",
    category: "Product Design",
    summary:
      "A mobile banking experience rebuilt around a single question: what did I spend, and was it worth it?",
    description: [
      "Meridian is a placeholder case study for a consumer banking app. The existing product treated every transaction as an identical row in an endless list, which meant customers could see their money but never understand it.",
      "The redesign introduced a spending narrative: transactions group into moments, recurring costs surface before they hit, and the balance card becomes a forecast rather than a snapshot. A restrained two-colour system keeps financial data readable in bright sunlight and at 2am.",
      "Design work covered end-to-end flows for onboarding, transfers, card controls and dispute handling, plus a component library handed to engineering as a shared token set.",
    ],
    role: "Lead Product Designer",
    year: "2025",
    tags: ["iOS", "Android", "Design System", "Fintech"],
    liveUrl: "#",
    featured: true,
  },
  {
    slug: "kilnwork-brand-identity",
    title: "Kilnwork Ceramics Identity",
    category: "Brand Identity",
    summary:
      "A full identity system for a ceramics studio — wordmark, glaze-inspired palette, packaging and signage.",
    description: [
      "Kilnwork is a placeholder brand identity project for a small-batch ceramics studio. The studio had outgrown a hand-drawn logo that could not survive being embossed into clay or printed at postage-stamp size.",
      "The new wordmark is drawn from the geometry of a potter's wheel: perfectly circular bowls, flat terminals, and a single ligature that echoes the join of a handle. The palette is sampled directly from the studio's five house glazes.",
      "Deliverables included the wordmark and monogram, a stamp die for the underside of each piece, packaging, price cards, shopfront signage and a short brand book covering voice and photography.",
    ],
    role: "Brand Designer",
    year: "2025",
    tags: ["Identity", "Packaging", "Typography", "Signage"],
    featured: true,
  },
  {
    slug: "nightshift-title-sequence",
    title: "Nightshift Title Sequence",
    category: "Motion",
    summary:
      "A 45-second title sequence and broadcast package for a documentary series about people who work while cities sleep.",
    description: [
      "Nightshift is a placeholder motion project: an opening title sequence plus the lower-thirds, transitions and end-card package for a six-part documentary series.",
      "The sequence is built from long exposure photography and kinetic type. Letterforms assemble out of streaked headlights and vanish into darkness, matching the rhythm of the score without ever cutting on the beat — the edit deliberately lands slightly late, the way a night shift does.",
      "The delivery included the master sequence, a 10-second cut-down for social, a title generator template for the edit team, and motion guidelines for future seasons.",
    ],
    role: "Motion Designer & Art Director",
    year: "2024",
    tags: ["Title Design", "Kinetic Type", "Broadcast", "Reel"],
    liveUrl: "#",
    featured: true,
  },
  {
    slug: "orchard-labs-website",
    title: "Orchard Labs Site Redesign",
    category: "Web Design",
    summary:
      "A marketing site rebuild that cut the homepage from eleven sections to five and doubled demo requests.",
    description: [
      "Orchard Labs is a placeholder marketing site redesign. The previous site had accumulated a decade of additions: eleven homepage sections, four competing calls to action and three separate pricing explanations.",
      "The rebuild started with a content audit rather than a moodboard. Everything that did not help a visitor answer 'what is this, who is it for, what does it cost' was cut or moved. What remained got room to breathe and a typographic hierarchy strong enough to be scanned in fifteen seconds.",
      "The design was delivered as a responsive component library covering the homepage, product pages, pricing, changelog and a documentation shell, with dark mode as a first-class variant rather than an afterthought.",
    ],
    role: "Design Lead",
    year: "2024",
    tags: ["Marketing Site", "Responsive", "Design System", "Dark Mode"],
    liveUrl: "#",
    featured: true,
  },
  {
    slug: "sediment-quarterly",
    title: "Sediment Quarterly",
    category: "Editorial",
    summary:
      "Art direction and grid system for an independent print journal about geology, landscape and slow time.",
    description: [
      "Sediment Quarterly is a placeholder editorial project: a 96-page independent print journal published four times a year.",
      "The grid is built on a twelve-column base that collapses into layered strata — features sit deep in the page, marginalia rises to the top edge, and each section is separated by a full-bleed rock-face photograph. Body copy is set in a transitional serif at a generous measure to slow the reader down.",
      "Work covered art direction, the master grid and paragraph style sheets, cover art direction for four issues, and a subscriber-facing folded insert that doubles as a poster.",
    ],
    role: "Art Director",
    year: "2023",
    tags: ["Print", "Grid System", "Art Direction", "Typography"],
    featured: false,
  },
  {
    slug: "transit-wayfinding-kit",
    title: "Transit Wayfinding Kit",
    category: "Systems Design",
    summary:
      "A pictogram set and signage system for a regional transit network, tested at walking speed in the rain.",
    description: [
      "The Transit Wayfinding Kit is a placeholder systems design project covering signage, pictograms and platform information for a regional transit network of forty-one stations.",
      "The pictogram set was drawn on a strict 24-unit grid so that every symbol holds together whether it is die-cut into a two-metre sign or rendered at 20px in the journey planner. Colour is used only to distinguish lines; everything else is carried by shape and hierarchy.",
      "Field testing happened where it matters: at walking pace, at night, in the rain, and with riders who had never seen the network before. Three pictograms were redrawn entirely after that round.",
    ],
    role: "Systems Designer",
    year: "2023",
    tags: ["Wayfinding", "Pictograms", "Accessibility", "Environmental"],
    featured: false,
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
