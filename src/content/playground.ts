import type { PlaygroundContent } from "@/types";

/**
 * The playground collage.
 *
 * Every tile carries the piece's own pixel dimensions, and the card is built
 * at that exact ratio — so nothing is cropped and nothing is letterboxed. That
 * replaced a fixed four-span grid, where the tile's aspect moved with the
 * viewport while the media's did not, and every mismatch had to be paid for in
 * one or the other.
 *
 * Add a piece by dropping the file into `public/images/v3/playground/` and
 * giving it `w`/`h` from the file itself — `ffprobe` for a clip, any image
 * tool for a still. Get them wrong and the card reserves the wrong shape.
 */
export const playground: PlaygroundContent = {
  heading: { lead: "Things that", accent: "never", tail: "became case studies" },

  /*
   * Order here is column balance, not reading order.
   *
   * The collage flows into columns, and a sequential balancer can only break
   * between cards — so the way to get columns that end level is to sequence the
   * list such that each consecutive third sums to the same height. A card's
   * height at a fixed column width is just `h / w`, and these three groups come
   * to 4.49, 4.49 and 4.59 of it: the tall portraits lead each group and the
   * 16:9 clips fill in behind them.
   *
   * Two consequences worth knowing before reordering. Moving one card changes
   * where every later column breaks, so re-run the sums rather than eyeballing
   * it. And the groups only line up at three columns — at two the browser finds
   * its own break, which it is better at when it has more cards to work with.
   *
   * The five labelled placeholders that used to sit in here are gone. A dashed
   * frame is a promise, and sixteen tiles of real work do not need five of them
   * propping the composition up.
   */
  collage: [
    // Column one: one tall board, then progressively shorter cards.
    {
      tags: ["Branding"],
      w: 440,
      h: 735,
      src: "/images/v3/playground/samosa.ccf20ddc.webp",
      alt: "Samosa Company packaging: a teal mailer box on magenta, with mushroom and pasta samosa flavour cards",
      label: "Samosa packaging",
    },
    {
      tags: ["UI", "Motion"],
      w: 736,
      h: 636,
      alt: "A wallet interface revealing and masking its balance",
      label: "Balance toggle",
      video: "/images/v3/playground/wallet.f1afbc68.mp4",
      poster: "/images/v3/playground/wallet-poster.608dfb51.webp",
    },
    {
      tags: ["Branding"],
      w: 600,
      h: 774,
      src: "/images/v3/playground/blend-in-use.aaac8267.webp",
      alt: "Blend brand in use: a bagged-coffee billboard, a tote on a blue sofa, a cup on green, and café signage",
      label: "Blend in use",
    },
    {
      tags: ["Branding"],
      w: 600,
      h: 401,
      src: "/images/v3/playground/blend-logos.915ebac4.webp",
      alt: "Six Blend Premium Coffee logo lockups, alternating cream and near-black",
      label: "Blend logo system",
    },

    // Column two: the tallest piece on the page, then the wide clips.
    {
      tags: ["Branding", "Motion"],
      w: 432,
      h: 822,
      alt: "A finger tapping the Wizlo mark, which lights up and radiates",
      label: "Wizlo mark",
      video: "/images/v3/playground/wizlo-mark.056f393c.mp4",
      poster: "/images/v3/playground/wizlo-mark-poster.bdfd5f84.webp",
    },
    {
      tags: ["Branding", "Motion"],
      w: 880,
      h: 524,
      alt: "A face wash pump bottle in deep green, assembling over an outlined “Face wash” wordmark",
      label: "Face wash",
      video: "/images/v3/playground/face-wash.518f7fad.mp4",
      poster: "/images/v3/playground/face-wash-poster.9a9e49a3.webp",
    },
    {
      tags: ["AI"],
      w: 960,
      h: 540,
      alt: "An exploded Nokia 3310 reassembling itself, lit cinematically",
      label: "Product teardown",
      video: "/images/v3/playground/teardown.e315a9b4.mp4",
      poster: "/images/v3/playground/teardown-poster.c1ca5911.webp",
    },
    {
      tags: ["UI", "Motion"],
      w: 880,
      h: 434,
      alt: "A journalling app on iPhone: the mood ring filling to 2 of 4 entries, with app icon variants beside it",
      label: "Journal app",
      video: "/images/v3/playground/journal.d7d32535.mp4",
      poster: "/images/v3/playground/journal-poster.aacbc440.webp",
    },
    {
      tags: ["3D"],
      w: 720,
      h: 304,
      alt: "A Kinetic Rush challenge entry: a figure running through burning apocalyptic ruins, side on",
      label: "Kinetic Rush entry",
      video: "/images/v3/playground/kinetic-rush.ecafc887.mp4",
      poster: "/images/v3/playground/kinetic-rush-poster.adccf78d.webp",
    },
    {
      tags: ["AI"],
      w: 880,
      h: 454,
      alt: "A drinks can on forest moss, daisies and light catching the label",
      label: "Product render",
      video: "/images/v3/playground/render.7a598bbf.mp4",
      poster: "/images/v3/playground/render-poster.64123940.webp",
    },

    // Column three: the portrait comparison, then the 16:9 film and renders.
    {
      tags: ["3D"],
      w: 448,
      h: 796,
      alt: "A Blender viewport beside its final render: a wireframe car becoming a lit shot at sunset",
      label: "Viewport vs render",
      video: "/images/v3/playground/viewport.77ab8308.mp4",
      poster: "/images/v3/playground/viewport-poster.41a3218a.webp",
    },
    {
      tags: ["Film"],
      w: 640,
      h: 360,
      alt: "Slow Goan Life: a cinematic vlog, from a morning window to the coast in monsoon",
      label: "Slow Goan Life",
      video: "/images/v3/playground/goan-life.9012a307.mp4",
      poster: "/images/v3/playground/goan-life-poster.1b147952.webp",
    },
    {
      tags: ["Film"],
      w: 640,
      h: 360,
      alt: "Goa: a cinematic vlog, cut from an airport apron to Panjim streets and the shoreline",
      label: "Goa vlog",
      video: "/images/v3/playground/goa-vlog.999e57a2.mp4",
      poster: "/images/v3/playground/goa-vlog-poster.ecfb2ee0.webp",
    },
    {
      tags: ["3D"],
      w: 720,
      h: 406,
      alt: "A Blender product animation for wireless headphones, turning through lit studio scenes",
      label: "Headphones in Blender",
      video: "/images/v3/playground/headphones.569400d5.mp4",
      poster: "/images/v3/playground/headphones-poster.508d54b5.webp",
    },
    {
      tags: ["3D"],
      w: 720,
      h: 406,
      alt: "A Blender render of a Shelby Mustang, turning in studio grey then driving a desert road at dusk",
      label: "Mustang render",
      video: "/images/v3/playground/mustang.4273a853.mp4",
      poster: "/images/v3/playground/mustang-poster.b2ac85e1.webp",
    },
    {
      tags: ["3D"],
      w: 720,
      h: 406,
      alt: "A Blender render of the Batmobile",
      label: "Batman render",
      video: "/images/v3/playground/batman.3fb5e7d1.mp4",
      poster: "/images/v3/playground/batman-poster.a8aca563.webp",
    },
  ],

  // Names the crafts rather than the count: on the homepage this sits under a
  // section about the day job, so its job is to say the side of the work the
  // case studies never show.
  teaser: {
    eyebrow: "Playground",
    lead: "Renders, film and packaging —",
    accent: "the other half.",
    intro:
      "Blender and Cinema 4D, two cinematic edits, a coffee brand, and interface motion that never had a brief.",
    cta: "Open the playground",
  },

  // Placeholder wording — these are meant to be yours.
  todo: {
    title: "To do list",
    items: [
      "Sharpen the personal brand until it stops needing a caption",
      "Turn two of these into proper case studies",
      "Keep the side quests weird",
    ],
    note: "(Mostly on track. The side quests are winning.)",
  },
};
