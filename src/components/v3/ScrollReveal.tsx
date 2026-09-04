"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Reveals `[data-reveal-item]` elements as they scroll into view.
 *
 * One observer for the whole document rather than a wrapper component per
 * block: the effect is a single class toggle, so there is nothing to gain from
 * a React component around every element and a great deal of tree noise to
 * lose. The hidden state and the transition live in globals.css, keyed off
 * `html[data-reveal]` — see the note there for why that attribute is set by an
 * inline script rather than from this effect.
 *
 * One-shot by design. Elements are unobserved once revealed, so nothing
 * re-hides when a reader scrolls back up — a section that fades out behind you
 * reads as a bug, and re-animating on every pass is what makes scroll effects
 * tiring.
 */
export function ScrollReveal() {
  // Route changes swap the tree without unmounting this, so the scan has to
  // re-run or a client-side navigation lands on a page of hidden blocks.
  const pathname = usePathname();

  useEffect(() => {
    // Tell the inline script's watchdog that the reveal machinery came up. If
    // this never runs — the chunk failed, an error boundary swallowed the tree
    // — the watchdog drops `data-reveal` and every hidden block becomes
    // visible. That is the one failure mode the CSS gating cannot cover on its
    // own, and the cost of getting it wrong is an invisible page.
    const w = window as unknown as { __revealWatchdog?: number };
    if (w.__revealWatchdog) {
      window.clearTimeout(w.__revealWatchdog);
      w.__revealWatchdog = undefined;
    }

    const items = document.querySelectorAll<HTMLElement>(
      "[data-reveal-item]:not(.is-revealed)"
    );
    if (items.length === 0) return;

    const reveal = (el: Element) => el.classList.add("is-revealed");

    // Anything already on screen is revealed from its own measured rect,
    // synchronously, before the observer is even wired up.
    //
    // This is not an optimisation — it is the correctness case. An
    // IntersectionObserver reports nothing as intersecting while the page is
    // not being rendered (a background tab, an occluded or zero-area
    // viewport), so relying on it alone means the content above the fold can
    // stay hidden with no callback ever arriving to fix it. Measuring directly
    // makes the first screen unconditional and leaves the observer responsible
    // only for what genuinely arrives later.
    const onScreen = (el: Element) => {
      const rect = el.getBoundingClientRect();
      const height = window.innerHeight || document.documentElement.clientHeight;
      return rect.top < height && rect.bottom > 0;
    };

    const observer = new IntersectionObserver(
      (entries, self) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          self.unobserve(entry.target);
        }
      },
      // A little into the viewport, so the fade finishes around the point the
      // element is properly on screen rather than starting as it clips the
      // very bottom edge.
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach((item) => {
      if (onScreen(item)) {
        reveal(item);
        return;
      }
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
