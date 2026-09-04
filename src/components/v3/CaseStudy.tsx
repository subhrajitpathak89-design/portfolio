import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ImageSlot } from "@/components/v3/ImageSlot";
import { LoopVideo } from "@/components/v3/LoopVideo";
import { ToolMarks } from "@/components/v3/ToolMarks";
import type { Project } from "@/types";

/**
 * The case-study reading page.
 *
 * Built around the screens rather than around the writing. Each step of the
 * approach is a short paragraph followed by a full-width screen, so scrolling
 * the page is mostly looking at the work — which is what a reviewer came for.
 * The prose earns its place by explaining the screen underneath it, and every
 * section that could not do that got folded into one that could.
 *
 * The result appears twice, once under the title and once at the end, because
 * reviewers skim the top and jump to the bottom. A number that lives only at
 * the end makes the top read as a case study with nothing to show.
 */

/** Reading measure. Screens break out wider; text never does. */
const PROSE = "mx-auto w-full max-w-[42rem]";
const WIDE = "mx-auto w-full max-w-[62rem]";

export function CaseStudy({ project, next }: { project: Project; next: Project }) {
  const headline = project.results?.[0];

  const meta = [
    { label: "Role", value: project.role },
    { label: "Client", value: project.client ?? "—" },
    { label: "Duration", value: project.duration ?? project.year },
    { label: "Year", value: project.year },
  ];

  // All three fields or none — half a disagreement reads as a boast.
  const d = project.disagreement;
  const fight = d?.decision && d?.pushback && d?.result ? d : null;

  // Repainting the page in the product's colour is one variable rather than a
  // prop threaded through every child: everything below already reads the
  // accent tokens, and `.v3-brand` in globals.css maps this to them — including
  // the deepening light mode needs to keep the button legible.
  const brand = project.brand
    ? ({ "--v3-brand": project.brand } as React.CSSProperties)
    : undefined;

  return (
    <article
      className={`relative bg-v3-bg${project.brand ? " v3-brand" : ""}`}
      style={brand}
    >
      <div className="v3-hatch v3-bleed absolute inset-y-0 left-0" aria-hidden />
      <div className="v3-hatch v3-bleed absolute inset-y-0 right-0" aria-hidden />

      <div className="v3-column px-5 pb-24 pt-28 sm:px-10 lg:px-16 lg:pb-32 lg:pt-36">
        {/* ── First screen ─────────────────────────────────────────────── */}
        <header className={WIDE}>
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-v3-muted transition-colors duration-200 hover:text-v3-fg"
          >
            <ArrowLeft
              aria-hidden
              className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
              strokeWidth={2}
            />
            All work
          </Link>

          <p className="mt-10 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-v3-accent">
            {project.category} · {project.year}
          </p>

          <h1 className="mt-5 max-w-[18ch] font-editorial-display text-[clamp(1.875rem,4.4vw,3.5rem)] font-normal leading-[1.03] tracking-[-0.02em] text-v3-fg">
            {project.title}
          </h1>

          <p className="mt-6 max-w-[42rem] text-base leading-relaxed text-v3-muted sm:text-lg">
            {project.summary}
          </p>

          {headline && (
            <p className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-l-2 border-v3-accent pl-5">
              <span className="font-grotesk text-2xl font-medium tracking-[-0.02em] text-v3-accent">
                {headline.metric}
              </span>
              <span className="text-sm text-v3-muted sm:text-base">{headline.label}</span>
            </p>
          )}

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-y border-v3-line py-8 sm:grid-cols-4">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-v3-muted">
                  {item.label}
                </dt>
                <dd className="mt-2.5 text-sm font-medium text-v3-fg">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
            {project.tools && project.tools.length > 0 && <ToolMarks tools={project.tools} />}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2 rounded-lg bg-v3-accent px-5 py-3 font-grotesk text-sm font-semibold text-v3-bg transition-colors duration-200 hover:bg-v3-accent-bright"
              >
                View it live
                <ArrowUpRight
                  aria-hidden
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2.5}
                />
              </a>
            )}
          </div>
        </header>

        {/* ── Hero screen ──────────────────────────────────────────────── */}
        <div className={`${WIDE} mt-14 lg:mt-20`}>
          {/* An authored hero still keeps the slot; the loop fills it only when
              there is no still to keep. RiseAngle is the case that needs the
              rule — it has both, and its portrait mockup was chosen for this
              frame, so the loop stays on its card and the hero stays put. A
              project with only a capture, like Wizlo, gets the capture here
              instead of an empty labelled hole.

              `fit` follows whichever is showing. A wide desktop window and a
              portrait mockup want opposite answers, which is why they are
              separate fields. */}
          <ImageSlot
            src={project.coverImage}
            video={project.coverImage ? undefined : project.coverVideo}
            poster={project.coverPoster}
            fit={project.coverImage ? project.coverFit : project.coverVideoFit}
            // A loop is cut to the card's 16:10, so the hero takes that ratio
            // when one is filling it rather than its usual 16:9 — otherwise the
            // frame it was measured for is not the frame it lands in, and the
            // fit that was exact on the card mattes or crops here.
            aspect={
              !project.coverImage && project.coverVideo ? "aspect-[16/10]" : undefined
            }
            alt={project.title}
            label={`The screen that says what ${project.client ?? "this product"} is, cropped tight`}
            spec="2400 × 1350"
            priority
          />
        </div>

        {/* ── Context ──────────────────────────────────────────────────── */}
        {project.snapshot && (
          <Section label="Context" className={PROSE}>
            <dl className="divide-y divide-v3-line border-y border-v3-line">
              {(
                [
                  ["The business", project.snapshot.business],
                  ["What was wrong", project.snapshot.challenge],
                  ["What I did", project.snapshot.solution],
                ] as const
              ).map(([term, body]) => (
                <div key={term} className="grid gap-2 py-6 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-v3-muted">
                    {term}
                  </dt>
                  <dd className="text-sm leading-relaxed text-v3-fg/85">{body}</dd>
                </div>
              ))}
            </dl>

            {/* Constraints sit here rather than in a section of their own: they
                are context for the decisions below, not an argument by
                themselves. */}
            {project.constraints && project.constraints.length > 0 && (
              <ul className="mt-8 space-y-2.5">
                {project.constraints.map((constraint) => (
                  <li key={constraint} className="flex gap-3 text-sm leading-relaxed text-v3-muted">
                    <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-v3-accent" />
                    {constraint}
                  </li>
                ))}
              </ul>
            )}
          </Section>
        )}

        {/* ── Results ──────────────────────────────────────────────────── */}
        {project.results && project.results.length > 0 && (
          <Section label="What changed" className={WIDE}>
            <div className="grid gap-4 sm:grid-cols-3">
              {project.results.map((result) => (
                <div
                  key={result.label}
                  className="rounded-xl border border-v3-line bg-v3-surface p-6"
                >
                  <p className="font-grotesk text-2xl font-medium tracking-[-0.02em] text-v3-accent">
                    {result.metric}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-v3-muted">{result.label}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ── Approach: the spine of the page ──────────────────────────── */}
        {project.approach && project.approach.length > 0 && (
          <Section label="The work" className={WIDE}>
            <div className="space-y-20 lg:space-y-28">
              {project.approach.map((step, index) => (
                <div key={step.title}>
                  <div className={PROSE}>
                    <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-v3-accent">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 font-editorial-display text-xl font-normal tracking-[-0.012em] text-v3-fg sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-v3-muted sm:text-base">
                      {step.body}
                    </p>
                  </div>

                  <div className="mt-8">
                    <ImageSlot
                      src={step.image}
                      alt={step.title}
                      label={step.title}
                      spec="2000 × 1250"
                      aspect="aspect-[16/10]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ── Final design ─────────────────────────────────────────────── */}
        {project.showcase && project.showcase.media.length > 0 && (
          <Section label={project.showcase.label} className={WIDE}>
            <div className={PROSE}>
              <h3 className="font-editorial-display text-xl font-normal tracking-[-0.012em] text-v3-fg sm:text-2xl">
                {project.showcase.heading}
              </h3>
              {project.showcase.caption && (
                <p className="mt-3 text-sm leading-relaxed text-v3-muted sm:text-base">
                  {project.showcase.caption}
                </p>
              )}
            </div>

            {/* Three flows side by side rather than stacked full-width: the
                point of the section is that they are one experience, and a
                reader only sees that if they are in one glance. */}
            <ul className="mt-10 grid gap-6 sm:grid-cols-3 lg:mt-14 lg:gap-8">
              {project.showcase.media.map((item) => (
                <li key={item.label}>
                  {/* The captures are a phone on white, cropped to the handset.
                      Rounding the frame to the handset's own radius is what
                      keeps the corners of that white ground from showing.
                      Two percentages, not one: a single value would be read as
                      14% of the width horizontally and 14% of the *height*
                      vertically, stretching the corner into an ellipse and
                      eating the bezel. 14%/6.8% of 330x684 is square at any
                      size the grid renders it. */}
                  <div
                    className="relative aspect-[330/684] overflow-hidden border border-v3-line bg-white"
                    style={{ borderRadius: "14% / 6.8%" }}
                  >
                    {item.video ? (
                      <LoopVideo
                        src={item.video}
                        poster={item.poster}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      item.image && (
                        <Image
                          src={item.image}
                          alt={item.label}
                          fill
                          sizes="(min-width: 640px) 20rem, 100vw"
                          className="object-cover"
                        />
                      )
                    )}
                  </div>

                  <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-v3-muted">
                    {item.label}
                  </p>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ── Flow change ──────────────────────────────────────────────── */}
        {project.flowChange && (
          <Section label="Before and after" className={PROSE}>
            <div className="grid gap-4 sm:grid-cols-2">
              <FlowList label="Before" steps={project.flowChange.before} />
              <FlowList label="After" steps={project.flowChange.after} accent />
            </div>
          </Section>
        )}

        {/* ── Gallery ──────────────────────────────────────────────────── */}
        <Section label="More screens" className={WIDE}>
          <div className="grid gap-4 sm:grid-cols-2">
            {(project.gallery?.length ? project.gallery : [undefined, undefined]).map(
              (src, index) => (
                <ImageSlot
                  key={src ?? index}
                  src={src}
                  alt={`${project.title} screen ${index + 1}`}
                  label="Any screen worth a second look"
                  spec="1600 × 1200"
                  aspect="aspect-[4/3]"
                  sizes="(min-width: 640px) 30rem, 100vw"
                />
              )
            )}
          </div>
        </Section>

        {/* ── The fight ────────────────────────────────────────────────── */}
        {fight && (
          <Section label="The call I had to defend" className={WIDE}>
            <div className="grid gap-4 sm:grid-cols-3">
              {(
                [
                  ["What I decided", fight.decision],
                  ["Who pushed back", fight.pushback],
                  ["What happened", fight.result],
                ] as const
              ).map(([label, body]) => (
                <div key={label} className="rounded-xl border border-v3-line bg-v3-surface p-6">
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-v3-accent">
                    {label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-v3-muted">{body}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ── Outcome ──────────────────────────────────────────────────── */}
        {project.outcome && (
          <Section label="The outcome" className={PROSE}>
            <p className="text-base leading-relaxed text-v3-fg/85 sm:text-lg">{project.outcome}</p>

            {headline && (
              <p className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-v3-line pt-8">
                <span className="font-grotesk text-2xl font-medium tracking-[-0.02em] text-v3-accent">
                  {headline.metric}
                </span>
                <span className="text-sm text-v3-muted">{headline.label}</span>
              </p>
            )}

            {project.learnings && project.learnings.length > 0 && (
              <ul className="mt-10 space-y-3 border-t border-v3-line pt-8">
                {project.learnings.map((learning) => (
                  <li key={learning} className="flex gap-3 text-sm leading-relaxed text-v3-muted">
                    <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-v3-accent" />
                    {learning}
                  </li>
                ))}
              </ul>
            )}
          </Section>
        )}

        {/* ── Next ─────────────────────────────────────────────────────── */}
        <div className={`${WIDE} mt-24 border-t border-v3-line pt-10 lg:mt-32`}>
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-v3-muted">
            Next case study
          </p>
          <Link
            href={`/projects/${next.slug}`}
            className="group mt-5 flex flex-wrap items-end justify-between gap-4"
          >
            <span className="font-grotesk text-[clamp(1.375rem,3vw,2.25rem)] font-medium leading-tight tracking-[-0.03em] text-v3-fg transition-colors duration-200 group-hover:text-v3-accent">
              {next.title}
            </span>
            <ArrowUpRight
              aria-hidden
              className="size-7 shrink-0 text-v3-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-v3-accent"
              strokeWidth={2}
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

function Section({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`${className} mt-20 lg:mt-28`}>
      <h2 className="mb-8 flex items-center gap-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-v3-muted">
        {label}
        <span aria-hidden className="h-px flex-1 bg-v3-line" />
      </h2>
      {children}
    </section>
  );
}

function FlowList({
  label,
  steps,
  accent = false,
}: {
  label: string;
  steps: string[];
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-6 ${
        accent ? "border-v3-accent/40 bg-v3-surface" : "border-v3-line"
      }`}
    >
      <p
        className={`font-mono text-[10px] font-medium uppercase tracking-[0.18em] ${
          accent ? "text-v3-accent" : "text-v3-muted"
        }`}
      >
        {label} · {steps.length} steps
      </p>
      <ol className="mt-4 space-y-2.5">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-3 text-sm text-v3-muted">
            <span className="font-mono text-[11px] text-v3-muted/60">
              {String(index + 1).padStart(2, "0")}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
