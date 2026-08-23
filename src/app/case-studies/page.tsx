"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { StackCard } from "@/components/ui/StackCard";

export default function CaseStudiesPage() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((project) => project.category)))],
    []
  );
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <main className="min-h-screen bg-v2-cream pb-24 pt-28 sm:pt-36">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-v2-ink/60 transition-colors duration-200 hover:text-v2-orange-ink"
        >
          <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden />
          Back home
        </Link>

        <Reveal>
          <div className="mt-10 flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-v2-orange-ink">
            <span aria-hidden className="inline-block size-2 rotate-45 bg-v2-orange" />
            All case studies
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-4 font-grotesk text-[clamp(2rem,5vw,3.5rem)] font-black leading-[0.98] tracking-[-0.03em] text-v2-ink">
            every project, one page
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-v2-ink/70">
            Filter by industry to find the kind of work you&apos;re looking for.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-wrap gap-3">
            {categories.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  className={`rounded-full px-5 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-200 ${
                    isActive
                      ? "bg-v2-ink text-white"
                      : "border border-v2-ink/15 text-v2-ink/65 hover:border-v2-ink/35 hover:text-v2-ink"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </Reveal>

      </div>

      {filtered.length > 0 ? (
        <div className="relative mt-16">
          {filtered.map((project, index) => (
            <StackCard key={project.slug} index={index} isLast={index === filtered.length - 1}>
              <ProjectCard project={project} index={index} />
            </StackCard>
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-v2-ink/60">
          No case studies in this category yet.
        </p>
      )}
    </main>
  );
}
