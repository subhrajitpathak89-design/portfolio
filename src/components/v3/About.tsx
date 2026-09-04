import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { about } from "@/content/about";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";

/**
 * About, built to answer the three things a reviewer opens this page for —
 * years, companies, and what you want next — in that order and without making
 * anyone hunt.
 *
 * Deliberately calmer than the hero. The selection frame and the drifting
 * terrain are the hero's argument; repeating them here would spend the gag
 * twice and leave the page with no second gear.
 */
export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 bg-v3-bg">
      <div className="v3-hatch v3-bleed absolute inset-y-0 left-0" aria-hidden />
      <div className="v3-hatch v3-bleed absolute inset-y-0 right-0" aria-hidden />

      <div className="v3-column px-5 py-24 sm:px-10 lg:px-16 lg:py-32">
        <p
          data-reveal-item
          className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-v3-accent"
        >
          {about.eyebrow}
        </p>

        <h2
          data-reveal-item
          style={{ "--reveal-delay": 1 } as React.CSSProperties}
          className="mt-6 max-w-[22ch] font-editorial-display text-[clamp(1.75rem,4.4vw,3.5rem)] font-normal leading-[1.02] tracking-[-0.015em] text-v3-fg">
          {about.headline.lead.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="block text-v3-accent">{about.headline.accent}</span>
        </h2>

        <div className="mt-16 grid gap-14 lg:mt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div className="space-y-6" data-reveal-item>
            {about.intro.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-xl text-base leading-relaxed text-v3-muted sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-v3-muted">
              Experience
            </p>

            {/* A rule down the left with a marker per role. The current job's
                marker is filled and the past one is hollow, so "where are they
                now" is answerable without reading a single date. */}
            <ol className="mt-8 border-l border-v3-line" data-reveal-item style={{ "--reveal-delay": 1 } as React.CSSProperties}>
              {experience.map((job, index) => (
                <li
                  key={job.company}
                  className={`relative pb-10 last:pb-0 ${job.logo ? "pl-12" : "pl-7"}`}
                >
                  {job.logo ? (
                    // The logo replaces the dot rather than sitting beside it:
                    // two markers on one row is one marker too many, and the
                    // mark already says which company this is better than a
                    // dot ever could. Straddling the rule is what keeps it
                    // reading as a timeline node — a logo set inside the
                    // padding would just be an icon next to some text.
                    <span className="absolute -left-[17px] top-0 flex size-8 items-center justify-center overflow-hidden rounded-lg bg-v3-surface ring-1 ring-v3-line">
                      <Image
                        src={job.logo}
                        alt={`${job.company} logo`}
                        width={32}
                        height={32}
                        className="size-full object-contain"
                      />
                    </span>
                  ) : (
                    <span
                      aria-hidden
                      className={`absolute -left-[5px] top-1.5 size-2.5 rounded-full border ${
                        index === 0
                          ? "border-v3-accent bg-v3-accent"
                          : "border-v3-line bg-v3-bg"
                      }`}
                    />
                  )}

                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-v3-accent">
                    {job.period}
                  </p>
                  <h3 className="mt-2.5 font-editorial-display text-xl font-normal tracking-[-0.02em] text-v3-fg">
                    {job.role}
                  </h3>
                  <p className="mt-1.5 text-sm text-v3-muted">
                    {job.company} · {job.location}
                  </p>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-v3-muted/80">
                    {job.summary}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* What I want next, where I am, how to reach me — the last three things
            checked before an interview decision, kept on one line. */}
        <div
          data-reveal-item
          className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-v3-line bg-v3-line sm:grid-cols-3 lg:mt-20"
        >
          <Cell label="Open to">{profile.availability}</Cell>
          <Cell label="Based in">{profile.location}</Cell>
          <Cell label="Email">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-1.5 break-all py-1 text-v3-fg transition-colors duration-200 hover:text-v3-accent"
            >
              {profile.email}
              <ArrowUpRight
                aria-hidden
                className="size-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.5}
              />
            </a>
          </Cell>
        </div>
      </div>
    </section>
  );
}

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-v3-surface p-6 sm:p-7">
      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-v3-muted">
        {label}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-v3-fg">{children}</p>
    </div>
  );
}
