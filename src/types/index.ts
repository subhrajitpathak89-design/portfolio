export type ProjectResult = {
  metric: string;
  label: string;
};

/**
 * The four-line summary that opens a case study: what the business is, what
 * went wrong, what I did, what changed. A reader who only reads this block
 * should still be able to repeat the story back.
 */
export type ProjectSnapshot = {
  business: string;
  challenge: string;
  solution: string;
  impact: string[];
};

/** A "before" number that defines the problem, shown large above the prose. */
export type ProjectBaseline = {
  metric: string;
  label: string;
};

/**
 * One vector of friction found in the audit, numbered in the order it hurt.
 * Kept separate from `constraints`: constraints are what I could not change,
 * frictions are what I was there to remove.
 */
export type ProjectFriction = {
  title: string;
  body: string;
};

/** Before/after step lists, rendered as two lines a reader can compare. */
export type ProjectFlowChange = {
  before: string[];
  after: string[];
};

export type ProjectApproachStep = {
  title: string;
  body: string;
  /** Screen from the work itself; falls back to a placeholder frame when unset. */
  image?: string;
  /** Looping capture of the real product, preferred over the still when set. */
  video?: string;
  /** Poster frame shown before the clip loads, and instead of it under reduced motion. */
  poster?: string;
};

/**
 * Backdrop family behind a project's screenshots. Each was picked to sit under
 * that project's own UI chrome, sampled from the images rather than guessed:
 * RiseAngle's app is dark slate, Wizlo's is violet, Saral's is a light
 * grey-teal, Mythic's is navy. Nivex ships its own documented brand indigo.
 */
export type ProjectTone = "slate" | "violet" | "mist" | "navy" | "indigo";

/**
 * A group of related captures shown as one overlapping stack rather than one
 * full-width card each — three phone screens in a row of 960px cards left huge
 * empty gutters and read as three unrelated things.
 */
export type ProjectShowcaseItem = {
  /** Looping capture of the flow. Preferred over `image` when both are set. */
  video?: string;
  image?: string;
  /** Frame shown before the clip loads, and instead of it under reduced motion. */
  poster?: string;
  /** What this flow is, in two or three words. */
  label: string;
};

export type ProjectShowcase = {
  label: string;
  heading: string;
  caption?: string;
  media: ProjectShowcaseItem[];
};

/** Product flow, rendered as a numbered strip a reader can scan in seconds. */
export type ProjectFlow = {
  label: string;
  steps: string[];
};

/** Marks shown on a case-study card. Names are never rendered, only the logo. */
export type ProjectTool = "figma" | "claude" | "chatgpt";

export type Project = {
  slug: string;
  tone?: ProjectTone;
  /**
   * Three lines a hiring manager can read before deciding to scroll: what it
   * was, what I owned, what changed.
   */
  tldr?: string[];
  flow?: ProjectFlow;
  showcase?: ProjectShowcase;
  /** Two-or-three-word label for tight spots — hero chips, nav, related cards. */
  shortName?: string;
  title: string;
  category: string;
  summary: string;
  description: string[];
  role: string;
  year: string;
  tags: string[];
  /** Tools used, rendered as logos on the card. */
  tools?: ProjectTool[];
  /**
   * The product's own accent, as a hex string. Set it and the case-study page
   * runs in that colour instead of the site's: eyebrows, step numbers, links
   * and the live-site button all read the same token, so one value repaints the
   * page. The site chrome around it stays site-coloured on purpose — the brand
   * belongs to the project, not to the portfolio.
   */
  brand?: string;
  coverImage?: string;
  /**
   * How the cover fills its frame. `cover` (the default) suits a screenshot,
   * which can lose its edges without losing its point; `contain` suits a device
   * mockup or anything with a transparent margin, where a crop takes the
   * subject with it.
   */
  coverFit?: "cover" | "contain";
  /**
   * A silent loop to play instead of `coverImage`.
   *
   * Fills the card's cover frame, and the case-study hero too when the project
   * has no `coverImage` to put there. Export it at the card's own 16:10 so
   * nothing has to be cropped a second time, and pair it with `coverPoster`:
   * that still is what a reader on reduced motion, a refused autoplay, or the
   * moment before the file arrives actually sees.
   */
  coverVideo?: string;
  coverPoster?: string;
  /**
   * How the loop fills the card frame. Defaults to `cover`.
   *
   * Deliberately not `coverFit`, which describes `coverImage` and is read by
   * the case-study hero. The two answers differ for the same project: RiseAngle
   * wants `contain` for its portrait hero mockup and `cover` for a loop already
   * exported at 16:10, and one shared field cannot say both.
   *
   * Use `contain` for a capture of a wide desktop window — the whole window
   * stays visible and the card mattes it — and `cover` for a clip cut to the
   * card's own ratio.
   */
  coverVideoFit?: "cover" | "contain";
  liveUrl?: string;
  /**
   * Shows the card as a blurred placeholder with a "Coming soon" badge, and
   * stops it linking anywhere.
   *
   * For work that belongs on the page but is not written yet. It stays in
   * `projects` so the card, its cover and its position survive, but nothing
   * routes to it: no link on the tile, and the prev/next rotation on the other
   * case studies skips over it rather than sending a reader to a page that is
   * not ready.
   */
  comingSoon?: boolean;
  featured: boolean;
  // Optional structured case-study content — when present, the project page
  // renders the full hiring-manager-oriented layout (problem/approach/
  // results); otherwise it falls back to rendering `description` as prose.
  client?: string;
  duration?: string;
  snapshot?: ProjectSnapshot;
  baseline?: ProjectBaseline[];
  frictions?: ProjectFriction[];
  flowChange?: ProjectFlowChange;
  problem?: string;
  constraints?: string[];
  pullQuote?: string;
  approach?: ProjectApproachStep[];
  results?: ProjectResult[];
  /** Extra screens shown as a grid after the approach. */
  gallery?: string[];
  outcome?: string;
  /**
   * The strongest senior signal in a case study: a call you made that someone
   * pushed back on, and what happened next. Renders only when every field is
   * filled, so a half-written one stays off the page.
   */
  disagreement?: {
    decision: string;
    pushback: string;
    result: string;
  };
  learnings?: string[];
};

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  /**
   * Company mark, shown on the timeline in place of the plain dot marker.
   * Optional: a role without one keeps the dot, so the list never waits on an
   * asset to render.
   */
  logo?: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type SkillCategory = {
  name: string;
  skills: string[];
};

export type SocialPlatform =
  | "github"
  | "linkedin"
  | "x"
  | "behance"
  | "dribbble"
  | "email";

export type SocialLink = {
  label: string;
  handle: string;
  href: string;
  platform: SocialPlatform;
};

export type NavIcon = "star" | "person" | "grid" | "diamond";

export type NavLink = {
  label: string;
  href: string;
  icon: NavIcon;
};

export type Profile = {
  name: string;
  role: string;
  /** Hero line 1: role + level + domain. One line, four facts. */
  roleLine: string;
  /** Hero line 2: companies or scale — the "are you real?" answer. */
  proofLine: string;
  tagline: string;
  bio: string[];
  location: string;
  email: string;
  /** Path to the résumé PDF in `public/`. Rendered as a download link. */
  resume: string;
  availability: string;
  socials: SocialLink[];
  /**
   * The tools row under the hero, in the order they should read.
   *
   * A closed union rather than free strings: every entry has to have a mark in
   * `StackMarks` to render at all, and a typo would otherwise ship as a silent
   * hole in the row.
   */
  stack: StackTool[];
};

/**
 * Tools with a logo available to the stack row.
 *
 * Kept deliberately short. This row is a claim about what someone actually
 * works in, so it is worth less the longer it gets — a reviewer reads nine
 * marks as a stack and twenty as a word cloud.
 */
export type StackTool =
  | "figma"
  | "claude"
  | "chatgpt"
  | "framer"
  | "next"
  | "react"
  | "typescript"
  | "tailwind"
  | "gsap";

export type CaptionTone = "blush" | "orange" | "lime" | "periwinkle";

export type AboutPhoto = {
  /** `null` renders a placeholder tile at the real photo's size and angle. */
  src: string | null;
  alt: string;
  caption: string | null;
  captionTone: CaptionTone;
  captionSide: "left" | "right";
  /** Degrees of tilt; the collage reads as scattered rather than gridded. */
  rotate: number;
  /** Vertical stagger in px at the collage's base scale. */
  offsetY: number;
};

export type AboutContent = {
  eyebrow: string;
  /** Short bio under the headline; one entry per paragraph. */
  intro: string[];
  headline: {
    /** Rendered in the heavy grotesque, one entry per line. */
    lead: string[];
    /** Rendered in the serif italic. */
    accent: string;
  };
  photos: AboutPhoto[];
};

export type ToolIconName = "figma" | "claude" | "github" | "framer" | "notion";

/**
 * Tiles are one of two kinds. `icon` uses a real brand mark from Simple Icons;
 * `mono` is a lettermark tile, used for the brands whose logos Simple Icons
 * does not carry (Adobe pulled theirs over trademark policy, as did OpenAI).
 * Adobe's own app icons are lettermarks, so those read authentically.
 */
export type Tool =
  | { name: string; kind: "icon"; icon: ToolIconName; bg: string; fg: string }
  | { name: string; kind: "mono"; mono: string; bg: string; fg: string };

export type ToolsContent = {
  eyebrow: string;
  heading: string;
  /** Sits in the middle of the ring; one entry per line. */
  caption: string[];
  tools: Tool[];
};

/** One card on the "more work" shelf. */
export type MoreWorkItem = {
  title: string;
  /** Image path, or null to render a tinted gradient panel instead. */
  src: string | null;
  alt: string;
  /** Gradient stops for the placeholder panel — any two CSS colours. */
  tone: [string, string];
};

export type MoreWorkContent = {
  script: string;
  heading: string;
  intro: string;
  items: MoreWorkItem[];
};

/**
 * What a playground piece is, for the filter above the collage.
 *
 * A tile can carry more than one — a mark that animates is both branding and
 * motion — and the filter bar only offers tags that something on the page
 * actually has, so no tab can lead to an empty grid. Tags are also printed in
 * the corner of every card, which is the other reason to keep the set small:
 * a piece wearing four of them says nothing in either place.
 *
 * `AI` is the one tag that describes how a piece was made rather than what it
 * is, and it is here on purpose — generation is its own craft now, and the
 * work is worth grouping. It does invite the question of which pieces are not
 * AI, so it is worth only marking the ones that genuinely are.
 *
 * Most of this page moves, so `Motion` is deliberately not "anything that
 * moves" — it is motion design, meaning an interface or a mark animating.
 * Footage shot and cut is `Film`, a generated clip is `AI`, and a Blender
 * animation is `3D`. Each of those is a craft someone would filter for on its
 * own, and a clip carries the one it belongs to rather than two.
 *
 * That rule exists because the alternative was measured: tagging every moving
 * piece `Motion` put 10 of 18 tiles behind it, at which point the tab returned
 * most of the grid and told a reader nothing.
 */
export type PlaygroundTag =
  | "UI"
  | "Motion"
  | "Film"
  | "AI"
  | "3D"
  | "Branding"
  | "Graphic";

/**
 * One piece in the collage.
 *
 * There is no span and no fit, because the card is built at the piece's own
 * ratio: `w` and `h` are the file's real pixel dimensions, and the collage
 * reserves exactly that shape. Nothing is cropped to fit a cell and nothing is
 * letterboxed inside one, which is what the fixed-span grid had to choose
 * between every time a clip's aspect did not match a tile's.
 *
 * `w`/`h` must come from the file. They are the card's geometry, so a guess
 * shows up as a wrong-shaped hole while the media loads.
 */
export type CollageTile = {
  /** One or more, in the order they should be read. Printed in the corner. */
  tags: PlaygroundTag[];
  /** The piece's real pixel width and height. */
  w: number;
  h: number;
  /** A still. Omit when the piece is a `video`. */
  src?: string;
  alt: string;
  /** What the piece is, in two or three words. */
  label: string;
  /**
   * A silent loop, for the pieces that only make sense moving — an
   * interaction, a render, a bit of motion design. Wins over `src` when both
   * are set; pair it with `poster`, which is what a reader on reduced motion
   * and the moment before the file arrives actually see.
   */
  video?: string;
  poster?: string;
};

export type PlaygroundContent = {
  heading: { lead: string; accent: string; tail: string };
  collage: CollageTile[];
  /**
   * Copy for the stream band on the homepage, which shows the same `collage`
   * pieces. Kept separate from `heading` because the two say different things:
   * the page's headline explains what the playground is to someone who chose
   * to open it, while this has to earn the click from someone who did not.
   */
  teaser: { eyebrow: string; lead: string; accent: string; intro: string; cta: string };
  todo: { title: string; items: string[]; note: string };
};
