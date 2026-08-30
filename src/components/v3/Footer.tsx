import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { DitherField } from "@/components/v3/DitherField";
import { profile } from "@/content/profile";
import { v3NavLinks } from "@/content/v3-nav";

/**
 * Footer.
 *
 * The email is the whole point of the section, so it is set as the largest
 * thing on it rather than filed in a column of links — a reviewer who has read
 * this far has already decided, and the next click should not need finding.
 */
export function Footer() {
  const year = new Date().getFullYear();

  // Only the socials with a real URL behind them. The rest stay hidden rather
  // than shipping links that go nowhere.
  const socials = profile.socials.filter(
    (social) => social.href && social.href !== "#"
  );

  return (
    <footer id="contact" className="relative scroll-mt-24 bg-v3-bg">
      <div className="v3-hatch absolute inset-y-0 left-0 w-4 sm:w-8 lg:w-14" aria-hidden />
      <div className="v3-hatch absolute inset-y-0 right-0 w-4 sm:w-8 lg:w-14" aria-hidden />

      <div className="relative mx-4 overflow-hidden border-x border-t border-v3-line sm:mx-8 lg:mx-14">
        {/*
          The same dithered field the hero opens with, closing the page on the
          mark it started on. It sits in the right margin and fades out toward
          the text so it never competes with the email, and its clock is offset
          so the two fields are never caught mid-dissolve together.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] sm:block"
        >
          <DitherField
            scenes={["flower"]}
            timeOffset={31}
            className="absolute inset-0 h-full w-full opacity-45 [mask-image:linear-gradient(to_left,black_60%,transparent_95%)]"
          />
        </div>

        <div className="relative px-5 py-20 sm:px-10 lg:px-16 lg:py-28">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-v3-accent">
            {profile.availability}
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="group mt-8 inline-flex max-w-full items-start gap-3 font-grotesk text-[clamp(1.5rem,5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.035em] text-v3-fg transition-colors duration-200 hover:text-v3-accent"
          >
            <span className="break-all">{profile.email}</span>
            <ArrowUpRight
              aria-hidden
              className="mt-[0.35em] size-[0.55em] shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={2.5}
            />
          </a>

          <div className="mt-16 grid gap-10 border-t border-v3-line pt-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <p className="font-grotesk text-lg font-bold tracking-[-0.02em] text-v3-fg">
                {profile.name.split(" ")[0]}
                <span className="text-v3-accent">.</span>
              </p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-v3-muted">
                {profile.roleLine}
              </p>
            </div>

            <FooterColumn label="Pages">
              {v3NavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-v3-muted transition-colors duration-200 hover:text-v3-fg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn label="Based in">
              <li className="text-sm text-v3-muted">{profile.location}</li>
            </FooterColumn>

            {socials.length > 0 && (
              <FooterColumn label="Elsewhere">
                {socials.map((social) => (
                  <li key={social.platform}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-sm text-v3-muted transition-colors duration-200 hover:text-v3-fg"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </FooterColumn>
            )}
          </div>
        </div>

        <div className="relative flex flex-wrap items-center justify-between gap-4 border-t border-v3-line px-5 py-6 sm:px-10 lg:px-16">
          <p className="font-mono text-[11px] text-v3-muted">
            © {year} {profile.name}
          </p>

          <Link
            href="/#home"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-v3-muted transition-colors duration-200 hover:text-v3-fg"
          >
            Back to top
            <ArrowUp
              aria-hidden
              className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-v3-muted/70">
        {label}
      </p>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}
