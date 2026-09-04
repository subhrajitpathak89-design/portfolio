import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LoopVideo } from "@/components/v3/LoopVideo";
import { ToolMarks } from "@/components/v3/ToolMarks";
import type { Project } from "@/types";

/**
 * One case-study tile.
 *
 * Its own file because two surfaces render it now — the homepage's selected
 * work and the full case-study index — and a card that drifts between the two
 * would be the most obvious kind of inconsistency on the site.
 */
export function WorkCard({ project, index }: { project: Project; index: number }) {
  const headline = project.results?.[0];

  // A card with nowhere to go is a plain container, not a link. Rendering an
  // anchor and then suppressing it would still put it in the tab order and the
  // accessibility tree as a link to a page that is not ready.
  // `ElementType` because the two branches take different props, and a union of
  // `"div" | typeof Link` cannot be spread into without TypeScript demanding an
  // `href` the div has no use for.
  const Tile: React.ElementType = project.comingSoon ? "div" : Link;
  // `data-cursor-label` is what the site cursor reads: it unfolds the tag on
  // the pointer while it is over this card. Only on a card that goes
  // somewhere — offering to read a case study the click cannot open is a
  // promise the tile has no way to keep, which is the same reason it is not a
  // link in the first place.
  const tileProps = project.comingSoon
    ? { "aria-label": `${project.title} — case study coming soon` }
    : {
        href: `/projects/${project.slug}`,
        "data-cursor-label": "Read case study",
      };

  return (
    // The whole tile is the link. At two-up density a "View case study" button
    // on every card is four buttons of noise for an affordance the cursor
    // already gives you; the arrow in the footer carries it instead.
    <Tile
      {...tileProps}
      className={`group/card relative flex h-full flex-col overflow-hidden rounded-2xl border border-v3-line bg-v3-surface p-4 transition-colors duration-300 focus-visible:outline-none sm:p-5 ${
        project.comingSoon
          ? "cursor-default"
          : "hover:border-v3-accent/45 focus-visible:border-v3-accent"
      }`}
    >
      {/* No tinted ground. This held a drifting dither field, then a gradient
          in the project's own colour once the canvases came out — and the
          colour was the only thing justifying it. Only one project sets a
          `brand`, so in practice it painted a magenta wash across the bottom
          of a single card and a smudge of site accent across the others: not a
          system, just an inconsistency. The cover already carries whatever
          colour a project has. The card is the surface it sits on. */}
      <div className="relative overflow-hidden rounded-xl border border-v3-line bg-v3-bg">
        {/* Blurred rather than hidden: the cover still says what the project
            looks like, while being unmistakably not-yet-readable. The blur sits
            on a wrapper so it cannot be defeated by the video's own layer, and
            the badge above it stays sharp. */}
        <div
          className={`relative aspect-[16/10] ${
            project.comingSoon ? "scale-[1.04] blur-[6px]" : ""
          }`}
        >
          {project.coverVideo ? (
            /* A moving cover. `LoopVideo` is the same component the case-study
               steps use, so this inherits their two rules for free: nothing
               plays off screen, and reduced motion holds the poster.

               `coverVideoFit` decides the rest — its own field, not the
               `coverFit` that describes the still, because a project can want
               one answer for its hero image and the other for its loop. It
               defaults to `cover`, for a clip exported at the card's own 16:10,
               which fills the frame with nothing lost. `contain` is for a
               capture of a wide desktop window: the whole window stays visible
               and the card mattes it, rather than the frame cropping into the
               UI. No hover scale either way — a loop that also creeps forward
               under the cursor is two motions fighting for one glance. */
            <LoopVideo
              src={project.coverVideo}
              poster={project.coverPoster}
              className={
                project.coverVideoFit === "contain"
                  ? "absolute inset-0 size-full object-contain p-2 sm:p-3"
                  : "absolute inset-0 size-full object-cover"
              }
            />
          ) : project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={`${project.title} cover`}
              fill
              sizes="(min-width: 1024px) 39rem, (min-width: 640px) 90vw, 100vw"
              // Contained covers get a hairline of breathing room and no
              // more: at half the page width a portrait mockup inside a 16/10
              // frame is already losing to its own side gutters, and generous
              // padding on top of that shrinks the product to a thumbnail.
              className={
                project.coverFit === "contain"
                  ? "object-contain p-2 sm:p-3"
                  : "object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
              }
            />
          ) : (
            // Standing in for the missing screens with the project's headline
            // result rather than a grey box. The number is the thing a reviewer
            // is looking for anyway, so the placeholder does real work until
            // the covers land. It used to be a second dither field, which put
            // two of them in one card — one behind the other — for a frame
            // budget no card should be spending. The hatch is the site's own
            // texture and it is a static CSS pattern, so it costs nothing.
            <div className="v3-hatch absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
              {headline && (
                <>
                  <p className="font-grotesk text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-none tracking-[-0.03em] text-v3-accent">
                    {headline.metric}
                  </p>
                  {/* Sentence case and clamped: these labels are full
                      sentences, and three lines of letterspaced caps in a
                      placeholder shouts louder than the title above it.

                      Gone below `sm`. On a phone the card is a single column
                      of stacked text and this sentence is the fourth thing
                      explaining the same project — the metric above it already
                      makes the point on its own.

                      `max-sm:hidden` rather than `hidden sm:block`: the clamp
                      is implemented as `display: -webkit-box`, so restoring
                      visibility with `block` silently overrides it and the
                      label runs to full length. Hiding downward leaves the
                      clamp's own display intact. */}
                  <p className="mt-2 line-clamp-2 max-w-[34ch] text-xs leading-relaxed text-v3-muted max-sm:hidden">
                    {headline.label}
                  </p>
                </>
              )}
            </div>
          )}

          {/* The reference puts a read-time here. The result is the number a
              reviewer is scanning for, so it gets the slot instead — and only
              when the cover is a real screenshot, since the placeholder above
              is already showing it. Its own translucent ground, because it has
              to stay legible over whatever the screenshot puts behind it. */}
          {headline && !project.comingSoon && (project.coverVideo || project.coverImage) && (
            <p className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 font-mono text-[11px] font-medium tracking-[0.04em] text-white backdrop-blur-md sm:right-4 sm:top-4">
              {headline.metric}
            </p>
          )}
        </div>

        {/* Outside the blurred wrapper, so the badge reads while the cover
            behind it does not. */}
        {project.comingSoon && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-full border border-v3-line bg-v3-surface/85 px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-v3-fg backdrop-blur-sm">
              Coming soon
            </span>
          </div>
        )}
      </div>

      <div className="relative flex flex-1 flex-col pt-5 sm:pt-6">
        <div className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em]">
          <span className="text-v3-accent">{String(index + 1).padStart(2, "0")}</span>
          <span className="h-px w-6 bg-v3-line" aria-hidden />
          <span className="text-v3-muted">
            {project.category} · {project.year}
          </span>
        </div>

        <h3 className="mt-4 font-editorial-display text-[clamp(1.25rem,2vw,1.75rem)] font-normal leading-[1.1] tracking-[-0.015em] text-v3-fg">
          {project.title}
        </h3>

        {/* Clamped rather than left to run: two cards in a row read as one
            object, and a three-line summary next to a one-line summary makes
            the pair look broken. The measure is capped separately from the
            clamp — a card is wide enough on a large monitor to fit 100
            characters on a line, which is well past readable no matter how
            few lines of it there are. */}
        <p className="mt-3 line-clamp-2 max-w-[62ch] text-sm leading-relaxed text-v3-muted">
          {project.summary}
        </p>

        {/* Two tags on a phone, three from `sm`. Three fit on one line only
            just, and the moment one of them is a long label they wrap to a
            second row and the card gains a band of chrome it does not need.
            Rendered and hidden rather than sliced, so this stays one tree. */}
        <ul className="mt-4 flex flex-wrap gap-2 sm:mt-5">
          {project.tags.slice(0, 3).map((tag, tagIndex) => (
            <li
              key={tag}
              className={`rounded-md border border-v3-line bg-v3-bg px-2.5 py-1 font-mono text-[11px] text-v3-muted${
                tagIndex === 2 ? " hidden sm:block" : ""
              }`}
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* `mt-auto` against the stretched row height: the footers of two
            cards line up even when one title wraps and the other does not. */}
        <div className="mt-auto flex items-center justify-between gap-4 pt-5 sm:pt-6">
          {/* The tools strip is the first thing to go on a phone. Squeezed
              against the CTA it broke its own "Built with" label onto two
              lines and pushed "Read case study" onto two more — four lines of
              wrapped chrome to say something no one is deciding on from a
              phone. Hidden rather than dropped from the tree so the desktop
              row is unchanged; with it out of the flow, `justify-between`
              leaves the CTA at the start on one line. */}
          {project.tools && project.tools.length > 0 && (
            <div className="hidden sm:block">
              <ToolMarks tools={project.tools} />
            </div>
          )}

          {/* `whitespace-nowrap` regardless of breakpoint: three words broken
              across two lines beside an arrow stops looking like a link. */}
          {project.comingSoon ? (
            <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.16em] text-v3-muted">
              Coming soon
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-grotesk text-sm font-semibold tracking-[-0.005em] text-v3-fg transition-colors duration-200 group-hover/card:text-v3-accent">
              Read case study
              <ArrowUpRight
                aria-hidden
                className="size-4 transition-transform duration-200 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
                strokeWidth={2.5}
              />
            </span>
          )}
        </div>
      </div>
    </Tile>
  );
}
