import type { IconType } from "react-icons";
import { RiOpenaiFill } from "react-icons/ri";
import {
  SiClaude,
  SiFigma,
  SiFramer,
  SiGreensock,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import type { StackTool } from "@/types";

/**
 * The hero's tools row.
 *
 * Bare marks on the page ground, set as a slow ticker — the way a logo wall is
 * read: one glance, no reading. The label sits beside them rather than above,
 * so the whole thing stays one line and can sit under the hero image without
 * claiming a band of its own.
 *
 * ChatGPT comes from Remix rather than Simple Icons — OpenAI withdrew its mark
 * from Simple Icons over trademark policy, so `SiOpenai` does not exist in the
 * installed set. Same reason `ToolMarks` reaches for it.
 */
/**
 * Brand hex per mark, taken from the `simple-icons` metadata that ships with
 * the icons themselves rather than eyeballed.
 *
 * `hex` is optional on purpose, and omitting it is the answer for a mark that
 * has no colour to be wrong about. Next.js is officially `#000000`, which is
 * correct on a light ground and invisible on a dark one; the OpenAI mark
 * is monochrome and has no Simple Icons entry to cite at all. Both fall
 * through to `currentColor`, so they follow the theme instead of disappearing
 * into it.
 */
type Mark = {
  Icon: IconType;
  label: string;
  hex?: string;
  /** Only where `hex` was picked against a dark ground and dies on a light one. */
  hexLight?: string;
};

const MARKS: Record<StackTool, Mark> = {
  figma: { Icon: SiFigma, label: "Figma", hex: "#F24E1E" },
  framer: { Icon: SiFramer, label: "Framer", hex: "#0055FF" },
  claude: { Icon: SiClaude, label: "Claude", hex: "#D97757" },
  chatgpt: { Icon: RiOpenaiFill, label: "ChatGPT" },
  next: { Icon: SiNextdotjs, label: "Next.js" },
  // #087EA4 is React's own light-background blue, from its docs palette.
  react: { Icon: SiReact, label: "React", hex: "#61DAFB", hexLight: "#087EA4" },
  typescript: { Icon: SiTypescript, label: "TypeScript", hex: "#3178C6" },
  tailwind: { Icon: SiTailwindcss, label: "Tailwind CSS", hex: "#06B6D4", hexLight: "#0E7490" },
  gsap: { Icon: SiGreensock, label: "GSAP", hex: "#88CE02", hexLight: "#5A8A00" },
};

export function StackMarks({
  tools,
  className,
}: {
  tools: StackTool[];
  className?: string;
}) {
  if (tools.length === 0) return null;

  /*
   * Three runs of the list per half, and the whole thing doubled — so the
   * track is six copies of nine marks.
   *
   * The doubling is what makes a -50% loop seamless. The three-per-half is a
   * separate problem: a track narrower than its container leaves dead space
   * that slides into view every cycle, and one run of nine marks is only
   * ~290px against a container that can be three times that.
   *
   * `maxWidth` then caps the visible window at exactly one half-track, so
   * however wide the column gets, the strip is never asked to fill more than
   * it can. 68px is what one mark occupies — a 28px glyph plus the 40px
   * gutter it carries as `margin-right` — which makes this exact rather than a
   * guess, and keeps it correct if the stack list grows or shrinks.
   */
  const RUNS_PER_HALF = 3;
  const half = Array.from({ length: RUNS_PER_HALF }, () => tools).flat();
  const loop = [...half, ...half];
  const halfWidth = half.length * 68;

  return (
    <div className={`flex items-center gap-x-5 ${className ?? ""}`}>
      <span className="shrink-0 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-v3-muted">
        My stack
      </span>

      {/* Bare marks on the page ground, spaced, the way a logo wall is set —
          not chips. A circular chip per logo draws nine hard edges that have
          nothing to do with the logos inside them, and at this size the ring
          was competing with the marks it was supposed to frame. Air does the
          separating instead. */}
      <div className="v3-ticker relative flex-1" style={{ maxWidth: `${halfWidth}px` }}>
        <ul className="v3-ticker-track">
          {loop.map((tool, index) => {
            const mark = MARKS[tool];
            if (!mark) return null;
            const { Icon, label, hex, hexLight } = mark;
            // Only the first run carries the accessible names; every mark
            // after it is a visual repeat, and nine tools read out six times
            // is worse than no list at all.
            const isClone = index >= tools.length;

            return (
              <li
                key={`${tool}-${index}`}
                aria-hidden={isClone || undefined}
                // Uniform on every item, including the last: see the note on
                // `.v3-ticker-track` for why an exception here would make the
                // loop visibly jump.
                className="mr-10 shrink-0"
              >
              {/* The name is the accessible label rather than visible text, so
                  the row stays a strip of logos without going unreadable to a
                  screen reader.

                  The marks sit straight on `--v3-bg` now that the chips are
                  gone, which is still the neutral ground a brand hex needs —
                  and `hexLight` exists for the two that were picked against
                  the dark one and die on the light. */}
                <span
                  title={label}
                  // Sits at 62% until hovered. Nine brand colours at full
                  // strength is a lot of noise for a footnote, and easing them
                  // up on hover keeps the row quiet while still rewarding the
                  // one mark you point at — which the paused track now lets
                  // you actually do.
                  className="v3-mark relative flex items-center justify-center opacity-[0.62] transition-opacity duration-200 hover:opacity-100"
                  style={
                    hex
                      ? ({ "--mark": hex, "--mark-light": hexLight ?? hex } as React.CSSProperties)
                      : undefined
                  }
                >
                  {/* Fixed square rather than a natural-width logo: it is what
                      makes the 68px-per-mark arithmetic above exact, and it
                      keeps a wide wordmark from crowding its neighbours. */}
                  <Icon aria-hidden className="size-7" />
                  {!isClone && <span className="sr-only">{label}</span>}
                </span>
              </li>
            );
          })}
        </ul>

        <div aria-hidden className="v3-ticker-scrim pointer-events-none absolute inset-0" />
      </div>
    </div>
  );
}
