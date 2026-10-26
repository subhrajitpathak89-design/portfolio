"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LoopVideo } from "@/components/v3/LoopVideo";
import type { Project } from "@/types";

/**
 * Selected work as a scroll-driven split.
 *
 * The covers run large down the right; the left column is sticky and always
 * describes whichever cover is crossing the middle of the viewport — name,
 * summary, headline result. One project is "open" at a time, which is the
 * reading order a case-study list wants, without spending a whole viewport of
 * pinning per project.
 *
 * Below `lg` there is no room for a sticky column, so each cover carries its
 * own caption underneath instead.
 */
export function WorkScroller({ projects, total }: { projects: Project[]; total: number }) {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    // A thin band across the middle of the viewport: whichever cover is in
    // it is the one the left column describes.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [projects.length]);

  const current = projects[active];

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,32%)_minmax(0,1fr)] lg:gap-12">
      <aside className="lg:sticky lg:top-24 lg:flex lg:h-[calc(100svh-8rem)] lg:flex-col lg:justify-between">
        <div data-reveal-item>
          <h2 className="font-editorial-display text-[clamp(2rem,3.6vw,3.25rem)] font-normal leading-[1.02] tracking-[-0.015em] text-v3-fg">
            Selected work
          </h2>
          {/* Keyed so the name re-runs its fade each time the active project
              changes, instead of the text just snapping. */}
          {/* The outcome, not the name: a reviewer scanning this column learns
              what changed before they learn what the product was called. The
              name moves down into the meta line. */}
          <p
            key={current.slug}
            className="v3-swap mt-3 hidden max-w-[22ch] text-balance font-editorial-display text-[clamp(1.5rem,2.4vw,2.25rem)] font-normal leading-[1.1] tracking-[-0.015em] text-v3-muted lg:block"
          >
            {current.title}
          </p>
        </div>

        <div key={current.slug} className="v3-swap hidden lg:block">
          <p className="max-w-[40ch] text-[15px] leading-relaxed text-v3-muted">{current.summary}</p>
          <Meta project={current} />
          <Link
            href="/case-studies"
            className="group mt-8 inline-flex items-center gap-1.5 font-mono text-xs text-v3-muted transition-colors duration-200 hover:text-v3-fg"
          >
            All {String(total).padStart(2, "0")} case studies
            <ArrowUpRight
              aria-hidden
              className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </Link>
        </div>
      </aside>

      <ul className="flex flex-col gap-6 lg:gap-8">
        {projects.map((project, index) => (
          <li
            key={project.slug}
            data-index={index}
            ref={(el) => {
              items.current[index] = el;
            }}
          >
            <Link
              href={`/projects/${project.slug}`}
              data-cursor-label="Read case study"
              className="group/cover block"
            >
              <Cover project={project} />
            </Link>

            {/* Phone and tablet caption — the sticky column does this job at `lg`. */}
            <div className="mt-4 lg:hidden">
              <p className="font-editorial-display text-2xl text-v3-fg">{project.title}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-v3-muted">{project.summary}</p>
              <Meta project={project} />
            </div>
          </li>
        ))}
      </ul>

      <Link
        href="/case-studies"
        className="group inline-flex items-center gap-1.5 font-mono text-xs text-v3-muted transition-colors duration-200 hover:text-v3-fg lg:hidden"
      >
        All {String(total).padStart(2, "0")} case studies
        <ArrowUpRight aria-hidden className="size-3.5" strokeWidth={2} />
      </Link>
    </div>
  );
}

/** Headline result, then name · year · category. */
function Meta({ project }: { project: Project }) {
  const headline = project.results?.[0];
  return (
    <div className="mt-6 min-w-0">
      {headline && (
        <p className="truncate font-grotesk text-[15px] font-medium text-v3-fg">{headline.metric}</p>
      )}
      <p className="truncate font-mono text-[11px] uppercase tracking-[0.08em] text-v3-muted">
        {project.shortName ?? project.title} · {project.year} · {project.category}
      </p>
    </div>
  );
}

/** The large cover: loop, still, or the brand colour with the headline result. */
function Cover({ project }: { project: Project }) {
  const contain = project.coverVideo ? project.coverVideoFit === "contain" : project.coverFit === "contain";
  return (
    <div
      className="relative aspect-[16/10] overflow-hidden rounded-xl"
      style={{ background: project.brand ?? "var(--v3-chip)" }}
    >
      {project.coverVideo ? (
        <LoopVideo
          src={project.coverVideo}
          poster={project.coverPoster}
          className={`absolute inset-0 size-full ${contain ? "object-contain p-4 sm:p-8" : "object-cover"}`}
        />
      ) : project.coverImage ? (
        <Image
          src={project.coverImage}
          alt={`${project.title} cover`}
          fill
          sizes="(min-width: 1024px) 62vw, 100vw"
          className={
            contain
              ? "object-contain p-4 sm:p-8"
              : "object-cover transition-transform duration-500 group-hover/cover:scale-[1.02]"
          }
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center p-8 text-center font-editorial-display text-[clamp(2rem,4vw,3.5rem)] text-white">
          {project.shortName ?? project.title}
        </div>
      )}
    </div>
  );
}
