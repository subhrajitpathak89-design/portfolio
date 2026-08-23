import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, ChevronRight, ImageIcon } from "lucide-react";
import { getProjectBySlug, projects } from "@/content/projects";
import { Reveal } from "@/components/ui/Reveal";
import { PhoneStack } from "@/components/ui/PhoneStack";
import { StepMedia } from "@/components/ui/StepMedia";
import type { ProjectFlow, ProjectTone } from "@/types";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

// Tag chips borrow the clipped corner from the home case-study cards, so the
// two views read as the same family.
const TAG_CLIP = "[clip-path:polygon(0_28%,12%_0,100%_0,100%_100%,0_100%)]";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

function ImageFrame({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl border border-v2-ink/10 bg-white ${className}`}
    >
      <ImageIcon className="size-9 text-v2-ink/20" strokeWidth={1.5} aria-hidden />
    </div>
  );
}

/**
 * A screen or clip, breaking out past the prose column.
 *
 * There is deliberately no panel behind the media. These shots ship with their
 * own backdrop baked into the image, so any surface behind them read as a
 * second card stacked on the first. The project's colour now comes from a
 * tinted glow under this single card instead.
 */
function StepShot({
  image,
  video,
  poster,
  alt,
  tone,
}: {
  image?: string;
  video?: string;
  poster?: string;
  alt: string;
  tone: ProjectTone;
}) {
  return (
    <div className="relative left-1/2 w-[min(92vw,60rem)] -translate-x-1/2">
      {image || video ? (
        <StepMedia video={video} image={image} poster={poster} alt={alt} tone={tone} />
      ) : (
        <ImageFrame className="aspect-[16/10] w-full" />
      )}
    </div>
  );
}

/**
 * Three lines and a flow strip, sitting above everything else.
 *
 * A hiring manager skims before they read. This is the part that has to survive
 * being the only thing they look at: what it was, what I owned, what changed —
 * then the product flow in one line of chips.
 */
function AtAGlance({ tldr, flow }: { tldr?: string[]; flow?: ProjectFlow }) {
  if (!tldr?.length && !flow) return null;

  return (
    <div className="mt-10 rounded-2xl border border-v2-ink/10 bg-white p-6 sm:p-8">
      {tldr && tldr.length > 0 && (
        <>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-v2-orange-ink">
            At a glance
          </p>
          <ul className="mt-5 space-y-3">
            {tldr.map((line) => (
              <li key={line} className="flex items-start gap-3">
                <span aria-hidden className="mt-[9px] size-1.5 shrink-0 rounded-full bg-v2-orange" />
                <span className="text-base leading-relaxed text-v2-ink/80">{line}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {flow && (
        <div className={tldr?.length ? "mt-8 border-t border-v2-ink/10 pt-6" : ""}>
          {/* ink/50 measured 3.54:1 on the white card — below AA for 11px. */}
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-v2-ink/65">
            {flow.label}
          </p>
          {/* Wraps rather than scrolls: a flow you have to drag sideways is a
              flow nobody reads. */}
          <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
            {flow.steps.map((step, index) => (
              <li key={step} className="flex items-center gap-2">
                <span className="rounded-full bg-v2-cream px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-v2-ink">
                  {step}
                </span>
                {index < flow.steps.length - 1 && (
                  <ChevronRight aria-hidden className="size-3.5 shrink-0 text-v2-ink/30" />
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <h2 className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-v2-orange-ink">
      <span aria-hidden className="inline-block size-2 rotate-45 bg-v2-orange" />
      {children}
    </h2>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((entry) => entry.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const meta = [
    { label: "Role", value: project.role },
    { label: "Client", value: project.client ?? project.title },
    { label: "Duration", value: project.duration ?? project.year },
    { label: "Year", value: project.year },
  ];

  const hasStructuredContent = Boolean(project.problem && project.approach && project.results);

  return (
    <main className="bg-v2-cream pb-28 pt-28 sm:pt-36">
      {/* Prose sits in a narrower column than the cover deliberately — long
          body copy stops being readable well before a 16:9 image does. */}
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Reveal>
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-v2-ink/60 transition-colors duration-200 hover:text-v2-orange-ink"
          >
            <ArrowLeft
              className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5"
              aria-hidden
            />
            All work
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-10 font-mono text-xs font-bold uppercase tracking-[0.2em] text-v2-orange-ink">
            {project.category}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-4 font-grotesk text-[clamp(2rem,5vw,3.5rem)] font-black leading-[0.98] tracking-[-0.03em] text-v2-ink">
            {project.title}
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 text-lg leading-relaxed text-v2-ink/70">{project.summary}</p>
        </Reveal>

        {/* The four facts a hiring manager scans for first. */}
        <Reveal delay={0.2}>
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-y border-v2-ink/12 py-7 sm:grid-cols-4">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-v2-ink/60">
                  {item.label}
                </dt>
                <dd className="mt-2 text-sm font-semibold text-v2-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.25}>
          <AtAGlance tldr={project.tldr} flow={project.flow} />
        </Reveal>
      </div>

      <Reveal delay={0.1} y={40}>
        <div className="mx-auto mt-12 max-w-5xl px-6 lg:px-8">
          {project.coverImage ? (
            <StepMedia
              image={project.coverImage}
              alt={`${project.title} cover`}
              tone={project.tone ?? "slate"}
              priority
            />
          ) : (
            <ImageFrame className="aspect-[16/9] w-full" />
          )}
        </div>
      </Reveal>

      <div className="mx-auto mt-24 max-w-3xl px-6 lg:px-8">
        {hasStructuredContent ? (
          <>
            {/* Results first — the part that gets read even when everything
                else is skipped. */}
            <section>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {project.results!.map((result, index) => (
                  <Reveal key={result.label} delay={0.08 * index} y={24}>
                    <div className="h-full rounded-xl border border-v2-ink/10 bg-white p-6">
                      <p className="font-grotesk text-2xl font-black tracking-[-0.02em] text-v2-orange-ink">
                        {result.metric}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-v2-ink/60">
                        {result.label}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            <section className="mt-24">
              <Reveal>
                <SectionLabel>The problem</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 text-base leading-relaxed text-v2-ink/70 sm:text-lg">
                  {project.problem}
                </p>
              </Reveal>

              {project.constraints && project.constraints.length > 0 && (
                <Reveal delay={0.14}>
                  <div className="mt-9 rounded-xl border border-v2-ink/10 bg-white p-6 sm:p-8">
                    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-v2-ink">
                      Constraints going in
                    </p>
                    <ul className="mt-5 space-y-3.5">
                      {project.constraints.map((constraint) => (
                        <li key={constraint} className="flex items-start gap-3">
                          <Check
                            className="mt-0.5 size-4 shrink-0 text-v2-orange"
                            strokeWidth={2.5}
                            aria-hidden
                          />
                          <span className="text-sm leading-relaxed text-v2-ink/70 sm:text-base">
                            {constraint}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}
            </section>

            {project.pullQuote && (
              <Reveal y={40}>
                <blockquote className="mt-24 border-l-[3px] border-v2-orange pl-6 sm:pl-8">
                  <p className="font-editorial text-2xl italic leading-snug text-v2-ink sm:text-[1.75rem]">
                    &ldquo;{project.pullQuote}&rdquo;
                  </p>
                </blockquote>
              </Reveal>
            )}

            <section className="mt-24">
              <Reveal>
                <SectionLabel>The approach</SectionLabel>
              </Reveal>

              {/* Copy above, screen below — rather than side by side, which
                  capped every shot at half a column. */}
              <div className="mt-10 space-y-20">
                {project.approach!.map((step, index) => (
                  <Reveal key={step.title} delay={0.05} y={32}>
                    <div>
                      <span className="font-mono text-xs font-bold tracking-[0.2em] text-v2-orange-ink">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-3 font-grotesk text-xl font-black tracking-[-0.02em] text-v2-ink sm:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-base leading-relaxed text-v2-ink/70">
                        {step.body}
                      </p>

                      <div className="mt-8">
                        <StepShot
                          image={step.image}
                          video={step.video}
                          poster={step.poster}
                          alt={`${project.title} — ${step.title}`}
                          tone={project.tone ?? "slate"}
                        />
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {project.showcase && (
              <Reveal y={32}>
                <section className="mt-24">
                  <SectionLabel>{project.showcase.label}</SectionLabel>
                  {project.showcase.caption && (
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-v2-ink/70">
                      {project.showcase.caption}
                    </p>
                  )}
                  <div className="relative left-1/2 mt-10 w-[min(92vw,44rem)] -translate-x-1/2">
                    <PhoneStack
                      media={project.showcase.media}
                      label={project.showcase.label}
                      tone={project.tone ?? "slate"}
                    />
                  </div>
                </section>
              </Reveal>
            )}

            <Reveal y={32}>
              {/* Tinted rather than white, so the conclusion reads as the
                  destination of the page instead of one more card. */}
              <section className="mt-24 rounded-2xl bg-v2-yellow/25 p-8 sm:p-10">
                <SectionLabel>The outcome</SectionLabel>
                <p className="mt-6 text-base leading-relaxed text-v2-ink/75 sm:text-lg">
                  {project.outcome}
                </p>
              </section>
            </Reveal>

            {project.learnings && project.learnings.length > 0 && (
              <section className="mt-24">
                <Reveal>
                  <SectionLabel>What I&apos;d take forward</SectionLabel>
                </Reveal>
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {project.learnings.map((learning, index) => (
                    <Reveal key={learning} delay={0.06 * index} y={24}>
                      <div className="h-full rounded-xl border border-v2-ink/12 p-6">
                        <p className="text-sm leading-relaxed text-v2-ink/70">{learning}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="space-y-6">
            {project.description.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-base leading-relaxed text-v2-ink/70 sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}

        <Reveal>
          <ul className="mt-24 flex flex-wrap gap-2.5">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className={`${TAG_CLIP} bg-white px-4 pb-1.5 pt-2 font-mono text-[11px] font-bold uppercase tracking-wide text-v2-ink`}
              >
                {tag}
              </li>
            ))}
          </ul>
        </Reveal>

        <nav
          aria-label="Project navigation"
          className="mt-16 border-t border-v2-ink/12 pt-8"
        >
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
          >
            <span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-v2-ink/60">
                Next project
              </span>
              <span className="mt-2 block font-grotesk text-2xl font-black tracking-[-0.02em] text-v2-ink transition-colors duration-200 group-hover:text-v2-orange-ink-ink sm:text-3xl">
                {nextProject.title}
              </span>
            </span>
            <ArrowUpRight
              className="size-6 shrink-0 text-v2-ink/40 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-v2-orange-ink-ink"
              aria-hidden
            />
          </Link>
        </nav>
      </div>
    </main>
  );
}
