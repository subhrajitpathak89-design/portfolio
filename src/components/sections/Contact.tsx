"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { socialIcons } from "@/components/ui/SocialIcons";
import { profile } from "@/content/profile";
import { revealClass, useInView } from "@/lib/useInView";
import { cn } from "@/lib/utils";

export function Contact() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="contact" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Got something worth making?"
          description="Briefs, collaborations and long-shot ideas all welcome. Email is the fastest way to reach me."
        />

        <div
          ref={ref}
          className={cn(
            "mt-12 grid gap-6 transition-all duration-700 ease-out lg:grid-cols-[1.2fr_0.8fr]",
            revealClass(inView),
          )}
        >
          <a
            href={`mailto:${profile.email}`}
            className="group flex flex-col justify-between gap-8 rounded-2xl border border-border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 sm:p-10"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Mail className="h-5 w-5" aria-hidden />
            </span>
            <span>
              <span className="block text-sm uppercase tracking-[0.16em] text-muted-foreground">
                Email
              </span>
              <span className="mt-2 flex items-center gap-2 font-display text-2xl font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent sm:text-3xl">
                {profile.email}
                <ArrowUpRight
                  className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </span>
            </span>
          </a>

          <ul className="flex flex-col gap-3">
            {profile.socials.map((social) => {
              const Icon = socialIcons[social.platform];
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-200 group-hover:border-accent/40 group-hover:text-accent">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-foreground">
                        {social.label}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {social.handle}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="ml-auto h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      aria-hidden
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
