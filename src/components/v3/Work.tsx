import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WorkCard } from "@/components/v3/WorkCard";
import { projects } from "@/content/projects";

/**
 * The selected-work grid on the homepage.
 *
 * Two up, so the projects can be compared rather than queued. The sticky stack
 * this replaced spent a full viewport per card and revealed them one at a time,
 * which is the wrong shape for a section whose job is "pick the one that
 * interests you" — a reader had to scroll four screens to learn there were
 * four projects.
 *
 * Unwritten case studies are left out here and shown on `/case-studies`
 * instead: the homepage is the shortlist a reviewer with sixty seconds sees,
 * and a blurred placeholder in it spends one of four slots saying nothing.
 */

export function Work() {
  const featured = projects.filter((project) => project.featured && !project.comingSoon);
  const list = featured.length > 0 ? featured : projects.filter((p) => !p.comingSoon);
  const total = projects.length;

  return (
    <section id="work" className="relative scroll-mt-24 bg-v3-bg">
      <div className="v3-hatch v3-bleed absolute inset-y-0 left-0" aria-hidden />
      <div className="v3-hatch v3-bleed absolute inset-y-0 right-0" aria-hidden />

      {/* Continues the hero's vertical rules down the page.
          Asymmetric padding on purpose: the top is smaller than the bottom
          because the hero above already ends in its own whitespace, and two
          full paddings meeting at that seam stacked into a 300px hole. The
          bottom keeps its full measure — nothing above `About` is paying for
          it. */}
      <div className="v3-column px-5 pb-24 pt-16 sm:px-10 lg:px-16 lg:pb-32 lg:pt-20">
        <header data-reveal-item className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-v3-accent">
              Selected work
            </p>
            {/* No count in the headline. It read "Four projects" as literal
                text, went stale the first time the list grew, and a number
                here only ever tells a reader how much scrolling is left —
                whereas "what changed" is the thing the section is offering. */}
            <h2 className="mt-4 max-w-[20ch] font-editorial-display text-[clamp(1.75rem,4vw,3.25rem)] font-normal leading-[1.02] tracking-[-0.015em] text-v3-fg">
              The work, and what <span className="text-v3-accent">changed</span> in each.
            </h2>
          </div>

          {/* Says how many are shown and offers the rest in the same breath,
              which is the only honest way to show a shortlist. */}
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-1.5 py-2 font-mono text-xs text-v3-muted transition-colors duration-200 hover:text-v3-accent"
          >
            All {String(total).padStart(2, "0")} case studies
            <ArrowUpRight
              aria-hidden
              className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </Link>
        </header>

        {/* `items-stretch` is what lets each card's footer sit on a common
            baseline: the row is as tall as its taller card, and `h-full`
            inside passes that height down to the `mt-auto` footer.

            The reveal stagger is by column (`index % 2`) rather than absolute
            index, because the grid is two up: cards 3 and 4 come into view a
            scroll after 1 and 2, and delaying them by their position in the
            whole list would leave them hanging. */}
        <ul className="mt-16 grid items-stretch gap-5 sm:gap-6 lg:mt-20 lg:grid-cols-2 lg:gap-8">
          {list.map((project, index) => (
            <li
              key={project.slug}
              data-reveal-item
              style={{ "--reveal-delay": index % 2 } as React.CSSProperties}
            >
              <WorkCard project={project} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
