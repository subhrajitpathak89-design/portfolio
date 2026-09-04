import Image from "next/image";
import { LoopVideo } from "@/components/v3/LoopVideo";

/**
 * A screen.
 *
 * A slot takes a still or a loop. `video` wins when both are set; callers that
 * want the opposite precedence decide it themselves by not passing one — see
 * the case-study hero, where an authored still outranks a capture.
 *
 * With neither, it renders nothing.
 *
 * It used to draw a labelled dashed frame instead — "Screen", the step's title,
 * and the size to export at — on the argument that an explicit hole is a
 * checklist for whoever is filling the page. That is true for the author and
 * wrong for everyone else: a visitor reads a dashed box on a finished case
 * study as work that was never done. The checklist belongs in the content file,
 * where a step with no `image` is already visible as a step with no `image`.
 */
type ImageSlotProps = {
  src?: string;
  /** A silent loop to fill the slot with instead of `src`. */
  video?: string;
  /** The still behind `video` — shown under reduced motion, and before it loads. */
  poster?: string;
  alt?: string;
  /** Fallback alt text, and a note on what belongs in the slot. */
  label: string;
  /** How the image fills the slot. `contain` keeps a mockup whole. */
  fit?: "cover" | "contain";
  /** Tailwind aspect utility. */
  aspect?: string;
  priority?: boolean;
  sizes?: string;
};

export function ImageSlot({
  src,
  video,
  poster,
  alt,
  label,
  fit = "cover",
  aspect = "aspect-[16/9]",
  priority = false,
  sizes = "(min-width: 1024px) 60rem, 100vw",
}: ImageSlotProps) {
  // The frame is the same either way — same ratio, same border, same ground —
  // so a page of stills and a page with a loop in it still read as one system.
  const frame = `relative ${aspect} overflow-hidden rounded-2xl border border-v3-line bg-v3-surface`;

  if (video) {
    return (
      <div className={frame}>
        <LoopVideo
          src={video}
          poster={poster}
          className={`absolute inset-0 size-full ${
            fit === "contain" ? "object-contain p-4 sm:p-8" : "object-cover"
          }`}
        />
      </div>
    );
  }

  if (src) {
    return (
      <div className={frame}>
        <Image
          src={src}
          alt={alt ?? label}
          fill
          sizes={sizes}
          priority={priority}
          className={fit === "contain" ? "object-contain p-4 sm:p-8" : "object-cover"}
        />
      </div>
    );
  }

  // Nothing to show. A slot with no media is simply absent, so a page can be
  // published half-illustrated without announcing which half.
  return null;
}
