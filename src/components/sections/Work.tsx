"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";

gsap.registerPlugin(ScrollTrigger);

export function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const featured = projects.filter((project) => project.featured);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");

      cards.forEach((card, i) => {
        const pinStart = 96 + i * 16;

        // Pin each card in place, without reserving extra scroll space,
        // so the next card can scroll up and physically cover it.
        ScrollTrigger.create({
          trigger: card,
          start: `top top+=${pinStart}`,
          end: () => `+=${card.offsetHeight}`,
          pin: true,
          pinSpacing: false,
        });

        if (i === cards.length - 1) return;

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
      className="bg-background pb-24 pt-24 sm:pt-32"
    >
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <div className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent">
          <span className="inline-block h-2.5 w-2.5 rotate-45 bg-accent" aria-hidden />
          Selected work
        </div>

        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          check out some of my work
        </h2>

        <p className="mt-6 text-lg text-muted-foreground">
          A few products I&apos;ve helped shape, and the thinking behind them.
        </p>
      </div>

      <div className="relative mt-20">
        {featured.map((project, index) => (
          <div key={project.slug} className="stack-card relative mb-8" style={{ zIndex: index + 1 }}>
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <ProjectCard project={project} index={index} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
