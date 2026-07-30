import { experience } from "@/content/experience";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  return (
    <section id="experience" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Reveal>
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent">
            <span className="inline-block h-2.5 w-2.5 rotate-45 bg-accent" aria-hidden />
            Experience
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            the journey so far
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <div
            className="absolute top-2 bottom-2 left-[6.5rem] hidden w-px bg-border sm:block"
            aria-hidden
          />

          <div className="space-y-12 sm:space-y-14">
            {experience.map((job, index) => (
              <Reveal key={job.company} delay={0.15 + index * 0.08} y={32}>
                <div className="relative grid gap-2 sm:grid-cols-[6.5rem_1fr] sm:gap-10">
                  <p className="text-sm font-medium text-muted-foreground sm:pt-1">
                    {job.period}
                  </p>

                  <div className="relative sm:pl-8">
                    <span
                      className="absolute left-[-2rem] top-1.5 hidden h-3 w-3 rounded-full border-2 border-accent bg-background sm:block"
                      aria-hidden
                    />
                    <p className="font-display text-xl font-semibold text-foreground">
                      {job.role}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {job.company} · {job.location}
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      {job.summary}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
