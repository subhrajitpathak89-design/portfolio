import { ArrowUpRight } from "lucide-react";
import { ResourceThumb } from "@/components/v3/ResourceThumb";
import type { ResourceCard } from "@/content/resources";

/** Cards whose thumbnail is a real screenshot at /images/v3/<thumb>/home.png (1440x900). */
const SCREENSHOTS = new Set<ResourceCard["thumb"]>(["kryptonite", "curated", "refero", "mobbin"]);

/** Per-screenshot framing, for captures with clutter at the edges (Refero's sidebar and promo popup). */
const FRAMING: Partial<Record<ResourceCard["thumb"], string>> = {
  refero: "scale-[1.4] origin-[88%_30%]",
};

const domainOf = (href: string) => {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

/**
 * One resource card: a browser-framed screenshot on top, then title, tag and
 * note. Shared by the homepage row and /resources. Its height comes from its
 * content, so it stays compact on phones without a separate layout.
 */
export function ResourceCardItem({ card }: { card: ResourceCard }) {
  const isMine = card.tag.toLowerCase().startsWith("my build");

  const body = (
    <article className="flex h-full flex-col rounded-2xl border border-v3-line bg-v3-surface p-2.5 transition-[border-color,transform,box-shadow] duration-300 ease-out group-hover:-translate-y-1 group-hover:border-v3-muted/40 group-hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.7)]">
      {/* Browser frame */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-black">
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#141414] px-3 py-2">
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/20" />
          <span className="ml-2 truncate font-mono text-[10px] text-white/45">{domainOf(card.href)}</span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          {SCREENSHOTS.has(card.thumb) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`/images/v3/${card.thumb}/home.png`}
              alt=""
              loading="lazy"
              className={`absolute inset-0 size-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04] ${FRAMING[card.thumb] ?? ""}`}
            />
          ) : (
            <ResourceThumb kind={card.thumb} />
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-2.5 pb-2 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-hero-serif text-xl font-normal leading-snug tracking-[-0.01em] text-v3-fg">{card.title}</h3>
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-v3-line text-v3-muted transition-colors group-hover:border-v3-fg group-hover:bg-v3-fg group-hover:text-v3-bg">
            <ArrowUpRight aria-hidden className="size-3.5" />
          </span>
        </div>
        <p className="mt-1.5 text-[13px] leading-relaxed text-v3-muted">{card.note}</p>
        <p className="mt-auto pt-4">
          <span
            className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] ${
              isMine ? "bg-v3-accent/15 text-v3-accent" : "border border-v3-line text-v3-muted"
            }`}
          >
            {card.tag}
          </span>
        </p>
      </div>
    </article>
  );

  if (!card.href) return <div className="block h-full">{body}</div>;
  return (
    <a href={card.href} target="_blank" rel="noreferrer noopener" className="group block h-full">
      {body}
    </a>
  );
}
