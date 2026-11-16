"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowDown } from "lucide-react";
import type { IconType } from "react-icons";
import { RiLinkedinFill, RiTwitterXFill } from "react-icons/ri";
import { SiGithub } from "react-icons/si";
import { ThemeToggle } from "@/components/v3/ThemeToggle";
import { profile } from "@/content/profile";

/**
 * Desktop navigation: a fixed left rail (lg and up). Below lg the top bar in
 * `Navbar` takes over, since a 232px rail would eat a phone.
 *
 * Two groups — places on the home page, then standalone pages — so the reader
 * can tell a scroll from a route change before clicking.
 */
const GROUPS = [
  {
    label: "Overview",
    links: [
    { label: "Home", href: "/#home" },
    { label: "Resources", href: "/resources" },
    ],
  },
  {
    label: "Work",
    links: [
    { label: "About", href: "/about" },
    { label: "Case studies", href: "/case-studies" },
    { label: "Playground", href: "/playground" },
    ],
  },
];

const MARKS: Partial<Record<string, IconType>> = {
  linkedin: RiLinkedinFill,
  x: RiTwitterXFill,
  github: SiGithub,
};

/** Local time where Subhrajit works; null until mounted so SSR and client agree. */
function useLocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function Sidebar() {
  const pathname = usePathname();
  const time = useLocalTime();

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return href === "/#home" && pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // The active pill is one element that travels between links. Its leading
  // edge springs ahead and the trailing edge catches up, so it stretches
  // across the gap and settles — the "gooey" move.
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());
  const [pill, setPill] = useState<{ top: number; bottom: number; down: boolean; animate: boolean } | null>(null);
  const activeHref = GROUPS.flatMap((g) => g.links).find((l) => isActive(l.href))?.href;

  useLayoutEffect(() => {
    const measure = (animate: boolean) => {
      const nav = navRef.current;
      const el = activeHref ? linkRefs.current.get(activeHref) : undefined;
      if (!nav || !el) return setPill(null);
      const n = nav.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      const top = r.top - n.top;
      const bottom = n.bottom - r.bottom;
      setPill((prev) => ({ top, bottom, down: prev ? top > prev.top : true, animate: animate && !!prev }));
    };
    measure(true);
    const onResize = () => measure(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeHref]);

  const lead = "300ms cubic-bezier(0.34, 1.4, 0.64, 1)";
  const trail = "520ms cubic-bezier(0.65, 0, 0.35, 1) 40ms";
  const pillStyle = pill
    ? {
        top: pill.top,
        bottom: pill.bottom,
        transition: pill.animate
          ? `top ${pill.down ? trail : lead}, bottom ${pill.down ? lead : trail}, opacity 200ms`
          : "none",
      }
    : { opacity: 0 };

  const socials = profile.socials
    .filter((s) => s.href && s.href !== "#" && MARKS[s.platform])
    .map((s) => ({ s, Icon: MARKS[s.platform] as IconType }));

  const item =
    "flex h-8 items-center rounded-lg px-2.5 font-grotesk text-[13.5px] tracking-[-0.005em] transition-colors duration-150";
  const icon =
    "flex size-8 items-center justify-center rounded-lg text-v3-muted transition-colors duration-150 hover:bg-v3-chip hover:text-v3-fg";

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[var(--sidebar-w)] flex-col border-r border-v3-line bg-v3-bg px-4 py-6 lg:flex">
      {/* Identity */}
      <Link
        href="/#home"
        className="group mx-2.5 block rounded-lg transition-opacity duration-150 hover:opacity-80"
      >
        <span className="block font-hero-serif text-[19px] leading-tight tracking-[-0.02em] text-v3-fg">
          {profile.name}
        </span>
        <span className="mt-1 flex items-center gap-1.5 font-grotesk text-[12px] text-v3-muted">
          <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
          {profile.role}
        </span>
      </Link>

      {/* Navigation */}
      <nav ref={navRef} aria-label="Site sections" className="relative mt-10 flex flex-col gap-6">
        <span
          aria-hidden
          className="v3-nav-pill pointer-events-none absolute inset-x-0 rounded-lg motion-reduce:!transition-none"
          style={pillStyle}
        />
        {GROUPS.map((group) => (
          <div key={group.label}>
            <p className="mb-1.5 px-2.5 font-grotesk text-[11px] font-medium uppercase tracking-[0.08em] text-v3-muted/70">
              {group.label}
            </p>
            <ul className="flex flex-col gap-0.5">
              {group.links.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      ref={(el) => {
                        if (el) linkRefs.current.set(link.href, el);
                        else linkRefs.current.delete(link.href);
                      }}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative ${item} ${
                        active
                          ? "text-v3-fg"
                          : "text-v3-muted hover:text-v3-fg"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <a
          href={profile.resume}
          download
          className="flex h-9 items-center justify-between rounded-lg border border-v3-line px-2.5 font-grotesk text-[13.5px] text-v3-fg transition-colors duration-150 hover:bg-v3-chip"
        >
          Download resume
          <ArrowDown aria-hidden className="size-[14px] text-v3-muted" strokeWidth={2} />
        </a>
      </nav>

      {/* Footer */}
      <div className="mt-auto flex flex-col gap-3 border-t border-v3-line pt-4">
        <div className="flex items-center gap-0.5">
          {socials.map(({ s, Icon }) => (
            <a
              key={s.platform}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              title={s.label}
              className={icon}
            >
              <Icon aria-hidden className="size-[15px]" />
              <span className="sr-only">{s.label}</span>
            </a>
          ))}
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
        <a
          href={`mailto:${profile.email}`}
          className="flex h-9 items-center justify-center rounded-lg bg-v3-accent font-grotesk text-[13.5px] font-medium tracking-[-0.005em] text-v3-bg transition-colors duration-150 hover:bg-v3-accent-bright"
        >
          Get in touch
        </a>
        <p className="px-0.5 text-center font-grotesk text-[11.5px] tabular-nums text-v3-muted" aria-live="off">
          Hyderabad · {time ? `${time} IST` : "IST"}
        </p>
      </div>
    </aside>
  );
}
