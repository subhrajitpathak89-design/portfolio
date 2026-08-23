"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Diamond, Heart, LayoutGrid, Star, UserRound } from "lucide-react";
import { FaDribbble, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { navLinks } from "@/content/nav";
import { profile } from "@/content/profile";
import type { NavIcon } from "@/types";

const NAV_ICONS: Record<NavIcon, typeof Star> = {
  star: Star,
  person: UserRound,
  grid: LayoutGrid,
  diamond: Diamond,
};

// Each social pill carries its own brand-adjacent fill, which is what gives
// the v2 bar its confetti feel — so the colour lives with the link, not in a
// shared token.
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
  const [activeHash, setActiveHash] = useState("#home");

  useEffect(() => {
    const sectionIds = navLinks
      .map((link) => link.href.replace("/", ""))
      .filter((hash) => hash.startsWith("#"))
      .map((hash) => hash.slice(1));

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const socialHref = (platform: string) =>
    profile.socials.find((social) => social.platform === platform)?.href ?? "#";

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-black/10 bg-v2-cream/90 backdrop-blur-md">
      <div className="flex h-full items-stretch justify-between">
        <div className="flex items-stretch">
          <Link
            href="/#home"
            aria-label={`${profile.name} — home`}
            className="flex w-14 shrink-0 items-center justify-center sm:w-[68px]"
          >
            <SmileyMark />
          </Link>

          <nav className="flex items-stretch" aria-label="Main">
            {navLinks.map((link) => {
              const isActive = link.href.replace("/", "") === activeHash;
              const Icon = NAV_ICONS[link.icon];

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-2 px-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-v2-ink transition-colors duration-200 lg:gap-2.5 lg:px-6 lg:text-xs ${
                    isActive ? "bg-v2-yellow" : "hover:bg-black/[0.04]"
                  }`}
                >
                  <Icon
                    aria-hidden
                    className="size-4 shrink-0"
                    strokeWidth={2.25}
                    fill={link.icon === "star" || link.icon === "diamond" ? "currentColor" : "none"}
                  />
                  {/* The four labels plus the socials and Contact need ~910px,
                      so labels only unfold at lg — below that the bar stays in
                      icon-only mode rather than shoving Contact off-screen. */}
                  <span className="hidden lg:inline">{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2 pr-3 sm:gap-2.5 sm:pr-4">
          {SOCIALS.map(({ label, platform, Icon, className }) => (
            <a
              key={label}
              href={socialHref(platform)}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={label}
              className={`flex size-8 items-center justify-center rounded-full transition-transform duration-200 hover:-translate-y-0.5 sm:size-9 ${className}`}
            >
              <Icon aria-hidden className="size-4" />
            </a>
          ))}

          <Link
            href="/#contact"
            className="ml-1 flex items-center gap-2 border-2 border-v2-ink px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-v2-ink transition-colors duration-200 hover:bg-v2-ink hover:text-v2-cream sm:px-5 sm:text-xs"
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
