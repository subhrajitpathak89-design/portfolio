"use client";

import Image from "next/image";
import { workMedia } from "@/content/work-media";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Landscape assets take the full breakout width. Portrait ones — phone
 * captures, mostly — are sized from their height instead and centred, because
 * a 0.42-ratio asset given the full width would render over 2000px tall.
 */
const PORTRAIT_HEIGHT = "min(34rem, 68svh)";

type StepMediaProps = {
  /** Looping product capture. Takes precedence over `image` when present. */
  video?: string;
  /** Still screenshot, or the poster frame behind a video. */
  image?: string;
  poster?: string;
  alt: string;
  /** Set for the above-the-fold cover so it is not lazy-loaded. */
  priority?: boolean;
};

export function StepMedia({ video, image, poster, alt, priority = false }: StepMediaProps) {
  // A silently autoplaying loop is exactly what reduced-motion asks you not to
  // do, so those visitors get the poster frame instead of the clip.
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const src = video && !reducedMotion ? video : image ?? poster ?? video;
  if (!src) return null;

  const dims = workMedia[video ?? image ?? ""] ?? workMedia[src];
  const ratio = dims ? dims.width / dims.height : 16 / 10;
  const portrait = ratio < 1;

  // Sizing from the asset's own ratio is what stops the letterboxing that made
  // these look like they were floating in the middle of the panel.
  const frameStyle = portrait
    ? { aspectRatio: String(ratio), height: PORTRAIT_HEIGHT, width: "auto" }
    : { aspectRatio: String(ratio), width: "100%" };

  const showVideo = Boolean(video) && !reducedMotion;

  return (
    <div className="mx-auto overflow-hidden rounded-xl bg-black/20 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]" style={frameStyle}>
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
