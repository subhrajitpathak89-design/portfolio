import type { IconType } from "react-icons";
import { RiOpenaiFill } from "react-icons/ri";
import { SiClaude, SiFigma } from "react-icons/si";
import type { ProjectTool } from "@/types";

/**
 * Tool logos for a case-study card.
 *
 * Marks only — a row of three wordmarks would compete with the project title
 * for the same glance, while three logos are read as a single "made with" unit
 * and cost nothing.
 *
 * ChatGPT comes from Remix rather than Simple Icons: OpenAI withdrew its mark
 * from Simple Icons over trademark policy, the same way Adobe did, so `siOpenai`
 * does not exist in the installed set.
 */
const MARKS: Record<ProjectTool, { Icon: IconType; label: string }> = {
  figma: { Icon: SiFigma, label: "Figma" },
  claude: { Icon: SiClaude, label: "Claude" },
  chatgpt: { Icon: RiOpenaiFill, label: "ChatGPT" },
};

export function ToolMarks({
  tools,
  /**
   * Off where the surrounding layout already labels the row — the Nivex hero
   * puts these in a definition list whose `dt` says "Built with", and two of
   * that phrase in one cell reads as a bug.
   */
  showLabel = true,
}: {
  tools: ProjectTool[];
  showLabel?: boolean;
}) {
  if (tools.length === 0) return null;

  return (
    <div className="flex items-center gap-3">
      {showLabel && (
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-v3-muted/70">
          Built with
        </span>
      )}

      <ul className="flex items-center gap-2">
        {tools.map((tool) => {
          const mark = MARKS[tool];
          if (!mark) return null;
          const { Icon, label } = mark;

          return (
            <li key={tool}>
              {/* The label is the accessible name rather than visible text, so
                  the row stays a strip of logos without going unreadable to a
                  screen reader. */}
              <span
                title={label}
                className="flex size-8 items-center justify-center rounded-md border border-v3-line bg-v3-bg text-v3-muted transition-colors duration-200 group-hover/card:text-v3-fg"
              >
                <Icon aria-hidden className="size-4" />
                <span className="sr-only">{label}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
