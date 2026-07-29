import { techStack } from "@/content/techstack";

export function TechStack() {
  const loop = [...techStack, ...techStack];

  return (
    <section className="border-y border-border bg-background py-14">
      <p className="text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Tools I use every day
      </p>

      <div
        className="relative mt-8 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex w-max animate-[marquee_28s_linear_infinite] items-center gap-16 hover:[animation-play-state:paused]">
          {loop.map((tool, index) => (
            <div key={`${tool.name}-${index}`} className="flex shrink-0 items-center gap-3">
              <tool.icon className="h-9 w-9" style={{ color: tool.color }} aria-hidden />
              <span className="font-display text-xl font-semibold text-foreground/80">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
