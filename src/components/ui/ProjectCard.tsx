import Link from "next/link";
import { ArrowUpRight, ImageIcon, Lock } from "lucide-react";
import type { Project } from "@/types";

const GRADIENTS = [
  "from-sky-500 via-blue-500 to-blue-600",
  "from-amber-500 via-orange-500 to-orange-600",
  "from-violet-500 via-purple-500 to-purple-700",
  "from-emerald-500 via-teal-500 to-teal-600",
];

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const number = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${gradient} px-8 py-10 shadow-[0_30px_60px_rgba(0,0,0,0.4)] sm:px-12 sm:py-12`}
    >
      <div className="relative z-10 flex max-w-xl flex-col">
        <div className="flex items-center justify-between text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-semibold">
            {number}
          </span>
          <span className="text-sm font-medium text-white/70">{project.year}</span>
        </div>

        <h3 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
          {project.title}
        </h3>

        <div className="mt-6 flex flex-wrap gap-2 border-t border-white/20 pt-6">
          <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white">
            {project.category}
          </span>
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-6 text-base leading-relaxed text-white/90 sm:text-lg">
          {project.summary}
        </p>

        <div className="mt-8">
          {project.liveUrl ? (
            <Link
              href={`/projects/${project.slug}`}
              className="group inline-flex items-center gap-3 rounded-full bg-white/95 py-1 pl-1 pr-5 transition-colors duration-200 hover:bg-white"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </span>
              <span className="font-semibold text-neutral-900">View Case Study</span>
            </Link>
          ) : (
            <span className="inline-flex items-center gap-3 rounded-full bg-white/20 py-1 pl-1 pr-5 text-white/70">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Lock className="h-4 w-4" aria-hidden />
              </span>
              <span className="font-semibold">Coming Soon</span>
            </span>
          )}
        </div>
      </div>

      <div
        className="pointer-events-none absolute -bottom-10 -right-6 hidden aspect-[9/19] w-48 rounded-[2rem] border border-white/25 bg-white/10 backdrop-blur-sm sm:right-10 sm:flex sm:items-center sm:justify-center md:flex lg:-bottom-16 lg:w-56"
        aria-hidden
      >
        <ImageIcon className="h-10 w-10 text-white/50" />
      </div>
    </div>
  );
}
