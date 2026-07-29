import type { Profile } from "@/types";

// Placeholder domain — replace with the real deployed URL before going live.
export const siteUrl = "https://example.com";

export const profile: Profile = {
  name: "Alex Rivera",
  role: "Multidisciplinary Designer",
  tagline:
    "I design brands, interfaces and stories that stay legible at every scale — from a 16px icon to a billboard.",
  bio: [
    "Alex Rivera is a placeholder designer working across product design, brand identity, motion and editorial. This bio is sample copy: replace it with your own story in src/content/profile.ts.",
    "The work below spans mobile products, identity systems, motion reels, marketing sites and print — the kind of range a mixed-discipline portfolio is meant to show. Every case study on this site is placeholder content.",
    "When not pushing pixels, this placeholder person collects type specimens, rides slow bicycles and over-documents their process.",
  ],
  location: "Lisbon, Portugal (placeholder)",
  email: "hello@example.com",
  availability: "Available for select freelance work",
  socials: [
    {
      label: "GitHub",
      handle: "@placeholder-handle",
      href: "#",
      platform: "github",
    },
    {
      label: "LinkedIn",
      handle: "in/placeholder-handle",
      href: "#",
      platform: "linkedin",
    },
    {
      label: "Dribbble",
      handle: "@placeholder-handle",
      href: "#",
      platform: "dribbble",
    },
  ],
};
