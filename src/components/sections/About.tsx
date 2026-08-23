import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { about } from "@/content/about";
import { Blob, HeartHandsSticker, SpeedLines, Squiggle } from "@/components/ui/Doodles";
import { Marquee } from "@/components/ui/Marquee";
import type { AboutPhoto, CaptionTone } from "@/types";

const CAPTION_TONES: Record<CaptionTone, string> = {
  blush: "bg-v2-blush text-v2-ink",
  orange: "bg-v2-orange text-v2-ink",
  lime: "bg-v2-lime text-v2-ink",
  periwinkle: "bg-v2-periwinkle text-white",
};

export function About() {
  const { eyebrow, headline, intro, photos } = about;

  return (
    <section id="about" className="relative overflow-hidden bg-v2-cream pb-24 lg:pb-32">
      <AboutStrips />

      <div className="mx-auto max-w-6xl px-6 pt-20 lg:px-8 lg:pt-24">
        <p className="text-center font-script text-2xl text-v2-ink/70 sm:text-3xl">
          {eyebrow}
        </p>

        <h2 className="mt-5 text-center font-grotesk text-[clamp(1.75rem,4.2vw,3.5rem)] font-black leading-[0.95] tracking-[-0.03em] text-v2-ink">
          {headline.lead.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}

          {/* The serif line, its sticker and its underline are one inline-block
              unit so the sticker and squiggle stay pinned to the text's own
              box as the clamped type resizes. */}
          <span className="relative mt-3 inline-block">
            <span className="relative z-10 font-editorial text-[clamp(1.5rem,3.4vw,2.875rem)] font-medium italic tracking-[-0.01em]">
              {headline.accent}
            </span>

            <HeartHandsSticker
              className="absolute -top-[0.45em] right-[-0.15em] z-20 w-[1.5em] rotate-[8deg] text-v2-forest"
            />

            {/* Clears the serif descenders — at 0.28em the stroke cut through
                the tail of the "f" and the full stop. */}
            <Squiggle
              className="absolute -bottom-[0.7em] left-[8%] w-[84%] text-v2-ink"
            />
          </span>
        </h2>

        {/* Narrower than the headline on purpose — body copy this wide stops
            being readable well before the display type does. */}
        <div className="mx-auto mt-10 max-w-2xl space-y-4 text-center lg:mt-12">
          {intro.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-v2-ink/70 sm:text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="relative mt-20 lg:mt-24">
          <Blob
            className="pointer-events-none absolute -left-[16%] top-[6%] -z-10 w-[58%] rotate-[-8deg] text-v2-periwinkle sm:w-[46%]"
          />

          <SpeedLines
            className="pointer-events-none absolute -bottom-6 left-[6%] w-10 text-v2-ink sm:w-12"
          />

          {/* Phones get a two-column grid — the overlapping row only reads as a
              collage once there is room for the cards to sit side by side. */}
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:flex sm:items-start sm:justify-center sm:gap-0">
            {photos.map((photo, index) => (
              <PhotoCard key={index} photo={photo} index={index} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * Two ticker strips crossing at opposing angles across the top of the section.
 * They run in opposite directions, which is what stops the pair reading as one
 * thick band and makes the crossing point legible.
 *
 * Each strip is over-wide and offset left: rotating a full-bleed strip pulls
 * its ends inward, and at these angles a 100%-wide strip would leave a wedge
 * of bare cream at both edges. The section's `overflow-hidden` clips the
 * excess.
 */
function AboutStrips() {
  return (
    <div className="relative h-32 sm:h-40 lg:h-48">
      {/* repeat/duration scaled together: enough units that one copy covers an
          ultrawide frame, with the duration grown to match so the on-screen
          speed is unchanged. These strips are 116% wide for the rotation, so
          the bar to clear is wider than the viewport itself. */}
      <Marquee
        repeat={20}
        duration={64}
        className="absolute -left-[8%] top-4 w-[116%] -rotate-[2.5deg] bg-v2-orange py-2.5 sm:top-6 sm:py-3.5"
      >
        <span className="px-6 font-grotesk text-xl font-black uppercase tracking-tight text-white sm:px-10 sm:text-3xl lg:text-4xl">
          About
        </span>
      </Marquee>

      <Marquee
        reverse
        repeat={14}
        duration={52}
        className="absolute -left-[8%] top-16 w-[116%] rotate-[4deg] bg-v2-ink py-2.5 sm:top-20 sm:py-3.5 lg:top-24"
      >
        <span className="px-6 font-grotesk text-xl font-black uppercase tracking-tight text-white sm:px-10 sm:text-3xl lg:text-4xl">
          About
        </span>
        <span className="v2-checker w-14 shrink-0 self-stretch sm:w-20" />
      </Marquee>
    </div>
  );
}

function PhotoCard({ photo, index }: { photo: AboutPhoto; index: number }) {
  const { src, alt, caption, captionTone, captionSide, rotate, offsetY } = photo;

  return (
    <li
      className="relative sm:-mx-[2%] sm:w-[21%] sm:shrink-0"
      style={{
        transform: `rotate(${rotate}deg)`,
        // Cards later in the list stack above earlier ones, matching the
        // reference where each photo overlaps the one to its left.
        zIndex: index + 1,
      }}
    >
      <div
        className="relative aspect-[3/4] overflow-hidden rounded-xl bg-v2-ink/5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)] sm:[transform:translateY(var(--offset-y))]"
        style={{ "--offset-y": `${offsetY}px` } as React.CSSProperties}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 640px) 21vw, 45vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-v2-ink/20 text-v2-ink/65">
            <ImageIcon aria-hidden className="size-7" strokeWidth={1.5} />
            <span className="px-3 text-center text-[10px] font-medium uppercase tracking-[0.14em]">
              photo {index + 1}
            </span>
          </div>
        )}
      </div>

      {/* The pill straddles the card's edge the way the reference does, but
          only from `sm` up. On a phone a nowrap pill offset to 45% runs off
          the screen and gets clipped by the section, so it sits centred and
          wrapping inside the card instead. */}
      {caption && (
        <span
          className={`absolute bottom-[14%] left-1/2 z-20 max-w-[92%] -translate-x-1/2 rounded-[3px] px-2 py-1 text-center text-[10px] font-medium sm:max-w-none sm:translate-x-0 sm:whitespace-nowrap sm:text-left sm:text-xs ${
            CAPTION_TONES[captionTone]
          } ${
            captionSide === "right"
              ? "sm:left-[45%] sm:right-auto"
              : "sm:left-auto sm:right-[45%]"
          }`}
        >
          {caption}
        </span>
      )}
    </li>
  );
}
