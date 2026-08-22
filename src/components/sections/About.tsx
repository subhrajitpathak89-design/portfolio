import { ImageIcon, Send } from "lucide-react";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";

// Small dashed-curve + paper-plane accent, tucked behind the polaroid.
// Uses CSS's native scroll-linked animation (offset-path + view timeline)
// rather than a JS scroll listener.
const PLANE_PATH = "M10,150 C20,110 15,70 45,55 C75,40 95,25 115,8";

function ScrollPlaneAccent() {
  return (
    <div
      className="pointer-events-none absolute -right-6 -top-8 z-0 h-32 w-28 sm:-right-10 sm:-top-10 sm:h-40 sm:w-32"
      aria-hidden
    >
      <svg viewBox="0 0 130 160" className="absolute inset-0 h-full w-full overflow-visible">
        <path
          d={PLANE_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          className="text-border"
        />
        <circle cx="115" cy="8" r="3" className="fill-accent" />
      </svg>

      <div
        className="scroll-plane absolute left-0 top-0 h-5 w-5 text-accent"
        style={{ offsetPath: `path("${PLANE_PATH}")`, offsetRotate: "auto 45deg" }}
      >
        <Send className="h-5 w-5" />
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="bg-background py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
        <div className="flex justify-center lg:justify-start">
          <div className="relative w-fit">
            <ScrollPlaneAccent />

            <Reveal y={40}>
              <div className="relative z-10 -rotate-3 rounded-sm bg-surface p-3 pb-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
                <div className="flex aspect-[4/5] w-64 items-center justify-center bg-muted sm:w-80">
                  <ImageIcon className="h-12 w-12 text-muted-foreground" aria-hidden />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div>
          <Reveal>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent">
              <span className="inline-block h-2.5 w-2.5 rotate-45 bg-accent" aria-hidden />
              About me
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              a little about myself
            </h2>
          </Reveal>

          <div className="mt-8 space-y-6">
            {profile.bio.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={0.15 + index * 0.08}>
                <p className="text-lg leading-relaxed text-muted-foreground">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <p className="mt-8 font-script text-4xl text-accent">{profile.name}.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
