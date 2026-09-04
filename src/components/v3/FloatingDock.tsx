"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";
import { v3NavLinks } from "@/content/v3-nav";
import { profile } from "@/content/profile";

/**
 * Navigation that takes over once the header has scrolled away.
 *
 * The header is `absolute top-0` rather than sticky, which is deliberate — a
 * bar pinned over a full-bleed hero photograph competes with it. But it does
 * mean that past the first screen there is no way to move around the site, and
 * on a phone there never was: the header's links are `md:flex`, so below that
 * breakpoint the only navigation on the page was the hero's own buttons.
 *
 * So this carries the links at every width, and the dock earns its keep most
 * on mobile.
 *
 * Bottom centre rather than top: sliding a second bar into the space the
 * header just vacated reads as the header failing to stick, and it would cover
 * the thing the reader scrolled down to see. A dock is unambiguously a
 * different object.
 */
export function FloatingDock() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // Tied to the header's own visibility rather than a pixel threshold, so it
    // stays correct if the header's height changes and there is no magic
    // number to keep in sync.
    const header = document.querySelector("header");
    if (!header) return;

    const visibility = new IntersectionObserver(
      ([entry]) => setShown(!entry.isIntersecting),
      { threshold: 0 }
    );

    visibility.observe(header);
    return () => visibility.disconnect();
  }, []);

  return (
    <div
      // `inert` as well as `aria-hidden`, because opacity alone still leaves
      // every link in the tab order — a keyboard user would tab into an
      // invisible dock before reaching the page. React 19 passes the boolean
      // through as the real attribute.
      inert={!shown}
      aria-hidden={!shown}
      className={`fixed inset-x-0 bottom-5 z-50 flex justify-center px-4 transition-all duration-300 ease-out motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      {/* `bg-v3-surface/85` plus a blur rather than a solid fill: the dock sits
          over the page's own content, and a solid pill reads as a hole punched
          in it. The ring carries the same line colour as every other rule on
          the site so it belongs to the same drawing. */}
      <nav
        aria-label="Site sections"
        className="flex items-center gap-1 rounded-full bg-v3-surface/85 p-1.5 shadow-lg shadow-black/20 ring-1 ring-v3-line backdrop-blur-xl"
      >
        {/* Back-to-top and its rule are the first things cut on a phone. The
            pill has to fit inside 375px and this is the one control the
            platform already gives you — a flick of the thumb does the same
            job. */}
        <Link
          href="/#home"
          title="Back to top"
          className="hidden size-9 items-center justify-center rounded-full text-v3-muted transition-colors duration-200 hover:bg-v3-chip hover:text-v3-fg sm:flex"
        >
          <ArrowUp aria-hidden className="size-4" strokeWidth={2.5} />
          <span className="sr-only">Back to top</span>
        </Link>

        <span className="mx-0.5 hidden h-5 w-px bg-v3-line sm:block" aria-hidden />

        {v3NavLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            /* `whitespace-nowrap` with tighter mobile padding, because a
               two-word label was the item that broke this: at 375px "Case
               studies" wrapped onto a second line and took the whole pill with
               it. Four labels fit on one line at px-2; they do not at px-3. */
            className="whitespace-nowrap rounded-full px-2 py-2 font-grotesk text-[13px] font-medium tracking-[-0.005em] text-v3-muted transition-colors duration-200 hover:bg-v3-chip hover:text-v3-fg sm:px-3.5 sm:text-sm"
          >
            {link.label}
          </Link>
        ))}

        <span className="mx-0.5 h-5 w-px bg-v3-line" aria-hidden />

        {/* The label drops below `sm` and the mail icon carries it, which is
            the rest of the 375px budget. The accessible name stays put either
            way, so the control never becomes an unlabelled orange circle to a
            screen reader. */}
        <a
          href={`mailto:${profile.email}`}
          title="Get in touch"
          className="ml-0.5 flex size-9 items-center justify-center rounded-full bg-v3-accent font-grotesk text-[13px] font-semibold tracking-[-0.005em] text-v3-bg transition-colors duration-200 hover:bg-v3-accent-bright sm:size-auto sm:px-4 sm:py-2 sm:text-sm"
        >
          <Mail aria-hidden className="size-4 sm:hidden" strokeWidth={2.25} />
          <span className="max-sm:sr-only">Get in touch</span>
        </a>
      </nav>
    </div>
  );
}
