"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Diamond, Heart, LayoutGrid, Star, UserRound } from "lucide-react";
import { FaDribbble, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { navLinks } from "@/content/nav";
import { profile } from "@/content/profile";
import type { NavIcon } from "@/types";

/** Matches the header's `h-16`; the active-section line is measured from it. */
const NAV_HEIGHT = 64;

const NAV_ICONS: Record<NavIcon, typeof Star> = {
  star: Star,
  person: UserRound,
  grid: LayoutGrid,
  diamond: Diamond,
};

// Each social pill carries its own brand-adjacent fill, which is what gives
// the v2 bar its confetti feel — so the colour lives with the link, not in a
// shared token.
//
// These are hidden below `sm`: on a phone they were what pushed the Contact
// button off-screen, and the footer carries the same links anyway.
const SOCIALS = [
  {
    label: "LinkedIn",
    platform: "linkedin",
    Icon: FaLinkedinIn,
    className: "bg-v2-yellow text-v2-ink",
  },
  {
    label: "Dribbble",
    platform: "dribbble",
    Icon: FaDribbble,
    className: "bg-v2-pink text-white",
  },
  {
    label: "Instagram",
    platform: "instagram",
    Icon: FaInstagram,
    className: "bg-v2-green text-white",
  },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [activeHash, setActiveHash] = useState("#home");

  useEffect(() => {
    // Section tracking only means anything on the home page; elsewhere the
    // route decides which link is lit.
    if (!onHome) return;

    const sectionIds = navLinks
      .map((link) => link.href.split("#")[1])
      .filter((id): id is string => Boolean(id));

    /**
     * Resolves the active link by asking which section currently sits under a
     * reference line just below the navbar.
     *
     * This replaces an IntersectionObserver that watched a 5%-tall band in the
     * middle of the viewport. That approach only reports *changes*, so any
     * section that failed to register a crossing left the highlight stuck on
     * whatever was last set — which is what kept Case Study from ever lighting
     * up. Reading positions directly is stateless: the answer is recomputed
     * from scratch each frame and cannot drift.
     *
     * The page's sections are contiguous siblings, so exactly one of them
     * contains the line at any scroll offset.
     */
    const resolveActive = () => {
      const line = NAV_HEIGHT + 1;
      let lastAbove: string | null = null;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        const { top, bottom } = element.getBoundingClientRect();
        if (top <= line && bottom > line) {
          setActiveHash(`#${id}`);
          return;
        }
        if (top <= line) lastAbove = id;
      }

      // Sections without a nav entry of their own — the tool stack, for one —
      // leave no direct match. Falling back to the last linked section above
      // the line keeps the result a pure function of scroll position instead
      // of leaving whatever was set last to go stale.
      if (lastAbove) setActiveHash(`#${lastAbove}`);
    };

    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        resolveActive();
      });
    };

    // Scheduled rather than called inline so the first resolve lands in a
    // frame callback instead of during the effect.
    schedule();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [onHome]);

  /**
   * Hash links (`/#work`) belong to the home page and are decided by scroll
   * position; plain routes (`/playground`) are decided by the pathname. Without
   * the split, a route link could never light up and a section link would stay
   * lit after navigating away.
   */
  const isLinkActive = (href: string) => {
    const [route, hash] = href.split("#");
    if (hash) return onHome && `#${hash}` === activeHash;
    return pathname === route.replace(/\/$/, "");
  };

  // Returns null for a platform with no real URL behind it. A "#" href is a
  // link that goes nowhere, and a reviewer running the technical pass counts
  // that as a broken link — so the pill is dropped until the URL exists.
  const socialHref = (platform: string) => {
    const href = profile.socials.find((social) => social.platform === platform)?.href;
    return href && href !== "#" ? href : null;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-black/10 bg-v2-cream/90 backdrop-blur-md">
      <div className="flex h-full items-stretch justify-between">
        <div className="flex items-stretch">
          <Link
            href="/#home"
            aria-label={`${profile.name} — home`}
            className="flex w-12 shrink-0 items-center justify-center sm:w-14 lg:w-[68px]"
          >
            <SmileyMark />
          </Link>

          <nav className="flex items-stretch" aria-label="Main">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.href);
              const Icon = NAV_ICONS[link.icon];

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-2 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-v2-ink transition-colors duration-200 sm:px-4 lg:gap-2.5 lg:px-6 lg:text-xs ${
                    isActive ? "bg-v2-yellow" : "hover:bg-black/[0.04]"
                  }`}
                >
                  <Icon
                    aria-hidden
                    className="size-4 shrink-0"
                    strokeWidth={2.25}
                    fill={link.icon === "star" || link.icon === "diamond" ? "currentColor" : "none"}
                  />
                  {/* Labels only unfold at lg. Below that the bar stays in
                      icon-only mode: the four labels plus socials and Contact
                      need ~910px, and at 375px the full set overflowed to
                      509px, pushing Contact clean off the screen. */}
                  <span className="hidden lg:inline">{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2 pr-2 sm:gap-2.5 sm:pr-4">
          {SOCIALS.map(({ label, platform, Icon, className }) => {
            const href = socialHref(platform);
            if (!href) return null;

            return (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={label}
              className={`hidden size-8 items-center justify-center rounded-full transition-transform duration-200 hover:-translate-y-0.5 sm:flex sm:size-9 ${className}`}
            >
              <Icon aria-hidden className="size-4" />
            </a>
            );
          })}

          <Link
            href="/#contact"
            className="ml-0.5 flex shrink-0 items-center gap-1.5 border-2 border-v2-ink px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-v2-ink transition-colors duration-200 hover:bg-v2-ink hover:text-v2-cream sm:ml-1 sm:gap-2 sm:px-5 sm:text-xs sm:tracking-[0.16em]"
          >
            <Heart aria-hidden className="size-3.5 shrink-0" fill="currentColor" strokeWidth={0} />
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}

/** Pink smiley brand mark, drawn inline so it stays crisp at any nav height. */
function SmileyMark() {
  return (
    <svg viewBox="0 0 32 32" className="size-8 sm:size-9" aria-hidden>
      <circle cx="16" cy="16" r="16" fill="var(--v2-pink)" />
      <ellipse cx="11" cy="12.5" rx="1.9" ry="2.6" fill="#fff" />
      <ellipse cx="21" cy="12.5" rx="1.9" ry="2.6" fill="#fff" />
      <path
        d="M9.5 19.5c1.6 3 4 4.4 6.5 4.4s4.9-1.4 6.5-4.4"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
