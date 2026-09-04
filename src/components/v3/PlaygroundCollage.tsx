"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { LoopVideo } from "@/components/v3/LoopVideo";
import type { CollageTile, PlaygroundTag } from "@/types";

/**
 * The playground collage, with a filter above it.
 *
 * A client component only because the filter holds one piece of state. It is
 * scoped to the collage rather than the whole page, so the heading, the to-do
 * list and the page chrome stay server-rendered — a filter is not a reason to
 * ship the rest of the page twice.
 *
 * With JavaScript off the collage renders whole, which is the right fallback:
 * the filter narrows a complete view rather than being the only way to see it.
 */

/**
 * Tab order, which is neither the tag order nor alphabetical.
 *
 * Interface work first, because that is what someone arriving from a case
 * study is looking for, then the things that move and the things generated,
 * then the flat graphic work.
 *
 * Only tags that something on the page actually carries become tabs, so a
 * filter can never lead to an empty collage.
 */
const TAG_ORDER: PlaygroundTag[] = [
  "UI",
  "Motion",
  "Film",
  "AI",
  "3D",
  "Branding",
  "Graphic",
];

/** `null` is the "All" tab — an absent filter, not another tag. */
type Filter = PlaygroundTag | null;

export function PlaygroundCollage({ tiles }: { tiles: CollageTile[] }) {
  const [filter, setFilter] = useState<Filter>(null);

  const counts = useMemo(() => {
    const map = new Map<PlaygroundTag, number>();
    for (const tile of tiles) {
      for (const tag of tile.tags) map.set(tag, (map.get(tag) ?? 0) + 1);
    }
    return map;
  }, [tiles]);

  const available = TAG_ORDER.filter((tag) => (counts.get(tag) ?? 0) > 0);

  const shown = filter === null ? tiles : tiles.filter((t) => t.tags.includes(filter));

  if (tiles.length === 0) return null;

  return (
    <>
      {/* One tab short of a filter is just a label, so the bar only appears
          once there is something to choose between. */}
      {available.length > 1 && (
        <div className="mt-10 flex flex-wrap items-center gap-2 lg:mt-12">
          <Tab
            label="All"
            count={tiles.length}
            active={filter === null}
            onSelect={() => setFilter(null)}
          />
          {available.map((tag) => (
            <Tab
              key={tag}
              label={tag}
              count={counts.get(tag) ?? 0}
              active={filter === tag}
              onSelect={() => setFilter(tag)}
            />
          ))}
        </div>
      )}

      {/* The collage is purely visual, so a screen reader gets told what
          changed. */}
      <p aria-live="polite" className="sr-only">
        {filter === null
          ? `Showing all ${tiles.length} pieces.`
          : `Showing ${shown.length} ${filter} ${shown.length === 1 ? "piece" : "pieces"}.`}
      </p>

      <Collage tiles={shown} />
    </>
  );
}

function Tab({
  label,
  count,
  active,
  onSelect,
}: {
  label: string;
  count: number;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      /* `py-2.5` up to `lg`, tightening to `py-1.5` only where there is
         certainly a mouse. The compact padding measured 31px tall, which is
         fine to click and mean to thumb — and the chips sit in a wrapped grid
         where every neighbour is another filter, so a mis-tap silently changes
         what you are looking at rather than doing nothing.
         The breakpoint is `lg`, not `sm`: a tablet at 768 is a touch device
         and was being handed the mouse-sized target. */
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 lg:py-1.5 ${
        active
          ? "border-v3-accent bg-v3-accent text-v3-bg"
          : "border-v3-line bg-v3-chip text-v3-muted hover:border-v3-accent/40 hover:text-v3-fg"
      }`}
    >
      {label}
      {/* The count is the honest part of a filter: it says how much sits behind
          a tab before anyone spends a click finding out. */}
      <span className={active ? "text-v3-bg/60" : "text-v3-muted/50"}>{count}</span>
    </button>
  );
}

/**
 * The collage.
 *
 * Columns, not a grid. Every piece here has its own aspect — a 2.37 cinemascope
 * cut, a 9:16 phone capture, a 0.6 packaging board — and a grid of fixed rows
 * can only take one of two bad options for each of them: crop the piece to the
 * cell, or letterbox it inside. The cell's aspect is not even stable, since
 * column width flexes with the viewport while row height does not, so the size
 * of that compromise changes as the window moves.
 *
 * Sizing each card from the piece instead means there is nothing to reconcile.
 * `aspect-ratio` comes from the file's own `w`/`h`, and multi-column layout
 * lets the cards be whatever height that works out to, packing them into
 * balanced columns.
 *
 * The cost is that visual order and DOM order come apart, because the balancer
 * decides which column a card lands in — acceptable here, because these are
 * unranked offcuts with no sequence to follow. It would not be if they were
 * steps.
 */
function Collage({ tiles }: { tiles: CollageTile[] }) {
  return (
    /* `gap` sets the column gutter; the row gap is the cards' own bottom
       margin, which has to match it by hand — multi-column has no row-gap. */
    <ul className="mt-8 columns-1 gap-2.5 sm:columns-2 lg:mt-10 lg:columns-3">
      {tiles.map((tile) => (
        <li key={tile.label} className="mb-2.5 break-inside-avoid">
          <figure
            /* The card *is* the piece's shape. Nothing inside has to be
               persuaded to fit, and the space is reserved before the file
               arrives, so a slow clip leaves no jump when it loads. */
            style={{ aspectRatio: `${tile.w} / ${tile.h}` }}
            className="group relative overflow-hidden rounded-xl border border-v3-line bg-v3-surface"
          >
            {tile.video ? (
              /* `object-cover` on a frame that already matches the source is a
                 no-op crop, and it beats `contain` for hiding the half-pixel
                 that rounding a ratio can leave down one edge. */
              <LoopVideo
                src={tile.video}
                poster={tile.poster}
                className="absolute inset-0 size-full object-cover"
              />
            ) : tile.src ? (
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 92vw"
                className="object-cover"
              />
            ) : null}

            <TagStamp tags={tile.tags} />
          </figure>
        </li>
      ))}
    </ul>
  );
}

/**
 * The tags, printed in the corner of the card.
 *
 * Bottom left, on a dark translucent chip, because the corner has to stay
 * legible over anything: pale mint, a black film frame, a lit studio render.
 * Sampling a colour per card would have been the alternative, and it fails the
 * moment a clip's own corner changes mid-loop — which most of these do.
 *
 * Not `aria-hidden`, even though the filter above says the same words: for a
 * reader who cannot see the picture, this is the only thing on the card that
 * says what kind of work it is.
 */
function TagStamp({ tags }: { tags: PlaygroundTag[] }) {
  return (
    <figcaption className="absolute inset-x-2 bottom-2 flex flex-wrap gap-1">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-black/55 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white/90 backdrop-blur-[2px]"
        >
          {tag}
        </span>
      ))}
    </figcaption>
  );
}
