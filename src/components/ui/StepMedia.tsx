"use client";

import Image from "next/image";
import { workMedia } from "@/content/work-media";
import { useMediaQuery } from "@/lib/useMediaQuery";
import type { ProjectTone } from "@/types";

/**
 * Landscape assets take the full breakout width. Portrait ones — phone
 * captures, mostly — are sized from their height instead and centred, because
 * a 0.42-ratio asset given the full width would render over 2000px tall.
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
      className="mx-auto overflow-hidden rounded-2xl bg-v2-ink/5"
      style={{
        ...frameStyle,
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
