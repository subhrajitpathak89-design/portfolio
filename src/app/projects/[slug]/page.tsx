import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, ImageIcon } from "lucide-react";
import { getProjectBySlug, projects } from "@/content/projects";
import { Reveal } from "@/components/ui/Reveal";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

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

function CoverPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-accent/30 ${className}`}
    >
      <ImageIcon className="h-10 w-10 text-muted-foreground/30" aria-hidden />
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent">
      <span className="inline-block h-2 w-2 rotate-45 bg-accent" aria-hidden />
      {children}
    </div>
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
    <main className="bg-background pb-24 pt-32 sm:pt-40">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Reveal>
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-accent"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
              aria-hidden
            />
            Back to all work
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-accent">
            {project.category}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {project.title}
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {project.summary}
          </p>
        </Reveal>

        {/* Meta strip — the four facts a hiring manager scans for first */}
        <Reveal delay={0.2}>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-border py-6 sm:grid-cols-4">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {item.label}
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-foreground sm:text-base">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <Reveal delay={0.1} y={40}>
        <div className="mx-auto mt-10 max-w-5xl px-6 lg:px-8">
          <CoverPlaceholder className="aspect-[16/9] w-full" />
        </div>
      </Reveal>

      <div className="mx-auto mt-20 max-w-4xl px-6 lg:px-8">
        {hasStructuredContent ? (
          <>
            {/* Results up front — the part a hiring manager reads even if
                they skip everything else. */}
            <section>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {project.results!.map((result, index) => (
                  <Reveal key={result.label} delay={0.08 * index} y={24}>
                    <div className="h-full rounded-2xl border border-border bg-surface p-6 text-center transition-colors duration-300 hover:border-accent/30 sm:text-left">
                      <p className="font-display text-2xl font-bold text-accent sm:text-3xl">
                        {result.metric}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">{result.label}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            <section className="mt-20">
              <Reveal>
                <SectionLabel>The problem</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {project.problem}
                </p>
              </Reveal>

              {project.constraints && project.constraints.length > 0 && (
                <Reveal delay={0.14}>
                  <div className="mt-8 rounded-2xl border border-border bg-surface p-6 sm:p-8">
                    <p className="text-sm font-semibold uppercase tracking-wide text-foreground">
                      Constraints going in
                    </p>
                    <ul className="mt-4 space-y-3">
                      {project.constraints.map((constraint) => (
                        <li key={constraint} className="flex items-start gap-3">
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                            aria-hidden
                          />
                          <span className="text-sm leading-relaxed text-muted-foreground sm:text-base">
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
                <blockquote className="mt-20 border-l-2 border-accent pl-6 sm:pl-8">
                  <p className="font-display text-xl font-medium italic leading-snug text-foreground sm:text-2xl">
                    &ldquo;{project.pullQuote}&rdquo;
                  </p>
                </blockquote>
              </Reveal>
            )}

            <section className="mt-20">
              <Reveal>
                <SectionLabel>The approach</SectionLabel>
              </Reveal>

              <div className="mt-8 space-y-16">
                {project.approach!.map((step, index) => (
                  <Reveal key={step.title} delay={0.05} y={32}>
                    <div className="grid gap-6 sm:grid-cols-2 sm:items-center sm:gap-10">
                      <div className={index % 2 === 1 ? "sm:order-2" : ""}>
                        <span className="font-display text-sm font-semibold text-accent">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="mt-2 font-display text-xl font-semibold text-foreground sm:text-2xl">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                          {step.body}
                        </p>
                      </div>
                      <CoverPlaceholder
                        className={`aspect-[4/3] w-full ${index % 2 === 1 ? "sm:order-1" : ""}`}
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            <Reveal y={32}>
              <section className="mt-20 rounded-2xl border border-border bg-surface p-8 sm:p-10">
                <SectionLabel>The outcome</SectionLabel>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {project.outcome}
                </p>
              </section>
            </Reveal>

            {project.learnings && project.learnings.length > 0 && (
              <section className="mt-20">
                <Reveal>
                  <SectionLabel>What I&apos;d take forward</SectionLabel>
                </Reveal>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {project.learnings.map((learning, index) => (
                    <Reveal key={learning} delay={0.06 * index} y={24}>
                      <div className="h-full rounded-2xl border border-border p-6">
                        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {learning}
                        </p>
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
                className="text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}

        <Reveal>
          <div className="mt-20 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <nav
          aria-label="Project navigation"
          className="mt-16 border-t border-border pt-8"
        >
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
          >
            <span>
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Next project
              </span>
              <span className="mt-2 block font-display text-2xl font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent sm:text-3xl">
                {nextProject.title}
              </span>
            </span>
            <ArrowUpRight
              className="h-6 w-6 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              aria-hidden
            />
          </Link>
        </nav>
      </div>
    </main>
  );
}
