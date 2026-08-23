"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const RING_SIZE = 40;
const DOT_SIZE = 8;

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary';

/**
 * Subscribes to a media query. Uses `useSyncExternalStore` rather than an
 * effect so there is no state write during render or on mount, and so the
 * result stays live if the user plugs in a mouse or changes their motion
 * preference mid-session. The server snapshot is `false`, which means the
 * cursor is simply absent until hydration.
 */
function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}

export function CustomCursor() {
  // Touch devices keep their native behaviour, and anyone who asked for less
  // motion does not get a spring-lagged follower.
  const finePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = finePointer && !reducedMotion;

  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-999);
  const y = useMotionValue(-999);

  // The ring trails noticeably; the dot stays glued to the real pointer so
  // precision never suffers.
  const ringX = useSpring(x, { stiffness: 200, damping: 22, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 200, damping: 22, mass: 0.5 });
  const dotX = useSpring(x, { stiffness: 1400, damping: 60 });
  const dotY = useSpring(y, { stiffness: 1400, damping: 60 });

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      setHovering(Boolean(target?.closest?.(INTERACTIVE_SELECTOR)));
    };

    // Parking the cursor off-canvas when the pointer leaves the window stops a
    // stray ring from hanging at the last known edge position.
    const onLeave = () => {
      x.set(-999);
      y.set(-999);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <motion.div
        className="absolute left-0 top-0"
        style={{
          x: ringX,
          y: ringY,
          width: RING_SIZE,
          height: RING_SIZE,
          marginLeft: -RING_SIZE / 2,
          marginTop: -RING_SIZE / 2,
        }}
      >
        <motion.div
          className="h-full w-full"
          animate={{ scale: pressed ? 0.8 : hovering ? 1.75 : 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
        >
          {/* The dashed ring spins continuously — it is what makes the cursor
              read as one of the page's stickers rather than a generic dot. */}
          <div
            className={`animate-cursor-spin h-full w-full rounded-full border-2 border-dashed border-v2-orange transition-colors duration-200 ${
              hovering ? "bg-v2-orange/15" : ""
            }`}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute left-0 top-0 rounded-full bg-v2-orange"
        style={{
          x: dotX,
          y: dotY,
          width: DOT_SIZE,
          height: DOT_SIZE,
          marginLeft: -DOT_SIZE / 2,
          marginTop: -DOT_SIZE / 2,
        }}
        animate={{ scale: hovering ? 0 : pressed ? 1.6 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </div>
  );
}
