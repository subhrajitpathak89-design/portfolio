"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * The case-study table of contents, in two forms.
 *
 * `variant="rail"` is the sticky rail that rides the left margin on wide
 * screens; `variant="card"` is the boxed list that sits in the flow on
 * anything narrower, because there is no margin to put a rail in below about
 * 1280px. Both render from the same labels, so the two can never disagree
 * about which sections exist.
 *
 * The active row is resolved from scroll position rather than from the URL
 * hash: a hash only updates when someone clicks a link, so a reader who
 * scrolled normally — which is most of them — would watch the highlight sit on
 * the wrong row for the entire page.
 */
type CaseStudyNavProps = {
  /** Section labels in page order; ids are derived the same way the page derives them. */
  labels: string[];
  variant: "rail" | "card";
};

/** Kept in step with `sectionId` on the project page — same rule, both sides. */
function sectionId(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** A third of the way down the viewport: the line a section becomes "current" at. */
const READING_LINE = 0.33;

/**
 * Which section is currently being read.
 *
 * Resolved by measuring rather than by trusting one signal: the active section
 * is the last one whose top edge has passed a reading line a third of the way
 * down the viewport. That handles the two cases a naive check gets wrong —
 * sections tall enough that several are on screen at once, and short ones (the
 * Results row is three cards) that would never be the largest visible block.
 *
 * Two things drive the recompute, deliberately. Scroll events are the precise
 * one, since the page moves under Lenis via window scrolling. IntersectionObserver
 * is the safety net: it is driven by the browser's own layout pass, so it still
 * corrects the highlight if scroll events are throttled or the page is moved
 * programmatically without one. Both call the same function, so they cannot
 * disagree — the slower one just repeats the answer.
 */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);
  // Joined so the effect keys off the actual section list rather than the array
  // identity, which changes on every render.
  const key = ids.join("|");

  useEffect(() => {
    const sectionIds = key ? key.split("|") : [];
    if (!sectionIds.length) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    let frame = 0;

    const resolve = () => {
      frame = 0;
      const line = window.innerHeight * READING_LINE;

      // At the foot of the page the final section can sit entirely above the
      // line — there is a tag list and the next-study cards below it — so the
      // bottom of the document pins to the last entry rather than leaving the
      // highlight stranded two sections back.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;

      if (atBottom) {
        setActive(elements[elements.length - 1].id);
        return;
      }

      let current = elements[0].id;
      for (const element of elements) {
        if (element.getBoundingClientRect().top <= line) current = element.id;
      }
      setActive(current);
    };

    // Coalesced to one measure per frame: a scroll fires far more often than
    // the highlight can meaningfully change.
    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(resolve);
    };

    resolve();

    const observer = new IntersectionObserver(schedule, { threshold: [0, 0.25, 0.5] });
    elements.forEach((element) => observer.observe(element));

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [key]);

  return active;
}

export function CaseStudyNav({ labels, variant }: CaseStudyNavProps) {
  const ids = labels.map(sectionId);
  const active = useActiveSection(ids);

  if (labels.length < 2) return null;

  if (variant === "rail") {
    return (
      <nav aria-label="Sections" className="sticky top-32">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-v2-ink/50">
          Quick navigation
        </p>
        <ul className="mt-5 space-y-1">
          {labels.map((label) => {
            const id = sectionId(label);
            const isActive = id === active;

            return (
              <li key={label}>
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`group flex items-start gap-3 py-1.5 text-sm leading-snug transition-colors duration-200 ${
                    isActive ? "text-v2-orange-ink" : "text-v2-ink/55 hover:text-v2-ink"
                  }`}
                >
                  {/* The marker carries the state, so the highlight survives
                      being read by someone who cannot see the colour change. */}
                  <span
                    aria-hidden
                    className={`mt-[7px] h-[2px] shrink-0 rounded-full transition-all duration-300 ${
                      isActive ? "w-5 bg-v2-orange" : "w-2.5 bg-v2-ink/25 group-hover:bg-v2-ink/50"
                    }`}
                  />
                  <span className={isActive ? "font-semibold" : ""}>{label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="#top"
          className="group mt-5 inline-flex items-center gap-2 border-t border-v2-ink/10 pt-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-v2-ink/45 transition-colors duration-200 hover:text-v2-orange-ink"
        >
          <ArrowUp
            aria-hidden
            className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
          />
          Back to top
        </a>
      </nav>
    );
  }

  return (
    <nav
      aria-label="Sections"
      className="mt-10 rounded-2xl border border-v2-ink/10 bg-white p-6 sm:p-8"
    >
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-v2-ink/65">
        Quick navigation
      </p>
      <ul className="mt-4 divide-y divide-v2-ink/10">
        {labels.map((label, index) => (
          <li key={label}>
            <a
              href={`#${sectionId(label)}`}
              className="group flex items-baseline gap-4 py-3 transition-colors duration-200"
            >
              <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-v2-ink/40 transition-colors duration-200 group-hover:text-v2-orange">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-grotesk text-lg font-black tracking-[-0.02em] text-v2-ink transition-colors duration-200 group-hover:text-v2-orange-ink">
                {label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
