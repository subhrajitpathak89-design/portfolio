export type ProjectResult = {
  metric: string;
  label: string;
};

export type ProjectApproachStep = {
  title: string;
  body: string;
  /** Screen from the work itself; falls back to a placeholder frame when unset. */
  image?: string;
};

/**
 * Backdrop family behind a project's screenshots. Each was picked to sit under
 * that project's own UI chrome, sampled from the images rather than guessed:
 * RiseAngle's app is dark slate, Wizlo's is violet, Saral's is a light
 * grey-teal, Mythic's is navy.
 */
export type ProjectTone = "slate" | "violet" | "mist" | "navy";

export type Project = {
  slug: string;
  tone?: ProjectTone;
  title: string;
  category: string;
  summary: string;
  description: string[];
  role: string;
  year: string;
  tags: string[];
  coverImage?: string;
  liveUrl?: string;
  featured: boolean;
  // Optional structured case-study content — when present, the project page
  // renders the full hiring-manager-oriented layout (problem/approach/
  // results); otherwise it falls back to rendering `description` as prose.
  client?: string;
  duration?: string;
  problem?: string;
  constraints?: string[];
  pullQuote?: string;
  approach?: ProjectApproachStep[];
  results?: ProjectResult[];
  outcome?: string;
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

/** One item peeking out of the top of a playground folder. */
export type FolderPeek = {
  /** Image path, or null to render a tinted paper chip instead. */
  src: string | null;
  alt: string;
  /** Any CSS colour — these are scrapbook offcuts, not palette roles. */
  tone: string;
  rotate: number;
  /** Width as a percentage of the folder, so peeks scale with the grid. */
  width: number;
};

export type PlaygroundFolder = {
  month: string;
  /** Front flap, and the darker body behind it. */
  front: string;
  back: string;
  peeks: FolderPeek[];
};

export type PlaygroundContent = {
  /** Path to the full-page backdrop image. */
  background: string;
  heading: { lead: string; accent: string; tail: string };
  intro: string;
  folders: PlaygroundFolder[];
  todo: { title: string; items: string[]; note: string };
};
