"use client";

import { useEffect, useRef } from "react";
import { SCENES, type Scene } from "@/components/v3/dither-scenes";

/**
 * Dithered canvas.
 *
 * A scene supplies a density per point; this file quantises that density
 * through an 8x8 Bayer matrix and paints a dot wherever the density beats the
 * matrix threshold for that cell. The ordered threshold is what produces a
 * halftone rather than noise: dense areas resolve solid, thin areas break into
 * a regular scatter, and the falloff between them steps in a fixed pattern.
 *
 * Given more than one scene it cycles them, cross-fading by mixing the two
 * density fields. Mixing before the dither rather than after is the whole
 * trick — the dots dissolve into each other one grid cell at a time, instead of
 * one finished picture fading out on top of another.
 */

/**
 * Default cell pitch in CSS pixels. The dot is drawn at three quarters of it,
 * which leaves the grid gaps — at 2.2 of a 4px pitch the densest possible cell
 * still only covered 30% of its area, so the field could never resolve into
 * solid mass. That ratio is applied per instance now, so `cell` scales the dot
 * with it; see the `cell` prop.
 */
const CELL = 4;

const BAYER_SIZE = 8;
const BAYER = buildBayer(BAYER_SIZE);

/** Seconds a scene holds at full strength, and seconds spent dissolving. */
const HOLD_S = 7;
const FADE_S = 2;

function buildBayer(size: number) {
  // The 2^n matrix is built by recursively expanding the 2x2 base pattern.
  let matrix = [[0, 2], [3, 1]];
  while (matrix.length < size) {
    const n = matrix.length;
    const next: number[][] = Array.from({ length: n * 2 }, () => new Array(n * 2).fill(0));
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        const v = matrix[y][x] * 4;
        next[y][x] = v;
        next[y][x + n] = v + 2;
        next[y + n][x] = v + 3;
        next[y + n][x + n] = v + 1;
      }
    }
    matrix = next;
  }
  const total = size * size;
  return matrix.map((row) => row.map((v) => (v + 0.5) / total));
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

/** `#abc` and `#aabbcc` both. Returns null for anything else. */
function parseHex(value: string) {
  const hex = value.trim().replace("#", "");
  const full =
    hex.length === 3
      ? hex
          .split("")
          .map((c) => c + c)
          .join("")
      : hex;

  if (full.length !== 6 || /[^0-9a-f]/i.test(full)) return null;

  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ] as const;
}

/**
 * The tint ramp: the brand mixed into the ground at rising strength.
 *
 * Mixing toward the page's own background rather than toward black is what
 * makes one hex work in both themes — the faint end lands just above the
 * ground it sits on, whichever ground that is.
 */
function rampFromTint(tint: string, background: string): [string, string, string] | null {
  const brand = parseHex(tint);
  const ground = parseHex(background);
  if (!brand || !ground) return null;

  const mix = (amount: number) =>
    `rgb(${brand
      .map((channel, index) => Math.round(ground[index] + (channel - ground[index]) * amount))
      .join(",")})`;

  return [mix(0.34), mix(0.66), mix(1)];
}

type DitherFieldProps = {
  className?: string;
  /**
   * Scene names to play, in order. More than one cycles with a dissolve; a
   * single name renders that scene alone.
   */
  scenes?: (keyof typeof SCENES)[];
  /**
   * Dot colours, faint to strong. Left unset the field reads --v3-dither-1..3
   * off the document so it follows the light/dark switch.
   */
  tones?: [string, string, string];
  /**
   * A single hex to build the ramp from — the three tones become that colour
   * mixed into the page ground at rising strength. Resolved against the live
   * `--v3-bg` and cached until the theme changes, so one brand hex works in
   * both themes and survives a theme flip. Ignored when `tones` is set.
   */
  tint?: string;
  /**
   * Cell pitch in CSS pixels, overriding the default. Bigger cells read as a
   * coarser halftone — fewer, chunkier dots — which is what a field wants when
   * it is a graphic in its own right rather than a texture behind something.
   * The dot keeps its three-quarter share of the pitch, so the grid gaps scale
   * with it instead of closing up.
   *
   * Cheaper as it grows, too: the per-frame work is cells, and cells fall with
   * the square of this.
   */
  cell?: number;
  /** Drives the rAF loop. Off renders a single frame. */
  animate?: boolean;
  /** Offsets the clock, so two fields on one page are not in lockstep. */
  timeOffset?: number;
};

export function DitherField({
  className,
  scenes = ["globe", "flower"],
  tones,
  tint,
  cell = CELL,
  animate = true,
  timeOffset = 0,
}: DitherFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Both array props arrive as a fresh identity on every render, so depending
  // on them directly would tear the animation down and rebuild it each time.
  // Collapsing each to a string gives the effect a dependency that changes only
  // when the contents actually do.
  const sceneKey = scenes.join(",");
  const toneKey = tones?.join(",") ?? "";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Everything below that does not change between frames is measured once
    // and invalidated by the observers that can actually change it. Reading
    // layout (`getBoundingClientRect`) or style (`getComputedStyle`) inside the
    // loop forces a synchronous recalc on every frame, and assigning
    // `canvas.width` reallocates the backing store and re-uploads the texture —
    // all three land on the main thread mid-scroll, which is exactly where the
    // jank was.
    let width = 0;
    let height = 0;
    let palette: [string, string, string] | null = null;

    const measure = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return false;
      if (rect.width === width && rect.height === height) return true;

      width = rect.width;
      height = rect.height;

      // Cap the backing store at 2x. Beyond that the dots stop reading as dots
      // and the fill cost doubles for nothing.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      return true;
    };

    // Cleared on a theme flip and re-read on the next draw, which is the only
    // thing that can change the answer.
    const readPalette = (): [string, string, string] => {
      const root = getComputedStyle(document.documentElement);

      return (
        (toneKey ? (toneKey.split(",") as [string, string, string]) : null) ??
        (tint ? rampFromTint(tint, root.getPropertyValue("--v3-bg")) : null) ??
        (["--v3-dither-1", "--v3-dither-2", "--v3-dither-3"].map((token) =>
          root.getPropertyValue(token).trim()
        ) as [string, string, string])
      );
    };

    // Derived once per mount rather than per frame. The dot keeps the same
    // three-quarter share of the pitch the defaults use.
    const pitch = Math.max(2, Math.round(cell));
    const dot = Math.max(1, Math.round(pitch * 0.75));

    const draw = (time: number) => {
      if (!measure()) return;

      // Read into a local: `palette` is a mutable closure variable the theme
      // observer can null out, so TS will not carry the narrowing past here.
      const tones3 = (palette ??= readPalette());

      context.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / pitch);
      const rows = Math.ceil(height / pitch);

      // Scenes work in a square coordinate space; this carries the box's real
      // proportions in, so a globe stays round on a wide canvas.
      const aspect = width / height;

      const names = (sceneKey ? sceneKey.split(",") : ["terrain"]) as (keyof typeof SCENES)[];

      let sceneA: Scene;
      let sceneB: Scene | null = null;
      let blend = 0;

      if (names.length === 1) {
        sceneA = SCENES[names[0]];
      } else {
        const period = HOLD_S + FADE_S;
        const index = Math.floor(time / period) % names.length;
        const phase = time % period;

        sceneA = SCENES[names[index]];
        if (phase > HOLD_S) {
          sceneB = SCENES[names[(index + 1) % names.length]];
          blend = smoothstep((phase - HOLD_S) / FADE_S);
        }
      }

      // One path per tone rather than per dot: three fills total instead of
      // tens of thousands of state changes.
      const paths = tones3.map(() => new Path2D());

      for (let row = 0; row < rows; row++) {
        const v = (row * pitch) / height;

        for (let col = 0; col < cols; col++) {
          const u = (col * pitch) / width;

          let density = sceneA(u, v, aspect, time);
          if (sceneB) {
            density += (sceneB(u, v, aspect, time) - density) * blend;
          }

          if (density <= 0) continue;
          if (density < BAYER[row % BAYER_SIZE][col % BAYER_SIZE]) continue;

          // Toned by strength rather than by layer: faintest ink for the sparse
          // edges, strongest for solid mass.
          const tone = density > 0.72 ? 2 : density > 0.42 ? 1 : 0;
          paths[tone].rect(col * pitch, row * pitch, dot, dot);
        }
      }

      paths.forEach((path, index) => {
        context.fillStyle = tones3[index];
        context.fill(path);
      });
    };

    // Paint once before any scheduling. rAF does not fire in a hidden tab, so
    // without this the canvas sits at its default 300x150 until focus, and a
    // visitor arriving on a background tab finds the hero empty.
    draw(timeOffset);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let lastPaint = 0;
    let onScreen = true;

    // 24fps. The scenes move slowly and the redraw is the expensive part, so
    // the extra frames of a 60fps loop buy nothing visible.
    const FRAME_MS = 1000 / 24;

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      if (now - lastPaint < FRAME_MS) return;
      lastPaint = now;
      draw(now / 1000 + timeOffset);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (!animate || reduced.matches || !onScreen) return;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => cancelAnimationFrame(frame);

    // A full-viewport canvas redrawing forever after it has scrolled away is
    // pure cost, so the loop is tied to visibility.
    const visibility = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) start();
        else stop();
      },
      { threshold: 0 }
    );
    visibility.observe(canvas);

    start();

    // `measure` picks the new box up itself; this is only here to repaint a
    // static field, which has no loop to do it on the next frame.
    const resize = new ResizeObserver(() => draw(performance.now() / 1000 + timeOffset));
    resize.observe(canvas);
    reduced.addEventListener("change", start);

    // Static fields never redraw on their own, so a theme flip has to repaint
    // them or they keep the previous theme's colours forever. Dropping the
    // cached palette first is what makes the repaint pick up the new tokens.
    const theme = new MutationObserver(() => {
      palette = null;
      draw(performance.now() / 1000 + timeOffset);
    });
    theme.observe(document.documentElement, { attributeFilter: ["class"] });

    return () => {
      stop();
      resize.disconnect();
      visibility.disconnect();
      theme.disconnect();
      reduced.removeEventListener("change", start);
    };
  }, [sceneKey, toneKey, tint, cell, animate, timeOffset]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
