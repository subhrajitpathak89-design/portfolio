import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LoopVideo } from "@/components/v3/LoopVideo";
import { playground } from "@/content/playground";
import type { CollageTile } from "@/types";

/**
 * The playground on the homepage, as a small bento grid: one large piece,
 * three smaller ones, and a fifth cell that is the way through to the full
 * playground. A taste rather than the whole collage — the page it links to
 * is where every piece gets its own ratio, alt text and tags.
 *
 * Tiles crop to their cell here (`object-cover`). That is the trade a bento
 * makes: fixed cells in exchange for a section that reads as one block.
 * Clips still play, gated by `LoopVideo`'s own visibility check.
 *
 * A server component. `LoopVideo` brings its own client boundary.
 */

/**
 * Which pieces make the cut, by label, and where each sits. Picked for
 * range — a branded product loop, a UI micro-interaction, a 3D render and an app
 * concept — so four cells say four different things.
 */
const BENTO: { label: string; cell: string }[] = [
  { label: "Face wash", cell: "col-span-2 row-span-2" },
  { label: "Balance toggle", cell: "" },
  { label: "Mustang render", cell: "" },
  { label: "Journal app", cell: "" },
];

export function PlaygroundStream() {
  const { collage, teaser } = playground;

  const tiles = BENTO.flatMap(({ label, cell }) => {
    const tile = collage.find((t) => t.label === label);
    return tile ? [{ tile, cell }] : [];
  });

  if (tiles.length === 0) return null;

  return (
    <section className="relative bg-v3-bg">
      <div className="v3-column px-5 pb-20 pt-20 sm:px-10 lg:px-16 lg:pb-24 lg:pt-24">
        <header className="max-w-2xl">
          <p
            data-reveal-item
            className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-v3-accent"
          >
            {teaser.eyebrow}
          </p>

          <h2
            data-reveal-item
            style={{ "--reveal-delay": 1 } as React.CSSProperties}
            className="mt-4 font-editorial-display text-[clamp(1.6rem,3.6vw,2.75rem)] font-normal leading-[1.05] tracking-[-0.015em] text-v3-fg"
          >
            {teaser.lead} <span className="text-v3-accent">{teaser.accent}</span>
          </h2>

          <p
            data-reveal-item
            style={{ "--reveal-delay": 2 } as React.CSSProperties}
            className="mt-5 max-w-xl text-base leading-relaxed text-v3-muted"
          >
            {teaser.intro}
          </p>
        </header>

        {/* Four columns by two rows of fixed height on desktop: the large
            piece takes a 2x2 block, the other cells are 1x1. On a phone it
            folds to two columns and the large piece spans both. */}
        <div className="mt-12 grid auto-rows-[clamp(140px,18vw,240px)] grid-cols-2 gap-3 sm:gap-4 lg:mt-16 lg:grid-cols-4">
          {tiles.map(({ tile, cell }) => (
            <div key={tile.label} className={`group/glow relative isolate ${cell}`}>
            <span aria-hidden className="v3-glow">
              {(tile.poster ?? tile.src) && (
                <Image src={(tile.poster ?? tile.src)!} alt="" fill sizes="16rem" />
              )}
            </span>
            <Link
              href="/playground"
              data-cursor-label="Open playground"
              className="group/tile relative block size-full overflow-hidden rounded-2xl border border-v3-line bg-v3-chip"
            >
              <Card tile={tile} />
              {/* The label rides in on hover, over a short scrim, so the grid
                  reads as pictures first. */}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-black/60 to-transparent px-4 pb-3 pt-8 font-mono text-[11px] uppercase tracking-[0.12em] text-white opacity-0 transition duration-300 group-hover/tile:translate-y-0 group-hover/tile:opacity-100">
                {tile.label}
              </span>
            </Link>
            </div>
          ))}

          {/* The fifth cell is the button. It fills the grid's last slot
              rather than hanging under it as a text link. */}
          <div className="group/glow relative isolate">
          <span aria-hidden className="v3-glow">
            <span className="bg-v3-fg/40" />
          </span>
          <Link
            href="/playground"
            className="group/all flex size-full flex-col justify-between rounded-2xl border border-v3-line bg-v3-chip p-5 transition-colors duration-300 hover:border-v3-fg sm:p-6"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-v3-muted">
              {String(collage.length).padStart(2, "0")} pieces
            </span>
            <span className="flex items-end justify-between gap-3">
              <span className="font-editorial-display text-[clamp(1.5rem,2.4vw,2.25rem)] leading-none text-v3-fg">
                View all
              </span>
              <ArrowUpRight
                aria-hidden
                className="size-6 shrink-0 text-v3-fg transition-transform duration-300 group-hover/all:-translate-y-1 group-hover/all:translate-x-1"
                strokeWidth={1.75}
              />
            </span>
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** One piece, cropped to fill its cell. */
function Card({ tile }: { tile: CollageTile }) {
  return tile.video ? (
    <LoopVideo
      src={tile.video}
      poster={tile.poster}
      className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover/tile:scale-[1.03]"
    />
  ) : tile.src ? (
    <Image
      src={tile.src}
      alt=""
      fill
      // The large cell tops out around 40rem on a wide screen, the small
      // ones at half that; this covers both at 2x without fetching a
      // full-viewport file.
      sizes="(min-width: 1024px) 40rem, 100vw"
      className="object-cover transition-transform duration-500 group-hover/tile:scale-[1.03]"
    />
  ) : null;
}
