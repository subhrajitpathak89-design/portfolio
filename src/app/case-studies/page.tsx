"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";

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
    <main className="min-h-screen bg-background pb-24 pt-32 sm:pt-40">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back home
        </Link>

        <Reveal>
          <div className="mt-8 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent">
            <span className="inline-block h-2.5 w-2.5 rotate-45 bg-accent" aria-hidden />
            All case studies
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            every project, one page
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
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
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </Reveal>

        {filtered.length > 0 ? (
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {filtered.map((project, index) => (
              <Reveal key={project.slug} delay={0.05 * index} y={32}>
                <ProjectCard project={project} index={index} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-muted-foreground">
            No case studies in this category yet.
          </p>
        )}
      </div>
    </main>
  );
}
