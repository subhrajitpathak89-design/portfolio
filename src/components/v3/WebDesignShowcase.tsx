"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { webDesigns, type WebDesign } from "@/content/web-designs";

/**
 * Web designs as a sticky scroll showcase.
 *
 * Desktop (lg+): the section is one viewport tall per design. A browser frame
 * pins in the middle and scrolling swaps which video plays inside it, while the
 * name, tag and link on the left change in step. Only the active clip plays.
 *
 * Below lg the pin is dropped (pinned scrolling feels clunky on touch) and the
 * designs stack as plain video cards. Reduced motion holds every clip still.
 */

function BrowserFrame({ domain, children }: { domain: string; children: React.ReactNode }) {
  return (
    <div
      aria-label={domain}
      className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]"
    >
      <div className="relative aspect-[2.08/1]">{children}</div>
    </div>
  );
}

/** A muted clip that plays only while `active` and motion is allowed. */
function Clip({ src, poster, active }: { src: string; poster?: string; active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!active || reduced) {
      v.pause();
      return;
    }
    // A play() fired mid-load can be dropped; retry once the clip can play, and
    // again shortly after in case a fast scroll interrupted it.
    const play = () => v.play().catch(() => {});
    play();
    v.addEventListener("canplay", play);
    const retry = window.setTimeout(() => v.paused && play(), 400);
    return () => {
      v.removeEventListener("canplay", play);
      window.clearTimeout(retry);
    };
  }, [active]);
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      className="absolute inset-0 size-full object-cover"
    />
  );
}

function VisitLink({ design }: { design: WebDesign }) {
  if (!design.url) return null;
  return (
    <a
      href={design.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-v3-line px-4 py-2 text-[13px] text-v3-fg transition-colors hover:border-v3-fg hover:bg-v3-fg hover:text-v3-bg"
    >
      Visit site <ArrowUpRight aria-hidden className="size-3.5" />
    </a>
  );
}

const Heading = () => (
  <header className="max-w-2xl">
    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-v3-accent">Web design</p>
    <h2 className="mt-4 font-editorial-display text-[clamp(1.6rem,3.6vw,2.75rem)] font-normal leading-[1.1] tracking-[-0.015em] text-v3-fg">
      Websites, in motion.
    </h2>
    <p className="mt-4 max-w-xl text-base leading-relaxed text-v3-muted">
      Landing pages and product sites I&apos;ve designed, recorded as they scroll.
    </p>
  </header>
);

export function WebDesignShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const count = webDesigns.length;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = trackRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const scrollable = rect.height - window.innerHeight;
        const progress = Math.min(Math.max(-rect.top / Math.max(scrollable, 1), 0), 0.9999);
        setActive(Math.floor(progress * count));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isDesktop, count]);

  /** Jump the page to design `i`'s slice of the pinned scroll. */
  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.5) / count) * scrollable, behavior: "smooth" });
  };

  const current = webDesigns[active];

  return (
    <section id="web-design" className="relative scroll-mt-24 bg-v3-bg">
      {/* Phones and tablets: a plain stack. */}
      <div className="v3-column px-5 pb-20 sm:px-10 lg:hidden">
        <Heading />
        <ul className="mt-10 flex flex-col gap-10">
          {webDesigns.map((d) => (
            <li key={d.title}>
              <BrowserFrame domain={d.domain}>
                <MobileClip src={d.video} poster={d.poster} />
              </BrowserFrame>
              <div className="mt-4">
                <p className="text-[11px] uppercase tracking-[0.08em] text-v3-muted">{d.tag}</p>
                <h3 className="mt-1 font-hero-serif text-xl text-v3-fg">{d.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-v3-muted">{d.blurb}</p>
              </div>
              <div className="mt-3">
                <VisitLink design={d} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop: pinned frame, scroll swaps the design. */}
      <div ref={trackRef} className="relative hidden lg:block" style={{ height: `${count * 100}vh` }}>
        <div className="sticky top-0 flex h-svh items-center">
          <div className="v3-column grid w-full grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] items-center gap-14 px-16">
            <div>
              <Heading />

              <ol className="mt-10 flex flex-col gap-1">
                {webDesigns.map((d, i) => (
                  <li key={d.title}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      className={`group flex w-full items-baseline gap-4 py-1.5 text-left transition-colors ${
                        i === active ? "text-v3-fg" : "text-v3-muted/60 hover:text-v3-muted"
                      }`}
                    >
                      <span className="font-mono text-[11px] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-hero-serif text-lg">{d.title}</span>
                      <span
                        className={`ml-auto h-px flex-1 origin-left bg-current transition-transform duration-500 ${
                          i === active ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </button>
                  </li>
                ))}
              </ol>

              {/* Details for the active design; keyed so it re-animates on change. */}
              <div key={current.title} className="v3-webdesign-in mt-8 min-h-[120px]">
                <p className="text-[11px] uppercase tracking-[0.08em] text-v3-muted">{current.tag}</p>
                <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-v3-muted">{current.blurb}</p>
                <div className="mt-4">
                  <VisitLink design={current} />
                </div>
              </div>
            </div>

            <BrowserFrame domain={current.domain}>
              {webDesigns.map((d, i) => (
                <div
                  key={d.title}
                  className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out ${
                    i === active ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
                  }`}
                >
                  {isDesktop && <Clip src={d.video} poster={d.poster} active={i === active} />}
                </div>
              ))}
              {/* Progress bar along the bottom of the frame. */}
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/10">
                <div
                  className="h-full bg-white/70 transition-[width] duration-500 ease-out"
                  style={{ width: `${((active + 1) / count) * 100}%` }}
                />
              </div>
            </BrowserFrame>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Stacked-layout clip: plays while on screen, like the rest of the site's loops. */
function MobileClip({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="absolute inset-0">
      <Clip src={src} poster={poster} active={onScreen} />
    </div>
  );
}
