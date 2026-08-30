import type { PlaygroundContent } from "@/types";

/**
 * Peeks render as empty chips until you give them a `src`. Drop images into
 * `public/images/v2/playground/` and set the paths; widths and angles stay put,
 * so nothing shifts when the art arrives.
 *
 * The colours that used to live here went with the scrapbook version — the
 * plates take their material from the v3 tokens now, so a month only has to
 * say what is in it.
 */
export const playground: PlaygroundContent = {
  heading: { lead: "Half a year,", accent: "tucked", tail: "into folders" },

  intro:
    "Offcuts, side quests and things that never became case studies. Month by month, roughly.",

  folders: [
    {
      month: "January",
      peeks: [
        { src: null, alt: "", rotate: -8, width: 34 },
        { src: null, alt: "", rotate: 5, width: 30 },
        { src: null, alt: "", rotate: -3, width: 26 },
      ],
    },
    {
      month: "February",
      peeks: [
        { src: null, alt: "", rotate: 7, width: 32 },
        { src: null, alt: "", rotate: -6, width: 28 },
        { src: null, alt: "", rotate: 2, width: 30 },
      ],
    },
    {
      month: "March",
      peeks: [
        { src: null, alt: "", rotate: -5, width: 30 },
        { src: null, alt: "", rotate: 6, width: 26 },
        { src: null, alt: "", rotate: -2, width: 24 },
      ],
    },
    {
      month: "April",
      peeks: [
        { src: null, alt: "", rotate: -7, width: 36 },
        { src: null, alt: "", rotate: 4, width: 26 },
        { src: null, alt: "", rotate: -2, width: 22 },
      ],
    },
    {
      month: "May",
      peeks: [
        { src: null, alt: "", rotate: 6, width: 30 },
        { src: null, alt: "", rotate: -5, width: 28 },
        { src: null, alt: "", rotate: 3, width: 30 },
      ],
    },
    {
      month: "June",
      peeks: [
        { src: null, alt: "", rotate: -6, width: 28 },
        { src: null, alt: "", rotate: 5, width: 30 },
        { src: null, alt: "", rotate: -2, width: 26 },
      ],
    },
  ],

  // Placeholder wording — these are meant to be your actual half-year.
  todo: {
    title: "To do list",
    items: [
      "Sharpen the personal brand until it stops needing a caption",
      "Turn two of these folders into proper case studies",
      "Keep the side quests weird",
    ],
    note: "(Mostly on track. The folders are winning.)",
  },
};
