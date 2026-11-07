import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import portrait from "../../../public/images/v3/about/portrait.jpg";
import mountainRoad from "../../../public/images/v3/about/mountain-road.jpg";
import valley from "../../../public/images/v3/about/valley.jpg";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";

export const metadata: Metadata = {
  title: "About",
  description: profile.tagline,
};

const linkClass =
  "text-v3-fg underline decoration-v3-line underline-offset-4 transition-colors hover:decoration-v3-fg";

/**
 * About as one reading column: a photo, a greeting, the highlights as short
 * lines, then the longer story and where to find me.
 */
export default function AboutPage() {
  const socials = profile.socials.filter((s) => s.href && s.href !== "#");

  return (
    <main className="min-h-svh bg-v3-bg">
      <div className="mx-auto max-w-[640px] px-5 pb-24 pt-28 sm:px-10 lg:px-0 lg:pb-32 lg:pt-9">
        <Image
          src={portrait}
          alt="Subhrajit sitting on a stone wall by a river, prayer flags strung overhead"
          priority
          placeholder="blur"
          sizes="(min-width: 640px) 640px, 100vw"
          className="aspect-[16/9] w-full rounded-2xl object-cover"
        />

        <h1 className="mt-12 font-hero-serif text-[clamp(2rem,4vw,2.75rem)] font-light leading-tight tracking-[-0.02em] text-v3-fg">
          Hi! I&apos;m {profile.name}.
        </h1>

        <ul className="mt-6 flex flex-col gap-5">
          {experience.map((job) => (
            <li key={job.company}>
              <p className="font-grotesk text-[15px] font-medium text-v3-fg">
                {job.role} at {job.company.replace(/ Pvt\. Limited$/, "")}
              </p>
              <p className="mt-1 text-[14px] leading-relaxed text-v3-muted">
                {job.summary} <span className="whitespace-nowrap">· {job.period}</span>
              </p>
            </li>
          ))}
          <li>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1 font-grotesk text-[15px] font-medium text-v3-fg"
            >
              Read my resume
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <p className="mt-1 text-[14px] leading-relaxed text-v3-muted">{profile.roleLine}</p>
          </li>
        </ul>

        <h2 className="mt-16 font-hero-serif text-2xl font-light tracking-[-0.015em] text-v3-fg">My story</h2>
        <div className="mt-4 flex flex-col gap-4 text-[15px] leading-relaxed text-v3-muted">
          {profile.bio.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
          <p>
            Based in {profile.location}. {profile.availability}.
          </p>
          <p>To be continued :)</p>
        </div>

        {/* Away from the screen: two from the mountains. */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          {[
            { src: mountainRoad, alt: "A mountain road winding toward a snow-capped peak, a motorbike parked on the bend" },
            { src: valley, alt: "A forested Himalayan valley with snow on the far ridges" },
          ].map((photo) => (
            <Image
              key={photo.alt}
              src={photo.src}
              alt={photo.alt}
              placeholder="blur"
              sizes="(min-width: 640px) 320px, 50vw"
              className="aspect-[4/3] w-full rounded-xl object-cover"
            />
          ))}
        </div>

        <h2 className="mt-16 font-hero-serif text-2xl font-light tracking-[-0.015em] text-v3-fg">Find me online</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-v3-muted">
          You can find me on{" "}
          {socials.map((s, i) => (
            <span key={s.platform}>
              <a href={s.href} target="_blank" rel="noreferrer noopener" className={linkClass}>
                {s.label}
              </a>
              {i < socials.length - 1 ? ", " : ""}
            </span>
          ))}{" "}
          or just{" "}
          <a href={`mailto:${profile.email}`} className={linkClass}>
            email me
          </a>
          .
        </p>

        <p className="mt-16 font-hero-serif text-xl font-light text-v3-fg">Thanks for dropping by!</p>
        <Link
          href="/resources"
          className="mt-2 inline-flex items-center gap-1 text-[14px] text-v3-muted transition-colors hover:text-v3-fg"
        >
          I hope you find something useful in my resources
          <ArrowUpRight aria-hidden className="size-3.5" />
        </Link>
      </div>
    </main>
  );
}
