import Link from "next/link";
import { profile } from "@/content/profile";

/**
 * Footer as one closing line: a small "Still here?", then "Work with me."
 * set edge to edge in the serif, a row of contact links, and a quiet base
 * row with the copyright and a way back up.
 */
export function Footer() {
  const year = new Date().getFullYear();

  // Only the socials with a real URL behind them.
  const socials = profile.socials.filter((social) => social.href && social.href !== "#");

  return (
    <footer id="contact" className="relative scroll-mt-24 overflow-hidden bg-v3-bg">
      <div className="px-3 pt-32 text-center lg:pt-40">
        <p className="text-[15px] text-v3-muted">Still here?</p>

        <a
          href={`mailto:${profile.email}`}
          className="mt-8 block whitespace-nowrap font-editorial-display text-[clamp(3.5rem,15.5vw,16rem)] font-light leading-[0.9] tracking-[-0.045em] text-v3-fg transition-opacity duration-200 hover:opacity-80"
        >
          Work with me.
        </a>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[15px]">
          <li>
            <a
              href={`mailto:${profile.email}`}
              className="text-v3-fg transition-colors duration-200 hover:text-v3-accent"
            >
              Email
            </a>
          </li>
          {socials.map((social) => (
            <li key={social.platform}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-v3-fg transition-colors duration-200 hover:text-v3-accent"
              >
                {social.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer noopener"
              className="text-v3-fg transition-colors duration-200 hover:text-v3-accent"
            >
              Resume
            </a>
          </li>
        </ul>
      </div>

      <div className="v3-column mt-24 flex flex-wrap items-center justify-between gap-4 px-5 py-6 text-[13px] text-v3-muted sm:px-10 lg:px-16">
        <p>
          © {year} {profile.name} · Built with Claude&nbsp;&times;&nbsp;Codex
        </p>
        <Link href="/#home" className="transition-colors duration-200 hover:text-v3-fg">
          Back to top ↑
        </Link>
      </div>
    </footer>
  );
}
