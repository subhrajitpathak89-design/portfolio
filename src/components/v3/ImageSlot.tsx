import Image from "next/image";

/**
 * A screen, or the labelled hole where one goes.
 *
 * The empty state is deliberately explicit rather than decorative: it names
 * what belongs in the slot and the size to export at, so filling the page is a
 * checklist rather than a guessing game. A vague grey rectangle would read as a
 * broken image to a visitor and tell the author nothing.
 */
type ImageSlotProps = {
  src?: string;
  alt?: string;
  /** What this screen should show. Shown in the empty state. */
  label: string;
  /** Suggested export size, e.g. "2400 × 1350". */
  spec?: string;
  /** Tailwind aspect utility. */
  aspect?: string;
  priority?: boolean;
  sizes?: string;
};

export function ImageSlot({
  src,
  alt,
  label,
  spec,
  aspect = "aspect-[16/9]",
  priority = false,
  sizes = "(min-width: 1024px) 60rem, 100vw",
}: ImageSlotProps) {
  if (src) {
    return (
      <div className={`relative ${aspect} overflow-hidden rounded-2xl border border-v3-line bg-v3-surface`}>
        <Image
          src={src}
          alt={alt ?? label}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
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
