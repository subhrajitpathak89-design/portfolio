/**
 * The photo gallery on the homepage.
 *
 * To add a real photo, drop it into `public/images/v3/gallery/` and set `src`
 * on the entry. Entries without a `src` render as placeholders, so the
 * section can ship before the photos do. Photos are shown at 16:9 and cropped
 * to fill, so landscape shots work best.
 */
export type GalleryPhoto = {
  /** Path under `public/`. Leave unset to show a placeholder. */
  src?: string;
  /** What the photo shows, for screen readers. */
  alt: string;
  /** The big title set over the bottom-left of the photo. */
  caption: string;
  /** One short line under the title. */
  note?: string;
};

export const gallery = {
  heading: "Photo gallery",
  subheading: "A few favourites from the camera roll",
  photos: [
    {
      src: "/images/v3/gallery/laxmi-home-stay.jpg",
      alt: "A smiling woman in an orange headscarf leans out of the doorway of a turquoise-painted hill homestay, its walls hand-lettered with Welcome, Momo, Chowmein and Coffee",
      caption: "Laxmi Home Stay",
      note: "Hand-painted walls, momos on the menu and a welcome at the door.",
    },
    {
      src: "/images/v3/gallery/prayer-flags-river.jpg",
      alt: "Sitting on a stone ledge above a rushing river, prayer flags strung across an iron bridge behind",
      caption: "Prayer flags by the river",
      note: "Flags strung over the bridge, the river loud underneath.",
    },
    {
      src: "/images/v3/gallery/mountain-road.jpg",
      alt: "A winding mountain road past deodar trees, a parked motorbike by the barrier and a snow peak ahead",
      caption: "Mountain road",
      note: "One road, pine on both sides, a snow peak at the end of it.",
    },
    {
      src: "/images/v3/gallery/pine-valley.jpg",
      alt: "A deep valley thick with pine forest, autumn yellows along the river and snow on the ridges beyond",
      caption: "Pine valley",
      note: "Forest all the way down, the first yellow of autumn by the water.",
    },
    {
      src: "/images/v3/gallery/village-procession.jpg",
      alt: "A village procession carrying a silver palanquin draped in red and marigolds, with snow peaks behind",
      caption: "Village procession",
      note: "Marigolds, red cloth and a silver palanquin heading out.",
    },
    {
      src: "/images/v3/gallery/bridge-at-dusk.jpg",
      alt: "A suspension bridge in silhouette at dusk, prayer flags along its rail and a snowy peak under the clouds",
      caption: "Bridge at dusk",
      note: "Last light on the snow while the bridge goes dark.",
    },
  ] satisfies GalleryPhoto[],
};
