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
      className={`relative flex min-h-[560px] flex-col overflow-hidden rounded-[2rem] bg-gradient-to-br ${gradient} shadow-[0_30px_60px_rgba(0,0,0,0.4)] sm:min-h-[600px]`}
    >
      {/* Frosted glass content panel */}
      <div className="relative z-10 flex max-w-xl flex-col px-8 pt-10 sm:px-12 sm:pt-12">
        <div className="flex items-center justify-between text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-semibold backdrop-blur-md">
            {number}
          </span>
          <span className="text-sm font-medium text-white/70">{project.year}</span>
        </div>

        <h3 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
          {project.title}
        </h3>

        <div className="mt-6 flex flex-wrap gap-2 border-t border-white/20 pt-6">
          <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
            {project.category}
          </span>
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md"
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
            <span className="inline-flex items-center gap-3 rounded-full bg-white/20 py-1 pl-1 pr-5 text-white/70 backdrop-blur-md">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Lock className="h-4 w-4" aria-hidden />
              </span>
              <span className="font-semibold">Coming Soon</span>
            </span>
          )}
        </div>
      </div>

      {/* Blurred "screenshot" placeholder peeking in below the text, like a photo bleeding under glass */}
      <div className="relative mt-8 flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20" />
        <div className="absolute inset-x-6 bottom-0 top-4 rounded-t-2xl border border-white/15 bg-white/10 backdrop-blur-2xl sm:inset-x-10">
          <div className="flex h-full items-center justify-center">
            <ImageIcon className="h-16 w-16 text-white/30 blur-[1px]" aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}
