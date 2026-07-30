import { ImageIcon } from "lucide-react";
import { beyondItems } from "@/content/beyond";
import { Reveal } from "@/components/ui/Reveal";

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

        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            A few things that keep me curious and recharged when I&apos;m away
            from a design tool.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:auto-rows-[200px] sm:gap-6">
          {beyondItems.map((item, index) => (
            <Reveal
              key={item.title}
              delay={0.15 + index * 0.08}
              y={32}
              className={`col-span-2 ${item.span}`}
            >
              <div className="relative flex h-full min-h-[160px] flex-col justify-end overflow-hidden rounded-2xl border border-border bg-surface p-6">
                <ImageIcon
                  className="absolute right-6 top-6 h-8 w-8 text-muted-foreground/40"
                  aria-hidden
                />
                <p className="font-display text-lg font-semibold text-foreground">
                  {item.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
