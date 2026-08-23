"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const COLLAGE_WIDTH = 1672;
const COLLAGE_HEIGHT = 941;

// Faint filled cells scattered over the blueprint grid.
const GRID_ACCENTS = [
  { left: "46%", top: "18%" },
  { left: "62%", top: "18%" },
  { left: "31%", top: "46%" },
  { left: "69%", top: "27%" },
  { left: "22%", top: "62%" },
  { left: "77%", top: "55%" },
];

// The wordmark and the collage are both sized off a single width (`--hero-w`),
// which is what keeps them locked in the comp's proportion at every viewport.
//
// On desktop that width is 72vw, matching the comp where the collage spans a
// little over two thirds of the canvas; phones need to claim nearly the full
// width instead. The last min() term is a height budget — the stacked
// composition is ~0.63 of its own width tall (wordmark + collage, less their
// overlap), so capping at 1.3x the available height both prevents cropping on a
// short window and preserves the open space the comp leaves above the wordmark.
const HERO_WIDTH =
  "[--hero-w:min(94vw,calc((100svh-4rem)*1.3))] lg:[--hero-w:min(1180px,72vw,calc((100svh-4rem)*1.3))]";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // The wordmark drifts up faster than the collage, so the collage appears to
  // rise and cover it as the section scrolls away.
  const wordmarkY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const collageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-v2-cream pt-16"
    >
      <div className="v2-grid absolute inset-0 -z-20" aria-hidden />

      <div className="absolute inset-0 -z-20" aria-hidden>
        {GRID_ACCENTS.map((accent) => (
          <span
            key={`${accent.left}-${accent.top}`}
            className="absolute size-[var(--v2-grid-cell)] bg-v2-orange/[0.045]"
            style={accent}
          />
        ))}
      </div>

      {/* On a narrow screen the composition is width-bound, so forcing a
          full-viewport height would strand most of the hero as empty cream.
          Phones get the composition plus a slice of air; only from `lg` up is
          the hero pinned to the viewport the way the comp shows it. */}
      <div
        className={`relative mx-auto flex w-[var(--hero-w)] flex-col justify-end pt-[12vh] lg:min-h-[calc(100svh-4rem)] lg:pt-0 ${HERO_WIDTH}`}
      >
        <motion.h1
          style={{ y: wordmarkY }}
          className="pointer-events-none select-none text-center font-grotesk text-[calc(var(--hero-w)*0.318)] font-black italic leading-[0.8] tracking-[-0.045em] text-v2-orange"
        >
          Hello!
        </motion.h1>

        <motion.div
          style={{ y: collageY }}
          className="relative -mt-[calc(var(--hero-w)*0.088)] w-full"
        >
          <Image
            src="/images/v2/hero-collage.png"
            alt="A 3D orange retro computer labelled Portfolio, surrounded by polaroids, sticky notes, a sleeping cat and a spider"
            width={COLLAGE_WIDTH}
            height={COLLAGE_HEIGHT}
            priority
            sizes="(min-width: 1640px) 1180px, (min-width: 1024px) 72vw, 94vw"
            className="animate-v2-bob h-auto w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
