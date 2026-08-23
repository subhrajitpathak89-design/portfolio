"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a media query.
 *
 * Uses `useSyncExternalStore` rather than an effect so there is no state write
 * on mount, and so the result stays live if the user plugs in a mouse or
 * changes their motion preference mid-session. The server snapshot is `false`,
 * so anything gated on a query is simply absent until hydration.
 */
export function useMediaQuery(query: string) {
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
