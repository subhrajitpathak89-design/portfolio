export const music = {
  label: "Now Playing…",
  title: "Studio Loop",

  /**
   * An original 12.8s lo-fi loop (Am7–Fmaj7–Cmaj7–G6/9), synthesised for this
   * site rather than sourced, so there is nothing to license. It starts and
   * ends on silence, which is what lets it loop without an audible seam.
   *
   * Swap in your own track by dropping a file in `public/audio/` and pointing
   * this at it.
   */
  src: "/audio/studio-loop.mp3" as string | null,
};
