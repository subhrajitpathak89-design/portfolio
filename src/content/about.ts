import type { AboutContent } from "@/types";

export const about: AboutContent = {
  eyebrow: "about me",

  // The headline deliberately switches voice partway through: `lead` is set in
  // the heavy grotesque, `accent` in the serif italic.
  headline: {
    lead: ["product designer,", "2.9 years in."],
    accent: "b2b saas, ai and healthcare.",
  },

  // Written from the work in content/projects.ts, so every claim here traces
  // back to something real — but it is your story, so give it a read.
  // Four lines, in the order the checklist says reviewers read them: level and
  // domain, then where and what shipped, then what the work above proves. The
  // fourth line — what I want next, where I am, how to reach me — is rendered
  // by the section itself so the email can be a real mailto link.
  intro: [
    "Product designer, 2.9 years in, working across B2B SaaS, AI tools, CRM and healthcare — the kind of products where a workflow has eleven steps and nobody remembers why.",
    "What the work above proves: I read the analytics before touching a screen, I cut the eleven steps to four, and I write the decision down before anyone builds it.",
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
