import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";
import { projects } from "@/content/projects";
import type { Project } from "@/types";

/*
 * Geometry note.
 *
 * The wire lives *inside* the moving track rather than sitting still behind
 * it. That is the whole trick: a static curved wire with horizontally sliding
 * cards would need each card's y recomputed from its live x every frame to
 * stay on the line, or the pegs visibly drift off it. Moving the wire with the
 * cards makes the pegging rigid — it reads as one long washing line sliding
 * past, and needs no JS at all.
 *
 * For the loop to be seamless the wire must leave each panel at exactly the
 * height it entered, so both ends of the curve sit at WIRE_END_Y.
 */
const PANEL_WIDTH = 1200;
const WIRE_END_Y = 40;
const WIRE_CONTROL_Y = 180;

// Clears the lowest card (hung at the wire's dip) plus the few px its tilt
// adds. Tightened after the captions came off, so the line does not sit in a
// pool of empty cream.
const PANEL_HEIGHT = 320;

/** Card slots along the panel, evenly spaced. */
const SLOT_XS = [150, 450, 750, 1050];

/** A hanging card settles near vertical regardless of the wire's slope. */
const SLOT_ROTATIONS = [-3.5, 2.5, -1.5, 3];

/**
 * Height of the quadratic wire at a given x. Cards read their y from this same
 * function, so the pegs cannot drift off the line.
 */
function wireY(x: number) {
  const t = x / PANEL_WIDTH;
  return (
    (1 - t) ** 2 * WIRE_END_Y +
    2 * t * (1 - t) * WIRE_CONTROL_Y +
    t ** 2 * WIRE_END_Y
  );
}

export function HangingWorks() {
  return (
    <section
      id="gallery"
      className="v2-marquee-host relative overflow-hidden bg-v2-cream pb-24 pt-20 lg:pb-32 lg:pt-24"
    >
      <header className="mx-auto max-w-6xl px-6 text-center lg:px-8">
        <p className="font-script text-2xl text-v2-ink/70 sm:text-3xl">
          (on the line)
        </p>
        <h2 className="mt-4 font-grotesk text-[clamp(1.75rem,4.2vw,3.5rem)] font-black leading-[0.95] tracking-[-0.03em] text-v2-ink">
          more work
        </h2>
      </header>

      <Marquee repeat={1} duration={40} className="mt-16 lg:mt-20">
        <Panel />
      </Marquee>

      {/*
        The marquee is decorative — it duplicates its content to loop, so
        exposing it would read every title twice, and its cards are not
        focusable. This list carries the same information once, for assistive
        tech only.
      */}
      <ul className="sr-only">
        {projects.map((project) => (
          <li key={project.slug}>
            {project.title} — {project.category}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Panel() {
  return (
    <div
      className="relative shrink-0"
      style={{ width: PANEL_WIDTH, height: PANEL_HEIGHT }}
    >
      <svg
        className="absolute left-0 top-0 text-v2-ink/25"
        width={PANEL_WIDTH}
        height={220}
        viewBox={`0 0 ${PANEL_WIDTH} 220`}
        aria-hidden
      >
        <path
          d={`M0 ${WIRE_END_Y} Q ${PANEL_WIDTH / 2} ${WIRE_CONTROL_Y} ${PANEL_WIDTH} ${WIRE_END_Y}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {SLOT_XS.map((x, index) => (
        <PeggedCard
          key={x}
          project={projects[index % projects.length]}
          x={x}
          rotate={SLOT_ROTATIONS[index]}
        />
      ))}
    </div>
  );
}

function PeggedCard({
  project,
  x,
  rotate,
}: {
  project: Project;
  x: number;
  rotate: number;
}) {
  return (
    <div
      className="absolute"
      style={{
        left: x,
        top: wireY(x),
        // Pivoting at the top centre means the card swings from its peg rather
        // than about its own middle.
        transform: `translateX(-50%) rotate(${rotate}deg)`,
        transformOrigin: "top center",
      }}
    >
      <span
        aria-hidden
        className="absolute -top-3 left-1/2 z-10 h-7 w-4 -translate-x-1/2 rounded-[3px] bg-v2-green shadow-[0_2px_4px_rgba(17,17,17,0.25)]"
      />

      {/* Image only. The deeper bottom border is the one asymmetry kept from
          the polaroid frame — without it, a captionless card just reads as a
          plain white box. */}
      <div className="w-[240px] rounded-xl bg-white p-3 pb-6 shadow-[0_18px_36px_-16px_rgba(17,17,17,0.35)]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-v2-ink/5">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt=""
              fill
              sizes="240px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-v2-ink/25">
              <ImageIcon aria-hidden className="size-7" strokeWidth={1.5} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
