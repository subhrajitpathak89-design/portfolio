"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import type { IconType } from "react-icons";
import { RiLinkedinFill } from "react-icons/ri";
import { SiGithub } from "react-icons/si";
import { ThemeToggle } from "@/components/v3/ThemeToggle";
import { v3NavLinks } from "@/content/v3-nav";
import { profile } from "@/content/profile";

/**
 * Only the platforms the header carries; the footer lists the rest.
 *
 * LinkedIn comes from Remix rather than Simple Icons, the same way ChatGPT
 * does in `ToolMarks` — the mark was withdrawn from the Simple Icons set over
 * trademark policy, so `siLinkedin` does not exist in the installed version.
 */
const HEADER_MARKS: Partial<Record<string, IconType>> = {
  linkedin: RiLinkedinFill,
  github: SiGithub,
};

/**
 * Header.
 *
 * Below `md` everything except the wordmark collapses behind a menu button.
 * It had to: the actions cluster was `shrink-0` at 259px, which with the 80px
 * wordmark and the gap needed 355px against the 342px a 375px screen actually
 * offers — so "Get in touch" was clipped off the right edge of every phone.
 * The nav links had a `md:flex` treatment already; the cluster never got one,
 * which is why the two disagreed about whether this bar was responsive.
 *
 * A panel rather than a full-screen overlay: there are six things in here, and
 * a whole-viewport takeover for six things reads as a much bigger decision
 * than the reader made by tapping a menu button. It also means no scroll
 * locking, which with Lenis driving the page would mean reaching into the
 * smooth-scroll instance from the header.
 */
export function Navbar() {
  const pathname = usePathname();

  // The state is the route the menu was opened on, and `open` is derived from
  // whether that is still the route we are on. Storing a boolean and resetting
  // it from an effect on `pathname` would work, but it is the textbook
  // unnecessary effect: a render caused by a route change, followed by a
  // setState, followed by another render. Deriving it closes the menu on
  // navigation for free and in one pass.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const setOpen = (value: boolean) => setOpenedOn(value ? pathname : null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const headerSocials = profile.socials
    .filter((social) => social.href && social.href !== "#")
    .map((social) => ({ social, Icon: HEADER_MARKS[social.platform] }))
    .filter((entry): entry is { social: (typeof profile.socials)[number]; Icon: IconType } =>
      Boolean(entry.Icon)
    );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // The stable setter, not the `setOpen` wrapper: that closes over
        // `pathname` and is a new function every render, so listing it as a
        // dependency would tear this effect down and rebuild it each pass.
        setOpenedOn(null);
        triggerRef.current?.focus();
      }
    };

    // A tap anywhere outside dismisses it, which is the gesture people try
    // first and is cheaper than a scrim that has to be reasoned about.
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      setOpenedOn(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    // Focus moves into the panel so a keyboard user is not left behind the
    // button they just pressed.
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      {/* Inset to the same rhythm as the hero frame, so the rules line up
          rather than nearly lining up. */}
      <div className="v3-column relative flex items-center justify-between gap-4 border-b border-v3-line px-5 py-5 sm:px-10 lg:px-16">
        <Link
          href="/#home"
          className="inline-block py-1 font-grotesk text-lg font-bold tracking-[-0.02em] text-v3-fg transition-colors duration-200 hover:text-v3-accent"
        >
          {profile.name.split(" ")[0]}
          <span className="text-v3-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {v3NavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-block py-1.5 font-grotesk text-sm font-medium tracking-[-0.005em] text-v3-muted transition-colors duration-200 hover:text-v3-fg"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* The cluster that used to overflow. `hidden md:flex` now, which is
            the treatment the nav links always had. */}
        <div className="hidden shrink-0 items-center gap-2.5 md:flex">
          {/* Marks rather than labels, for the same reason the case-study cards
              use them: the profile links are a destination a reviewer already
              knows the shape of, and two wordmarks here would pull against the
              nav. Only the ones with a real URL render. */}
          {headerSocials.map(({ social, Icon }) => (
            <a
              key={social.platform}
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              title={social.label}
              className="flex size-9 items-center justify-center rounded-lg border border-v3-line text-v3-muted transition-colors duration-200 hover:border-v3-muted/40 hover:text-v3-fg"
            >
              <Icon aria-hidden className="size-4" />
              <span className="sr-only">{social.label}</span>
            </a>
          ))}

          <ThemeToggle />

          <a
            href={`mailto:${profile.email}`}
            className="rounded-lg bg-v3-accent px-5 py-2.5 font-grotesk text-sm font-semibold tracking-[-0.005em] text-v3-bg transition-colors duration-200 hover:bg-v3-accent-bright"
          >
            Get in touch
          </a>
        </div>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-v3-line bg-v3-surface text-v3-fg transition-colors duration-200 hover:border-v3-muted md:hidden"
        >
          {open ? (
            <X aria-hidden className="size-[18px]" strokeWidth={2} />
          ) : (
            <Menu aria-hidden className="size-[18px]" strokeWidth={2} />
          )}
        </button>

        {/* Hangs off the header's bottom rule rather than overlapping it, so
            the panel reads as the bar extending downward. `inert` alongside
            the fade keeps its links out of the tab order while invisible. */}
        <div
          ref={panelRef}
          id="mobile-menu"
          inert={!open}
          className={`absolute left-0 right-0 top-full origin-top border-b border-v3-line bg-v3-surface/95 backdrop-blur-xl transition-all duration-200 ease-out motion-reduce:transition-none md:hidden ${
            open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
          }`}
        >
          <nav aria-label="Site sections" className="flex flex-col px-5 py-2 sm:px-10">
            {v3NavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-v3-line py-3.5 font-grotesk text-[15px] font-medium tracking-[-0.005em] text-v3-fg transition-colors duration-200 last:border-b-0 hover:text-v3-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 px-5 pb-5 pt-3 sm:px-10">
            {headerSocials.map(({ social, Icon }) => (
              <a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                title={social.label}
                className="flex size-10 items-center justify-center rounded-lg border border-v3-line text-v3-muted transition-colors duration-200 hover:border-v3-muted/40 hover:text-v3-fg"
              >
                <Icon aria-hidden className="size-4" />
                <span className="sr-only">{social.label}</span>
              </a>
            ))}

            <ThemeToggle />

            {/* Takes the rest of the row: it is the one thing in this panel
                anyone opened it hoping to find. */}
            <a
              href={`mailto:${profile.email}`}
              onClick={() => setOpen(false)}
              className="ml-auto rounded-lg bg-v3-accent px-5 py-2.5 font-grotesk text-sm font-semibold tracking-[-0.005em] text-v3-bg transition-colors duration-200 hover:bg-v3-accent-bright"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
