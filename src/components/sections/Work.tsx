"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

const HOME_CASE_STUDY_LIMIT = 3;

export function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const featured = projects.filter((project) => project.featured).slice(0, HOME_CASE_STUDY_LIMIT);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");

      cards.forEach((card, i) => {
        const pinStart = 96 + i * 16;

        // The last card has nothing sliding over it, so pinning it with
        // pinSpacing:false leaves no reserved scroll space for its pin
        // duration — the next section renders immediately underneath and
        // bleeds through while the card is still fixed on screen. Only pin
        // cards that get physically covered by a following card.
        if (i === cards.length - 1) return;

        // Pin each card in place, without reserving extra scroll space,
        // so the next card can scroll up and physically cover it.
        ScrollTrigger.create({
          trigger: card,
          start: `top top+=${pinStart}`,
          end: () => `+=${card.offsetHeight}`,
          pin: true,
          pinSpacing: false,
        });

        // Ease the outgoing card back slightly as the next one slides over it,
        // giving the stack some depth instead of a flat, abrupt cut.
        gsap.to(card, {
          scale: 0.94,
          ease: "none",
          transformOrigin: "50% 0%",
          scrollTrigger: {
            trigger: card,
            start: `top top+=${pinStart}`,
            end: () => `+=${card.offsetHeight}`,
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [featured.length]);

  return (
    <section
      id="work"
      ref={containerRef}
      className="bg-background pb-8 pt-24 sm:pt-32"
    >
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
          <div key={project.slug} className="stack-card relative mb-8" style={{ zIndex: index + 1 }}>
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <ProjectCard project={project} index={index} />
            </div>
          </div>
        ))}

        {/* Buffer so the final card's pin transition fully resolves in the
            viewport before the next section starts — without it the last
            card can still visually overlap the section below mid-scroll. */}
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
