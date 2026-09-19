"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * The city-and-clock mark that sits in the bottom-left of the hero's image
 * band. It is a studio-site convention — a small signal that there is a person
 * in a timezone behind the page, not a template.
 *
 * Client-only by necessity: the server has no idea what time it is in the
 * reader's reckoning of a named zone at render time, and printing a
 * server-computed time into HTML that a client then corrects is exactly the
 * hydration mismatch React complains about. So the first paint ships the city
 * alone and the time appears on mount, which also keeps the label from
 * shifting layout — the slot is reserved by the city name beside it.
 */
export function LocalTime({
  city,
  timeZone,
  className = "",
}: {
  city: string;
  timeZone: string;
  className?: string;
}) {
  /*
   * `useSyncExternalStore` rather than state-plus-effect. The clock is an
   * external source of truth that changes on its own, which is exactly what
   * this hook is for — and it gives the server snapshot (`null`) for free, so
   * the markup React renders on the server and the markup it hydrates against
   * agree without a post-mount setState.
   *
   * Ticks every 30s rather than every second: the display has no seconds
   * field, so a per-second interval would be 59 wasted renders out of 60, and
   * 30s bounds the worst-case staleness to half a minute.
   */
  const subscribe = useCallback((onChange: () => void) => {
    const id = setInterval(onChange, 30_000);
    return () => clearInterval(id);
  }, []);

  const getSnapshot = useCallback(
    () =>
      new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone,
      }).format(new Date()),
    [timeZone],
  );

  const time = useSyncExternalStore(subscribe, getSnapshot, () => null);

  return (
    <span className={className}>
      {city}
      {/* `suppressHydrationWarning` is not needed — the null branch renders
          identically on both sides, and the time only ever arrives after
          mount. */}
      {time ? ` ${time}` : ""}
    </span>
  );
}
