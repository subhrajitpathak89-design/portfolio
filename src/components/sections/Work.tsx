import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { StackCard } from "@/components/ui/StackCard";

const HOME_CASE_STUDY_LIMIT = 3;

export function Work() {
  const featured = projects.filter((project) => project.featured).slice(0, HOME_CASE_STUDY_LIMIT);

  return (
    <section id="work" className="bg-background pb-8 pt-24 sm:pt-32">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <Reveal>
          <div className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent">
            <span className="inline-block h-2.5 w-2.5 rotate-45 bg-accent" aria-hidden />
            Selected work
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            check out some of my work
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 text-lg text-muted-foreground">
            A few products I&apos;ve helped shape, and the thinking behind them.
          </p>
        </Reveal>
      </div>

      <div className="relative mt-20">
        {featured.map((project, index) => (
          <StackCard key={project.slug} index={index} isLast={index === featured.length - 1}>
            <ProjectCard project={project} index={index} />
          </StackCard>
        ))}

        {/* Buffer so the final sticky card fully releases before the CTA
            below becomes visible — without it the CTA sits right where the
            last card is still resolving and looks tucked/hidden underneath. */}
        <div className="h-[12vh] sm:h-[16vh]" aria-hidden />
      </div>

      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <Reveal>
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-3 rounded-full border border-border py-1 pl-5 pr-1 text-foreground transition-colors duration-200 hover:border-accent"
          >
            <span className="font-semibold">See all case studies</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
