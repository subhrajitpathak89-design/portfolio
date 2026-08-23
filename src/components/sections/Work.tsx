import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ImageIcon, Sparkle } from "lucide-react";
import { projects } from "@/content/projects";
import type { Project } from "@/types";

/**
 * Cards cycle through the palette rather than all sharing one colour — as the
 * stack collapses you see each new card slide over the last, and the colour
 * change is what makes that read as movement.
 */
const CARD_COLORS = [
  "bg-v2-periwinkle",
  // Deeper than the brand orange: white body copy on #ff5a00 is only 3.13:1.
  "bg-v2-orange-ink",
  "bg-v2-forest",
  "bg-v2-ink",
];

// The tab's right edge is cut on the diagonal, so it reads as a folder tab
// rather than a plain bar.
const TAB_CLIP = "[clip-path:polygon(0_0,calc(100%-64px)_0,100%_100%,0_100%)]";

// Tags get the mirrored treatment: a clipped top-left corner.
const TAG_CLIP = "[clip-path:polygon(0_28%,12%_0,100%_0,100%_100%,0_100%)]";

export function Work() {
  const featured = projects.filter((project) => project.featured);
  const list = featured.length > 0 ? featured : projects;

  return (
    <section id="work" className="v2-ruled scroll-mt-20 bg-v2-cream py-20 lg:py-28">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-16">
        <header className="mb-14 text-center lg:mb-20">
          <p className="font-script text-2xl text-v2-ink/70 sm:text-3xl">
            selected work
          </p>
          <h2 className="mt-4 font-grotesk text-[clamp(1.75rem,4.2vw,3.5rem)] font-black leading-[0.95] tracking-[-0.03em] text-v2-ink">
            case studies
          </h2>
        </header>

        {/*
          The stacking effect is pure CSS: every card sticks at the same offset,
          so each one pins in place while the next scrolls up and covers it.
          Later siblings paint over earlier ones by document order, so no
          z-index is needed — but the cards must stay fully opaque or the one
          underneath shows through.

          The gap is what supplies the scroll distance between hand-offs.

          Pinning now runs at every size. It used to be gated behind a
          wide-and-tall media query because a sticky card taller than its
          viewport slot strands its own lower half — tags and all —
          permanently out of reach. The fix was to stop the card growing past
          the slot instead of switching the effect off: each card is capped to
          the viewport minus the navbar, and the cover image takes whatever
          height is left over.
        */}
        <div className="flex flex-col gap-10 sm:gap-12 stack-scroll:gap-[12vh]">
          {list.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const color = CARD_COLORS[index % CARD_COLORS.length];
  const projectNumber = String(index + 1).padStart(2, "0");

  return (
    <article className="sticky top-[4.25rem] flex h-[calc(100svh-5rem)] flex-col lg:top-24 lg:h-[calc(100svh-7rem)]">
      <div className="flex shrink-0">
        <span
          className={`${color} ${TAB_CLIP} inline-flex items-center gap-2.5 py-3 pr-16 pl-5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white sm:gap-3.5 sm:py-4 sm:pl-8 sm:pr-24 sm:text-xs`}
        >
          <Sparkle aria-hidden className="size-3.5 shrink-0" fill="currentColor" />
          Project {projectNumber}
        </span>
      </div>

      {/* Two rows below lg — copy on top, cover taking whatever is left — and
          two columns above it. `minmax(0,1fr)` rather than `1fr` so the cover
          row is allowed to shrink instead of forcing the card taller. */}
      <div
        className={`${color} grid min-h-0 flex-1 grid-cols-1 grid-rows-[auto_minmax(0,1fr)] gap-5 p-5 sm:gap-8 sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:grid-rows-1 lg:gap-12 lg:p-14`}
      >
        <div className="flex min-h-0 flex-col">
          <span className="inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white sm:text-sm">
            <span aria-hidden className="size-2.5 shrink-0 rounded-full bg-white" />
            {project.category} · {project.year}
          </span>

          <h3 className="mt-4 font-grotesk text-[clamp(1.5rem,4.5vw,4rem)] font-black leading-[0.95] tracking-[-0.03em] text-white">
            {project.title}
          </h3>

          <p className="mt-4 line-clamp-3 max-w-lg text-sm leading-relaxed text-white sm:mt-5 sm:line-clamp-none sm:text-lg">
            {project.summary}
          </p>

          <Link
            href={`/projects/${project.slug}`}
            className="mt-6 inline-flex items-center gap-2.5 self-start border-b-2 border-white pb-1 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white transition-opacity duration-200 hover:opacity-70 sm:mt-8 sm:text-sm"
          >
            View project
            <ArrowUpRight aria-hidden className="size-4 shrink-0" strokeWidth={2.5} />
          </Link>

          {/* `mt-auto` only bites once the column is stretched, which happens
              from lg. Below that the tags just follow the link, so the top
              padding does the spacing instead. */}
          <ul className="mt-auto flex flex-wrap gap-2 pt-6 sm:gap-2.5 sm:pt-8 lg:pt-12">
            {project.tags.slice(0, 3).map((tag) => (
              <li
                key={tag}
                className={`${TAG_CLIP} bg-v2-cream px-3.5 pb-1.5 pt-2 font-mono text-[11px] font-bold uppercase tracking-wide text-v2-ink sm:px-4 sm:text-sm`}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="min-h-0">
          {/* Full height of whatever the grid row leaves, so the cover is the
              part that gives way when the copy runs long — the card itself
              never outgrows its sticky slot. */}
          <div className="relative h-full min-h-0">
            {/* Tape strips holding the photo to the card. */}
            <span
              aria-hidden
              className="absolute -left-4 -top-3 z-10 h-6 w-20 -rotate-[9deg] bg-white/55 shadow-[0_1px_3px_rgba(17,17,17,0.15)] sm:w-24"
            />
            <span
              aria-hidden
              className="absolute -right-4 -top-3 z-10 h-6 w-20 rotate-[9deg] bg-white/55 shadow-[0_1px_3px_rgba(17,17,17,0.15)] sm:w-24"
            />

            <div className="relative h-full min-h-[6rem] w-full overflow-hidden border-4 border-white bg-v2-cream">
              {project.coverImage ? (
                <Image
                  src={project.coverImage}
                  alt={`${project.title} cover`}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
              ) : (
                // Same placeholder contract as the About collage: set
                // `coverImage` in content/projects.ts and it swaps in with no
                // layout change.
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-v2-ink/65">
                  <ImageIcon aria-hidden className="size-8" strokeWidth={1.5} />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]">
                    cover image
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
