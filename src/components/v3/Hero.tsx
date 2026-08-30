import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { DitherField } from "@/components/v3/DitherField";
import { SelectionFrame } from "@/components/v3/SelectionFrame";
import { profile } from "@/content/profile";

/**
 * Corner crosshair, four to a frame. Purely a drafting mark — it is what makes
 * the thin rules read as a measured frame rather than a stray border.
 */
function CornerMark({ className }: { className: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute z-20 ${className}`}>
      <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-v3-line" />
      <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-v3-line" />
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate min-h-svh overflow-hidden bg-v3-bg text-v3-fg"
    >
      {/* Hatched margins outside the frame rules, the way a spec drawing leaves
          its bleed visible. */}
      <div className="v3-hatch absolute inset-y-0 left-0 w-4 sm:w-8 lg:w-14" aria-hidden />
      <div className="v3-hatch absolute inset-y-0 right-0 w-4 sm:w-8 lg:w-14" aria-hidden />

      <div className="relative mx-4 flex min-h-svh flex-col border-x border-v3-line sm:mx-8 lg:mx-14">
        <CornerMark className="-left-1.5 -top-1.5 size-3" />
        <CornerMark className="-right-1.5 -top-1.5 size-3" />
        <CornerMark className="-bottom-1.5 -left-1.5 size-3" />
        <CornerMark className="-bottom-1.5 -right-1.5 size-3" />

        {/* Only wide screens get the overlap treatment. The scenes have real
            subjects now — a globe, a flower — and a subject needs its own space
            to read as a picture rather than as a texture accident, so below lg
            the field stops being a backdrop and becomes a block of its own
            under the copy. Scrims were the alternative and they lost: no amount
            of gradient makes a paragraph sitting on a globe comfortable. */}
        <div className="relative z-0 order-2 h-[38svh] w-full shrink-0 lg:absolute lg:inset-y-0 lg:right-0 lg:order-none lg:h-full lg:w-[44%]">
          <DitherField className="absolute inset-0 h-full w-full" />
        </div>

        {/* Only needed where the two layers actually overlap. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 hidden lg:block lg:bg-[linear-gradient(96deg,var(--v3-bg)_42%,var(--v3-scrim)_52%,transparent_66%)]"
        />

        <div className="relative z-20 order-1 flex flex-1 flex-col justify-center px-5 pb-10 pt-28 sm:px-10 lg:order-none lg:max-w-[58%] lg:px-16 lg:py-24">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-v3-accent sm:text-xs">
            {profile.name} — {profile.role}
          </p>

          {/* Two-tone at phrase level, not word level: the accent lands on the
              claim ("deserve", "obvious") and the base weight carries the
              subject, so the line still parses if you only read one colour.

              The frame around it is the point of the section — a portfolio
              headline caught mid-edit, addressed to the one audience that
              reads a selection box as a native gesture. */}
          <div className="mt-14">
            <SelectionFrame cursorLabel={profile.role}>
              {/* Two lines, deliberately. The previous wording ran 54
                  characters and broke to four lines in the copy column, which
                  left the headline towering over everything under it. The
                  parallel construction splits evenly at any width the column
                  actually takes, and the measure is set to hold that break. */}
              <h1 className="max-w-[20ch] font-grotesk text-[clamp(2rem,4vw,4.25rem)] font-medium leading-[0.96] tracking-[-0.035em] text-v3-fg">
                Complex workflows,{" "}
                <span className="text-v3-accent">obvious interfaces.</span>
              </h1>
            </SelectionFrame>
          </div>

          <p className="mt-12 max-w-md text-sm leading-relaxed text-v3-muted sm:text-base">
            2.9 years across B2B SaaS, AI and healthcare. Shipped an EMR, a funding CRM and a
            design system running across 3+ live products, at Techdome and Calypsu.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 rounded-lg bg-v3-accent px-6 py-3.5 font-grotesk text-[15px] font-semibold tracking-[-0.01em] text-v3-bg transition-colors duration-200 hover:bg-v3-accent-bright"
            >
              See the work
              <ArrowRight
                aria-hidden
                className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </Link>

            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-lg border border-v3-line bg-v3-surface px-6 py-3.5 font-grotesk text-[15px] font-semibold tracking-[-0.01em] text-v3-fg transition-colors duration-200 hover:border-v3-muted hover:bg-v3-chip"
            >
              Email me
              <Mail aria-hidden className="size-3.5" strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
