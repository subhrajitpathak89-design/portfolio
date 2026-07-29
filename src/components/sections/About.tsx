import { ImageIcon } from "lucide-react";
import { profile } from "@/content/profile";

export function About() {
  return (
    <section id="about" className="bg-background py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
        <div className="flex justify-center lg:justify-start">
          <div className="-rotate-3 rounded-sm bg-surface p-3 pb-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex aspect-[4/5] w-64 items-center justify-center bg-muted sm:w-80">
              <ImageIcon className="h-12 w-12 text-muted-foreground" aria-hidden />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent">
            <span className="inline-block h-2.5 w-2.5 rotate-45 bg-accent" aria-hidden />
            About me
          </div>

          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            a little about myself
          </h2>

          <div className="mt-8 space-y-6">
            {profile.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-lg leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          <p className="mt-8 font-script text-4xl text-accent">{profile.name}.</p>
        </div>
      </div>
    </section>
  );
}
