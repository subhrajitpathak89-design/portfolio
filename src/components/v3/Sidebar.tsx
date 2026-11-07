"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
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
  [
    { label: "Home", href: "/#home" },
    { label: "Resources", href: "/resources" },
  ],
  [
    { label: "About", href: "/about" },
    { label: "Work", href: "/#work" },
    { label: "Case studies", href: "/case-studies" },
    { label: "Playground", href: "/playground" },
  ],
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

  const socials = profile.socials
    .filter((s) => s.href && s.href !== "#" && MARKS[s.platform])
    .map((s) => ({ s, Icon: MARKS[s.platform] as IconType }));

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[var(--sidebar-w)] flex-col border-r border-v3-line bg-v3-bg justify-between px-7 py-8 lg:flex">
      <div>
        <Link
          href="/#home"
          className="inline-block font-hero-serif text-xl leading-tight tracking-[-0.02em] text-v3-fg transition-opacity duration-200 hover:opacity-70"
        >
          {profile.name}
        </Link>

        <nav aria-label="Site sections" className="mt-12 flex flex-col gap-6">
          {GROUPS.map((group, i) => (
            <ul key={i} className="flex flex-col gap-1">
              {group.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`inline-block py-0.5 font-grotesk text-[14px] tracking-[-0.005em] transition-colors duration-200 hover:text-v3-fg ${
                        active ? "text-v3-fg" : "text-v3-muted"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-2">
        <div className="rounded-2xl border border-v3-line bg-v3-surface p-1.5">
          <div className="flex items-center justify-between px-2 py-1.5">
            <span className="inline-flex items-center gap-2 font-grotesk text-[12px] text-v3-muted">
              <span className="relative flex size-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative size-1.5 rounded-full bg-emerald-500" />
              </span>
              Local time
            </span>
            <span className="font-grotesk text-[12px] tabular-nums text-v3-fg" aria-live="off">
              {time ? `${time} IST` : " "}
            </span>
          </div>
          <div className="mt-1 grid grid-cols-4 gap-1 border-t border-v3-line pt-1.5">
            {socials.map(({ s, Icon }) => (
              <a
                key={s.platform}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                title={s.label}
                className="flex h-8 items-center justify-center rounded-lg text-v3-muted transition-colors duration-200 hover:bg-v3-chip hover:text-v3-fg"
              >
                <Icon aria-hidden className="size-[15px]" />
                <span className="sr-only">{s.label}</span>
              </a>
            ))}
            <a
              href={`mailto:${profile.email}`}
              title="Email"
              className="flex h-8 items-center justify-center rounded-lg text-v3-muted transition-colors duration-200 hover:bg-v3-chip hover:text-v3-fg"
            >
              <Mail aria-hidden className="size-[15px]" strokeWidth={2} />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`mailto:${profile.email}`}
            className="flex h-10 flex-1 items-center justify-center rounded-full bg-v3-accent font-grotesk text-[13px] font-medium tracking-[-0.005em] text-v3-bg transition-colors duration-200 hover:bg-v3-accent-bright"
          >
            Get in touch
          </a>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
