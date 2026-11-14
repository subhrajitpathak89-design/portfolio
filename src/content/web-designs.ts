/**
 * Web designs shown as videos in the homepage's sticky scroll showcase.
 *
 * Each `video` is a muted screen recording in /public/videos/web/, compressed
 * with ffmpeg (H.264, CRF ~27, faststart, no audio). `poster` is a still from
 * the clip, shown until it plays and for reduced-motion visitors.
 */
export type WebDesign = {
  title: string;
  tag: string;
  blurb: string;
  video: string;
  poster: string;
  /** Live site, optional. */
  url?: string;
  /** Shown in the browser frame's address bar. */
  domain: string;
};

export const webDesigns: WebDesign[] = [
  {
    title: "Kryptonite UI",
    tag: "Component library · 2026",
    blurb: "85+ free, open-source animated React components for Next.js, which I designed and shipped.",
    video: "/videos/web/kryptonite.mp4",
    poster: "/videos/web/kryptonite-poster.jpg",
    url: "https://kryptonite-ui.vercel.app/",
    domain: "kryptonite-ui.vercel.app",
  },
  {
    title: "Fintech",
    tag: "Landing page · 2026",
    blurb: "A banking landing page that shows every number up front. Idea to working prototype in a day with Claude Code, React and shadcn/ui.",
    video: "/videos/web/fintech.mp4",
    poster: "/videos/web/fintech-poster.jpg",
    domain: "fintech.app",
  },
  {
    title: "Snaglink",
    tag: "Product site · 2026",
    blurb: "A media downloader site, prototyped in one session after importing a design system into Claude Design.",
    video: "/videos/web/snaglink.mp4",
    poster: "/videos/web/snaglink-poster.jpg",
    domain: "snaglink.app",
  },
];
