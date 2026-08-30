"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Wraps the headline in a design-tool selection state: bounding box, resize
 * handles, a colour chip and a dimension badge.
 *
 * The badge reports the element's real measured size rather than a hardcoded
 * pair of numbers, so it stays honest at every breakpoint — which is the whole
 * joke. A fixed "576 × 203" would be wrong the moment the type reflowed, and a
 * designer is exactly the audience who would notice.
 */

/** Corner squares, as [vertical, horizontal] offsets. */
const CORNERS = [
  "-top-1 -left-1",
  "-top-1 -right-1",
  "-bottom-1 -left-1",
  "-bottom-1 -right-1",
];

type SelectionFrameProps = {
  children: ReactNode;
  /** Text on the collaborator cursor tag. */
  cursorLabel: string;
};

export function SelectionFrame({ children, cursorLabel }: SelectionFrameProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);
  const chipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = contentRef.current;
    if (!node) return;

    const measure = () => {
      const rect = node.getBoundingClientRect();
      setSize({ width: Math.round(rect.width), height: Math.round(rect.height) });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Read the hex off the accent token rather than taking it as a prop. It was
  // passed in as a literal and immediately went stale when the palette moved
  // from blue to orange — the chip claimed 5B8CFF while every pixel around it
  // was #FF6B2C. A swatch that lies is worse than no swatch.
  //
  // Written straight to the node rather than held in state: the value is read
  // once from the stylesheet and never changes again, so putting it through a
  // render pass buys nothing and costs a second one.
  useEffect(() => {
    const chip = chipRef.current;
    if (!chip) return;

    const sync = () => {
      chip.textContent = getComputedStyle(document.documentElement)
        .getPropertyValue("--v3-accent")
        .trim()
        .replace("#", "")
        .toUpperCase();
    };

    sync();

    // The accent differs between themes — light needs a deeper orange to stay
    // legible at 11px — so a one-shot read leaves the chip quoting the other
    // theme's hex the moment anyone touches the toggle.
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative inline-block max-w-full">
      <div ref={contentRef}>{children}</div>

      {/* Everything below is decoration on top of live text, so none of it is
          allowed to take a pointer or reach a screen reader. */}
      <div aria-hidden className="pointer-events-none">
        <span className="absolute -inset-x-3 -inset-y-2 border border-v3-select" />

        {CORNERS.map((position) => (
          <span
            key={position}
            className={`absolute ${position} size-2 border border-v3-select bg-v3-bg`}
          />
        ))}

        {/* Rotation handle, the round one a design tool puts on the top edge. */}
        <span className="absolute -top-2 left-1/2 size-2.5 -translate-x-1/2 rounded-full border border-v3-select bg-v3-select" />

        {/* The "generating" sparkle, clear of the corner handle. */}
        <svg
          viewBox="0 0 24 24"
          className="absolute -right-8 -top-7 hidden size-6 fill-v3-fg sm:block"
        >
          <path d="M12 0c.6 4.9 2.4 7.2 7.2 8.4-4.8 1.2-6.6 3.5-7.2 8.4-.6-4.9-2.4-7.2-7.2-8.4C9.6 7.2 11.4 4.9 12 0z" />
          <path d="M20.4 13.2c.3 2.4 1.2 3.6 3.6 4.2-2.4.6-3.3 1.8-3.6 4.2-.3-2.4-1.2-3.6-3.6-4.2 2.4-.6 3.3-1.8 3.6-4.2z" />
        </svg>

        {/* Colour chip. Shows the real accent token, not an invented hex. */}
        <span className="absolute -top-11 left-0 hidden items-center gap-1.5 sm:flex">
          <span className="flex items-center gap-2 rounded-md bg-v3-chip px-2 py-1.5">
            <span className="size-4 rounded bg-v3-accent" />
            <span
              ref={chipRef}
              className="min-w-[3.5rem] font-mono text-[11px] font-medium tracking-wide text-v3-fg"
            />
          </span>
          <span className="rounded-md bg-v3-chip px-2.5 py-1.5 font-mono text-[11px] font-medium tracking-wide text-v3-fg">
            100 <span className="text-v3-muted">%</span>
          </span>
        </span>

        {/* Dimension badge, centred under the bottom edge. */}
        {size && (
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded bg-v3-select px-2 py-0.5 font-mono text-[11px] font-medium tracking-wide text-white">
            {size.width} × {size.height}
          </span>
        )}

        {/* Collaborator cursor, parked outside the right edge rather than
            inside it. The reference has a two-line headline with a short first
            line, so it has interior space to sit in; ours wraps to three full
            lines and anything placed inside lands on a word. Hidden below lg,
            where there is no margin to the right of the frame either. */}
        <span className="absolute left-full top-[14%] ml-5 hidden items-start lg:flex">
          <svg viewBox="0 0 12 14" className="size-3.5 shrink-0 fill-v3-cursor">
            <path d="M0 0l12 6.2-5.1 1.2L4.4 14z" />
          </svg>
          <span className="ml-1 mt-2 rounded bg-v3-cursor px-2 py-1 text-[11px] font-semibold text-white">
            {cursorLabel}
          </span>
        </span>
      </div>
    </div>
  );
}
