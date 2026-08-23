import type { AboutContent } from "@/types";

export const about: AboutContent = {
  eyebrow: "about me",

  // The headline deliberately switches voice partway through: `lead` is set in
  // the heavy grotesque, `accent` in the serif italic.
  headline: {
    lead: ["designing things people", "actually use."],
    accent: "from 16px icons to billboards.",
  },

  // Written from the work in content/projects.ts, so every claim here traces
  // back to something real — but it is your story, so give it a read.
  intro: [
    "I'm a product designer who likes the unglamorous half of the job: reading the analytics before touching a screen, cutting an eleven-step flow down to four, and arguing about the one decision that actually moves a number.",
    "Most of my work lives where messy workflows meet real constraints — an AI video platform, a patient portal, a funding CRM, a gaming marketplace. Different industries, same problem: make the complicated thing feel obvious.",
  ],

  // Drop your own images into `public/images/v2/about/` and set `src` to the
  // path. Any card left with `src: null` renders as a placeholder tile at the
  // exact size and angle the real photo will occupy, so swapping one in is a
  // one-line change with no layout shift.
  //
  // Captions are placeholders in my words, not yours — rewrite them.
  photos: [
    {
      src: null,
      alt: "",
      caption: "pixels with a purpose",
      captionTone: "blush",
      captionSide: "right",
      rotate: -4,
      offsetY: 0,
    },
    {
      src: null,
      alt: "",
      caption: "shipping beats polishing",
      captionTone: "orange",
      captionSide: "right",
      rotate: 3,
      offsetY: 44,
    },
    {
      src: null,
      alt: "",
      caption: null,
      captionTone: "lime",
      captionSide: "left",
      rotate: -2,
      offsetY: -18,
    },
    {
      src: null,
      alt: "",
      caption: "curiosity = my day job",
      captionTone: "lime",
      captionSide: "right",
      rotate: 2,
      offsetY: 30,
    },
  ],
};
