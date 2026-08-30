import Image from "next/image";
import { DitherField } from "@/components/v3/DitherField";
import { playground } from "@/content/playground";
import { profile } from "@/content/profile";
import type { PlaygroundFolder } from "@/types";

/**
 * Playground, rebuilt in the v3 language.
 *
 * The v2 version was a scrapbook: pastel folders on a photograph of hills. The
 * gesture worth keeping from it is the peek — offcuts sticking out of something
 * rather than laid flat in a grid — so that survives, and everything it was
 * drawn with does not. Here a month is a plate: a ruled frame with a dithered
 * ground and its contents fanned at the bottom edge, which is the same
 * spec-drawing material as the case-study cards.
 *
 * Nothing here is a case study, and the page should say so before it shows
 * anything. That is the eyebrow and the intro's whole job.
 */

/** One scene per plate, cycled so no two neighbours share a ground. */
const GROUNDS = ["terrain", "flower", "globe"] as const;

export function Playground() {
  const { heading, intro, folders, todo } = playground;

  return (
    <section className="relative bg-v3-bg">
      <div className="v3-hatch absolute inset-y-0 left-0 w-4 sm:w-8 lg:w-14" aria-hidden />
      <div className="v3-hatch absolute inset-y-0 right-0 w-4 sm:w-8 lg:w-14" aria-hidden />

      <div className="mx-4 border-x border-v3-line px-5 pb-24 pt-28 sm:mx-8 sm:px-10 lg:mx-14 lg:px-16 lg:pb-32 lg:pt-36">
        <header className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-v3-accent">
              Playground
            </p>

            <h1 className="mt-4 max-w-[18ch] font-grotesk text-[clamp(1.75rem,4.4vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-v3-fg">
              {heading.lead} <span className="text-v3-accent">{heading.accent}</span>{" "}
              {heading.tail}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-v3-muted sm:text-lg">
              {intro}
            </p>
          </div>

          <p className="font-mono text-xs text-v3-muted">
            {String(folders.length).padStart(2, "0")} folders
          </p>
        </header>

        {/* Full-bleed to the frame rules: a carousel that stops short of the
            edge reads as a stalled grid, while one that runs into the margin
            reads as a strip passing through. */}
        <div className="v3-drift-viewport relative mt-16 -mx-5 overflow-hidden sm:-mx-10 lg:mt-20 lg:-mx-16 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          {/* Spacing rides on each card's right margin rather than a flex gap:
              with `gap`, half the track's width lands half a gap off and the
              loop visibly jumps every pass. */}
          <ul className="v3-drift flex w-max">
            {/* Rendered twice so the loop has something to hand over to. The
                second pass is decoration — the months are already in the
                accessibility tree once. */}
            {[...folders, ...folders].map((folder, index) => {
              const original = index < folders.length;

              return (
                <li
                  key={`${folder.month}-${index}`}
                  aria-hidden={!original}
                  className="mr-6 w-[260px] shrink-0 sm:w-[300px] lg:mr-8 lg:w-[340px]"
                >
                  <Plate folder={folder} index={index % folders.length} />
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-20 border-t border-v3-line pt-10 lg:mt-28">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-v3-muted">
            {todo.title}
          </p>

          <ul className="mt-8 max-w-2xl">
            {todo.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-4 border-b border-v3-line py-4 first:border-t"
              >
                <span aria-hidden className="mt-[9px] size-1.5 shrink-0 bg-v3-accent" />
                <span className="text-base leading-relaxed text-v3-muted">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-[11px] text-v3-muted/70">{todo.note}</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-v3-muted/70">
              {profile.name}&rsquo;s creative space
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * A month, as a plate.
 *
 * The contents sit on the bottom edge of the frame rather than centred in it,
 * so they read as sticking out of something — the one thing the paper folders
 * did that a plain thumbnail grid cannot. Hovering lifts the fan; the tilt
 * itself is an inline transform, so the lift has to live on a wrapper or the
 * two would overwrite each other.
 */
function Plate({ folder, index }: { folder: PlaygroundFolder; index: number }) {
  const ground = GROUNDS[index % GROUNDS.length];

  return (
    <article className="group rounded-xl border border-v3-line bg-v3-surface p-3 transition-colors duration-200 hover:border-v3-muted/40">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-v3-line bg-v3-bg">
        {/* Static: six animated fields on one page is six rAF loops for a
            backdrop nobody is watching. */}
        <DitherField
          scenes={[ground]}
          animate={false}
          timeOffset={index * 11}
          className="absolute inset-0 h-full w-full opacity-40"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,var(--v3-bg)_100%)] opacity-80"
        />

        {/* Inset well past the frame edge: the peek widths are a share of this
            row, so narrowing it is what keeps the fan to the lower third of the
            plate instead of filling it. */}
        <div className="absolute inset-x-[18%] bottom-0 flex items-end justify-center gap-[4%]">
          {folder.peeks.map((peek, peekIndex) => (
            <div
              key={peekIndex}
              className="transition-transform duration-300 ease-out group-hover:-translate-y-1.5"
              style={{ width: `${peek.width}%` }}
            >
              <div
                className="relative overflow-hidden rounded-[3px] border border-v3-line bg-v3-chip"
                style={{
                  aspectRatio: "3 / 4",
                  transform: `rotate(${peek.rotate}deg)`,
                }}
              >
                {peek.src && (
                  <Image
                    src={peek.src}
                    alt={peek.alt}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 px-1 pb-1">
        <div className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em]">
          <span className="text-v3-accent">{String(index + 1).padStart(2, "0")}</span>
          <span className="h-px w-5 bg-v3-line" aria-hidden />
          <span className="text-v3-fg">{folder.month}</span>
        </div>

        <p className="font-mono text-[11px] text-v3-muted/70">
          {String(folder.peeks.length).padStart(2, "0")} pieces
        </p>
      </div>
    </article>
  );
}
