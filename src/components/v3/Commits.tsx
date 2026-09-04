import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { getRecentCommits } from "@/lib/github";
import { profile } from "@/content/profile";

/**
 * Recent commits, straight from GitHub.
 *
 * Sits under About because it answers the same question the experience list
 * does — is this person actually working — and answers it with something that
 * cannot be written into a content file.
 *
 * The whole section is conditional on real data. An empty list is not worth a
 * heading, and a rate-limited API should cost the page nothing.
 */
export async function Commits() {
  const commits = await getRecentCommits();
  if (commits.length === 0) return null;

  const github = profile.socials.find((social) => social.platform === "github");

  return (
    <section className="relative bg-v3-bg">
      <div className="v3-hatch v3-bleed absolute inset-y-0 left-0" aria-hidden />
      <div className="v3-hatch v3-bleed absolute inset-y-0 right-0" aria-hidden />

      <div className="v3-column border-t border-v3-line px-5 py-20 sm:px-10 lg:px-16 lg:py-24">
        <header className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-v3-accent">
              Lately
            </p>
            <h2
              data-reveal-item
              className="mt-4 max-w-[24ch] font-editorial-display text-[clamp(1.5rem,3vw,2.25rem)] font-normal leading-[1.05] tracking-[-0.015em] text-v3-fg">
              What I have been pushing.
            </h2>
          </div>

          {github && (
            <a
              href={github.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-v3-muted transition-colors duration-200 hover:text-v3-fg"
            >
              <SiGithub aria-hidden className="size-3.5" />
              {github.handle || "GitHub"}
              <ArrowUpRight
                aria-hidden
                className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </a>
          )}
        </header>

        {/* A ruled ledger rather than cards: these are one line each, and six
            boxes would give six commits the weight of six case studies. */}
        <ul className="mt-12">
          {commits.map((commit) => (
            <li key={commit.sha} className="border-b border-v3-line first:border-t">
              <a
                href={commit.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group grid gap-2 py-5 transition-colors duration-200 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-8"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm leading-relaxed text-v3-fg transition-colors duration-200 group-hover:text-v3-accent sm:text-base">
                    {commit.message}
                  </p>
                  <p className="mt-1.5 font-mono text-[11px] text-v3-muted/70">
                    {commit.repo}
                  </p>
                </div>

                <div className="flex items-center gap-4 font-mono text-[11px] text-v3-muted">
                  {/* The short SHA is the one piece here that proves the line
                      came off a real repository rather than a content file. */}
                  <span className="text-v3-muted/70">{commit.sha.slice(0, 7)}</span>
                  <time dateTime={commit.date}>{formatDate(commit.date)}</time>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Fixed locale and UTC, both deliberate: the server renders this once and
 * caches it, so letting either follow the machine would make the prerendered
 * markup disagree with a client that re-renders it.
 */
function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(iso));
}
