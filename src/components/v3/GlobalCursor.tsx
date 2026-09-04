"use client";

import { useEffect, useRef } from "react";

/**
 * The site's cursor: a design-tool pointer, everywhere.
 *
 * The same collaborator arrow the hero's `SelectionFrame` parks beside its
 * headline, now doing the actual job — so the joke the hero makes is the way
 * the whole page behaves rather than a drawing of it.
 *
 * One element for the entire document, not one per card. The card version this
 * replaced mounted a client component inside every tile, which meant six
 * pointer-tracking effects racing each other on the case-study index and six
 * chances for two of them to be visible at once.
 *
 * Anything can label it: put `data-cursor-label` on an element and the tag
 * appears while the pointer is inside it. That keeps the knowledge of what a
 * thing does with the thing, instead of in a lookup table in here.
 */

/** How long the tag takes to catch up, in px per frame of the remaining gap. */
const FOLLOW = 0.34;

export function GlobalCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = ref.current;
    if (!cursor) return;

    /*
     * Only where there is a pointer to replace.
     *
     * On a touch screen `hover` is emulated from taps, so hiding the native
     * cursor would take nothing away but the tag would strand itself wherever
     * a finger last landed. The class is what switches `cursor: none` on, so
     * gating here means a phone — and a browser with JS off — keeps the
     * ordinary pointer rather than losing it to a script that never ran.
     */
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const root = document.documentElement;
    root.classList.add("v3-cursor-on");

    const label = cursor.querySelector<HTMLSpanElement>("[data-cursor-tag]");
    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let placed = false;

    const tick = () => {
      // Eased rather than pinned. A cursor that lands exactly on the pointer
      // is indistinguishable from the native one and the effect is wasted; a
      // fraction of the remaining distance per frame gives it the slight drag
      // a multiplayer cursor has, without ever falling far enough behind to
      // feel like input lag.
      x += (targetX - x) * FOLLOW;
      y += (targetY - y) * FOLLOW;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      // Keep going only while there is a gap left to close.
      if (Math.abs(targetX - x) > 0.1 || Math.abs(targetY - y) > 0.1) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
      }
    };

    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!placed) {
        // Jump to the first known position instead of easing in from 0,0 —
        // otherwise the cursor flies in from the top-left corner of the page
        // on the first movement.
        x = targetX;
        y = targetY;
        placed = true;
        cursor.dataset.visible = "on";
      }

      const host = (event.target as Element | null)?.closest?.("[data-cursor-label]");
      const text = host?.getAttribute("data-cursor-label") ?? "";
      if (label && label.textContent !== text) label.textContent = text;
      cursor.dataset.labelled = text ? "on" : "off";

      if (!frame) frame = requestAnimationFrame(tick);
    };

    // Leaving the window entirely: `relatedTarget` is null only when the
    // pointer actually left the document, rather than crossing between two
    // elements inside it.
    const out = (event: PointerEvent) => {
      if (!event.relatedTarget) cursor.dataset.visible = "off";
    };
    const back = () => {
      if (placed) cursor.dataset.visible = "on";
    };

    const down = () => {
      cursor.dataset.pressed = "on";
    };
    const up = () => {
      cursor.dataset.pressed = "off";
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    document.addEventListener("pointerout", out);
    document.addEventListener("pointerover", back);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerout", out);
      document.removeEventListener("pointerover", back);
      if (frame) cancelAnimationFrame(frame);
      root.classList.remove("v3-cursor-on");
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="v3-cursor" data-visible="off" data-labelled="off">
      <svg viewBox="0 0 12 14" className="v3-cursor-arrow">
        <path d="M0 0l12 6.2-5.1 1.2L4.4 14z" />
      </svg>
      <span data-cursor-tag className="v3-cursor-tag" />
    </div>
  );
}
