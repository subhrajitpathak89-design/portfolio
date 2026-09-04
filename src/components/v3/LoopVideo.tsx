"use client";

import { useEffect, useRef } from "react";

/**
 * A silent looping capture.
 *
 * Autoplay is set from script rather than from the `autoPlay` attribute, so
 * there is exactly one place that decides whether this thing moves: reduced
 * motion holds it on its poster frame, and a clip scrolled out of view pauses
 * instead of decoding forever. The same two rules the dither field follows.
 */
export function LoopVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = false;

    const sync = () => {
      if (reduced.matches || !onScreen) {
        video.pause();
        return;
      }
      // Autoplay can still be refused; there is nothing to do about it here and
      // the poster stays up, which is the same place reduced motion lands.
      video.play().catch(() => {});
    };

    const visibility = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0.15 }
    );

    visibility.observe(video);
    reduced.addEventListener("change", sync);

    return () => {
      visibility.disconnect();
      reduced.removeEventListener("change", sync);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      /*
       * `none`, not `metadata`. There are thirty of these on the homepage and
       * every one of them is below the fold, and `metadata` was fetching enough
       * of each to read its header — which for files this small means most of
       * the file. Measured at 107KB across fourteen requests, spent before a
       * reader had scrolled to any of it.
       *
       * Nothing is lost visually because the poster is what shows until a clip
       * plays, and `play()` starts the load itself when the observer fires. The
       * cost is a beat between a clip entering view and moving, against a first
       * load that no longer pays for video nobody has reached.
       */
      preload="none"
      aria-hidden
      className={className}
    />
  );
}
