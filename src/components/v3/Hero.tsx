import Image from "next/image";
import Link from "next/link";
import { ArrowDownToLine, ArrowRight } from "lucide-react";
import { profile } from "@/content/profile";

/**
 * The studio-site hero: a split screen. The copy sits on the page ground in
 * the left half; the right half is given whole to the artwork, which runs to
 * the viewport's right edge and the hero's foot.
 *
 * The artwork starts below the header rather than behind it, so the header
 * keeps plain ground under its links and icons in both themes.
 */
export function Hero() {
  return (
    <section
      id="home"
      className="v3-column relative isolate grid grid-cols-1 bg-v3-bg text-v3-fg lg:pb-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,45%)]"
    >
      <div className="flex flex-col justify-center px-5 pb-16 pt-28 sm:px-10 sm:pt-32 lg:px-16 lg:pb-0 lg:pt-44">
        {/* No name in the headline. The wordmark, page title and footer all
            carry it; the line states the work instead. */}
        <h1
          data-reveal-item
          className="max-w-[20ch] text-balance font-editorial-display text-[clamp(2.25rem,4.4vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.03em]"
        >
          Turning complex workflows into{" "}
          <span className="text-v3-muted">clear, usable products.</span>
        </h1>

        <p
          data-reveal-item
          style={{ "--reveal-delay": 1 } as React.CSSProperties}
          className="mt-6 max-w-[56ch] text-[15px] leading-relaxed sm:text-base"
        >
          Product design across B2B SaaS, AI and healthcare — from the research that
          precedes a screen to the shipped interface and the design system underneath
          it. <span className="text-v3-muted">{profile.proofLine}</span>
        </p>

        <div
          data-reveal-item
          style={{ "--reveal-delay": 2 } as React.CSSProperties}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 rounded-full bg-v3-accent px-5 py-2.5 font-grotesk text-[14px] font-medium tracking-[-0.01em] text-v3-bg transition-colors duration-200 hover:bg-v3-accent-bright"
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
            className="inline-flex items-center gap-2 rounded-full border border-v3-line px-5 py-2.5 font-grotesk text-[14px] font-medium tracking-[-0.01em] text-v3-fg transition-colors duration-200 hover:border-v3-muted hover:bg-v3-chip"
          >
            Resume
            <ArrowDownToLine aria-hidden className="size-3.5" strokeWidth={2} />
          </a>
        </div>

        <p
          data-reveal-item
          style={{ "--reveal-delay": 3 } as React.CSSProperties}
          className="mt-6 text-sm text-v3-muted"
        >
          {profile.roleLine}
        </p>
      </div>

      {/* Fills its half edge to edge and down to the hero's foot, starting
          exactly on the header's bottom rule (5rem tall). On a phone it drops
          under the copy as a wide band. */}
      <div
        data-reveal-item
        style={{ "--reveal-delay": 2 } as React.CSSProperties}
        className="relative -mx-[var(--v3-gutter)] aspect-[4/3] w-[calc(100%+2*var(--v3-gutter))] lg:mx-0 lg:mt-20 lg:aspect-auto lg:w-full"
      >
        <Image
          src="/images/v3/hero-card.webp"
          alt="Abstract orchid illustration in pink, green and blue"
          fill
          priority
          // The artwork is 16:9 in a near-square box, so `object-cover` sizes
          // it by height and it renders at roughly 1.8x the box's height in
          // width — about 1200px on a laptop, not the column's 45vw. Telling
          // Next the column width made it serve a variant that then got
          // stretched, which is what read as pixelation.
          sizes="(min-width: 1024px) 1200px, 100vw"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
