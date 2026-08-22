import Link from "next/link";
import { ArrowUpRight, ImageIcon, Lock } from "lucide-react";
import type { Project } from "@/types";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-surface shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
      <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col">
          <div className="flex items-center justify-between text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">
              {number}
            </span>
            <span className="text-sm font-medium text-white/60">{project.year}</span>
          </div>

          <h3 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            {project.title}
          </h3>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-6">
            <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80">
              {project.category}
            </span>
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-6 text-base leading-relaxed text-white/70 sm:text-lg">
            {project.summary}
          </p>

          <div className="mt-8">
            {project.liveUrl ? (
              <Link
                href={`/projects/${project.slug}`}
                className="group inline-flex items-center gap-3 rounded-full bg-white py-1 pl-1 pr-5 transition-colors duration-200 hover:bg-white/90"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </span>
                <span className="font-semibold text-neutral-900">View Case Study</span>
              </Link>
            ) : (
              <span className="inline-flex items-center gap-3 rounded-full bg-white/10 py-1 pl-1 pr-5 text-white/60">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <Lock className="h-4 w-4" aria-hidden />
                </span>
                <span className="font-semibold">Coming Soon</span>
              </span>
            )}
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5 lg:aspect-auto lg:h-full lg:min-h-[320px]">
          <div className="flex h-full w-full items-center justify-center">
            <ImageIcon className="h-16 w-16 text-white/20" aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}
