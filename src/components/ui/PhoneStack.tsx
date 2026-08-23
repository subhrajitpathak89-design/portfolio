"use client";

import { workMedia } from "@/content/work-media";
import { useMediaQuery } from "@/lib/useMediaQuery";
import type { ProjectTone } from "@/types";

const TONE_GLOW: Record<ProjectTone, string> = {
  slate: "152, 45, 128",
  violet: "53, 40, 114",
  mist: "125, 140, 130",
  navy: "0, 49, 169",
};

/** Middle screen sits forward; the outer two tilt away from it. */
const TILT = [-5, 0, 5];

type PhoneStackProps = {
  media: string[];
  label: string;
  tone: ProjectTone;
};

/**
 * Related phone captures shown as one overlapping group.
 *
 * Individually each of these is a 0.48-ratio clip, and giving one a 960px card
 * of its own left most of the card empty — three of them read as three
 * unrelated things. Overlapping them into a single stack keeps them at a
 * sensible size and makes it obvious they are one flow.
 */
export function PhoneStack({ media, label, tone }: PhoneStackProps) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const glow = TONE_GLOW[tone];

  return (
    <ul className="flex items-center justify-center">
      {media.map((src, index) => {
        const dims = workMedia[src];
        const ratio = dims ? dims.width / dims.height : 0.48;
        const poster = src.replace(/\.mp4$/, "-poster.jpg");
        // Layer by distance from the centre so the middle screen is always
        // forward. Keying off `index` alone tied the first and middle items.
        const middleIndex = Math.floor(media.length / 2);
        const depth = media.length - Math.abs(index - middleIndex);

        return (
          <li
            key={src}
            className={`shrink-0 ${index === 0 ? "" : "-ml-[7%]"}`}
            style={{
              width: "36%",
              maxWidth: 240,
              zIndex: depth,
              rotate: `${TILT[index % TILT.length]}deg`,
            }}
          >
            <div
              className="overflow-hidden rounded-[1.25rem] bg-v2-ink/5 ring-1 ring-black/10"
              style={{
                aspectRatio: String(ratio),
                boxShadow: `0 24px 60px -26px rgba(${glow}, 0.6), 0 6px 18px -10px rgba(17,17,17,0.35)`,
              }}
            >
              {reducedMotion ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={poster}
                  alt={`${label} — screen ${index + 1}`}
                  width={dims?.width}
                  height={dims?.height}
                  className="h-full w-full object-cover"
                />
              ) : (
                <video
                  src={src}
                  poster={poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={`${label} — screen ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
