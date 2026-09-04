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
 * Marks in circular chips, the way a stack row is conventionally read: one
 * glance, no reading. The label sits beside them rather than above, so the
 * whole thing stays one line and can pin to the bottom of the hero frame
 * without claiming a band of its own.
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
 * correct on a white chip and invisible on a near-black one; the OpenAI mark
 * is monochrome and has no Simple Icons entry to cite at all. Both fall
 * through to `currentColor`, so they follow the theme instead of disappearing
 * into it.
 */
type Mark = {
  Icon: IconType;
  label: string;
  hex?: string;
  /** Only where `hex` was picked against a dark ground and dies on a white chip. */
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

  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-4 ${className ?? ""}`}>
      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-v3-muted">
        My stack
      </span>

      {/* Overlapped rather than spaced: the negative margin plus a ring in the
          page ground makes the row read as one linked strip, and it keeps nine
          chips inside the copy column instead of pushing it wide. Hover lifts
          the chip out of the stack so the one under the cursor is legible. */}
      <ul className="flex items-center">
        {tools.map((tool) => {
          const mark = MARKS[tool];
          if (!mark) return null;
          const { Icon, label, hex, hexLight } = mark;

          return (
            <li key={tool} className="-ml-2 first:ml-0">
              {/* The name is the accessible label rather than visible text, so
                  the row stays a strip of logos without going unreadable to a
                  screen reader.

                  The chip stays `--v3-surface` in both themes — white in
                  light, near-black in dark — which is what lets one brand hex
                  per mark work at all: a coloured logo needs a neutral ground
                  or it is being asked to contrast against another brand's
                  colour. */}
              <span
                title={label}
                className="v3-mark relative flex size-10 items-center justify-center rounded-full bg-v3-surface text-v3-fg ring-1 ring-v3-line transition-transform duration-200 hover:z-10 hover:-translate-y-1"
                style={
                  hex
                    ? ({ "--mark": hex, "--mark-light": hexLight ?? hex } as React.CSSProperties)
                    : undefined
                }
              >
                <Icon aria-hidden className="size-[18px]" />
                <span className="sr-only">{label}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
