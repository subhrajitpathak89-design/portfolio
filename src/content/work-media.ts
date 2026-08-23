/**
 * Intrinsic pixel dimensions of every case-study asset, generated from the
 * files themselves.
 *
 * Frames read these so each asset keeps its own aspect ratio. Forcing one fixed
 * ratio instead left portrait phone captures letterboxed inside a landscape
 * box — which is exactly what made them look like they were floating.
 */
export const workMedia: Record<string, { width: number; height: number }> = {
  "/images/v2/work/mythic-cover.webp": { width: 1600, height: 1250 },
  "/images/v2/work/nivex-01.webp": { width: 1400, height: 876 },
  "/images/v2/work/nivex-02.webp": { width: 1400, height: 876 },
  "/images/v2/work/nivex-03.webp": { width: 1400, height: 876 },
  "/images/v2/work/nivex-04.webp": { width: 1400, height: 876 },
  "/images/v2/work/nivex-cover.webp": { width: 1600, height: 1000 },
  "/images/v2/work/riseangle-01.webp": { width: 1200, height: 900 },
  "/images/v2/work/riseangle-02.webp": { width: 1200, height: 960 },
  "/images/v2/work/riseangle-03.webp": { width: 1200, height: 860 },
  "/images/v2/work/riseangle-04.webp": { width: 1200, height: 918 },
  "/images/v2/work/riseangle-cover.webp": { width: 1600, height: 1006 },
  "/images/v2/work/saral-01.webp": { width: 1200, height: 900 },
  "/images/v2/work/saral-02.webp": { width: 1200, height: 900 },
  "/images/v2/work/saral-03.webp": { width: 1200, height: 900 },
  "/images/v2/work/saral-04.webp": { width: 1200, height: 900 },
  "/images/v2/work/saral-cover.webp": { width: 1600, height: 1248 },
  "/images/v2/work/wizlo-01.webp": { width: 1200, height: 900 },
  "/images/v2/work/wizlo-03.webp": { width: 1200, height: 706 },
  "/images/v2/work/wizlo-04.webp": { width: 1200, height: 900 },
  "/images/v2/work/wizlo-cover.webp": { width: 1600, height: 1200 },
  "/media/work/riseangle-desktop.mp4": { width: 680, height: 324 },
  "/media/work/riseangle-mobile-library.mp4": { width: 326, height: 680 },
  "/media/work/riseangle-mobile-preset.mp4": { width: 326, height: 680 },
  "/media/work/riseangle-mobile-welcome.mp4": { width: 326, height: 680 },
};
