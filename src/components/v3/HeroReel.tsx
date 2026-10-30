"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The three playground UI/motion clips the hero shows. None is exactly 2:1,
 * so each is shown whole (`object-contain`, or `cover` when it is already
 * close enough) on its own background colour,
 * sampled from the clip's edges, and the leftover space reads as more of
 * the same frame rather than as letterboxing.
 */
const CLIPS = [
  {
    src: "/images/v3/playground/face-wash.518f7fad.mp4",
    poster: "/images/v3/playground/face-wash-poster.9a9e49a3.webp",
    bg: "#d8f7d4",
    fit: "contain",
  },
  {
    src: "/images/v3/playground/journal.d7d32535.mp4",
    poster: "/images/v3/playground/journal-poster.aacbc440.webp",
    bg: "#2e3034",
    // Already 2.03:1, so it fills the box and loses only a sliver.
    fit: "cover",
  },
  {
    src: "/images/v3/playground/wallet.f1afbc68.mp4",
    poster: "/images/v3/playground/wallet-poster.608dfb51.webp",
    bg: "#0f0326",
    // Its vignette is lighter than the corners; the side fade below hides
    // where the frame ends.
    fit: "contain",
    fade: true,
  },
];

/** How long each clip holds before the hard cut to the next. */
const HOLD_MS = 2000;

/**
 * The hero's showreel: a hard cut to the next clip every two seconds,
 * looping. Reduced motion holds the first clip on its poster; off screen,
 * nothing plays and the reel stops advancing.
 */
export function HeroReel() {
  const [active, setActive] = useState(0);
  const [live, setLive] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(([entry]) =>
      setLive(entry.isIntersecting && !reduced.matches),
    );
    if (frame.current) observer.observe(frame.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!live) return;
    const timer = window.setInterval(() => setActive((i) => (i + 1) % CLIPS.length), HOLD_MS);
    return () => window.clearInterval(timer);
  }, [live]);

  // Each clip carries on from where it was cut, so a two-second window
  // shows a different part of it every time round the loop.
  useEffect(() => {
    videos.current.forEach((video, index) => {
      if (!video) return;
      if (index === active && live) video.play().catch(() => {});
      else video.pause();
    });
  }, [active, live]);

  return (
    <div
      ref={frame}
      aria-hidden
      className="relative h-full w-full overflow-hidden"
      style={{ background: CLIPS[active].bg }}
    >
      {CLIPS.map((clip, index) => (
        <video
          key={clip.src}
          ref={(el) => {
            videos.current[index] = el;
          }}
          src={clip.src}
          poster={clip.poster}
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 h-full w-full ${clip.fit === "cover" ? "object-cover" : "object-contain"} ${
            "fade" in clip && clip.fade
              ? "[mask-image:linear-gradient(to_right,transparent_22%,black_34%,black_66%,transparent_78%)]"
              : ""
          } ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
