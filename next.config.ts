import type { NextConfig } from "next";

const HOUR = 60 * 60;
const DAY = 24 * HOUR;
const YEAR = 365 * DAY;

const nextConfig: NextConfig = {
  // Nothing on the site reads it, and it is one fewer header on every response.
  poweredByHeader: false,

  images: {
    // AVIF first, WebP behind it. The sources in `public/` are already WebP, so
    // this is not about the format switch — it is about the resize: a phone asks
    // for the narrow variant instead of the 2000px screenshot. AVIF costs more
    // to encode on the first request for a size and repays it on every one
    // after, which for a portfolio's fixed handful of images is the right trade.
    formats: ["image/avif", "image/webp"],

    // 55 has to be declared here to be usable at all. Next 16 restricts the
    // optimizer to an allowlist — the default is `[75]` — so that an attacker
    // cannot walk `?q=1..100` and make the server encode a hundred variants of
    // every image. A `quality` prop outside the list is dropped silently and
    // served at 75, which is exactly how the hero's `quality={55}` looked like
    // it had no effect.
    //
    // 55 is for the hero photograph specifically: it renders at 42% opacity,
    // desaturated, under two scrims, and cannot show the detail 75 pays for.
    qualities: [55, 75],

    // `minimumCacheTTL` is deliberately left at its default. A longer window
    // would look like a free win, but the optimizer caches per source URL — and
    // these sources get replaced in place, under the same filename, whenever a
    // screen is re-exported. A year-long TTL means a year of serving the old
    // one. Raise it once the filenames carry a content hash.
  },

  // `react-icons` publishes one module per icon family; without this the whole
  // family is walked to reach the two or three marks that are actually used.
  // `lucide-react` is on Next's default list already.
  experimental: {
    optimizePackageImports: ["react-icons"],
  },

  // Files under `public/` are served with no caching instruction by default, so
  // a returning visitor re-downloads the hero photograph, every capture and
  // both video loops.
  //
  // The Wizlo case study was renamed when its subject changed from the patient
  // portal to the form builder, and a URL that has been in a portfolio is a URL
  // someone may have sent to a hiring manager. Permanent, because the old path
  // is never coming back.
  redirects() {
    return [
      {
        source: "/projects/wizlo-emr-patient-portal",
        destination: "/projects/wizlo-form-builder",
        permanent: true,
      },
      // Renamed when the framing was corrected: Nivex is a wealth platform,
      // and the design system is one of its deliverables rather than the
      // project. The old URL is in circulation, so it keeps resolving.
      {
        source: "/projects/nivex-design-platform",
        destination: "/projects/nivex-wealth-platform",
        permanent: true,
      },
    ];
  },

  // Two rules, and which one an asset gets depends on whether its filename can
  // be trusted to change when its bytes do.
  //
  // The default is bounded, not `immutable`. Most of these names are stable and
  // get re-exported in place, so `immutable` would promise something untrue and
  // pin the old bytes in every browser that already has them — with no way to
  // reach them. That is not hypothetical: it is what hid two re-exports of the
  // Wizlo loop during this work. An hour of hard caching still covers the
  // repeat visit, and the day of `stale-while-revalidate` serves the old copy
  // instantly while fetching the new one behind it.
  //
  // A name carrying an 8-hex content hash makes the promise true, so those get
  // the year. New bytes mean a new name, which means a new URL, which no cache
  // can confuse for the old one. This rule is second because a later matching
  // header overrides an earlier one.
  headers() {
    return [
      {
        source: "/:path*.(webp|png|jpg|jpeg|svg|mp4|ico|pdf)",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${HOUR}, stale-while-revalidate=${DAY}`,
          },
        ],
      },
      {
        source: "/:path*.:hash([0-9a-f]{8}).(webp|png|jpg|jpeg|svg|mp4)",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${YEAR}, immutable`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
