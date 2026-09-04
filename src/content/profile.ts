import type { Profile } from "@/types";

// Drives metadataBase, so it sets every canonical URL, OpenGraph link and
// sitemap entry. Point it at a custom domain when there is one.
export const siteUrl = "https://portfolio-teal-seven-7vraz065mz.vercel.app";

export const profile: Profile = {
  name: "Subhrajit Pathak",
  // The label a reviewer matches against the req, in the words reqs use.
  role: "Product Designer",
  // `roleLine` and `proofLine` are the hero's two lines of text. Between them
  // they answer the only two questions asked in the first three seconds:
  // "what are you?" and "are you real?" Keep both to one line.
  roleLine: "Product Designer · 2.9 yrs · B2B SaaS, AI & healthcare",
  proofLine:
    "Techdome and Calypsu. Shipped an EMR, a funding CRM and a design system running across 3+ live products.",
  tagline:
    "Product designer working on B2B SaaS, AI and healthcare tools — turning eleven-step workflows into four.",
  bio: [
    "I'm a product designer 2.9 years into the work, currently at Techdome in Hyderabad, where I own end-to-end UX across AI tools, B2B SaaS, CRM and consumer products.",
    "Before that I was at Calypsu Design Studio in Delhi, designing across fintech, AI and ed-tech. The through-line since: messy workflows with real constraints, and the unglamorous half of the job — reading the analytics before touching a screen, then arguing about the one decision that moves a number.",
  ],
  location: "Hyderabad, India",
  email: "subhrajitpathak89@gmail.com",
  /**
   * The PDF in `public/`. Named for a human rather than hashed, because this
   * is a file people save to a desktop and mail on — `resume.pdf` in a
   * downloads folder is nobody's, and a hash in the filename would follow it
   * around forever.
   *
   * Replacing it means overwriting that file, so it is served with a bounded
   * cache rather than an immutable one (see `next.config.ts`).
   */
  resume: "/Subhrajit-Pathak-Product-Designer-Resume.pdf",
  availability: "Open to product design roles and select freelance",
  // The hero's tools row. Seeded with what this repo can actually stand
  // behind: the three that appear on the case studies, and the six this site
  // is built in. Edit the list to match the real stack — it is a claim a
  // reviewer may well ask about, so anything aspirational should come out.
  // Order is reading order; add a mark to `StackMarks` before adding a name.
  stack: [
    "figma",
    "framer",
    "claude",
    "chatgpt",
    "next",
    "react",
    "typescript",
    "tailwind",
    "gsap",
  ],
  // Only entries with a real `href` render. Paste a URL in and the icon
  // appears; leaving one blank hides it rather than shipping a dead link.
  socials: [
    {
      label: "LinkedIn",
      handle: "subhrajit-pathak",
      href: "https://www.linkedin.com/in/subhrajit-pathak-8127aa230/",
      platform: "linkedin",
    },
    {
      label: "X",
      handle: "Subhrajit_UX",
      href: "https://x.com/Subhrajit_UX",
      platform: "x",
    },
    {
      label: "GitHub",
      handle: "Subhrajittechdome",
      href: "https://github.com/Subhrajittechdome",
      platform: "github",
    },
    // The 3D work lives here rather than on this site: the playground carries
    // one Blender animation, and the gallery is the rest of it.
    {
      label: "Behance",
      handle: "subhrajitpathak",
      href: "https://www.behance.net/subhrajitpathak",
      platform: "behance",
    },
    {
      label: "Dribbble",
      handle: "",
      href: "",
      platform: "dribbble",
    },
  ],
};
