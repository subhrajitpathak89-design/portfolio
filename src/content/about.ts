import type { AboutContent } from "@/types";

export const about: AboutContent = {
  eyebrow: "about me",

  // The headline deliberately switches voice partway through: `lead` is set in
  // the heavy grotesque, `accent` in the serif italic.
  //
  // Written as one sentence about the career rather than three facts about the
  // CV. It used to read "product designer, / 2.9 years in. / b2b saas, ai and
  // healthcare." — a job title, a number and a domain list, all three of which
  // are already stated in the intro below, the hero above and the footer. This
  // says what the years were actually spent doing, and lands on the line the
  // work keeps proving.
  headline: {
    lead: ["three years of", "eleven-step workflows"],
    accent: "turned into four.",
  },

  // Written from the work in content/projects.ts, so every claim here traces
  // back to something real — but it is your story, so give it a read.
  // Four lines, in the order the checklist says reviewers read them: level and
  // domain, then where and what shipped, then what the work above proves. The
  // fourth line — what I want next, where I am, how to reach me — is rendered
  // by the section itself so the email can be a real mailto link.
  // The headline now owns the eleven-into-four line, so these two do not repeat
  // it — it was landing three times in one section, which made the strongest
  // thing here sound like a tic. These carry the facts the headline dropped
  // (title, tenure, domains) and the proofs that are not about step counts.
  intro: [
    "Product designer, 2.9 years in, working across B2B SaaS, AI tools, CRM and healthcare — the kind of products where the workflow grew by accident and nobody remembers why.",
    "What the work above proves: I read the analytics before touching a screen, I fix the structure before the surface, and I write the decision down before anyone builds it.",
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
