"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * Light/dark switch.
 *
 * No provider, no dependency, and no React state. The theme is one class on
 * the root element and two blocks of tokens in globals.css, so the button's
 * own appearance can be driven by that same class through the `dark:` variant
 * — which means there is nothing for the server to guess at, nothing to
 * hydrate, and no frame where the icon disagrees with the page.
 *
 * State would also have been wrong here rather than merely unnecessary: the
 * theme comes from `localStorage` or an OS setting, neither of which the server
 * can see, so any icon chosen during SSR is a coin flip that gets swapped in
 * front of the reader.
 *
 * Three states, two of them visible: an explicit `light` or `dark` in storage,
 * or nothing stored, which means follow the system and keep following it. That
 * last one is what most toggles lose — they write a value on first paint and
 * then ignore the OS forever.
 */

const KEY = "theme";

export function ThemeToggle() {
  useEffect(() => {
    // Keep following the OS for as long as the reader has not overridden it.
    // Only touches the DOM, so there is no state to cascade.
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const follow = () => {
      try {
        if (localStorage.getItem(KEY)) return;
      } catch {
        return;
      }
      document.documentElement.classList.toggle("dark", media.matches);
    };

    media.addEventListener("change", follow);
    return () => media.removeEventListener("change", follow);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);

    try {
      // Stored only when it differs from the system, so someone who toggles
      // back to where their OS already is returns to following it rather than
      // being pinned to today's setting forever.
      if (next === window.matchMedia("(prefers-color-scheme: dark)").matches) {
        localStorage.removeItem(KEY);
      } else {
        localStorage.setItem(KEY, next ? "dark" : "light");
      }
    } catch {
      // Site data blocked. The theme still switches for this page view, which
      // is the part the click asked for.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex size-9 items-center justify-center rounded-full border border-v3-line bg-v3-surface text-v3-muted transition-colors duration-200 hover:border-v3-muted hover:text-v3-fg"
    >
      {/* Both icons are always mounted and the class hides one, rather than
          swapping the node: replacing the only child on click drops the focus
          ring mid-interaction for a keyboard user. */}
      <Sun aria-hidden strokeWidth={2} className="size-4 dark:hidden" />
      <Moon aria-hidden strokeWidth={2} className="hidden size-4 dark:block" />

      {/* The accessible name says what the click will do, and stays accurate
          without any JS knowing the theme — same class, same variant. It is an
          instruction rather than a status, because "dark mode" alone reads
          identically whether it is on or off. */}
      <span className="sr-only dark:hidden">Switch to dark theme</span>
      <span className="sr-only hidden dark:inline">Switch to light theme</span>
    </button>
  );
}
