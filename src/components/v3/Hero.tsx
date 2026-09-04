import Image from "next/image";
import Link from "next/link";
import { ArrowDownToLine, ArrowRight } from "lucide-react";
import { StackMarks } from "@/components/v3/StackMarks";
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
      // 88svh rather than a full one. A hero forced to the exact viewport
      // height has to spend its slack somewhere, and `justify-center` splits
      // it top and bottom — so the leftover below the stack row was reading as
      // a gap before the work grid rather than as breathing room. Stopping
      // short also leaves the top edge of the next section visible, which is
      // the cheapest possible hint that there is more page.
      className="relative isolate min-h-[88svh] overflow-hidden bg-v3-bg text-v3-fg"
    >
      {/* Hatched margins outside the frame rules, the way a spec drawing leaves
          its bleed visible. */}
      <div className="v3-hatch v3-bleed absolute inset-y-0 left-0" aria-hidden />
      <div className="v3-hatch v3-bleed absolute inset-y-0 right-0" aria-hidden />

      <div className="v3-column relative flex min-h-[88svh] flex-col">
        <CornerMark className="-left-1.5 -top-1.5 size-3" />
        <CornerMark className="-right-1.5 -top-1.5 size-3" />
        <CornerMark className="-bottom-1.5 -left-1.5 size-3" />
        <CornerMark className="-bottom-1.5 -right-1.5 size-3" />

        {/* ── The photograph ──────────────────────────────────────────────
            Full-bleed inside the frame rather than a panel on one side: the
            image already carries a white measuring grid and an inset crop, so
            it reads as part of the same drafting language the rules and
            crosshairs are speaking. Boxing it would turn it back into a
            picture hung on the page.

            Everything under here is about keeping the copy readable on top of
            it, which is the whole difficulty with a high-key photograph —
            bright sky top-left is exactly where the eyebrow and headline
            land. */}
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <Image
            src="/images/v3/hero-hills.webp"
            alt=""
            fill
            priority
            sizes="88rem"
            // 55, not the default 75. This is the largest image on the site and
            // it is the one that can least afford detail: it renders at 42%
            // opacity, desaturated, under two gradient scrims. Compression
            // artefacts do not survive that treatment either, and the file went
            // from 128KB to well under half without a visible difference in the
            // rendered result.
            quality={55}
            // Desaturated and dimmed rather than dropped in raw. At full
            // strength a blue-and-green photograph fights the orange accent
            // for every glance and wins, and the page stops being a spec
            // drawing with a picture in it.
            className="object-cover opacity-[0.42] saturate-[0.62]"
          />

          {/* Two scrims, not one, because they do different jobs.

              The first is horizontal: it lays the page ground under the copy
              column and releases it across the right half, so the text sits
              on flat colour while the image stays legible where nothing
              overlaps it. This is the same gradient the dither field used to
              need, for the same reason — no amount of uniform dimming makes a
              paragraph on a cloud comfortable.

              The second is vertical, and it is what stops the section ending
              on a hard horizon line: the image fades into the page ground at
              the bottom rule, so the hero hands off to the work grid instead
              of being cut off by it. */}
          <div className="absolute inset-0 bg-[linear-gradient(100deg,var(--v3-bg)_0%,var(--v3-bg)_30%,var(--v3-scrim)_52%,transparent_82%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--v3-bg)_0%,transparent_22%,transparent_62%,var(--v3-bg)_100%)]" />
        </div>

        {/* One column, not two. The right 44% used to hold a drifting dither
            field, and with that gone there is nothing to make room for — a
            copy column still capped at 58% of the frame would just be a
            narrow block with an empty half beside it. The headline gets the
            full measure instead, and the copy is capped short of the frame so
            it never runs into the brightest part of the photograph. */}
        <div className="relative z-20 flex flex-1 flex-col justify-center px-5 pb-10 pt-28 sm:px-10 lg:max-w-[62%] lg:px-16 lg:pb-16 lg:pt-24">
          <p
            data-reveal-item
            className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-v3-accent sm:text-xs"
          >
            {profile.name} — {profile.role}
          </p>

          {/* Two-tone at phrase level, not word level: the accent lands on the
              claim ("deserve", "obvious") and the base weight carries the
              subject, so the line still parses if you only read one colour.

              The frame around it is the point of the section — a portfolio
              headline caught mid-edit, addressed to the one audience that
              reads a selection box as a native gesture. */}
          <div className="mt-14" data-reveal-item style={{ "--reveal-delay": 1 } as React.CSSProperties}>
            <SelectionFrame cursorLabel={profile.role}>
              {/* Two lines, deliberately. The previous wording ran 54
                  characters and broke to four lines in the copy column, which
                  left the headline towering over everything under it. The
                  parallel construction splits evenly at any width the column
                  actually takes, and the measure is set to hold that break. */}
              {/* Bigger than it was, because it is no longer sharing the frame
                  with a picture. The ceiling is what a two-line break can
                  carry at the capped measure — past 5rem the second line runs
                  the full column and the pair stops reading as one gesture. */}
              {/* 24ch, not 20: at the tighter measure this wording broke to
                  three lines, and the frame is drawn around whatever shape the
                  headline takes — a three-line box stops reading as a caught
                  selection and starts reading as a paragraph with a border. */}
              <h1 className="max-w-[24ch] font-editorial-display text-[clamp(2rem,5.5vw,5rem)] font-normal leading-[0.96] tracking-[-0.02em] text-v3-fg">
                From complex workflows to{" "}
                <span className="text-v3-accent">clear experiences.</span>
              </h1>
            </SelectionFrame>
          </div>

          {/* The second sentence carries the base foreground rather than the
              muted grey: it is the claim, and at `text-v3-muted` the whole
              block read as one flat caption with nothing to land on. */}
          <p
            data-reveal-item
            style={{ "--reveal-delay": 2 } as React.CSSProperties}
            className="mt-12 max-w-lg text-sm leading-relaxed text-v3-muted sm:text-base"
          >
            Product Designer with 2.9 years across B2B SaaS, AI and healthcare.{" "}
            <span className="text-v3-fg">
              I design complex products, simplify workflows and build scalable systems used
              across live products.
            </span>
          </p>

          <div
            data-reveal-item
            style={{ "--reveal-delay": 3 } as React.CSSProperties}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
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

            {/* The résumé, not a second "email me". The header CTA, the
                floating dock and the footer are all already a mailto, so a
                fourth one here was the least useful thing this row could
                offer — where the one document a recruiter actually needs was
                nowhere on the page.

                `download` names the file rather than letting it save as
                whatever the URL ends in, and it opens in a new tab when the
                browser would rather preview a PDF than save it. */}
            <a
              href={profile.resume}
              download="Subhrajit-Pathak-Product-Designer-Resume.pdf"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-lg border border-v3-line bg-v3-surface px-6 py-3.5 font-grotesk text-[15px] font-semibold tracking-[-0.01em] text-v3-fg transition-colors duration-200 hover:border-v3-muted hover:bg-v3-chip"
            >
              Resume
              <ArrowDownToLine aria-hidden className="size-3.5" strokeWidth={2} />
            </a>
          </div>

          {/* Below the buttons, inside the centred copy block, so it travels
              with the rest of the column rather than pinning to the frame.
              The gap is wider than the one above the buttons: the stack is a
              separate thought from the call to action, and at the same spacing
              the chips read as a third button. */}
          {/* Wrapped rather than tagged directly: `StackMarks` takes only
              `tools` and `className`, and widening its props to carry a
              presentation concern from one call site is the wrong trade. */}
          <div
            data-reveal-item
            style={{ "--reveal-delay": 4 } as React.CSSProperties}
          >
            <StackMarks tools={profile.stack} className="mt-14" />
          </div>
        </div>
      </div>
    </section>
  );
}
