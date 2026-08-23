import type { PlaygroundContent } from "@/types";

/**
 * Folder colours are scrapbook pastels rather than palette tokens — the point
 * is that no two folders match, which a token set would fight.
 *
 * Peeks render as tinted paper chips until you give them a `src`. Drop images
 * into `public/images/v2/playground/` and set the paths; sizes and angles stay
 * put, so nothing shifts.
 */
export const playground: PlaygroundContent = {
  /**
   * Full-page backdrop. Save the rolling-hills illustration here and it takes
   * over; until then a sky-to-grass gradient stands in, so the page reads as
   * intended rather than as a broken image.
   */
  background: "/images/v2/playground/hills.jpg",

  heading: { lead: "Half a year,", accent: "tucked", tail: "into folders" },

  intro:
    "Offcuts, side quests and things that never became case studies. Month by month, roughly.",

  folders: [
    {
      month: "January",
      front: "#F7C9D9",
      back: "#EFAEC4",
      peeks: [
        { src: null, alt: "", tone: "#E8E2D6", rotate: -8, width: 34 },
        { src: null, alt: "", tone: "#F5A65B", rotate: 5, width: 30 },
        { src: null, alt: "", tone: "#3C3C3C", rotate: -3, width: 26 },
      ],
    },
    {
      month: "February",
      front: "#A9C6B4",
      back: "#8FB39F",
      peeks: [
        { src: null, alt: "", tone: "#F2D3E4", rotate: 7, width: 32 },
        { src: null, alt: "", tone: "#2F855A", rotate: -6, width: 28 },
        { src: null, alt: "", tone: "#EFEAE0", rotate: 2, width: 30 },
      ],
    },
    {
      month: "March",
      front: "#F5CB98",
      back: "#EFA765",
      peeks: [
        { src: null, alt: "", tone: "#3F7D5A", rotate: -5, width: 30 },
        { src: null, alt: "", tone: "#E8EDF2", rotate: 6, width: 26 },
        { src: null, alt: "", tone: "#D94F4F", rotate: -2, width: 24 },
      ],
    },
    {
      month: "April",
      front: "#F0D77E",
      back: "#E8C24F",
      peeks: [
        { src: null, alt: "", tone: "#EFEAE0", rotate: -7, width: 36 },
        { src: null, alt: "", tone: "#6B7C93", rotate: 4, width: 26 },
        { src: null, alt: "", tone: "#F5A65B", rotate: -2, width: 22 },
      ],
    },
    {
      month: "May",
      front: "#EFB2E8",
      back: "#E68FDC",
      peeks: [
        { src: null, alt: "", tone: "#2B2B2B", rotate: 6, width: 30 },
        { src: null, alt: "", tone: "#5B4BE0", rotate: -5, width: 28 },
        { src: null, alt: "", tone: "#8FB39F", rotate: 3, width: 30 },
      ],
    },
    {
      month: "June",
      front: "#A8D3EF",
      back: "#7FBEE6",
      peeks: [
        { src: null, alt: "", tone: "#3C3C3C", rotate: -6, width: 28 },
        { src: null, alt: "", tone: "#0A66C2", rotate: 5, width: 30 },
        { src: null, alt: "", tone: "#B57BE0", rotate: -2, width: 26 },
      ],
    },
  ],

  // Placeholder wording — these are meant to be your actual half-year.
  todo: {
    title: "To do list :",
    items: [
      "Sharpen the personal brand until it stops needing a caption",
      "Turn two of these folders into proper case studies",
      "Keep the side quests weird",
    ],
    note: "(Mostly on track. The folders are winning.)",
  },
};
