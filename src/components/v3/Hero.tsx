import Image from "next/image";
import Link from "next/link";
import { ArrowDownToLine, ArrowRight } from "lucide-react";
import { profile } from "@/content/profile";

/**
 * The studio-site hero: the type block set directly over a full-bleed pixel
 * illustration — the corner shop by day in light mode, the same scene lit up
 * at night in dark mode.
 *
 * The copy is one left-aligned stack in the sky, above the shop, so every
 * line reads against dark ground rather than the lit windows.
 *
 * The picture runs edge to edge of the viewport, and the copy sits on the same
 * edge padding as the header rather than inside the column measure.
 */
export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-v3-bg text-v3-fg">
      <div className="relative isolate flex min-h-[100svh] flex-col justify-start">
        {/* Both scenes are rendered and the theme class picks one, so a
            theme switch is instant and never waits on a fetch. */}
        <Image
          src="/images/v3/hero-day.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[center_85%] dark:hidden"
        />
        <Image
          src="/images/v3/hero-night.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 hidden object-cover object-[center_85%] dark:block"
        />
        {/* Dark across the sky where the copy sits, clearing toward the shop
            so the picture still carries the bottom of the hero. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.7),rgba(0,0,0,0.45)_45%,rgba(0,0,0,0)_75%)]"
        />

        {/* Dissolves the picture's foot into the page ground, so the hero
            ends in a fade rather than a hard horizontal cut. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent to-v3-bg sm:h-64"
        />

        {/* Full width, on the same edge padding as the header, and stacked
            in the sky so no line of copy crosses the lit shop front. */}
        <div className="w-full px-5 pb-[38vh] pt-28 text-white sm:px-10 sm:pt-32 lg:px-16 lg:pt-36">
          {/* No name in the headline. The wordmark, page title and footer
              all carry it; the line states the work instead. */}
          <h1
            data-reveal-item
            className="max-w-[20ch] text-balance font-editorial-display text-[clamp(2.5rem,5.6vw,5rem)] font-normal leading-[1.0] tracking-[-0.01em] [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]"
          >
            Turning complex workflows into{" "}
            <span className="text-white/75">clear, usable products.</span>
          </h1>

          <p
            data-reveal-item
            style={{ "--reveal-delay": 1 } as React.CSSProperties}
            className="mt-6 max-w-[60ch] text-[15px] leading-relaxed text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)] sm:text-base"
          >
            Product design across B2B SaaS, AI and healthcare — from the research that
            precedes a screen to the shipped interface and the design system underneath
            it. {profile.proofLine}
          </p>

          <div
            data-reveal-item
            style={{ "--reveal-delay": 2 } as React.CSSProperties}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            {/* The résumé is the one document a reviewer came for, so it
                stays a first-class action beside the work. */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/#work"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-grotesk text-[14px] font-medium tracking-[-0.01em] text-black transition-colors duration-200 hover:bg-white/85"
              >
                See the work
                <ArrowRight
                  aria-hidden
                  className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </Link>

              {/* `download` names the file rather than letting it save as
                  whatever the URL ends in. */}
              <a
                href={profile.resume}
                download="Subhrajit-Pathak-Product-Designer-Resume.pdf"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-black/25 px-5 py-2.5 font-grotesk text-[14px] font-medium tracking-[-0.01em] text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/15"
              >
                Resume
                <ArrowDownToLine aria-hidden className="size-3.5" strokeWidth={2} />
              </a>
            </div>

            <p className="text-sm text-white/80 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
              {profile.roleLine}
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
