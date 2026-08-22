import { ImageIcon } from "lucide-react";
import { beyondItems } from "@/content/beyond";
import { Reveal } from "@/components/ui/Reveal";

const GLOWS = [
  "bg-violet-600/20",
  "bg-blue-600/20",
  "bg-amber-500/15",
  "bg-emerald-500/15",
  "bg-rose-500/15",
  "bg-cyan-500/15",
];

export function Bento() {
  return (
    <section id="beyond" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent">
            <span className="inline-block h-2.5 w-2.5 rotate-45 bg-accent" aria-hidden />
            Beyond design
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            what I do outside of design
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:auto-rows-[180px] sm:gap-5">
          {beyondItems.map((item, index) => (
            <Reveal
              key={index}
              delay={0.08 * index}
              y={32}
              className={`col-span-2 ${item.span}`}
            >
              <div className="group relative h-full min-h-[160px] overflow-hidden rounded-3xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/30">
                <div
                  className={`absolute inset-0 -z-10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 ${GLOWS[index % GLOWS.length]}`}
                  aria-hidden
                />
                <div className="flex h-full w-full items-center justify-center">
                  <ImageIcon
                    className="h-8 w-8 text-muted-foreground/30 transition-colors duration-300 group-hover:text-muted-foreground/50"
                    aria-hidden
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
