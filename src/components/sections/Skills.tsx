"use client";

import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillCategories } from "@/content/skills";
import { revealClass, useInView } from "@/lib/useInView";
import { cn } from "@/lib/utils";

export function Skills() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="skills" className="border-b border-border py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Capabilities"
          title="The toolkit behind the work."
          description="Craft, process and tooling — grouped the way projects actually get built."
        />

        <div
          ref={ref}
          className={cn(
            "mt-12 grid gap-6 transition-all duration-700 ease-out sm:grid-cols-2",
            revealClass(inView),
          )}
        >
          {skillCategories.map((category, index) => (
            <div
              key={category.name}
              className="rounded-2xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-accent/40"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {category.name}
                </h3>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li key={skill}>
                    <Badge>{skill}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
