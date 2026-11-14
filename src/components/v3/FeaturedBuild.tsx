import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ResourceCardItem } from "@/components/v3/ResourceCardItem";
import { resourceCards } from "@/content/resources";

/**
 * Right after the case studies: a row of three resource cards, led by
 * Kryptonite UI (my own build) so a reviewer meets it before scrolling on.
 */
export function FeaturedBuild() {
  const cards = resourceCards.slice(0, 3);

  return (
    <section id="build" className="relative scroll-mt-24 bg-v3-bg">
      <div className="v3-column px-5 pb-20 sm:px-10 lg:px-16 lg:pb-28">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-hero-serif text-[clamp(1.75rem,3vw,2.25rem)] font-light tracking-[-0.02em] text-v3-fg">
            Builds &amp; resources
          </h2>
          <Link
            href="/resources"
            className="inline-flex items-center gap-1 text-[13px] text-v3-muted transition-colors hover:text-v3-fg"
          >
            View all <ArrowUpRight aria-hidden className="size-3.5" />
          </Link>
        </div>
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <li key={card.title}>
              <ResourceCardItem card={card} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
