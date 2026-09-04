import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { WorkCard } from "@/components/v3/WorkCard";
import { projects } from "@/content/projects";

/**
 * The full case-study index.
 *
 * The homepage carries a shortlist; this is the complete list, including the
 * ones still being written — they show as blurred "coming soon" tiles, which
 * belongs here rather than on a homepage a reviewer skims in a minute.
 *
 * Same card as the homepage grid, same chrome as the case-study pages, so
 * moving between the three does not feel like moving between sites.
 */

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Product design case studies — fintech, developer tools, healthcare and AI, with the decisions behind each.",
};

export default function CaseStudiesPage() {
  // Written ones first, then the placeholders, each keeping the order they have
  // in the content file. A blurred tile between two finished ones reads as a
  // gap; grouped at the end it reads as a roadmap.
  const written = projects.filter((project) => !project.comingSoon);
  const upcoming = projects.filter((project) => project.comingSoon);
  const ordered = [...written, ...upcoming];

  const categories = [...new Set(projects.map((project) => project.category))];

  return (
    <main className="bg-v3-bg">
      <article className="relative bg-v3-bg">
        <div className="v3-hatch v3-bleed absolute inset-y-0 left-0" aria-hidden />
        <div className="v3-hatch v3-bleed absolute inset-y-0 right-0" aria-hidden />

        <div className="v3-column px-5 pb-24 pt-28 sm:px-10 lg:px-16 lg:pb-32 lg:pt-36">
          <header className="mx-auto w-full max-w-[70rem]">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-v3-muted transition-colors duration-200 hover:text-v3-fg"
            >
              <ArrowLeft
                aria-hidden
                className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
                strokeWidth={2}
              />
              Home
            </Link>

            <p
              data-reveal-item
              className="mt-10 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-v3-accent"
            >
              {String(projects.length).padStart(2, "0")} case studies
            </p>

            <h1
              data-reveal-item
              className="mt-5 max-w-[24ch] font-editorial-display text-[clamp(2rem,5vw,4rem)] font-normal leading-[1.02] tracking-[-0.025em] text-v3-fg"
            >
              Every case study, in one place.
            </h1>

            <p
              data-reveal-item
              className="mt-7 max-w-[42rem] text-base leading-relaxed text-v3-muted sm:text-lg"
            >
              {categories.join(" · ")} — the problem each product had, the calls
              I made, and what shipped.
            </p>
          </header>

          <ul className="mx-auto mt-16 grid w-full max-w-[70rem] items-stretch gap-5 sm:gap-6 lg:mt-20 lg:grid-cols-2 lg:gap-8">
            {ordered.map((project, index) => (
              <li
                key={project.slug}
                data-reveal-item
                style={{ "--reveal-delay": index % 2 } as React.CSSProperties}
              >
                <WorkCard project={project} index={index} />
              </li>
            ))}
          </ul>

          {upcoming.length > 0 && (
            <p className="mx-auto mt-10 w-full max-w-[70rem] font-mono text-[11px] uppercase tracking-[0.16em] text-v3-muted/70">
              {String(upcoming.length).padStart(2, "0")} still being written
            </p>
          )}
        </div>
      </article>
    </main>
  );
}
