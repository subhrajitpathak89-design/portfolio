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
export type ProjectShowcase = {
  label: string;
  caption?: string;
  media: string[];
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
  coverImage?: string;
  liveUrl?: string;
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

export type SocialPlatform = "github" | "linkedin" | "dribbble" | "email";

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
  availability: string;
  socials: SocialLink[];
};

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

/** One item peeking out of the bottom edge of a playground plate. */
export type FolderPeek = {
  /** Image path, or null to render an empty chip until the art lands. */
  src: string | null;
  alt: string;
  rotate: number;
  /** Width as a percentage of the plate, so peeks scale with the grid. */
  width: number;
};

export type PlaygroundFolder = {
  month: string;
  peeks: FolderPeek[];
};

export type PlaygroundContent = {
  heading: { lead: string; accent: string; tail: string };
  intro: string;
  folders: PlaygroundFolder[];
  todo: { title: string; items: string[]; note: string };
};
