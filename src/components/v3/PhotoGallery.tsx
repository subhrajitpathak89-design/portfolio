"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { gallery, type GalleryPhoto } from "@/content/gallery";

/** Seconds each photo holds before the gallery moves on by itself. */
const HOLD_MS = 5000;

/**
 * A single large photo with a thumbnail tray under it.
 *
 * Photos cross-fade rather than slide: at this size a sideways move is a lot
 * of picture in motion, and a fade lets the next shot simply arrive. It
 * advances on its own, but stops while the pointer is over it, while it is
 * off screen, and for anyone who prefers reduced motion — a photo leaving
 * under someone who is looking at it is the one thing an autoplay must not do.
 *
 * The tray keeps the active thumbnail in view as the set runs past the edge.
 */
export function PhotoGallery() {
  const { photos, heading, subheading } = gallery;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = useCallback(
    (index: number) => setActive((index + photos.length) % photos.length),
    [photos.length],
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !visible || photos.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => go(active + 1), HOLD_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, visible, go, photos.length]);

  // Scrolls the tray only, never the page.
  useEffect(() => {
    const thumb = thumbs.current[active];
    const tray = thumb?.parentElement;
    if (!thumb || !tray) return;
    tray.scrollTo({
      left: thumb.offsetLeft - tray.clientWidth / 2 + thumb.clientWidth / 2,
      behavior: "smooth",
    });
  }, [active]);

  if (photos.length === 0) return null;

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label={heading}
      className="relative bg-v3-bg"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(active + 1);
        if (e.key === "ArrowLeft") go(active - 1);
      }}
    >
      <div className="v3-column px-5 pb-20 pt-20 sm:px-10 lg:px-16 lg:pb-24 lg:pt-24">
        <header data-reveal-item>
          <h2 className="font-editorial-display text-[clamp(2rem,4vw,3.25rem)] font-normal leading-[1.02] tracking-[-0.015em] text-v3-fg">
            {heading}
          </h2>
          <div className="mt-3 flex items-center gap-4">
            <p className="text-base text-v3-muted">{subheading}</p>
            <span aria-hidden className="hidden h-px w-28 bg-v3-line sm:block" />
          </div>
        </header>

        <div
          data-reveal-item
          style={{ "--reveal-delay": 1 } as React.CSSProperties}
          className="group/glow relative isolate mt-10 lg:mt-12"
        >
        <span aria-hidden className="v3-glow">
          <span>
            <Slide photo={photos[active]} index={active} thumb />
          </span>
        </span>
        <div
          className="group/gallery relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-v3-line bg-v3-chip"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          {photos.map((photo, index) => (
            <div
              key={index}
              aria-hidden={index !== active}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                index === active ? "opacity-100" : "opacity-0"
              }`}
            >
              <Slide photo={photo} index={index} priority={index === 0} />
            </div>
          ))}

          {/* Streaming-billboard treatment: a shade from the left and the
              foot, and the title set big in the bottom-left over it, sitting
              above the thumbnail tray. No buttons — the photo is the point. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.65),rgba(0,0,0,0.15)_55%,transparent),linear-gradient(to_top,rgba(0,0,0,0.6),transparent_55%)]"
          />
          <div
            key={active}
            className="v3-swap pointer-events-none absolute bottom-24 left-5 right-5 max-w-xl text-white sm:bottom-32 sm:left-8 lg:bottom-36 lg:left-12"
          >
            <h3 className="font-editorial-display text-[clamp(1.75rem,5vw,4.5rem)] font-semibold uppercase leading-[0.92] tracking-[-0.02em] [text-shadow:0_2px_24px_rgba(0,0,0,0.4)]">
              {photos[active].caption}
            </h3>
            {photos[active].note && (
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85 sm:mt-4 sm:text-base">
                {photos[active].note}
              </p>
            )}
          </div>

          {/* Previous / next, revealed on hover so the photo stays clean. */}
          {photos.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() => go(active - 1)}
                className="absolute left-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-v3-bg/80 text-v3-fg opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:bg-v3-bg focus-visible:opacity-100 group-hover/gallery:opacity-100"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={() => go(active + 1)}
                className="absolute right-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-v3-bg/80 text-v3-fg opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:bg-v3-bg focus-visible:opacity-100 group-hover/gallery:opacity-100"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
        </div>

        {/* The thumbnail tray, frosted glass floating over the photo's foot so
            the blur has a picture to work on. Scrolls sideways if there are
            more photos than fit; the active one is ringed and kept centred. */}
        {photos.length > 1 && (
          <div className="relative z-10 -mt-[5.25rem] flex justify-center px-4 sm:-mt-[5.75rem]">
            <div className="flex max-w-full gap-2 overflow-x-auto rounded-2xl border border-white/30 bg-white/15 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-xl backdrop-saturate-150 [scrollbar-width:none]">
              {photos.map((photo, index) => (
                <button
                  key={index}
                  ref={(el) => {
                    thumbs.current[index] = el;
                  }}
                  type="button"
                  aria-label={`Show photo ${index + 1}: ${photo.caption}`}
                  aria-current={index === active}
                  onClick={() => go(index)}
                  className={`relative aspect-[16/9] w-20 shrink-0 overflow-hidden rounded-lg transition duration-200 sm:w-24 ${
                    index === active
                      ? "ring-2 ring-white"
                      : "opacity-55 hover:opacity-90"
                  }`}
                >
                  <Slide photo={photo} index={index} thumb />
                </button>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
    </section>
  );
}

/**
 * A photo, or — until one is supplied — a placeholder in its slot. Each
 * placeholder gets its own hue so the set still reads as several different
 * pictures while it is waiting for real ones.
 */
function Slide({
  photo,
  index,
  priority,
  thumb,
}: {
  photo: GalleryPhoto;
  index: number;
  priority?: boolean;
  thumb?: boolean;
}) {
  if (photo.src) {
    return (
      <Image
        src={photo.src}
        alt={thumb ? "" : photo.alt}
        fill
        priority={priority}
        sizes={thumb ? "96px" : "(min-width: 1024px) 88rem, 100vw"}
        className="object-cover"
      />
    );
  }

  const hue = (index * 53 + 200) % 360;
  return (
    <div
      className="absolute inset-0 grid place-items-center"
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 30% 72%), hsl(${(hue + 40) % 360} 35% 52%))`,
      }}
    >
      {!thumb && (
        <div className="flex flex-col items-center gap-2 text-white/85">
          <ImageIcon aria-hidden className="size-8" strokeWidth={1.5} />
          <span className="font-mono text-[11px] uppercase tracking-[0.16em]">
            Photo {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      )}
    </div>
  );
}
