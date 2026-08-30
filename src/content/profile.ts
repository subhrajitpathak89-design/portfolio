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
  availability: "Open to product design roles and select freelance",
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
      label: "GitHub",
      handle: "Subhrajittechdome",
      href: "https://github.com/Subhrajittechdome",
      platform: "github",
    },
    {
      label: "Dribbble",
      handle: "",
      href: "",
      platform: "dribbble",
    },
  ],
};
