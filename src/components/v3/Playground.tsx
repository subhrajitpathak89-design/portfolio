import { PlaygroundCollage } from "@/components/v3/PlaygroundCollage";
import { playground } from "@/content/playground";
import { profile } from "@/content/profile";

/**
 * Playground: the collage, and nothing else competing with it.
 *
 * It used to open on a heading, an intro paragraph and a folder count, then run
 * a drifting carousel of month plates below the collage — two galleries on one
 * page, each explaining the other. The carousel and the copy are gone; the
 * heading now says what the page is, and the work is the only thing on it.
 *
 * The dithered plate grounds went with the carousel, which is why `DitherField`
 * is no longer imported here.
 *
 * The grid and its filter live in `PlaygroundCollage`, which is a client
 * component: keeping them there means the one bit of state on this page does
 * not drag the heading and the to-do list into the bundle with it.
 */

export function Playground() {
  const { heading, collage, todo } = playground;

  return (
    <section className="relative bg-v3-bg">
      <div className="v3-hatch v3-bleed absolute inset-y-0 left-0" aria-hidden />
      <div className="v3-hatch v3-bleed absolute inset-y-0 right-0" aria-hidden />

      <div className="v3-column px-5 pb-24 pt-28 sm:px-10 lg:px-16 lg:pb-32 lg:pt-36">
        <header>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-v3-accent">
            Playground
          </p>

          <h1 className="mt-4 max-w-[20ch] font-editorial-display text-[clamp(1.75rem,4.4vw,3.5rem)] font-normal leading-[1.02] tracking-[-0.015em] text-v3-fg">
            {heading.lead} <span className="text-v3-accent">{heading.accent}</span>{" "}
            {heading.tail}
          </h1>
        </header>

        <PlaygroundCollage tiles={collage} />

        <div className="mt-20 border-t border-v3-line pt-10 lg:mt-28">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-v3-muted">
            {todo.title}
          </p>

          <ul className="mt-8 max-w-2xl">
            {todo.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-4 border-b border-v3-line py-4 first:border-t"
              >
                <span aria-hidden className="mt-[9px] size-1.5 shrink-0 bg-v3-accent" />
                <span className="text-base leading-relaxed text-v3-muted">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-[11px] text-v3-muted/70">{todo.note}</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-v3-muted/70">
              {profile.name}&rsquo;s creative space
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
