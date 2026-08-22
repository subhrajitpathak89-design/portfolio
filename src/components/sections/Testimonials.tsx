import { testimonials } from "@/content/testimonials";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  const loop = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <Reveal>
          <div className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent">
            <span className="inline-block h-2.5 w-2.5 rotate-45 bg-accent" aria-hidden />
            What people say
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            kind words from collaborators
          </h2>
        </Reveal>
      </div>

      <div
        className="relative mt-16 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex w-max animate-[marquee_50s_linear_infinite] items-stretch gap-6 hover:[animation-play-state:paused]">
          {loop.map((testimonial, index) => (
            <div
              key={`${testimonial.name}-${index}`}
              className="flex w-80 shrink-0 flex-col justify-between rounded-2xl border border-border bg-surface p-6"
            >
              <p className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-6">
                <p className="font-script text-2xl text-accent">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
