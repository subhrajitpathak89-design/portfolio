/**
 * Intrinsic pixel dimensions of every case-study asset, generated from the
 * files themselves.
 *
 * Frames read these so each asset keeps its own aspect ratio. Forcing one fixed
 * ratio instead left portrait phone captures letterboxed inside a landscape
 * box — which is exactly what made them look like they were floating.
 */
export const workMedia: Record<string, { width: number; height: number }> = {
  // Refill from the new case-study assets once they land.
};
