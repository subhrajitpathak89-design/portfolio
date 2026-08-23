import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ImageIcon, Lock } from "lucide-react";
import type { Project } from "@/types";

type ProjectCardProps = {
  project: Project;
  index: number;
};

const TAG_CLIP = "[clip-path:polygon(0_28%,12%_0,100%_0,100%_100%,0_100%)]";

export function ProjectCard({ project, index }: ProjectCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-v2-ink/10 bg-white shadow-[0_24px_60px_-30px_rgba(17,17,17,0.35)]">
      <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <span className="flex size-9 items-center justify-center rounded-full bg-v2-ink font-mono text-xs font-bold text-white">
              {number}
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-v2-ink/60">
              {project.year}
            </span>
          </div>

          <h3 className="mt-7 font-grotesk text-3xl font-black leading-[0.98] tracking-[-0.03em] text-v2-ink sm:text-4xl">
            {project.title}
          </h3>

          <ul className="mt-7 flex flex-wrap gap-2.5 border-t border-v2-ink/10 pt-7">
            {[project.category, ...project.tags.slice(0, 2)].map((tag) => (
              <li
                key={tag}
                className={`${TAG_CLIP} bg-v2-cream px-3.5 pb-1.5 pt-2 font-mono text-[11px] font-bold uppercase tracking-wide text-v2-ink`}
              >
                {tag}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-base leading-relaxed text-v2-ink/70">{project.summary}</p>

          <div className="mt-9">
            {project.liveUrl ? (
              <Link
                href={`/projects/${project.slug}`}
                className="group inline-flex items-center gap-3 rounded-full bg-v2-ink py-1 pl-1 pr-5 transition-colors duration-200 hover:bg-v2-orange"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-white text-v2-ink transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <ArrowUpRight className="size-4" strokeWidth={2.5} aria-hidden />
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-white">
                  Read case study
                </span>
              </Link>
            ) : (
              <span className="inline-flex items-center gap-3 rounded-full bg-v2-ink/5 py-1 pl-1 pr-5 text-v2-ink/60">
                <span className="flex size-10 items-center justify-center rounded-full bg-v2-ink/10">
                  <Lock className="size-4" aria-hidden />
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.16em]">
                  Coming soon
                </span>
              </span>
            )}
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-v2-ink/10 bg-v2-cream lg:aspect-auto lg:h-full lg:min-h-[320px]">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={`${project.title} cover`}
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ImageIcon className="size-12 text-v2-ink/15" strokeWidth={1.5} aria-hidden />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
