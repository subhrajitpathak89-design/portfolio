import type { Metadata } from "next";
import { Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/v3/Footer";
import { FloatingDock } from "@/components/v3/FloatingDock";
import { GlobalCursor } from "@/components/v3/GlobalCursor";
import { Navbar } from "@/components/v3/Navbar";
import { ScrollReveal } from "@/components/v3/ScrollReveal";
import { SmoothScroll } from "@/components/v3/SmoothScroll";
import { profile, siteUrl } from "@/content/profile";
import "./globals.css";

// Three faces, and only three: the grotesque everything UI is set in, the
// display serif the headlines pivot into, and the mono the spec labels use.
// Every family loaded here is a blocking font fetch on first paint, so a face
// that no rule actually names is pure cost — Inter, Plus Jakarta, Caveat and
// Playfair were all still being downloaded for tokens nothing consumed.

// Normal only. This and the serif below were both loading their italic ranges
// as well, on the strength of comments describing an italic wordmark and an
// italic accent — and nothing in the markup or the stylesheet asks for italic
// anywhere. Two extra variable font files, blocking first paint, for a style
// the page never uses.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

// The display serif the page headings are set in.
//
// Instrument Serif rather than a Didone like Playfair: a Didone's stroke
// contrast goes spindly at the sizes a hero headline
// wants. Instrument sits in the moderate-contrast register the reference is in
// and holds up large. It ships one weight, which is the whole point — a display
// serif used at two weights stops reading as a voice and starts reading as a
// mistake. Swap the face in one place: `--font-editorial-display` in
// globals.css.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// The case-study cards use a mono for every piece of label copy — project
// number, date, tags, the CTA — which is what gives them their spec-sheet feel.
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.tagline,
  keywords: [
    "design portfolio",
    "product design",
    "brand identity",
    "motion design",
    "editorial design",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: `${profile.name} — Portfolio`,
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: `${profile.name} — ${profile.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable} h-full antialiased`}
      // The reveal script below stamps `data-reveal` on this element before
      // React hydrates, which is the entire point of it — but it means the
      // server HTML and the client tree disagree about this one attribute, and
      // React reports that as a hydration error in production as well as dev.
      // Scoped to `<html>`, so it only ever excuses the attribute the script is
      // deliberately writing here.
      suppressHydrationWarning
    >
      <body className="min-h-full bg-v3-bg font-grotesk text-v3-fg">
        {/*
          Arms the scroll-reveal effect before first paint.

          It has to be an inline script rather than an effect, twice over. It
          runs before the content below it is painted, so blocks start hidden
          instead of flashing in and then hiding. And it only runs when scripts
          run — no JS means `data-reveal` is never set, the hidden-state rules
          in globals.css never match, and the page is simply the page.

          The watchdog covers the remaining gap: scripts enabled, attribute
          set, but the app chunk never mounts. `ScrollReveal` clears this timer
          as soon as it is alive; if it never does, the attribute comes back off
          and everything is visible. A decorative effect must never be able to
          leave the site blank.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.dataset.reveal='';" +
              "window.__revealWatchdog=setTimeout(function(){" +
              "delete document.documentElement.dataset.reveal},4000);",
          }}
        />

        {/*
          Applies the theme before the first paint.

          It has to be inline and it has to be here, above the content: the
          theme lives in `localStorage` and in an OS setting, neither of which
          the server can see, so a React effect would run after the page had
          already painted in the wrong one. That flash is the whole reason this
          script exists.

          No stored value means follow the system, which is also what
          `ThemeToggle` does — the two have to agree or the first paint and the
          first render disagree.

          Wrapped in try/catch because reading `localStorage` throws outright
          in a browser set to block site data, and a theme is not worth taking
          the page down for.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');" +
              "if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))" +
              "document.documentElement.classList.add('dark')}catch(e){}",
          }}
        />

        {/* Last in the body would be tidier, but it has to outlive nothing and
            paint over everything — it is `position: fixed` at the top of the
            stacking order, so document order does not decide what it covers.
            Here, next to the other page-wide behaviours it belongs with. */}
        <GlobalCursor />

        <ScrollReveal />
        <SmoothScroll />
        <Navbar />
        <FloatingDock />
        {children}
        <Footer />
      </body>
    </html>
  );
}
