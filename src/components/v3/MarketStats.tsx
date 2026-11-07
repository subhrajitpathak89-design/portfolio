import type { ProjectMarketStat } from "@/types";

/**
 * Sourced industry numbers that size the problem a case study starts from.
 * Context, not results: they say why the work mattered, never what it achieved,
 * and each one carries its source so a reviewer can check it.
 */
const COLS = ["", "", "sm:grid-cols-2", "sm:grid-cols-3"];

export function MarketStats({ stats, className = "" }: { stats: ProjectMarketStat[]; className?: string }) {
  if (stats.length === 0) return null;
  return (
    <dl className={`grid gap-px overflow-hidden rounded-2xl border border-v3-line bg-v3-line ${COLS[Math.min(stats.length, 3)]} ${className}`}>
      {stats.map((stat) => (
        <div key={stat.metric + stat.label} data-reveal-item className="flex flex-col bg-v3-bg p-6">
          <dt className="font-grotesk text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium leading-none tracking-[-0.03em] text-v3-fg">
            {stat.metric}
          </dt>
          <dd className="mt-3 flex flex-1 flex-col justify-between gap-4">
            <span className="text-sm leading-relaxed text-v3-muted">{stat.label}</span>
            <a
              href={stat.href}
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-[10px] uppercase tracking-[0.12em] text-v3-muted/80 underline decoration-v3-line underline-offset-4 transition-colors hover:text-v3-fg"
            >
              Source: {stat.source}
            </a>
          </dd>
        </div>
      ))}
    </dl>
  );
}
