import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LoopVideo } from "@/components/v3/LoopVideo";
import { playground } from "@/content/playground";
import type { CollageTile } from "@/types";

/**
 * The playground as one row of work, running right to left under About.
 *
 * Everything that moves, moves — the clips play here rather than standing in
 * as poster frames. That is the point of putting this on the homepage: a still
 * of a Blender render is a picture of a car, and the render is the work.
 *
 * This replaced a perspective corridor of stills. Two things were wrong with
 * it: the turn fought the thing being shown, since a clip is harder to read
 * once it is rotated 30 degrees and scaled by depth, and it was a page of
 * geometry to end up showing four pieces at a legible size.
 *
 * The cost of playing everything is real and worth stating. Thirteen of the
 * sixteen pieces are video, doubled by the marquee, so the row holds
 * twenty-six video elements. Three things keep that affordable: `LoopVideo`
 * gates each clip on an intersection observer, so only the few actually inside
 * the viewport decode and the rest sit paused on their posters;
 * `preload="metadata"` means a clip off to the side has not been downloaded at
 * all; and the files are deliberately small — the whole set is under 3MB,
 * which is one stock hero photo.
 *
 * A server component. The row is markup plus one keyframe, and `LoopVideo`
 * brings its own client boundary.
 */

/**
 * Height of the row, and the only size control here: cards take their width
 * from it, so raising this shows fewer, larger pieces.
 */
const ROW_HEIGHT = "clamp(180px, 23vw, 320px)";

export function PlaygroundStream() {
  const { collage, teaser } = playground;

  if (collage.length === 0) return null;

  return (
    <section className="relative bg-v3-bg">
      <div className="v3-hatch v3-bleed absolute inset-y-0 left-0" aria-hidden />
      <div className="v3-hatch v3-bleed absolute inset-y-0 right-0" aria-hidden />

      {/* One column wrapper for all of it, like every other section. The row
          used to sit outside this on purpose, to bleed off both edges of the
          page — but `v3-column` draws the site's vertical rules as its own
          borders, so bleeding meant the strip visibly broke out of the frame
          the rest of the page is built on. Inside it, the row starts and ends
          on the same margin as the heading. */}
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

        <div
          className="v3-stream relative mt-12 w-full lg:mt-16"
          style={{ "--v3-stream-h": ROW_HEIGHT } as React.CSSProperties}
          /* Decoration assembled from work that is listed properly on
             /playground, with its own alt text and tags. Announcing thirty-two
             more items here would make the page longer to listen to and no
             more informative. */
          aria-hidden
        >
          <div className="v3-stream-track">
            {/* Twice through: the keyframe slides the row by exactly half its
                width, so the second copy is sitting where the first one
                started at the moment it wraps. */}
            {[...collage, ...collage].map((tile, index) => (
              <Card key={`${tile.label}-${index}`} tile={tile} />
            ))}
          </div>

          <div className="v3-stream-scrim pointer-events-none absolute inset-0" />
        </div>

        <Link
          href="/playground"
          className="group mt-10 inline-flex items-center gap-1.5 font-mono text-xs text-v3-muted transition-colors duration-200 hover:text-v3-accent lg:mt-12"
        >
          {teaser.cta}
          <ArrowUpRight
            aria-hidden
            className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
          />
        </Link>
      </div>
    </section>
  );
}

/**
 * One piece in the row, at its own ratio.
 *
 * Same rule as the collage: the row sets the height, the piece sets the width,
 * and nothing is cropped to ride in it — which is why a 2.37 cinemascope cut
 * and a 9:16 phone capture can sit side by side with neither one trimmed.
 */
function Card({ tile }: { tile: CollageTile }) {
  return (
    <figure style={{ aspectRatio: `${tile.w} / ${tile.h}` }} className="v3-stream-card">
      {tile.video ? (
        <LoopVideo
          src={tile.video}
          poster={tile.poster}
          className="absolute inset-0 size-full object-cover"
        />
      ) : tile.src ? (
        <Image
          src={tile.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 28vw, 45vw"
          className="object-cover"
        />
      ) : null}
    </figure>
  );
}
