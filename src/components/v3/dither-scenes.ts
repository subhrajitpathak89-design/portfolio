/**
 * Density fields for the dithered canvas.
 *
 * A scene answers one question: for the point (u, v) at time t, how much ink
 * belongs here, 0 to 1. The canvas turns that number into dots through an
 * ordered dither, so a scene never draws — it only describes coverage. That
 * split is what lets a rotating globe, a flower and a mountain range all render
 * through the same twenty lines of painting code, and lets two of them be
 * cross-faded by simply mixing their numbers.
 *
 * Every scene is analytic rather than sampled from an image: no assets to load,
 * resolution-independent, and animatable by feeding t into the geometry.
 */

export type Scene = (u: number, v: number, aspect: number, t: number) => number;

/* ── noise ────────────────────────────────────────────────────────────────── */

function hash2(x: number, y: number, seed: number) {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(seed, 69069);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function hash3(x: number, y: number, z: number, seed: number) {
  let h =
    Math.imul(x, 374761393) ^
    Math.imul(y, 668265263) ^
    Math.imul(z, 2147483647) ^
    Math.imul(seed, 69069);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

export function noise2(x: number, y: number, seed: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const u = smooth(x - xi);
  const v = smooth(y - yi);

  const a = hash2(xi, yi, seed);
  const b = hash2(xi + 1, yi, seed);
  const c = hash2(xi, yi + 1, seed);
  const d = hash2(xi + 1, yi + 1, seed);

  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}

/** Trilinear value noise. Sampled on the surface of a sphere for the globe. */
function noise3(x: number, y: number, z: number, seed: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const zi = Math.floor(z);
  const u = smooth(x - xi);
  const v = smooth(y - yi);
  const w = smooth(z - zi);

  const c000 = hash3(xi, yi, zi, seed);
  const c100 = hash3(xi + 1, yi, zi, seed);
  const c010 = hash3(xi, yi + 1, zi, seed);
  const c110 = hash3(xi + 1, yi + 1, zi, seed);
  const c001 = hash3(xi, yi, zi + 1, seed);
  const c101 = hash3(xi + 1, yi, zi + 1, seed);
  const c011 = hash3(xi, yi + 1, zi + 1, seed);
  const c111 = hash3(xi + 1, yi + 1, zi + 1, seed);

  const x00 = c000 + (c100 - c000) * u;
  const x10 = c010 + (c110 - c010) * u;
  const x01 = c001 + (c101 - c001) * u;
  const x11 = c011 + (c111 - c011) * u;

  const y0 = x00 + (x10 - x00) * v;
  const y1 = x01 + (x11 - x01) * v;

  return y0 + (y1 - y0) * w;
}

function fbm3(x: number, y: number, z: number, seed: number, octaves: number) {
  let amp = 0.5;
  let freq = 1;
  let sum = 0;
  let norm = 0;

  for (let i = 0; i < octaves; i++) {
    sum += amp * noise3(x * freq, y * freq, z * freq, seed + i);
    norm += amp;
    amp *= 0.5;
    freq *= 2.1;
  }

  return sum / norm;
}

/* ── globe ────────────────────────────────────────────────────────────────── */

const GLOBE_RADIUS = 0.44;
/** Above this the surface is land. Tuned for continent-sized masses. */
const SEA_LEVEL = 0.52;

/**
 * A rotating sphere with noise continents.
 *
 * Only land is inked. Leaving the ocean empty is what makes it read as a map
 * rather than a ball — the silhouette is implied by the coastlines, exactly the
 * way a dotted world map works.
 */
export const globe: Scene = (u, v, aspect, t) => {
  const dx = ((u - 0.5) * aspect) / GLOBE_RADIUS;
  const dy = (v - 0.5) / GLOBE_RADIUS;

  const d2 = dx * dx + dy * dy;
  if (d2 > 1) return 0;

  // Orthographic back-projection: the visible hemisphere's z falls straight out
  // of the unit-sphere equation, so no trigonometry is needed to get there.
  const z = Math.sqrt(1 - d2);

  const angle = t * 0.2;
  const ca = Math.cos(angle);
  const sa = Math.sin(angle);
  const rx = dx * ca + z * sa;
  const rz = -dx * sa + z * ca;

  const n = fbm3(rx * 2.1, dy * 2.1, rz * 2.1, 17, 3);
  if (n < SEA_LEVEL) return 0;

  // Limb darkening. Without it the disc is uniformly dense and reads flat; the
  // falloff toward the edge is most of what sells the curvature.
  const shade = 0.42 + 0.58 * z;
  return Math.min(1, 0.5 + (n - SEA_LEVEL) * 5) * shade;
};

/* ── flower ───────────────────────────────────────────────────────────────── */

const PETALS = 6;

/**
 * A rose curve with a stem. The petal boundary is r(θ), so "is this point ink"
 * is a single comparison, and rotating the whole head is a phase shift on θ.
 */
export const flower: Scene = (u, v, aspect, t) => {
  const cx = 0.5;
  const cy = 0.4;

  const dx = (u - cx) * aspect;
  const dy = v - cy;
  const rad = Math.hypot(dx, dy);
  const theta = Math.atan2(dy, dx) + t * 0.1;

  // Breathing, so a held frame is never completely still.
  const scale = 0.3 + 0.012 * Math.sin(t * 0.5);
  const edge = scale * (0.42 + 0.58 * Math.abs(Math.cos((PETALS * theta) / 2)));

  let density = 0;

  if (rad < edge) {
    // Denser toward the middle of the head, with noise for petal texture so the
    // dither has something to bite on instead of a flat wash.
    const falloff = 1 - Math.pow(rad / edge, 1.7) * 0.62;
    const texture = 0.78 + 0.22 * noise2(u * 26, v * 26, 5);
    density = falloff * texture;
  }

  // Core.
  if (rad < 0.075) density = Math.max(density, 0.96);

  // Stem, drifting slightly so the whole thing sways.
  if (v > cy) {
    const sway = Math.sin((v - cy) * 3.4 + t * 0.35) * 0.045;
    const width = 0.008 + 0.004 * (v - cy);
    if (Math.abs((u - cx) * aspect - sway) < width) {
      density = Math.max(density, 0.92);
    }
  }

  return density;
};

/* ── terrain ──────────────────────────────────────────────────────────────── */

type Layer = {
  seed: number;
  scale: number;
  base: number;
  rise: number;
  amp: number;
  drift: number;
  weight: number;
};

const LAYERS: Layer[] = [
  { seed: 11, scale: 1.8, base: 0.8, rise: 0.3, amp: 0.34, drift: 0.012, weight: 0.5 },
  { seed: 47, scale: 2.6, base: 0.98, rise: 0.32, amp: 0.28, drift: 0.019, weight: 0.75 },
  { seed: 93, scale: 3.6, base: 1.14, rise: 0.34, amp: 0.22, drift: 0.027, weight: 1.0 },
];

function ridged(x: number, seed: number) {
  let amp = 0.5;
  let freq = 1;
  let sum = 0;
  let norm = 0;

  for (let octave = 0; octave < 5; octave++) {
    const n = noise2(x * freq, octave * 13.7, seed + octave);
    sum += amp * (1 - Math.abs(n * 2 - 1));
    norm += amp;
    amp *= 0.5;
    freq *= 2.1;
  }

  return sum / norm;
}

/** The original layered mountain range, kept for the case-study card backdrops. */
export const terrain: Scene = (u, v, _aspect, t) => {
  let density = 0;
  let covered = false;

  // Front-most range wins outright rather than blending with the ones behind
  // it. That occlusion is what reads as separate silhouettes.
  for (const layer of LAYERS) {
    const crest =
      layer.base - layer.rise * u - ridged(u * layer.scale + t * layer.drift, layer.seed) * layer.amp;
    if (v < crest) continue;

    density = Math.min(1, 0.82 + (v - crest) * 1.4) * layer.weight;
    covered = true;
  }

  if (!covered) return 0;
  return density * smooth(Math.min(1, Math.max(0, (u - 0.02) / 0.72)));
};

export const SCENES: Record<string, Scene> = { globe, flower, terrain };
