import Image from "next/image";
import { SiDribbble, SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import type { IconType } from "react-icons";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";

const SOCIAL_ICONS: Record<string, IconType> = {
  github: SiGithub,
  linkedin: FaLinkedin,
  dribbble: SiDribbble,
};

export function Contact() {
  const year = new Date().getFullYear();

  return (
    <section id="contact" className="bg-background pb-4">
      <div className="relative mx-4 mb-4 overflow-hidden rounded-[2rem] sm:mx-8 lg:mx-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg-gradient.png"
            alt=""
            fill
            className="object-cover"
            style={{ transform: "scaleY(-1)" }}
          />
        </div>

        <div className="relative px-6 pb-8 pt-20 sm:px-12 sm:pt-28">
          <Reveal>
            <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-7xl">
              let&apos;s <span className="font-script font-normal">create</span>
              <br />
              incredible work together.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16 flex flex-col gap-10 border-t border-white/20 pt-8 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-white/60">
                  Email
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-2 block text-lg font-semibold text-white hover:underline"
                >
                  {profile.email}
                </a>
              </div>

              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-white/60">
                  Social
                </p>
                <div className="mt-3 flex gap-3">
                  {profile.socials.map((social) => {
                    const Icon = SOCIAL_ICONS[social.platform];
                    return (
                      <a
                        key={social.platform}
                        href={social.href}
                        aria-label={social.label}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-900 transition-transform duration-200 hover:-translate-y-0.5"
                      >
                        {Icon ? <Icon className="h-4 w-4" aria-hidden /> : null}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>

          <p className="mt-10 text-sm text-white/50">
            © {year} {profile.name}
          </p>

          <div className="relative -mx-6 mt-6 -mb-6 select-none overflow-hidden sm:-mx-12 sm:-mb-10">
            <p className="whitespace-nowrap text-center font-display text-[16vw] font-bold leading-none text-white/20">
              {profile.name.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
