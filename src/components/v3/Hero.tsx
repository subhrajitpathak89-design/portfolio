import Image from "next/image";
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
    <section id="home" className="v3-column relative isolate bg-v3-bg text-v3-fg">
      <div className="px-5 pt-32 sm:px-10 sm:pt-36 lg:px-16 lg:pt-40">
        <p data-reveal-item className="font-grotesk text-[13px] text-v3-muted">
          {profile.roleLine}
        </p>

        {/* No name in the headline. The wordmark, page title and footer all
            carry it; the line states the work instead. */}
        <h1
          data-reveal-item
          style={{ "--reveal-delay": 1 } as React.CSSProperties}
          className="mt-4 font-hero-serif text-[clamp(2.4rem,4.4vw,3.75rem)] font-light leading-[1.02] tracking-[-0.025em]"
        >
          Making complex software
          <br />
          feel simple to use.
        </h1>

        <p
          data-reveal-item
          style={{ "--reveal-delay": 2 } as React.CSSProperties}
          className="mt-6 max-w-[60ch] text-[15px] leading-relaxed sm:text-base"
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
            the image without making it taller. Kept to the right two-thirds so it reads as a plate, not a banner. */}
        <div className="relative aspect-[2/1] w-full overflow-hidden">
          <Image
            src="/images/v3/hero-card.webp"
            alt="Abstract orchid illustration in pink, green and blue"
            fill
            priority
            sizes="(min-width: 1024px) 84vw, 100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
