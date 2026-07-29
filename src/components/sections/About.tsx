"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/content/profile";
import { revealClass, useInView } from "@/lib/useInView";
import { cn } from "@/lib/utils";

const approach = [
  {
    title: "Start with the constraint",
    body: "The best answer usually hides inside the hardest limitation — a budget, a viewport, a printing method.",
  },
  {
    title: "Design the system, not the screen",
    body: "One beautiful artefact is luck. A system that stays beautiful after fifty people touch it is design.",
  },
  {
    title: "Ship, then sharpen",
    body: "Nothing is finished in the file. Real feedback only arrives once the work is out in the world.",
  },
];

export function About() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="about" className="border-b border-border py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="About"
          title="A designer who works across disciplines, not around them."
        />

        <div
          ref={ref}
          className={cn(
            "mt-12 grid gap-12 transition-all duration-700 ease-out lg:grid-cols-[1.1fr_0.9fr]",
            revealClass(inView),
          )}
        >
          <div className="space-y-5">
            {profile.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-base leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="flex flex-col gap-4">
            {approach.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-accent/40"
              >
                <h3 className="font-display text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
