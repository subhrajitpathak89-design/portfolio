import Image from "next/image";

import { moreWork } from "@/content/more-work";
import type { MoreWorkItem } from "@/types";

/**
 * A pinboard collage of side projects.
 *
 * This replaced a left-to-right ticker. A ticker gives every card the same
 * width, the same angle and the same moment on screen, which is the opposite of
 * what a moodboard does — the whole point of a collage is that the pieces are
 * different sizes, overlap, and sit at angles, so the eye picks its own path
 * through them instead of being fed one card at a time.
 *
 * Positions live here rather than in the content file because they are layout,
 * not content: `more-work.ts` should stay a list of projects that someone can
 * reorder without having to re-solve the composition.
 *
 * Every value is a percentage of the board, so the whole arrangement scales
 * with the viewport and the overlaps hold at any width.
 */
type Slot = {
  /** Percentages of board width / height. */
  left: number;
  top: number;
  /** Card width as a percentage of board width. */
  width: number;
  /** Aspect ratio of the photo inside the frame, not of the whole card. */
  ratio: number;
  rotate: number;
  /** Overlap order. Deliberately not sequential — the middle of the board
   *  should sit on top of its neighbours, not behind them. */
  z: number;
};

const SLOTS: Slot[] = [
  { left: 1, top: 8, width: 24, ratio: 4 / 5, rotate: -6, z: 3 },
  { left: 25, top: 34, width: 22, ratio: 1, rotate: 4, z: 6 },
  { left: 40, top: 2, width: 30, ratio: 16 / 10, rotate: -2, z: 2 },
  { left: 69, top: 30, width: 23, ratio: 4 / 5, rotate: 5, z: 4 },
  { left: 6, top: 60, width: 26, ratio: 16 / 10, rotate: 3, z: 5 },
  { left: 47, top: 56, width: 25, ratio: 1, rotate: -5, z: 7 },
];

/** The sticky note carrying the section intro, pinned over the collage. */
const NOTE = { left: 63, top: 3, width: 21, rotate: 7 };

export function MoreWork() {
  const { script, heading, intro, items } = moreWork;

  return (
    <section className="overflow-hidden bg-v2-cream pb-24 pt-20 lg:pb-32 lg:pt-24">
      <header className="mx-auto max-w-6xl px-6 text-center lg:px-8">
        <p className="font-script text-2xl text-v2-ink/70 sm:text-3xl">
          {script}
        </p>
        <h2 className="mt-4 font-grotesk text-[clamp(1.75rem,4.2vw,3.5rem)] font-black leading-[0.95] tracking-[-0.03em] text-v2-ink">
          {heading}
        </h2>
        {/* On the board this copy lives on the sticky note instead, so it is
            only shown here at the widths where the board is not used. */}
        <p className="mx-auto mt-5 max-w-xl text-balance text-base text-v2-ink/70 sm:text-lg md:hidden">
          {intro}
        </p>
      </header>

      {/* Below `md` the board becomes a stack: six overlapping frames scaled to
          a phone would be a pile of thumbnails with unreadable captions. The
          tilt is kept, the overlap is not. */}
      <ul className="mx-auto mt-12 grid max-w-md grid-cols-2 gap-x-4 gap-y-6 px-6 md:hidden">
        {items.map((item, index) => (
          <li key={item.title}>
            <Polaroid item={item} ratio={SLOTS[index].ratio} rotate={SLOTS[index].rotate} />
          </li>
        ))}
      </ul>

      <div className="mx-auto hidden w-full max-w-6xl px-6 md:block lg:px-8">
        <div className="relative aspect-[16/11] w-full">
          {items.map((item, index) => {
            const slot = SLOTS[index];

            return (
              <div
                key={item.title}
                className="absolute"
                style={{
                  left: `${slot.left}%`,
                  top: `${slot.top}%`,
                  width: `${slot.width}%`,
                  zIndex: slot.z,
                }}
              >
                <Polaroid item={item} ratio={slot.ratio} rotate={slot.rotate} />
              </div>
            );
          })}

          <div
            className="absolute z-10"
            style={{
              left: `${NOTE.left}%`,
              top: `${NOTE.top}%`,
              width: `${NOTE.width}%`,
              transform: `rotate(${NOTE.rotate}deg)`,
            }}
          >
            {/* Square-ish and shadowed only along the bottom edge, so it reads
                as a note lying on the pile rather than another photo. */}
            <p className="bg-v2-yellow/90 p-4 text-center font-script text-lg leading-tight text-v2-ink shadow-[0_10px_18px_-12px_rgba(17,17,17,0.6)]">
              {intro}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * One pinned photo. The deep bottom border is what makes an untitled frame read
 * as a print rather than a plain box — it is the same treatment the old pegged
 * cards used, kept so the section still feels hand-assembled.
 */
function Polaroid({
  item,
  ratio,
  rotate,
}: {
  item: MoreWorkItem;
  ratio: number;
  rotate: number;
}) {
  const { title, src, alt, tone } = item;

  return (
    <figure
      // Straightening on hover is the tell that these are physical pieces you
      // can pick up, and it also lifts the hovered frame clear of its overlaps.
      className="group relative rounded-[3px] bg-white p-2 pb-9 shadow-[0_16px_30px_-18px_rgba(17,17,17,0.55)] transition-transform duration-300 ease-out hover:z-20 hover:rotate-0 hover:scale-[1.03]"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="overflow-hidden rounded-[2px]" style={{ aspectRatio: String(ratio) }}>
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={480}
            height={Math.round(480 / ratio)}
            sizes="(min-width: 768px) 20vw, 40vw"
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(160deg, ${tone[0]} 0%, ${tone[1]} 100%)`,
            }}
          />
        )}
      </div>

      <figcaption className="absolute inset-x-2 bottom-2 line-clamp-2 text-center font-script text-[0.95rem] leading-tight text-v2-ink/80">
        {title}
      </figcaption>
    </figure>
  );
}
