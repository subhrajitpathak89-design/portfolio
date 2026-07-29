import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/40",
        className,
      )}
    >
      <div className="relative aspect-[8/5] overflow-hidden bg-muted">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <PlaceholderImage
              seed={project.slug}
              label={project.title}
              caption={project.category}
            />
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>

        <h3 className="font-display text-xl font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent">
          {project.title}
        </h3>

        <p className="text-sm leading-relaxed text-muted-foreground">{project.summary}</p>

        <div className="mt-auto flex items-center gap-2 pt-4 text-sm font-medium text-foreground">
          View case study
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </div>
      </div>
    </Link>
  );
}
