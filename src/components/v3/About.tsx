import { ArrowUpRight } from "lucide-react";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";

/** "Techdome Solutions Pvt. Limited" reads as "Techdome" in a row this large. */
const shortCompany = (company: string) =>
  company.replace(/\s+(Solutions|Design Studio|Pvt\.?|Limited|Ltd\.?).*$/i, "");

/**
 * About as a "where I've been" list: a short note on the left, a large
 * two-line serif heading on the right, then one ruled row per role —
 * company large in the serif, role in the middle, dates on the right.
 */
export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 bg-v3-bg">
      <div className="v3-column px-5 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="flex flex-col-reverse gap-10 md:flex-row md:items-start md:justify-between">
          <p data-reveal-item className="max-w-[30ch] text-[15px] leading-snug text-v3-muted">
            Based in <span className="text-v3-fg">{profile.location}</span>.{" "}
            {profile.availability}.
          </p>

          <h2
            data-reveal-item
            style={{ "--reveal-delay": 1 } as React.CSSProperties}
            className="font-editorial-display text-[clamp(3rem,7vw,5.5rem)] font-light leading-[0.95] tracking-[-0.03em] text-v3-fg md:text-right"
          >
            <span className="block">Where</span>
            <span className="block">I&rsquo;ve been</span>
          </h2>
        </div>

        <ol className="mt-16 lg:mt-24" data-reveal-item>
          {experience.map((job) => (
            <li
              key={job.company}
              className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 border-b border-v3-line py-8 md:grid-cols-[1.2fr_1fr_auto] md:py-10"
            >
              <h3 className="font-editorial-display text-[clamp(2rem,3.6vw,3rem)] font-light leading-none tracking-[-0.02em] text-v3-fg">
                {shortCompany(job.company)}
              </h3>
              <p className="order-3 col-span-2 text-[15px] text-v3-muted md:order-none md:col-span-1">
                {job.role}
              </p>
              <p className="text-right text-[15px] text-v3-muted">{job.period}</p>
            </li>
          ))}
        </ol>

        <a
          href={profile.resume}
          target="_blank"
          rel="noreferrer noopener"
          className="group mt-10 inline-flex items-center gap-1.5 text-[15px] text-v3-fg underline decoration-v3-line underline-offset-4 transition-colors duration-200 hover:decoration-v3-fg"
        >
          View resume
          <ArrowUpRight
            aria-hidden
            className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.75}
          />
        </a>
      </div>
    </section>
  );
}
