import type { Metadata } from "next";
import type { IconType } from "react-icons";
import { ArrowUpRight } from "lucide-react";
import { RiOpenaiFill } from "react-icons/ri";
import { SiBlender, SiClaude, SiFigma, SiFramer, SiNextdotjs, SiNotion, SiTailwindcss } from "react-icons/si";
import { profile } from "@/content/profile";
import { favouriteTools, resourceCards, resourceGroups } from "@/content/resources";

export const metadata: Metadata = {
  title: "Resources",
  description: "Templates, tools and books I use as a product designer.",
};

const TOOL_ICONS: Record<(typeof favouriteTools)[number], { Icon: IconType; label: string }> = {
  figma: { Icon: SiFigma, label: "Figma" },
  framer: { Icon: SiFramer, label: "Framer" },
  claude: { Icon: SiClaude, label: "Claude" },
  chatgpt: { Icon: RiOpenaiFill, label: "ChatGPT" },
  notion: { Icon: SiNotion, label: "Notion" },
  blender: { Icon: SiBlender, label: "Blender" },
  nextjs: { Icon: SiNextdotjs, label: "Next.js" },
  tailwind: { Icon: SiTailwindcss, label: "Tailwind CSS" },
};

/** An external link when there is an href, plain block otherwise. */
function MaybeLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  if (!href) return <div className={className}>{children}</div>;
  return (
    <a href={href} target="_blank" rel="noreferrer noopener" className={`group ${className}`}>
      {children}
    </a>
  );
}

export default function ResourcesPage() {
  return (
    <main className="min-h-svh bg-v3-bg">
      <div className="v3-column px-5 pb-24 pt-28 sm:px-10 lg:px-16 lg:pb-32 lg:pt-9">
        <h1 className="font-hero-serif text-[clamp(2rem,4vw,2.75rem)] font-light tracking-[-0.02em] text-v3-fg">
          Resources
        </h1>

        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {resourceCards.map((card) => (
            <li key={card.title}>
              <MaybeLink
                href={card.href}
                className="flex aspect-[4/5] flex-col justify-between rounded-2xl border border-v3-line bg-v3-surface p-5 transition-colors hover:border-v3-muted/50"
              >
                <h2 className="font-hero-serif text-xl font-light leading-snug tracking-[-0.01em] text-v3-fg">
                  {card.title}
                </h2>
                <p className="text-[13px] leading-relaxed text-v3-muted">{card.note}</p>
              </MaybeLink>
            </li>
          ))}
        </ul>

        <h2 className="mt-20 font-hero-serif text-[clamp(1.75rem,3vw,2.25rem)] font-light tracking-[-0.02em] text-v3-fg">
          Favourite tools
        </h2>
        {/* A dock of app icons. */}
        <ul className="mt-6 inline-flex flex-wrap gap-2 rounded-2xl border border-v3-line bg-v3-surface p-2">
          {favouriteTools.map((key) => {
            const { Icon, label } = TOOL_ICONS[key];
            return (
              <li key={key}>
                <span
                  title={label}
                  className="flex size-12 items-center justify-center rounded-xl border border-v3-line bg-v3-bg text-v3-fg transition-transform duration-200 hover:-translate-y-1"
                >
                  <Icon aria-hidden className="size-6" />
                  <span className="sr-only">{label}</span>
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-20 flex flex-col gap-16">
          {resourceGroups.map((group) => (
            <section key={group.heading}>
              <h2 className="font-hero-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-light tracking-[-0.015em] text-v3-fg">
                {group.heading}
              </h2>
              <ul className="mt-5 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
                {group.items.map((item) => (
                  <li key={item.title}>
                    <MaybeLink href={item.href} className="block">
                      <p className="inline-flex items-center gap-1 font-grotesk text-[15px] font-medium text-v3-fg">
                        {item.title}
                        {item.href && (
                          <ArrowUpRight
                            aria-hidden
                            className="size-3.5 text-v3-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        )}
                      </p>
                      <p className="mt-1 text-[14px] leading-relaxed text-v3-muted">{item.note}</p>
                    </MaybeLink>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-24 border-t border-v3-line pt-8">
          <p className="font-hero-serif text-xl font-light text-v3-fg">Couldn&apos;t find what you need?</p>
          <p className="mt-1 text-[14px] text-v3-muted">
            Tell me what would help:{" "}
            <a
              href={`mailto:${profile.email}?subject=Resource%20suggestion`}
              className="text-v3-fg underline decoration-v3-line underline-offset-4"
            >
              suggest a resource
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
