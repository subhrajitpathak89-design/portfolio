import { HeroReel } from "@/components/v3/HeroReel";
import { FigmaCursor } from "@/components/v3/FigmaCursor";
import { profile } from "@/content/profile";

const sectors = ["B2B SaaS", "AI tools", "Healthcare", "Design systems"];

/**
 * A quiet, stacked hero: a small credential line, a two-line headline set
 * light, one sentence of plain copy, sector tags with a proof line, then a
 * wide image band that starts indented from the copy's left edge and runs
 * to the column's right.
 */
export function Hero() {
  return (
    <section id="home" className="v3-column relative isolate overflow-x-clip bg-v3-bg text-v3-fg">
      <div className="px-5 pt-32 sm:px-10 sm:pt-36 lg:px-16 lg:pt-40">
        <p data-reveal-item className="font-grotesk text-[13px] text-v3-muted">
          {profile.roleLine}
        </p>

        {/* No name in the headline. The wordmark, page title and footer all
            carry it; the line states the work instead. */}
        <div className="relative w-fit">
          <h1
            data-reveal-item
            style={{ "--reveal-delay": 1 } as React.CSSProperties}
            className="mt-4 font-hero-serif text-[clamp(2.4rem,4.4vw,3.75rem)] font-light leading-[1.02] tracking-[-0.025em]"
          >
            Making complex software
            <br />
            feel simple to use.
          </h1>

          {/* Two collaborators "in the file" with the headline. Below lg
              they sit just above and below it, with a shorter wander. */}
          <FigmaCursor
            name="Subhrajit"
            color="#0d99ff"
            variant="a"
            className="right-0 top-[38%] lg:-right-28 lg:top-2"
          />
          <FigmaCursor
            name="Product team"
            color="#14ae5c"
            variant="b"
            className="-bottom-8 left-[30%] lg:bottom-3 lg:left-auto lg:-right-6"
          />
        </div>

        <p
          data-reveal-item
          style={{ "--reveal-delay": 2 } as React.CSSProperties}
          className="mt-10 max-w-[60ch] text-[15px] leading-relaxed sm:text-base lg:mt-6"
        >
          I design B2B, AI and healthcare products people pick up without a manual —
          from the first research call to the shipped screen.
        </p>

        <div
          data-reveal-item
          style={{ "--reveal-delay": 3 } as React.CSSProperties}
          className="mt-8 flex flex-wrap items-center gap-2"
        >
          {sectors.map((s) => (
            <span
              key={s}
              className="rounded-full border border-v3-line px-2.5 py-0.5 font-grotesk text-[13px] text-v3-muted"
            >
              {s}
            </span>
          ))}
          <span className="ml-1 font-grotesk text-[13px] text-v3-muted">
            {profile.proofLine}
          </span>
        </div>
      </div>

      {/* Indented on the left, flush to the copy's right edge, like a
          plate set into the page. Full width on a phone. */}
      <div
        data-reveal-item
        style={{ "--reveal-delay": 3 } as React.CSSProperties}
        className="relative mt-12 px-5 sm:px-10 lg:ml-[36%] lg:px-16 lg:pl-0"
      >
        {/* The ratio sits on the inner box, so the wrapper's padding narrows
            the reel without making it taller. Kept to the right two-thirds so it reads as a plate, not a banner. */}
        <div className="relative aspect-[2/1] w-full overflow-hidden">
          <HeroReel />
        </div>
      </div>
    </section>
  );
}
