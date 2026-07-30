"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";

const XRAY_IMAGE_CLASSNAME = "origin-bottom-right scale-125 object-contain object-bottom";

// The x-ray photo is a separate AI-generated image, not a pixel-registered
// pair with the base statue — its composition sits slightly left/up of the
// base image's. This nudges it back into alignment around the head/visor,
// which is the only area the hover reveal actually uses.
const XRAY_ALIGNMENT_STYLE = { transform: "scale(1.25) translate(16%, 1%)", transformOrigin: "bottom right" };

export function Hero() {
  const firstName = profile.name.split(" ")[0];
  const sectionRef = useRef<HTMLElement>(null);
  const statueWrapperRef = useRef<HTMLDivElement>(null);
  const xrayMaskRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const statueY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  // The mask position is measured against the full statue wrapper (since
  // both statue images fill it edge-to-edge), even though the hover target
  // is only the smaller head hotspot layered on top of it.
  const handleHeadPointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = statueWrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    xrayMaskRef.current?.style.setProperty("--mx", `${x}%`);
    xrayMaskRef.current?.style.setProperty("--my", `${y}%`);
    xrayMaskRef.current?.style.setProperty("opacity", "1");
  };

  const handleHeadPointerLeave = () => {
    xrayMaskRef.current?.style.setProperty("opacity", "0");
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative isolate min-h-[65vh] overflow-hidden sm:min-h-[90vh]"
    >
      <motion.div className="absolute inset-0 -z-20" style={{ y: bgY }}>
        <Image
          src="/images/hero-bg-gradient.png"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      <motion.div
        ref={statueWrapperRef}
        className="absolute inset-y-0 right-0 -z-10 h-full w-full overflow-hidden sm:w-[70%] sm:-translate-x-4 lg:w-[52%] lg:-translate-x-10"
        style={{ y: statueY }}
      >
        <Image
          src="/images/hero-statue.png"
          alt=""
          fill
          priority
          className={XRAY_IMAGE_CLASSNAME}
        />

        <div
          ref={xrayMaskRef}
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out"
          style={{
            opacity: 0,
            maskImage:
              "radial-gradient(circle 160px at var(--mx, 50%) var(--my, 50%), black 45%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(circle 160px at var(--mx, 50%) var(--my, 50%), black 45%, transparent 100%)",
          }}
        >
          <Image
            src="/images/hero-statue-xray.png"
            alt=""
            fill
            className="object-contain object-bottom"
            style={XRAY_ALIGNMENT_STYLE}
          />
        </div>

        {/* Hover target scoped to the head/VR-headset region only, instead of
            the whole (mostly empty) statue bounding box — the x-ray reveal
            is only interesting there and hunting for it over the full
            wrapper felt broken. */}
        <div
          className="absolute inset-x-[10%] top-0 h-[45%] sm:inset-x-[15%]"
          onMouseMove={handleHeadPointerMove}
          onMouseLeave={handleHeadPointerLeave}
        />
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-background to-transparent" />

      <div className="pointer-events-none mx-auto max-w-6xl px-6 pb-10 pt-36 sm:pb-16 sm:pt-40 lg:px-8 lg:pt-48">
        <Reveal>
          <p className="flex items-center gap-2 text-lg font-medium text-white sm:text-xl">
            <span aria-hidden>👋</span> Hey, I&apos;m <span className="font-bold">{firstName}</span>
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-4 font-display text-[4.5rem] font-bold leading-[0.85] tracking-tight text-white sm:text-[6.5rem] md:text-[8.5rem] lg:text-[10rem] xl:text-[11.5rem]">
            product
            <br />
            <span className="font-script inline-block animate-float text-[4.5rem] font-normal text-white sm:text-[6.5rem] md:text-[8.5rem] lg:text-[10rem] xl:text-[11.5rem]">
              designer
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-md text-lg font-medium text-white sm:text-xl">
            {profile.role} — {profile.availability}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
