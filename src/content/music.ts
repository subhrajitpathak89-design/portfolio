export const music = {
  label: "Now Playing…",
  title: "Studio Playlist",

  /**
   * Path to an audio file under `public/`, e.g. "/audio/studio-playlist.mp3".
   *
   * Left null until a track is added: the player renders in full but its
   * control is disabled, because a record that spins with no sound would be
   * pretending to play. Set this and playback, the spin and the tonearm all
   * come to life with no other change.
   */
  src: null as string | null,
};
