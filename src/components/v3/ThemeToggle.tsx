"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * Light/dark switch.
 *
 * Both icons are always rendered and CSS decides which one shows, keyed off the
 * same `.dark` class next-themes puts on the document. The usual approach — a
 * `mounted` flag flipped in an effect — makes the icon depend on client state
 * the server cannot know, which costs a hydration mismatch, an extra render
 * pass, and a visible icon flip on first paint. Letting the stylesheet answer
 * it means the correct icon is right in the very first frame.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle light or dark mode"
      className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-v3-line bg-v3-surface text-v3-muted transition-colors duration-200 hover:border-v3-muted hover:text-v3-fg"
    >
      <Sun aria-hidden className="hidden size-4 dark:block" strokeWidth={2} />
      <Moon aria-hidden className="size-4 dark:hidden" strokeWidth={2} />
    </button>
  );
}
