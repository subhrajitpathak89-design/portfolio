import Image from "next/image";
import { playground } from "@/content/playground";
import { profile } from "@/content/profile";
import type { PlaygroundFolder } from "@/types";

export function FolderShelf() {
  const { heading, intro, folders, todo } = playground;

  return (
    <section className="bg-v2-cream pb-24 pt-32 lg:pb-32 lg:pt-40">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Same font pairing as the About headline — upright for the sentence,
            italic serif for the one word doing the work. */}
        <h1 className="text-center font-editorial text-[clamp(1.75rem,4.4vw,3.25rem)] font-normal leading-tight tracking-[-0.01em] text-v2-ink">
          {heading.lead} <em className="italic">{heading.accent}</em> {heading.tail}
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-center text-base leading-relaxed text-v2-ink/60">
          {intro}
        </p>

        <ul className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
          {folders.map((folder) => (
            <li key={folder.month}>
              <Folder folder={folder} />
              <p className="mt-5 text-center font-editorial text-lg italic text-v2-ink/75">
                {folder.month}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-20 lg:mt-24">
          <h2 className="font-grotesk text-2xl font-black tracking-[-0.02em] text-v2-ink sm:text-3xl">
            {todo.title}
          </h2>

          <ul className="mt-6 space-y-3">
            {todo.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-[7px] size-2.5 shrink-0 bg-v2-yellow"
                />
                <span className="text-base text-v2-ink/75">{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-xs text-v2-ink/45">{todo.note}</p>
        </div>

        <p className="mt-16 text-right font-editorial text-sm italic text-v2-ink/55">
          {profile.name}&rsquo;s creative space
        </p>
      </div>
    </section>
  );
}

/**
 * A folder is three stacked layers: a darker body with a tab, the peeking
 * contents, then the lighter front flap covering the bottom. The contents sit
 * *between* the body and the flap, which is the whole reason they read as being
 * inside the folder rather than stuck on top of it.
 */
function Folder({ folder }: { folder: PlaygroundFolder }) {
  return (
    <div className="relative aspect-[4/3.4]">
      {/* Body, plus the tab that rises above it on the left. */}
      <div
        className="absolute inset-x-0 bottom-0 top-[26%] rounded-lg rounded-tl-none"
        style={{ backgroundColor: folder.back }}
      >
        <span
          aria-hidden
          className="absolute -top-[7%] left-0 h-[7%] w-[42%] rounded-t-md"
          style={{ backgroundColor: folder.back }}
        />
      </div>

      {/* Contents, clipped at the flap's top edge. */}
      <div className="absolute inset-x-[6%] bottom-[38%] z-10 flex items-end justify-center gap-[3%]">
        {folder.peeks.map((peek, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-[3px] shadow-[0_4px_10px_-4px_rgba(17,17,17,0.4)]"
            style={{
              width: `${peek.width}%`,
              aspectRatio: "3 / 4",
              backgroundColor: peek.tone,
              transform: `rotate(${peek.rotate}deg)`,
            }}
          >
            {peek.src && (
              <Image
                src={peek.src}
                alt={peek.alt}
                fill
                sizes="120px"
                className="object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {/* Front flap. */}
      <div
        className="absolute inset-x-0 bottom-0 top-[38%] z-20 rounded-lg shadow-[0_10px_24px_-14px_rgba(17,17,17,0.45)]"
        style={{ backgroundColor: folder.front }}
      />
    </div>
  );
}
