import Image from "next/image";
import { playground } from "@/content/playground";
import { profile } from "@/content/profile";
import type { PlaygroundFolder } from "@/types";

/**
 * Stands in for the backdrop until the image is in place. Listed *under* the
 * image in the same `background-image` stack, so a missing file degrades to a
 * sky-to-grass wash rather than a broken-image box.
 */
const BACKDROP_FALLBACK =
  "linear-gradient(to bottom, #2f6cb2 0%, #4a87c9 42%, #86acd6 56%, #4a7a33 64%, #2d5620 100%)";

export function FolderShelf() {
  const { background, heading, intro, folders, todo } = playground;

  return (
    <section className="relative isolate pb-24 pt-32 lg:pb-32 lg:pt-40">
      {/* Fixed, so the hills sit still while the folders scroll over them. */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${background}), ${BACKDROP_FALLBACK}` }}
      >
        {/* The header sits on open sky, and the image has bright cloud banks —
            white-on-white survives no text-shadow. Depth is set by the worst
            case rather than the average: over a white cloud, 45% black puts the
            16px intro at 3.4:1, short of AA. 60% takes it to 5.7:1. Reads as an
            ordinary sky vignette either way. */}
        <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-black/60 via-black/25 to-transparent" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Heading sits directly on the sky — white, with a soft shadow so it
            survives the lighter patches of cloud. */}
        <header className="text-center">
          <h1 className="font-editorial text-[clamp(1.75rem,4.4vw,3.25rem)] font-normal leading-tight tracking-[-0.01em] text-white [text-shadow:0_2px_18px_rgba(17,34,60,0.45)]">
            {heading.lead} <em className="italic">{heading.accent}</em>{" "}
            {heading.tail}
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/85 [text-shadow:0_1px_10px_rgba(17,34,60,0.5)]">
            {intro}
          </p>
        </header>

        {/* The content rides a cream card rather than the photo itself: pastel
            folders and dark body copy both lose against a blue-and-green
            photograph. The card lets the hills frame the page instead of
            competing with it. */}
        <div className="mt-14 rounded-3xl bg-v2-cream/95 p-6 shadow-[0_30px_80px_-30px_rgba(17,34,60,0.55)] backdrop-blur-sm sm:p-10 lg:mt-20 lg:p-14">
          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
            {folders.map((folder) => (
              <li key={folder.month}>
                <Folder folder={folder} />
                <p className="mt-5 text-center font-editorial text-lg italic text-v2-ink/75">
                  {folder.month}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-16 lg:mt-20">
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

            <p className="mt-5 text-xs text-v2-ink/65">{todo.note}</p>
          </div>

          <p className="mt-14 text-right font-editorial text-sm italic text-v2-ink/65">
            {profile.name}&rsquo;s creative space
          </p>
        </div>
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

      {/* Contents, sitting on the flap's top edge. */}
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
