import Image from "next/image";
import { LoopVideo } from "@/components/v3/LoopVideo";

/**
 * A screen, or the labelled hole where one goes.
 *
 * A slot takes a still or a loop. `video` wins when both are set; callers that
 * want the opposite precedence decide it themselves by not passing one — see
 * the case-study hero, where an authored still outranks a capture.
 *
 * The empty state is deliberately explicit rather than decorative: it names
 * what belongs in the slot and the size to export at, so filling the page is a
 * checklist rather than a guessing game. A vague grey rectangle would read as a
 * broken image to a visitor and tell the author nothing.
 */
type ImageSlotProps = {
  src?: string;
  /** A silent loop to fill the slot with instead of `src`. */
  video?: string;
  /** The still behind `video` — shown under reduced motion, and before it loads. */
  poster?: string;
  alt?: string;
  /** What this screen should show. Shown in the empty state. */
  label: string;
  /** Suggested export size, e.g. "2400 × 1350". */
  spec?: string;
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
  spec,
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

  return (
    <div
      className={`relative ${aspect} overflow-hidden rounded-2xl border border-dashed border-v3-line bg-v3-surface`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-6 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-v3-muted/60">
          Screen
        </span>
        <span className="max-w-sm text-sm leading-relaxed text-v3-muted">{label}</span>
        {spec && (
          <span className="font-mono text-[11px] text-v3-muted/50">{spec}</span>
        )}
      </div>
    </div>
  );
}
