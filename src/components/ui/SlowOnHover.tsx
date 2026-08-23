"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";

const FULL_SPEED = 1;

type SlowOnHoverProps = {
  children: ReactNode;
  /** Playback rate while hovered. 0.2 is a fifth of normal speed. */
  factor?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Slows every CSS animation inside it while the pointer is over it, then
 * restores full speed on leave.
 *
 * Done through the Web Animations API rather than CSS because
 * `updatePlaybackRate` changes speed while preserving the animation's current
 * time. Swapping `animation-duration` on hover — the obvious CSS approach —
 * makes the element jump, since progress is a fraction of the duration and
 * that fraction changes the instant the duration does.
 *
 * Scoping matters: it slows the whole subtree, which is exactly what the tool
 * orbit needs, because its ring and the counter-rotation on each tile have to
 * stay at matching rates or the tiles tumble out of square.
 */
export function SlowOnHover({
  children,
  factor = 0.2,
  className,
  style,
}: SlowOnHoverProps) {
  const ref = useRef<HTMLDivElement>(null);

  const setRate = (rate: number) => {
    const root = ref.current;
    if (!root?.getAnimations) return;

    for (const animation of root.getAnimations({ subtree: true })) {
      if (typeof animation.updatePlaybackRate === "function") {
        animation.updatePlaybackRate(rate);
      } else {
        animation.playbackRate = rate;
      }
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onPointerEnter={() => setRate(factor)}
      onPointerLeave={() => setRate(FULL_SPEED)}
    >
      {children}
    </div>
  );
}
