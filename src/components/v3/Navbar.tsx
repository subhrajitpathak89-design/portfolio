import Link from "next/link";
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

export function Navbar() {
  const headerSocials = profile.socials
    .filter((social) => social.href && social.href !== "#")
    .map((social) => ({ social, Icon: HEADER_MARKS[social.platform] }))
    .filter((entry): entry is { social: (typeof profile.socials)[number]; Icon: IconType } =>
      Boolean(entry.Icon)
    );

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      {/* Inset to the same rhythm as the hero frame, so the rules line up
          rather than nearly lining up. */}
      <div className="mx-4 flex items-center justify-between gap-4 border-b border-v3-line px-5 py-5 sm:mx-8 sm:px-10 lg:mx-14 lg:px-16">
        <Link
          href="/#home"
          className="font-grotesk text-lg font-bold tracking-[-0.02em] text-v3-fg transition-colors duration-200 hover:text-v3-accent"
        >
          {profile.name.split(" ")[0]}
          <span className="text-v3-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {v3NavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-grotesk text-sm font-medium tracking-[-0.005em] text-v3-muted transition-colors duration-200 hover:text-v3-fg"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2.5">
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
      </div>
    </header>
  );
}
