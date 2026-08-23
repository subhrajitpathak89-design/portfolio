import type { IconType } from "react-icons";
import { SiClaude, SiFigma, SiFramer, SiGithub, SiNotion } from "react-icons/si";
import { toolsContent } from "@/content/tools";
import type { Tool, ToolIconName } from "@/types";

const TOOL_ICONS: Record<ToolIconName, IconType> = {
  figma: SiFigma,
  claude: SiClaude,
  github: SiGithub,
  framer: SiFramer,
  notion: SiNotion,
};

// One source of truth for the geometry: the tile is 2 * TILE_HALF across, and
// the orbit radius is the ring's own radius pulled in by that much so no tile
// overhangs the container.
const RING_STYLE = {
  "--ring-d": "min(86vw, 600px)",
  "--ring-r": "calc(min(86vw, 600px) / 2 - 2.5rem)",
} as React.CSSProperties;

export function Tools() {
  const { eyebrow, heading, caption, tools } = toolsContent;

  return (
    <section
      id="tools"
      className="v2-orbit-host relative overflow-hidden bg-v2-cream py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <header className="text-center">
          <p className="font-script text-2xl text-v2-periwinkle sm:text-3xl">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-grotesk text-[clamp(1.75rem,4.2vw,3.5rem)] font-black leading-[0.95] tracking-[-0.03em] text-v2-ink">
            {heading}
          </h2>
        </header>

        <div
          className="relative mx-auto mt-14 h-[var(--ring-d)] w-[var(--ring-d)] lg:mt-20"
          style={RING_STYLE}
        >
          {/*
            The ring rotates; each tile counter-rotates by the same amount, so
            the tiles orbit without tumbling. Hovering anywhere in the section
            pauses both halves together — pausing only one would let the tiles
            drift out of square.
          */}
          <ul className="animate-v2-orbit absolute inset-0">
            {tools.map((tool, index) => {
              const angle = (360 / tools.length) * index;

              return (
                <li
                  key={tool.name}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    // Place on the circle, then unwind `angle` so the tile
                    // starts square rather than tangential to the curve.
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(calc(var(--ring-r) * -1)) rotate(${-angle}deg)`,
                  }}
                >
                  <div className="animate-v2-orbit-counter">
                    <ToolTile tool={tool} />
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center font-editorial text-xl italic leading-snug text-v2-ink/55 sm:text-2xl lg:text-3xl">
            {caption.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

function ToolTile({ tool }: { tool: Tool }) {
  return (
    <div
      className="flex size-14 items-center justify-center rounded-2xl shadow-[0_10px_24px_-10px_rgba(17,17,17,0.45)] sm:size-[4.5rem]"
      style={{ backgroundColor: tool.bg, color: tool.fg }}
      title={tool.name}
    >
      {tool.kind === "icon" ? (
        <ToolIcon name={tool.icon} />
      ) : (
        <span
          className="font-grotesk text-lg font-black leading-none tracking-tight sm:text-2xl"
          aria-hidden
        >
          {tool.mono}
        </span>
      )}
      <span className="sr-only">{tool.name}</span>
    </div>
  );
}

function ToolIcon({ name }: { name: ToolIconName }) {
  const Icon = TOOL_ICONS[name];
  return <Icon aria-hidden className="size-6 sm:size-8" />;
}
