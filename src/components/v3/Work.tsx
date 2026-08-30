import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DitherField } from "@/components/v3/DitherField";
import { ToolMarks } from "@/components/v3/ToolMarks";
import { projects } from "@/content/projects";
import type { Project } from "@/types";

/**
 * The case-study stack.
 *
 * Every card pins at the same offset, so each one holds while the next scrolls
 * up and covers it. Later siblings paint over earlier ones by document order,
 * which is why no z-index is involved — but it also means every card has to
 * stay fully opaque, or the one underneath shows through mid-handoff.
 *
 * The gap between cards is what supplies the scroll distance for each handoff.
 */
export function Work() {
  const featured = projects.filter((project) => project.featured);
  const list = featured.length > 0 ? featured : projects;

  return (
    <section id="work" className="relative scroll-mt-24 bg-v3-bg">
      <div className="v3-hatch absolute inset-y-0 left-0 w-4 sm:w-8 lg:w-14" aria-hidden />
      <div className="v3-hatch absolute inset-y-0 right-0 w-4 sm:w-8 lg:w-14" aria-hidden />

      {/* Continues the hero's vertical rules down the page. */}
      <div className="mx-4 border-x border-v3-line px-5 py-24 sm:mx-8 sm:px-10 lg:mx-14 lg:px-16 lg:py-32">
        <header className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-v3-accent">
              Selected work
            </p>
            <h2 className="mt-4 max-w-[20ch] font-grotesk text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.03em] text-v3-fg">
              Four projects, and what <span className="text-v3-accent">changed</span> in each.
            </h2>
          </div>

          <p className="font-mono text-xs text-v3-muted">
            {String(list.length).padStart(2, "0")} case studies
          </p>
        </header>

        <div className="mt-16 flex flex-col gap-8 lg:mt-20 lg:gap-[12vh]">
          {list.map((project, index) => (
            <WorkCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({ project, index }: { project: Project; index: number }) {
  const headline = project.results?.[0];

  return (
    // Capped to the viewport rather than left to grow: a sticky card taller
    // than its slot strands its own lower half permanently out of reach.
    <article className="sticky top-16 h-[calc(100svh-6rem)] lg:top-20 lg:h-[calc(100svh-8rem)]">
      <div className="group/card grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-6 overflow-hidden rounded-2xl border border-v3-line bg-v3-surface p-5 sm:p-8 lg:grid-cols-[1fr_1.05fr] lg:grid-rows-1 lg:gap-12 lg:p-10">
        <div className="flex min-h-0 flex-col">
          <div className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em]">
            <span className="text-v3-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-6 bg-v3-line" aria-hidden />
            <span className="text-v3-muted">
              {project.category} · {project.year}
            </span>
          </div>

          <h3 className="mt-5 font-grotesk text-[clamp(1.5rem,2.6vw,2.5rem)] font-medium leading-[1.04] tracking-[-0.03em] text-v3-fg">
            {project.title}
          </h3>

          <p className="mt-4 line-clamp-3 max-w-lg text-sm leading-relaxed text-v3-muted sm:line-clamp-none sm:text-base">
            {project.summary}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-v3-line bg-v3-bg px-3 py-1.5 font-mono text-[11px] text-v3-muted"
              >
                {tag}
              </li>
            ))}
          </ul>

          {project.tools && project.tools.length > 0 && (
            <div className="mt-7">
              <ToolMarks tools={project.tools} />
            </div>
          )}

          {/* `mt-auto` only bites once the column is stretched, which happens
              from lg. Below that the top padding does the spacing. */}
          <div className="mt-auto pt-8">
            <Link
              href={`/projects/${project.slug}`}
              className="group inline-flex items-center gap-2 rounded-lg bg-v3-accent px-5 py-3 font-grotesk text-sm font-semibold tracking-[-0.005em] text-v3-bg transition-colors duration-200 hover:bg-v3-accent-bright"
            >
              View case study
              <ArrowUpRight
                aria-hidden
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.5}
              />
            </Link>
          </div>
        </div>

        <div className="relative min-h-0 overflow-hidden rounded-xl border border-v3-line bg-v3-bg">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={`${project.title} cover`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            // Standing in for the missing screens with the project's headline
            // result rather than a grey box. The number is the thing a reviewer
            // is looking for anyway, so the placeholder does real work until the
            // covers land — and it is the same terrain as the hero, seeded
            // differently per card so the four are not identical.
            <>
              <DitherField
                scenes={["terrain"]}
                animate={false}
                timeOffset={index * 9}
                className="absolute inset-0 h-full w-full opacity-45"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,var(--v3-surface)_100%)] opacity-70"
              />

              {headline && (
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="font-grotesk text-[clamp(1.75rem,3.4vw,3rem)] font-medium leading-none tracking-[-0.03em] text-v3-accent">
                    {headline.metric}
                  </p>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-v3-muted">
                    {headline.label}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  );
}
