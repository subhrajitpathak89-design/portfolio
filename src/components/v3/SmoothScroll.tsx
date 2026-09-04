"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis-driven smooth scrolling.
 *
 * Deliberately not the v2 version: that one pulled GSAP in purely to borrow its
 * ticker, and v3 uses GSAP nowhere else. A bare rAF loop does the same job
 * without the dependency.
 *
 * Anchor clicks are intercepted because a native hash jump teleports the real
 * scroll position out from under Lenis, which then eases back from wherever it
 * thought it was — the page appears to jump and then slide.
 */
export function SmoothScroll() {
  useEffect(() => {
    // Honouring the OS setting matters more here than anywhere else on the
    // page: hijacked scrolling is a common motion-sickness trigger, and someone
    // who has asked for less motion has asked for the native scroller.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    /*
     * One forced remeasure once everything has loaded.
     *
     * Belt and braces on top of importing `lenis.css`: Lenis recomputes its
     * scroll limit from a `ResizeObserver` on the document, debounced by
     * 250ms, and a case study finishes growing well after this effect runs —
     * posters decode, a font swaps, the reveal items mount. If any of that
     * lands without changing the observed box, the limit stays stale and the
     * page stops scrolling short of its own end.
     *
     * `load` has usually fired by the time this mounts, so the flag covers
     * both orders rather than relying on one.
     */
    const remeasure = () => lenis.resize();
    if (document.readyState === "complete") remeasure();
    else window.addEventListener("load", remeasure, { once: true });

    const onClick = (event: MouseEvent) => {
      // Let the browser handle anything that is not a plain left click on a
      // same-page hash — modified clicks open tabs, and that should keep working.
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest("a");
      const href = anchor?.getAttribute("href");
      if (!href) return;

      const hash = href.startsWith("#")
        ? href
        : href.startsWith("/#") && window.location.pathname === "/"
          ? href.slice(1)
          : null;
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -24 });
      window.history.pushState(null, "", hash);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", remeasure);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
