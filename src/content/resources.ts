/**
 * Resources page content. Every link here is a real, public resource.
 * `thumb` picks the coded thumbnail drawn on the resources page.
 */
export type ResourceItem = { title: string; note: string; href: string };
export type ResourceCard = ResourceItem & {
  tag: string;
  thumb: "reactbits" | "refero" | "mobbin" | "lawsofux" | "shadcn" | "magicui" | "v0" | "godly";
};
export type ResourceGroup = { heading: string; items: ResourceItem[] };

export const resourceCards: ResourceCard[] = [
  { title: "React Bits", tag: "Components", thumb: "reactbits", href: "https://reactbits.dev", note: "Animated text, backgrounds and interactions you can paste into a React project." },
  { title: "Refero", tag: "References", thumb: "refero", href: "https://refero.design", note: "Searchable screens and flows from real web and mobile products." },
  { title: "Mobbin", tag: "Patterns", thumb: "mobbin", href: "https://mobbin.com", note: "Real-app pattern library I check before designing a flow." },
  { title: "v0", tag: "Vibe coding", thumb: "v0", href: "https://v0.dev", note: "Describe a UI, get working React. Great for turning a sketch into a prototype." },
];

/** Keys into the icon map on the resources page. */
export const favouriteTools = ["figma", "framer", "claude", "chatgpt", "notion", "blender"]  as const;

export const resourceGroups: ResourceGroup[] = [
  {
    heading: "Vibe coding",
    items: [
      { title: "Claude Code", note: "My pair programmer. This whole site was built with it.", href: "https://www.claude.com/product/claude-code" },
      { title: "Cursor", note: "AI-first code editor for going from design to code.", href: "https://cursor.com" },
      { title: "Lovable", note: "Prompt a full-stack app into existence, then refine it.", href: "https://lovable.dev" },
      { title: "Bolt", note: "Spin up and deploy web apps straight from the browser.", href: "https://bolt.new" },
      { title: "21st.dev", note: "Community React components, ready to drop into AI-built apps.", href: "https://21st.dev" },
      { title: "Aceternity UI", note: "Flashy Tailwind + Motion components for hero sections.", href: "https://ui.aceternity.com" },
      { title: "shadcn/ui", note: "Accessible, copy-in components. The default kit for vibe-coded apps.", href: "https://ui.shadcn.com" },
      { title: "Magic UI", note: "Motion-heavy landing page sections built on Tailwind and Motion.", href: "https://magicui.design" },
    ],
  },
  {
    heading: "Design tools",
    items: [
      { title: "Figma", note: "Where every screen on this site started.", href: "https://www.figma.com" },
      { title: "Framer", note: "Quick interactive prototypes and landing pages.", href: "https://www.framer.com" },
      { title: "Spline", note: "Lightweight 3D for the web, no Blender needed.", href: "https://spline.design" },
      { title: "Rive", note: "Interactive, state-driven animations for product UI.", href: "https://rive.app" },
    ],
  },
  {
    heading: "Inspiration",
    items: [
      { title: "Godly", note: "A gallery of the most striking websites on the internet.", href: "https://godly.website" },
      { title: "Laws of UX", note: "The psychology behind good interfaces, one law at a time.", href: "https://lawsofux.com" },
      { title: "Land-book", note: "Landing page gallery, sorted by industry and style.", href: "https://land-book.com" },
      { title: "Page Flows", note: "Recorded user flows from real products.", href: "https://pageflows.com" },
      { title: "Awwwards", note: "Award-winning web design and creative development.", href: "https://www.awwwards.com" },
    ],
  },
  {
    heading: "AI in my workflow",
    items: [
      { title: "Claude", note: "Writing, research synthesis and building this site.", href: "https://claude.ai" },
      { title: "ChatGPT", note: "Quick ideation and copy variations.", href: "https://chatgpt.com" },
    ],
  },
  {
    heading: "Books",
    items: [
      { title: "The Design of Everyday Things", note: "Don Norman. Still the foundation.", href: "https://www.goodreads.com/book/show/840.The_Design_of_Everyday_Things" },
      { title: "Don't Make Me Think", note: "Steve Krug. Usability, in an afternoon.", href: "https://sensible.com/dont-make-me-think/" },
      { title: "Refactoring UI", note: "Adam Wathan & Steve Schoger. Practical visual design.", href: "https://www.refactoringui.com" },
    ],
  },
];
