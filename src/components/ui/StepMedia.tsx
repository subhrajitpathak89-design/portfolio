"use client";

import Image from "next/image";
import { workMedia } from "@/content/work-media";
import { useMediaQuery } from "@/lib/useMediaQuery";
import type { ProjectTone } from "@/types";

/**
 * Landscape assets take the full breakout width. Portrait ones are sized from
 * their height instead and centred, because a 0.42-ratio asset given the full
 * width would render over 2000px tall.
 *
 * This branch assumes a portrait asset is a phone capture. It is a poor fit for
 * tall *banner* artwork: sizing a 0.42 marketing graphic by height produced a
 * 227px-wide sliver with its content unreadable. Step imagery should stay
 * roughly landscape — everything in the manifest now sits between 1.25 and
 * 2.10 — and genuinely portrait phone captures belong in PhoneStack.
 */
const PORTRAIT_HEIGHT = "min(34rem, 68svh)";

/**
 * The project's brand accent, used only to tint the shadow under the card.
 *
 * These screenshots already ship with their own backdrop baked in, so wrapping
 * them in a coloured panel produced two visible cards — the panel plus the
 * shot's own background. Colour now comes from a glow beneath the single card
 * instead, which ties the shot to the project without stacking another surface
 * behind it.
 */
const TONE_GLOW: Record<ProjectTone, string> = {
  slate: "152, 45, 128",
  violet: "53, 40, 114",
  mist: "125, 140, 130",
  navy: "0, 49, 169",
  // Nivex publishes its primary as #444CE7 in tokens/base, so this one is the
  // brand value rather than a sample.
  indigo: "68, 76, 231",
};

type StepMediaProps = {
  /** Looping product capture. Takes precedence over `image` when present. */
  video?: string;
  /** Still screenshot, or the poster frame behind a video. */
  image?: string;
  poster?: string;
  alt: string;
  tone: ProjectTone;
  /** Set for the above-the-fold cover so it is not lazy-loaded. */
  priority?: boolean;
};

export function StepMedia({
  video,
  image,
  poster,
  alt,
  tone,
  priority = false,
}: StepMediaProps) {
  // A silently autoplaying loop is exactly what reduced-motion asks you not to
  // do, so those visitors get the poster frame instead of the clip.
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const src = video && !reducedMotion ? video : image ?? poster ?? video;
  if (!src) return null;

  const dims = workMedia[video ?? image ?? ""] ?? workMedia[src];
  const ratio = dims ? dims.width / dims.height : 16 / 10;
  const portrait = ratio < 1;

  // Sizing from the asset's own ratio is what stops the letterboxing that made
  // these look like they were floating in the middle of a panel.
  const frameStyle = portrait
    ? { aspectRatio: String(ratio), height: PORTRAIT_HEIGHT, width: "auto" }
    : { aspectRatio: String(ratio), width: "100%" };

  const glow = TONE_GLOW[tone];
  const showVideo = Boolean(video) && !reducedMotion;

  return (
    <div
      className="mx-auto overflow-hidden rounded-2xl"
      style={{
        ...frameStyle,
        // Several shots — the device mockups especially — ship with a
        // transparent background, so a flat neutral panel left them sitting on
        // a dead white slab. Tinting that panel with the project's own accent
        // lets the mockup sit in the same colour world as the UI inside it.
        backgroundImage: [
          `radial-gradient(120% 90% at 20% 0%, rgba(${glow}, 0.22) 0%, rgba(${glow}, 0) 62%)`,
          `radial-gradient(110% 80% at 100% 100%, rgba(${glow}, 0.16) 0%, rgba(${glow}, 0) 58%)`,
          `linear-gradient(150deg, rgba(${glow}, 0.10) 0%, rgba(17,17,17,0.05) 100%)`,
        ].join(", "),
        boxShadow: `0 30px 80px -34px rgba(${glow}, 0.55), 0 8px 24px -12px rgba(17,17,17,0.3)`,
      }}
    >
      {showVideo ? (
        <video
          src={video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={alt}
          className="h-full w-full object-cover"
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={dims?.width ?? 1200}
          height={dims?.height ?? 750}
          sizes="(min-width: 1024px) 60rem, 92vw"
          priority={priority}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
