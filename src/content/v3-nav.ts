/**
 * The v3 navigation, read by both the navbar and the footer.
 *
 * Separate from `nav.ts`, which is v2's list — it carries icon keys the v3
 * chrome has no use for, and its labels drifted ("Case Study" against the
 * navbar's "Work"), so the footer and the header disagreed with each other on
 * the same page.
 */
export type V3NavLink = { label: string; href: string };

export const v3NavLinks: V3NavLink[] = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Playground", href: "/playground" },
];
