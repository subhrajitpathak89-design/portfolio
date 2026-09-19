import Image from "next/image";
import Link from "next/link";
import { ArrowDownToLine, ArrowRight } from "lucide-react";
import { DitherField } from "@/components/v3/DitherField";
import { LocalTime } from "@/components/v3/LocalTime";
import { StackMarks } from "@/components/v3/StackMarks";
import { profile } from "@/content/profile";

/**
 * The studio-site hero: a quiet type block over an off-white ground, then a
 * full-width image band pinned under it.
 *
 * The structural idea is a single 12-column grid used twice. The headline
 * starts at column 5 and runs to the right edge; under it the same offset
 * splits a short muted tagline on the left from the real paragraph on the
 * right. That one repeated indent is what makes the block read as set type
 * rather than as centred copy — nothing is centred here, and the left margin
 * is deliberately left mostly empty so the eye enters at the same x-position
 * twice.
 *
 * The photograph is no longer a bed the text sits on. It was previously
 * full-bleed behind the copy at 42% opacity under two scrims, which is a lot
 * of machinery spent making a picture quiet enough to read over. Given a band
 * of its own it can run at full strength, and the copy gets flat ground.
 */
export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-v3-bg text-v3-fg">
      {/* Hatched margins outside the column rules, the way a spec drawing
          leaves its bleed visible.

          These are not decoration that the hero can opt out of: About, Work,
          the case studies, Commits and the Footer all draw them, so a hero
          without them makes the hatch appear from nowhere at the first section
          boundary — the rules read as starting halfway down the page rather
          than running its full height. */}
      <div className="v3-hatch v3-bleed absolute inset-y-0 left-0" aria-hidden />
      <div className="v3-hatch v3-bleed absolute inset-y-0 right-0" aria-hidden />

      <div className="v3-column">
        {/* ── The type block ───────────────────────────────────────────── */}
        {/* Horizontal padding on the type block only, not on the column. The
            frame rules are the column's own edges, and text set flush against
            a rule reads as an overflow rather than as a margin — the buttons
            especially, since a pill's rounded edge touching a straight line
            looks like a collision. The image band below deliberately keeps no
            padding: a photograph running edge to edge between the rules is the
            contrast that makes the inset type read as inset. */}
        <div className="px-5 pb-14 pt-28 sm:px-8 sm:pt-32 lg:px-12 lg:pb-20 lg:pt-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8">
            {/* Scattered dither marks in the space the headline's indent
                leaves empty.

                A grid child in columns 1–4 rather than an absolute layer, so
                it occupies the empty space instead of floating over the block
                — and on a phone, where there are no spare columns, it is
                hidden outright. A decorative field stacked above the headline
                on a small screen is just something in the way. */}
            <div
              aria-hidden
              className="hidden lg:col-span-4 lg:col-start-1 lg:block"
            >
              <DitherField
                scenes={["particles"]}
                timeOffset={17}
                // Coarser than the 4px page default. These are meant to be
                // countable marks; at the default pitch the same field reads
                // as grain.
                cell={9}
                // Fades toward the headline on both axes, so the density is in
                // the outer corner and nothing is competing with the first
                // line of type where the two meet.
                className="h-52 w-full opacity-70 [mask-image:linear-gradient(to_right,black_30%,transparent_92%),linear-gradient(to_top,black_40%,transparent_95%)] [mask-composite:intersect]"
              />
            </div>

            {/* `text-balance` matters more than usual here: the line is set to
                break three times at desktop, and an unbalanced ragged edge on
                a headline this size is the difference between set type and a
                paragraph that happens to be large. */}
            {/* `font-editorial-display`, the same Instrument Serif every other
                heading on the site is set in. The reference this layout came
                from sets its headline in a grotesk, and matching that here
                would have made the hero the one page element speaking in a
                different voice — a display face is only a voice if it is used
                everywhere it applies.

                Tracking is looser than the grotesk wanted: -0.03em is a
                correction for a sans at display size, and applied to a serif
                it closes the counters and starts fusing letter pairs. Leading
                comes down to compensate for the serif's smaller apparent
                size at the same px. */}
            <h1
              data-reveal-item
              className="text-pretty font-editorial-display text-[clamp(2.5rem,5.2vw,4.5rem)] font-normal leading-[1.0] tracking-[-0.01em] text-v3-fg lg:col-span-8 lg:col-start-5"
            >
              {/* No name in the headline. The wordmark carries it, the page
                  title carries it, and the footer carries it — a hero that
                  opens by introducing itself spends its largest line on the
                  one fact a reader already has. The line states the work
                  instead, which is what a reviewer is actually scanning for. */}
              Turning complex workflows into{" "}
              <span className="text-v3-muted">clear, usable products.</span>
            </h1>
          </div>

          {/* The second row repeats the column-5 indent. The gap above it is
              large on purpose — the reference sets roughly a headline's worth
              of air between the claim and its supporting text, and closing it
              up makes the two read as one stacked paragraph. */}
          <div className="mt-14 grid grid-cols-1 gap-y-10 lg:mt-24 lg:grid-cols-12 lg:gap-x-8">
            <div
              data-reveal-item
              style={{ "--reveal-delay": 1 } as React.CSSProperties}
              className="lg:col-span-4 lg:col-start-1"
            >
              <p className="max-w-[24ch] text-sm leading-relaxed text-v3-muted sm:text-[15px]">
                {profile.roleLine}
              </p>

              {/* The two calls to action live in the left column rather than
                  under the paragraph. The reference hero carries none at all,
                  but the résumé is the one document a reviewer actually came
                  for, and dropping it to match a layout would be trading the
                  page's job for its looks. Parked here they fill the empty
                  left margin instead of interrupting the reading column. */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
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
                    whatever the URL ends in, and it opens in a new tab when
                    the browser would rather preview a PDF than save it. */}
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
            </div>

            <p
              data-reveal-item
              style={{ "--reveal-delay": 2 } as React.CSSProperties}
              className="text-[15px] leading-relaxed text-v3-fg sm:text-base lg:col-span-7 lg:col-start-5"
            >
              {/* Not `profile.tagline` any more. That string is also the meta
                  description in three places, so it has to keep naming the
                  domains and the workflow claim — which is now exactly what
                  the headline above says. Repeating it here would make the
                  first two things a reader sees the same sentence twice. This
                  says what the headline cannot: the span of the work, and the
                  evidence for it. */}
              Product design across B2B SaaS, AI and healthcare — from the research that
              precedes a screen to the shipped interface and the design system underneath
              it. <span className="text-v3-muted">{profile.proofLine}</span>
            </p>
          </div>
        </div>

        {/* ── The image band ───────────────────────────────────────────────
            Same width as the type above it, so the whole hero reads as one
            block with a picture at its foot rather than a page with a banner
            across it. The aspect ratio is wide and short by design: tall
            enough to be a picture, short enough that the next section's top
            edge stays in view, which is the cheapest hint that there is more
            page. */}
        <div
          data-reveal-item
          style={{ "--reveal-delay": 3 } as React.CSSProperties}
          className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[2/1] lg:aspect-[16/5.5]"
        >
          <Image
            src="/images/v3/hero-hills.webp"
            alt=""
            fill
            priority
            // 88rem is the column cap, so above that the image really is
            // fixed; below it the image fills the viewport less the gutters,
            // and `100vw` is the honest answer. A flat `88rem` here would send
            // a 375px phone at 2x after the 1920 variant.
            sizes="(min-width: 88rem) 88rem, 100vw"
            // Higher than the 55 this ran at when it was a 42%-opacity bed
            // under two scrims. At full strength in a band of its own the
            // compression has nowhere to hide.
            quality={72}
            className="object-cover"
          />

          {/* One scrim, bottom only, and just enough to seat the two marks
              below. The picture is the point of this band now; dimming it
              whole would put us back where we started. */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,rgba(0,0,0,0.38),transparent)]"
          />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-4 pb-4 font-mono text-[11px] tracking-[0.02em] text-white/85 sm:px-6 sm:pb-5 sm:text-xs">
            <LocalTime city="Hyderabad" timeZone="Asia/Kolkata" />
            <span aria-hidden>(Scroll)</span>
          </div>
        </div>

        {/* The stack sits under the band, small and quiet — a footnote to the
            hero rather than a third button in the call-to-action row, which is
            what it read as when it shared spacing with them. */}
        <div
          data-reveal-item
          style={{ "--reveal-delay": 4 } as React.CSSProperties}
        >
          <StackMarks
            tools={profile.stack}
            className="mt-8 mb-14 px-5 sm:px-8 lg:mb-20 lg:px-12"
          />
        </div>
      </div>
    </section>
  );
}
