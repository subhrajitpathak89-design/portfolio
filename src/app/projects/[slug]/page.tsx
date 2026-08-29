import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronRight,
  ImageIcon,
} from "lucide-react";
import { getProjectBySlug, projects } from "@/content/projects";
import { Reveal } from "@/components/ui/Reveal";
import { PhoneStack } from "@/components/ui/PhoneStack";
import { StepMedia } from "@/components/ui/StepMedia";
import { CaseStudyNav } from "@/components/ui/CaseStudyNav";
import type {
  ProjectBaseline,
  ProjectFlow,
  ProjectFlowChange,
  ProjectFriction,
  Project,
  ProjectSnapshot,
  ProjectTone,
} from "@/types";

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
    // Centred on the viewport below xl, and on the space right of the nav rail
    // from xl up. Without the shift a 60rem card paints straight over the rail,
    // which is opaque white and wins because it comes later in the document.
    <div className="relative left-1/2 w-[min(92vw,60rem)] -translate-x-1/2 min-[1400px]:left-[calc(50%+var(--rail-gutter)/2)] min-[1400px]:w-[min(92vw-var(--rail-gutter),60rem)]">
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

/**
 * The four-part summary that opens the page: business, challenge, solution,
 * impact.
 *
 * This exists because the old page made a reader earn the story — problem
 * paragraph, then four approach steps, then the outcome, roughly nine screens
 * before the point landed. Most people deciding whether to keep reading give a
 * case study far less than that, so the whole arc is stated up front and the
 * rest of the page becomes the evidence for it.
 */
function Snapshot({ snapshot }: { snapshot: ProjectSnapshot }) {
  const rows = [
    { label: "Business", body: snapshot.business },
    { label: "Challenge", body: snapshot.challenge },
    { label: "Solution", body: snapshot.solution },
  ];

  return (
    <div className="mt-10 divide-y divide-v2-ink/10 rounded-2xl border border-v2-ink/10 bg-white">
      {rows.map((row) => (
        <div key={row.label} className="grid gap-2 p-6 sm:grid-cols-[7.5rem_1fr] sm:gap-6 sm:p-8">
          <p className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-v2-orange-ink">
            {row.label}
            <span aria-hidden className="text-v2-ink/25">
              &rarr;
            </span>
          </p>
          <p className="text-base leading-relaxed text-v2-ink/75">{row.body}</p>
        </div>
      ))}

      <div className="grid gap-2 p-6 sm:grid-cols-[7.5rem_1fr] sm:gap-6 sm:p-8">
        <p className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-v2-orange-ink">
          Impact
          <span aria-hidden className="text-v2-ink/25">
            &rarr;
          </span>
        </p>
        <ul className="space-y-3">
          {snapshot.impact.map((line) => (
            <li key={line} className="flex items-start gap-3">
              <span aria-hidden className="mt-[9px] size-1.5 shrink-0 rounded-full bg-v2-orange" />
              <span className="text-base leading-relaxed text-v2-ink/75">{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * The "before" numbers, set large.
 *
 * Deliberately separate from `results`: those are the numbers I moved, these
 * are the numbers that justified starting. Putting a 6-minute checkout on the
 * screen does more to explain the problem than a paragraph describing it.
 */
function Baseline({ baseline }: { baseline: ProjectBaseline[] }) {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2">
      {baseline.map((entry, index) => (
        <Reveal key={entry.label} delay={0.08 * index} y={24}>
          <div className="h-full rounded-xl border border-v2-ink/10 bg-white p-6 sm:p-7">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-v2-ink/60">
              {entry.label}
            </p>
            <p className="mt-3 font-grotesk text-[clamp(1.75rem,4vw,2.5rem)] font-black leading-none tracking-[-0.03em] text-v2-ink">
              {entry.metric}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/** The friction vectors the audit turned up, numbered in order of damage. */
function Frictions({ frictions }: { frictions: ProjectFriction[] }) {
  return (
    <ol className="mt-10 space-y-6">
      {frictions.map((friction, index) => (
        <Reveal key={friction.title} delay={0.06 * index} y={24}>
          <li className="flex gap-4 sm:gap-5">
            <span className="mt-0.5 font-grotesk text-lg font-black leading-none tracking-[-0.02em] text-v2-orange-ink">
              {index + 1}.
            </span>
            <div>
              <h3 className="font-grotesk text-lg font-black tracking-[-0.02em] text-v2-ink">
                {friction.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-v2-ink/70">{friction.body}</p>
            </div>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}

/**
 * Old flow against new flow, on two lines.
 *
 * Cutting steps out of a journey is the clearest thing a designer can show, and
 * it reads instantly in a way the same claim in prose never does.
 */
function FlowChange({ change }: { change: ProjectFlowChange }) {
  const rows = [
    { label: "Old flow", steps: change.before, muted: true },
    { label: "New flow", steps: change.after, muted: false },
  ];

  return (
    <div className="mt-8 space-y-6 rounded-xl border border-v2-ink/10 bg-white p-6 sm:p-8">
      {rows.map((row) => (
        <div key={row.label}>
          <p
            className={`font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${
              row.muted ? "text-v2-ink/50" : "text-v2-orange-ink"
            }`}
          >
            {row.label}
          </p>
          <ol className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2">
            {row.steps.map((step, index) => (
              <li key={step} className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] ${
                    row.muted
                      ? "bg-v2-cream text-v2-ink/55 line-through decoration-v2-ink/25"
                      : "bg-v2-yellow/40 text-v2-ink"
                  }`}
                >
                  {step}
                </span>
                {index < row.steps.length - 1 && (
                  <ChevronRight aria-hidden className="size-3.5 shrink-0 text-v2-ink/30" />
                )}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

/** Anchor id for a section, derived from its own label so the two cannot drift. */
function sectionId(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function SectionLabel({ children }: { children: string }) {
  return (
    <h2 className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-v2-orange-ink">
      <span aria-hidden className="inline-block size-2 rotate-45 bg-v2-orange" />
      {children}
    </h2>
  );
}

/**
 * The banner at the top of the page, above the title.
 *
 * Inset rather than edge to edge, and wider than tall: it reads as the
 * masthead of a case study without the page appearing to start with a
 * full-bleed slab. The margins on either side are what keep it feeling like
 * part of the document — and it is the one slot where a single image has to
 * carry the whole project, so it still gets the width to do it.
 */
function HeroBanner({
  project,
}: {
  project: Project;
}) {
  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-v2-ink/10 bg-white">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={`${project.title} — cover`}
            width={2400}
            height={1000}
            priority
            className="aspect-[4/3] w-full object-cover sm:aspect-[16/9] lg:aspect-[2/1]"
          />
        ) : (
          <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-4 bg-v2-cream sm:aspect-[16/9] lg:aspect-[2/1]">
            <ImageIcon className="size-10 text-v2-ink/20" strokeWidth={1.5} aria-hidden />
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-v2-ink/35">
              Hero image
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Two more case studies at the foot of the page, each with its own thumbnail.
 *
 * A single "next project" text link was the only way out of the bottom of a
 * case study, which gave a reader who did not want that specific project
 * nothing at all. Two cards with a picture in them read as an invitation
 * rather than a footnote, and the thumbnail is the part that gets clicked.
 */
function MoreCaseStudies({ entries }: { entries: Project[] }) {
  if (!entries.length) return null;

  return (
    <nav aria-label="More case studies" className="mt-24 border-t border-v2-ink/12 pt-10">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-v2-ink/65">
        Next case studies
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {entries.map((entry) => (
          <Link
            key={entry.slug}
            href={`/projects/${entry.slug}`}
            className="group block rounded-2xl border border-v2-ink/10 bg-white p-4 transition-colors duration-200 hover:border-v2-orange/40"
          >
            {entry.coverImage ? (
              <Image
                src={entry.coverImage}
                alt={entry.title}
                width={800}
                height={500}
                className="aspect-[16/10] w-full rounded-xl object-cover"
              />
            ) : (
              <ImageFrame className="aspect-[16/10] w-full bg-v2-cream" />
            )}
            <div className="px-2 pb-2 pt-5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-v2-orange-ink">
                {entry.category}
              </p>
              <h3 className="mt-2 font-grotesk text-xl font-black leading-tight tracking-[-0.02em] text-v2-ink transition-colors duration-200 group-hover:text-v2-orange-ink">
                {entry.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-v2-ink/60">
                {entry.summary}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-v2-ink/60 transition-colors duration-200 group-hover:text-v2-orange-ink">
                Read case study
                <ArrowUpRight
                  aria-hidden
                  className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // The two that follow this one, wrapping round the list — so the last case
  // study points back at the first rather than dead-ending.
  const currentIndex = projects.findIndex((entry) => entry.slug === project.slug);
  const moreCaseStudies = [1, 2]
    .map((offset) => projects[(currentIndex + offset) % projects.length])
    .filter((entry) => entry.slug !== project.slug);

  const headlineResult = project.results?.[0];

  const meta = [
    { label: "Role", value: project.role },
    { label: "Client", value: project.client ?? project.title },
    { label: "Duration", value: project.duration ?? project.year },
    { label: "Year", value: project.year },
  ];

  // Results and outcome are deliberately not part of this test. A project can
  // have a real problem and a real approach without a number I am willing to
  // put on a screen — inventing one to unlock the layout would be the worst
  // possible trade.
  const hasStructuredContent = Boolean(project.problem && project.approach);

  // All three fields or none. A decision with no pushback and no result is
  // just an approach step in a louder box, and half a story reads as a claim.
  const hasDisagreement = Boolean(
    project.disagreement?.decision &&
      project.disagreement?.pushback &&
      project.disagreement?.result
  );

  // Built from the sections this particular project actually renders, so a
  // project missing a showcase or learnings never gets a dead jump link.
  const navLabels = hasStructuredContent
    ? [
        project.results?.length ? "Results" : undefined,
        "The problem",
        project.frictions?.length ? "The mission" : undefined,
        "The approach",
        project.showcase?.label,
        project.outcome ? "The outcome" : undefined,
        hasDisagreement ? "The call I had to defend" : undefined,
        project.learnings?.length ? "What I'd take forward" : undefined,
      ].filter((label): label is string => Boolean(label))
    : [];

  return (
    <main id="top" className="bg-v2-cream pb-28 pt-28 sm:pt-36">
      <Reveal y={32}>
        <HeroBanner project={project} />
      </Reveal>

      {/* Prose sits in a narrower column than the banner deliberately — long
          body copy stops being readable well before a wide image does. */}
      <div className="mx-auto mt-14 max-w-3xl px-6 lg:px-8">
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

        {/* The headline result, restated at the top. Reviewers skim the first
            screen and then jump to the end; if the number only lives at the
            bottom, the top reads as a case study with no result. Pulled from
            the same `results` array the grid below renders, so the two can
            never disagree. */}
        {headlineResult && (
          <Reveal delay={0.17}>
            <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-l-4 border-v2-orange pl-4">
              <span className="font-grotesk text-2xl font-black tracking-[-0.02em] text-v2-orange-ink">
                {headlineResult.metric}
              </span>
              <span className="text-base text-v2-ink/70">{headlineResult.label}</span>
            </p>
          </Reveal>
        )}

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

        {project.snapshot && (
          <Reveal delay={0.25}>
            <Snapshot snapshot={project.snapshot} />
          </Reveal>
        )}

        <Reveal delay={0.28}>
          <AtAGlance tldr={project.tldr} flow={project.flow} />
        </Reveal>

        {/* The rail below replaces this from 1400px up, where there is a margin
            wide enough to put it in. */}
        <Reveal delay={0.3} className="min-[1400px]:hidden">
          <CaseStudyNav labels={navLabels} variant="card" />
        </Reveal>
      </div>

      {/* --rail-gutter is the one place the rail's width is written down: the
          aside consumes it, and the media breakouts below subtract it. */}
      <div
        className="relative mx-auto mt-24 max-w-3xl px-6 [--rail-gutter:15rem] lg:px-8"
      >
        {/* Anchored to the prose column and pushed into its left margin, so the
            rail tracks the text without the column having to move. */}
        {navLabels.length > 1 && (
          <aside className="pointer-events-none absolute bottom-0 right-full top-0 hidden w-[var(--rail-gutter)] pr-10 min-[1400px]:block">
            <div className="pointer-events-auto h-full">
              <CaseStudyNav labels={navLabels} variant="rail" />
            </div>
          </aside>
        )}

        {hasStructuredContent ? (
          <>
            {/* Results first — the part that gets read even when everything
                else is skipped. */}
            {/* No visible heading by design, so the jump link needs an
                accessible name from somewhere. */}
            {project.results && project.results.length > 0 && (
            <section id={sectionId("Results")} aria-label="Results" className="scroll-mt-28">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {project.results.map((result, index) => (
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
            )}

            <section id={sectionId("The problem")} className="mt-24 scroll-mt-28">
              <Reveal>
                <SectionLabel>The problem</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 text-base leading-relaxed text-v2-ink/70 sm:text-lg">
                  {project.problem}
                </p>
              </Reveal>

              {project.baseline && project.baseline.length > 0 && (
                <Baseline baseline={project.baseline} />
              )}

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

            {project.frictions && project.frictions.length > 0 && (
              <section id={sectionId("The mission")} className="mt-24 scroll-mt-28">
                <Reveal>
                  <SectionLabel>The mission</SectionLabel>
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="mt-6 max-w-2xl text-base leading-relaxed text-v2-ink/70 sm:text-lg">
                    The audit turned up three places where the interface made someone stop and
                    think, at a moment they should have been moving.
                  </p>
                </Reveal>
                <Frictions frictions={project.frictions} />
              </section>
            )}

            {project.pullQuote && (
              <Reveal y={40}>
                <blockquote className="mt-24 border-l-[3px] border-v2-orange pl-6 sm:pl-8">
                  <p className="font-editorial text-2xl italic leading-snug text-v2-ink sm:text-[1.75rem]">
                    &ldquo;{project.pullQuote}&rdquo;
                  </p>
                </blockquote>
              </Reveal>
            )}

            <section id={sectionId("The approach")} className="mt-24 scroll-mt-28">
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

                      {index === 1 && project.flowChange && (
                        <FlowChange change={project.flowChange} />
                      )}

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
                <section
                  id={sectionId(project.showcase.label)}
                  className="mt-24 scroll-mt-28"
                >
                  <SectionLabel>{project.showcase.label}</SectionLabel>
                  {project.showcase.caption && (
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-v2-ink/70">
                      {project.showcase.caption}
                    </p>
                  )}
                  <div className="relative left-1/2 mt-10 w-[min(92vw,44rem)] -translate-x-1/2 min-[1400px]:left-[calc(50%+var(--rail-gutter)/2)] min-[1400px]:w-[min(92vw-var(--rail-gutter),44rem)]">
                    <PhoneStack
                      media={project.showcase.media}
                      label={project.showcase.label}
                      tone={project.tone ?? "slate"}
                    />
                  </div>
                </section>
              </Reveal>
            )}

            {project.outcome && (
            <Reveal y={32}>
              {/* Tinted rather than white, so the conclusion reads as the
                  destination of the page instead of one more card. */}
              <section
                id={sectionId("The outcome")}
                className="mt-24 scroll-mt-28 rounded-2xl bg-v2-yellow/25 p-8 sm:p-10"
              >
                <SectionLabel>The outcome</SectionLabel>
                <p className="mt-6 text-base leading-relaxed text-v2-ink/75 sm:text-lg">
                  {project.outcome}
                </p>
              </section>
            </Reveal>
            )}

            {hasDisagreement && project.disagreement && (
              <section
                id={sectionId("The call I had to defend")}
                className="mt-24 scroll-mt-28"
              >
                <Reveal>
                  <SectionLabel>The call I had to defend</SectionLabel>
                </Reveal>
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {(
                    [
                      ["What I decided", project.disagreement.decision],
                      ["Who pushed back", project.disagreement.pushback],
                      ["What happened", project.disagreement.result],
                    ] as const
                  ).map(([label, body], index) => (
                    <Reveal key={label} delay={0.06 * index} y={24}>
                      <div className="h-full rounded-xl border border-v2-ink/12 bg-white p-6">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-v2-orange-ink">
                          {label}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-v2-ink/70">{body}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </section>
            )}

            {project.learnings && project.learnings.length > 0 && (
              <section
                id={sectionId("What I'd take forward")}
                className="mt-24 scroll-mt-28"
              >
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

        {navLabels.length > 0 && (
          <p className="mt-10">
            <a
              href="#top"
              className="group inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-v2-ink/60 transition-colors duration-200 hover:text-v2-orange-ink"
            >
              <ArrowUp
                className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5"
                aria-hidden
              />
              Back to top
            </a>
          </p>
        )}

        <MoreCaseStudies entries={moreCaseStudies} />
      </div>
    </main>
  );
}
