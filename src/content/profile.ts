import type { Profile } from "@/types";

// Placeholder domain — replace with the real deployed URL before going live.
export const siteUrl = "https://example.com";

export const profile: Profile = {
  name: "Subhrajit",
  role: "Multidisciplinary Designer",
  tagline:
    "I design brands, interfaces and stories that stay legible at every scale — from a 16px icon to a billboard.",
  bio: [
    "Placeholder bio copy — replace with your own story in src/content/profile.ts. My journey into design started long before product design, spending years experimenting across different tools and disciplines before finding my focus.",
    "Today, I work on consumer and enterprise products, where I enjoy turning complex workflows into experiences that feel simple and intuitive. I'm particularly drawn to problems that sit at the intersection of user needs, business goals, and technical constraints.",
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
