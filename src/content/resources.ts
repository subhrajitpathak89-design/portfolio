/**
 * Resources page content.
 *
 * PLACEHOLDERS: every entry marked `draft: true` is a stand-in so the layout
 * has something to hold. Replace it with real things you make or use (or
 * delete it) before shipping. Entries with an empty `href` render as plain
 * text rather than dead links.
 */
export type ResourceItem = { title: string; note: string; href: string; draft?: boolean };
export type ResourceGroup = { heading: string; items: ResourceItem[] };

export const resourceCards: ResourceItem[] = [
  { title: "Design system starter", note: "Tokens, components and docs structure I start every system from.", href: "", draft: true },
  { title: "UX audit checklist", note: "The checklist I run before redesigning anything.", href: "", draft: true },
  { title: "Case study template", note: "How I structure a case study so a reviewer gets it in 60 seconds.", href: "", draft: true },
  { title: "B2B onboarding patterns", note: "A swipe file of onboarding flows from SaaS tools.", href: "", draft: true },
];

/** Keys into the icon map on the resources page. */
export const favouriteTools = ["figma", "framer", "claude", "chatgpt", "notion", "blender", "nextjs", "tailwind"] as const;

export const resourceGroups: ResourceGroup[] = [
  {
    heading: "Design tools",
    items: [
      { title: "Figma", note: "Where every screen on this site started.", href: "https://www.figma.com" },
      { title: "Framer", note: "Quick interactive prototypes and landing pages.", href: "https://www.framer.com" },
      { title: "Mobbin", note: "Real-app pattern library I check before designing a flow.", href: "https://mobbin.com", draft: true },
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
      { title: "The Design of Everyday Things", note: "Don Norman. Still the foundation.", href: "", draft: true },
      { title: "Don't Make Me Think", note: "Steve Krug. Usability, in an afternoon.", href: "", draft: true },
      { title: "Refactoring UI", note: "Adam Wathan & Steve Schoger. Practical visual design.", href: "", draft: true },
    ],
  },
];
