"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { revealClass, useInView } from "@/lib/useInView";
import { cn } from "@/lib/utils";

const disciplines = ["Product", "Brand", "Motion", "Editorial", "Systems"];

export function Hero() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="home" className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[32rem] w-[32rem] rounded-full bg-accent/10 blur-3xl"
      />
      <Container className="relative py-20 sm:py-28 lg:py-36">
        <div
          ref={ref}
          className={cn(
            "grid gap-14 transition-all duration-700 ease-out lg:grid-cols-[1.15fr_0.85fr] lg:items-center",
            revealClass(inView),
          )}
        >
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {profile.availability}
            </p>

            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              {profile.name}
              <span className="text-accent">.</span>
              <span className="mt-2 block text-2xl font-normal text-muted-foreground sm:text-3xl lg:text-4xl">
                {profile.role}
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {profile.tagline}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/#work"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-all duration-200 hover:opacity-90"
              >
                View selected work
                <ArrowDown
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
                  aria-hidden
                />
              </Link>
              <Link
                href="/#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent/40 hover:text-accent"
              >
                Get in touch
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </Link>
            </div>

            <p className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" aria-hidden />
              {profile.location}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Disciplines
            </p>
            <ul className="mt-6 flex flex-col divide-y divide-border">
              {disciplines.map((discipline, index) => (
                <li
                  key={discipline}
                  className="group flex items-baseline justify-between py-3 font-display text-xl font-medium text-foreground transition-colors duration-200 hover:text-accent"
                >
                  {discipline}
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
              <div>
                <p className="font-display text-3xl font-semibold text-foreground">
                  {projects.length}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Case studies
                </p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold text-foreground">8+</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Years practising
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
