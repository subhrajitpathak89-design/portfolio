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
      <div className="v3-hatch v3-bleed absolute inset-y-0 left-0" aria-hidden />
      <div className="v3-hatch v3-bleed absolute inset-y-0 right-0" aria-hidden />

      <div className="v3-column relative overflow-hidden border-t border-v3-line">
        <div className="relative px-5 py-16 sm:px-10 lg:px-16 lg:py-20">
          {/*
            The same dithered field the hero opens with, closing the page on
            the mark it started on. Its clock is offset so the two fields are
            never caught mid-dissolve together.

            Scoped to the email band rather than the whole footer. It used to
            be `inset-y-0` on the outer frame, which was fine when the email
            was all that was down here — but the link columns were added inside
            the same box and the flower ran straight through "Elsewhere",
            leaving LinkedIn and GitHub sitting on top of a field of dots.
            Nesting it here means it cannot reach them at all, which is worth
            more than any amount of tuning the masks.

            `xl` and up, not `sm`. Below that the email is a single line at
            5vw and its arrow reaches into the field: measured at 768 the
            glyphs stop clear but the arrow lands in the dots, and even at the
            `lg` boundary itself the arrow still overlapped the solid dots by
            16px. There is no room for a 288px mark beside a 27-character
            address until the column is near its cap, and a footer with no
            flower is a better answer than a flower with an email in it. The
            band.s min-height moves with it, or narrower widths keep paying for
            space nothing occupies.
          */}
          <div className="relative xl:min-h-[250px]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 hidden w-72 xl:block"
            >
              {/* Faded on two edges, not one. Left, so it never competes with
                  the email; bottom, so it resolves into the page rather than
                  stopping at a hard line.

                  Both fades are proportions of a box that got shorter when the
                  band tightened, so both had to come in with it: at the
                  previous 34% the bottom fade was removing a third of a 220px
                  box and taking the bloom with it, not just the stem. The
                  numbers are tied to the band height, and moving one without
                  the other is what makes this look cropped. */}
              <DitherField
                scenes={["flower"]}
                timeOffset={31}
                // Coarser than the page default. This field is a graphic in
                // its own right rather than a texture behind copy, and at the
                // 4px default it read as grey haze at this size instead of as
                // a halftone you can see the grid in.
                cell={8}
                className="absolute inset-0 h-full w-full opacity-45 [mask-image:linear-gradient(to_left,black_72%,transparent_100%),linear-gradient(to_top,transparent_0%,black_14%)] [mask-composite:intersect]"
              />
            </div>

            <p className="relative font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-v3-accent">
              {profile.availability}
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="group relative mt-8 inline-flex max-w-full items-start gap-3 py-1 font-grotesk text-[clamp(1.5rem,5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.035em] text-v3-fg transition-colors duration-200 hover:text-v3-accent"
            >
              <span className="break-all">{profile.email}</span>
              <ArrowUpRight
                aria-hidden
                className="mt-[0.35em] size-[0.55em] shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                strokeWidth={2.5}
              />
            </a>
          </div>

          <div
            data-reveal-item
            className="mt-10 grid gap-10 border-t border-v3-line pt-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4"
          >
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
                    className="inline-block min-w-8 py-1.5 text-sm text-v3-muted transition-colors duration-200 hover:text-v3-fg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn label="Based in">
              <li className="text-sm text-v3-muted">{profile.location}</li>
              {/* The résumé belongs in the footer as well as the hero: someone
                  who has read the whole page is exactly who wants it, and by
                  then the hero is a long way back up. */}
              <li>
                <a
                  href={profile.resume}
                  download="Subhrajit-Pathak-Product-Designer-Resume.pdf"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-block min-w-8 py-1.5 text-sm text-v3-muted transition-colors duration-200 hover:text-v3-fg"
                >
                  Resume
                </a>
              </li>
            </FooterColumn>

            {socials.length > 0 && (
              <FooterColumn label="Elsewhere">
                {socials.map((social) => (
                  <li key={social.platform}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-block min-w-8 py-1.5 text-sm text-v3-muted transition-colors duration-200 hover:text-v3-fg"
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
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] text-v3-muted">
            <p>
              © {year} {profile.name}
            </p>

            {/* Set in the same mono as the copyright and given no accent: it is
                a credit, not a badge. The `×` is a multiplication sign rather
                than a letter x — the two tools were used together, and at this
                size the wrong glyph reads as a typo. */}
            <span aria-hidden className="text-v3-line">
              /
            </span>
            <p>
              Built with{" "}
              <span className="text-v3-fg">Claude&nbsp;&times;&nbsp;Codex</span>
            </p>
          </div>

          <Link
            href="/#home"
            className="group inline-flex items-center gap-2 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-v3-muted transition-colors duration-200 hover:text-v3-fg"
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
