import { experience } from "@/content/experience";

export function Experience() {
  return (
    <section id="experience" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent">
          <span className="inline-block h-2.5 w-2.5 rotate-45 bg-accent" aria-hidden />
          Experience
        </div>

        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          where I&apos;ve worked
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {experience.map((job) => (
            <div
              key={job.company}
              className="rounded-2xl border border-border bg-surface p-8"
            >
              <p className="text-sm font-medium text-accent">{job.period}</p>
              <p className="mt-3 font-display text-xl font-semibold text-foreground">
                {job.role}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {job.company} · {job.location}
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {job.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
