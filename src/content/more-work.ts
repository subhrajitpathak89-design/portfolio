import type { MoreWorkContent } from "@/types";

/**
 * The shelf of side quests under the case studies.
 *
 * Every card is `src: null` for now, which renders a tinted gradient panel
 * instead of a broken image — the same placeholder convention the playground
 * folders use. Drop stills into `public/images/v2/more-work/` and set `src`;
 * nothing else has to change, because the card sizes itself.
 *
 * `tone` is a free-form gradient pair rather than a palette token on purpose:
 * these are scrapbook offcuts and the row reads better when no two match.
 */
export const moreWork: MoreWorkContent = {
  script: "(off the clock)",
  heading: "more work",
  intro:
    "Offcuts, side quests and experiments that never grew into case studies.",

  items: [
    {
      title: "Website sections for a single-link landing page",
      src: null,
      alt: "",
      tone: ["#5AB6F0", "#F0A0D8"],
    },
    {
      title: "District Collectibles ticketing concept",
      src: null,
      alt: "",
      tone: ["#F7D046", "#EF7A3D"],
    },
    {
      title: "Diwali interaction study",
      src: null,
      alt: "",
      tone: ["#2B2B3C", "#7A4BE0"],
    },
    {
      title: "Laku Cafe storefront identity",
      src: null,
      alt: "",
      tone: ["#3F7D5A", "#1F2E28"],
    },
    {
      title: "Built a fully functional portfolio in a weekend",
      src: null,
      alt: "",
      tone: ["#4F5FD6", "#171B33"],
    },
    {
      title: "Illustrative badges that scale to 16px",
      src: null,
      alt: "",
      tone: ["#E8C24F", "#8A6A1F"],
    },
  ],
};
