"use client";

import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/content/projects";
import { revealClass, useInView } from "@/lib/useInView";
import { cn } from "@/lib/utils";

export function Projects() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="work" className="border-b border-border py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Selected work"
          title="Six placeholder case studies across six disciplines."
          description="Product, brand, motion, web, editorial and systems design — swap these entries for your own in src/content/projects.ts."
        />

        <div
          ref={ref}
          className={cn(
            "mt-12 grid grid-cols-1 gap-6 transition-all duration-700 ease-out sm:grid-cols-2 lg:grid-cols-3",
            revealClass(inView),
          )}
        >
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
