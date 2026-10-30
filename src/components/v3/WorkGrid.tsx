import Image from "next/image";
import Link from "next/link";
import { LoopVideo } from "@/components/v3/LoopVideo";
import type { Project } from "@/types";

/**
 * Selected work as a two-up grid of covers, each captioned with two quiet
 * rows: the name in the hero serif with the category opposite, then the tags
 * and a [view] marker in mono. One column on a phone.
 */
export function WorkGrid({ projects, total }: { projects: Project[]; total: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <h2
          data-reveal-item
          className="font-hero-serif text-[clamp(2rem,3.4vw,3rem)] font-light leading-[1.05] tracking-[-0.02em] text-v3-fg"
        >
          Selected work
        </h2>
        <Link
          href="/case-studies"
          className="font-mono text-xs uppercase tracking-[0.06em] text-v3-muted transition-colors duration-200 hover:text-v3-fg"
        >
          [All {String(total).padStart(2, "0")}]
        </Link>
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-x-3 gap-y-10 md:grid-cols-2">
        {projects.map((project) => (
          <li key={project.slug} data-reveal-item>
            <Link
              href={`/projects/${project.slug}`}
              data-cursor-label="Read case study"
              className="group/cover block"
            >
              <Cover project={project} />

              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="truncate font-hero-serif text-[26px] font-light leading-tight tracking-[-0.01em] text-v3-fg">
                  {project.shortName ?? project.title}
                </h3>
                <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.06em] text-v3-fg">
                  {project.category}
                </p>
              </div>

              <div className="mt-2 flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.06em] text-v3-muted">
                <p className="flex min-w-0 items-center gap-2">
                  <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-v3-muted" />
                  <span className="truncate">{project.tags.slice(0, 3).join(", ")}</span>
                </p>
                <span className="shrink-0 transition-colors duration-200 group-hover/cover:text-v3-fg">
                  [View]
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The cover: loop, still, or the brand colour with the project's name. */
function Cover({ project }: { project: Project }) {
  const contain = project.coverVideo ? project.coverVideoFit === "contain" : project.coverFit === "contain";
  return (
    <div
      className="relative aspect-[16/10] overflow-hidden"
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
          sizes="(min-width: 768px) 50vw, 100vw"
          className={
            contain
              ? "object-contain p-4 sm:p-8"
              : "object-cover transition-transform duration-500 group-hover/cover:scale-[1.02]"
          }
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center p-8 text-center font-hero-serif text-[clamp(2rem,3.4vw,3rem)] font-light text-white">
          {project.shortName ?? project.title}
        </div>
      )}
    </div>
  );
}
