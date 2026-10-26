import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";

/** The picture on the right of the card. Unset shows a placeholder. */
const CTA_IMAGE: string | null = "/images/v3/cta-art.webp";

/**
 * The contact call to action: a green card with the ask on the left and the
 * artwork inset on the right. Its own section so it can sit wherever the page
 * wants to end on something to do — currently straight after the playground.
 */
export function ContactCta() {
  return (
    <section className="relative bg-v3-bg">
      <div className="v3-column px-5 py-16 sm:px-10 lg:px-16 lg:py-20">
          {/* What I want next, where I am, how to reach me — as one call to
              action. A coloured card with the ask on the left and a picture
              inset on the right, so the section ends on something to do rather
              than a row of facts. */}
          <div data-reveal-item className="group/glow relative isolate">
            {/* A soft glow that blooms behind the card on hover, in the
                artwork's own greens and pink. Blurred heavily so it reads as
                light spilling off the card rather than a shape. */}
            <span aria-hidden className="v3-glow">
              <span className="bg-[linear-gradient(135deg,#1f7f47,#0e4a29)]" />
              {CTA_IMAGE && (
                <Image src={CTA_IMAGE} alt="" fill sizes="20rem" className="!left-1/2 !w-1/2" />
              )}
            </span>
          <div
            className="relative grid gap-3 rounded-[1.75rem] bg-[linear-gradient(135deg,#1f7f47,#0e4a29)] p-3 text-white shadow-[0_24px_60px_-28px_rgba(14,74,41,0.75)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          >
            <div className="flex flex-col justify-between gap-10 p-5 sm:p-7">
              <div>
                <p className="flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/70">
                  <span aria-hidden className="size-1.5 rounded-full bg-[#f6a5b8] shadow-[0_0_0_4px_rgba(246,165,184,0.22)]" />
                  Available now
                </p>
                <h3 className="mt-5 font-editorial-display text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.02em]">
                  Let&apos;s build something clear together.
                </h3>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/75">
                  {profile.availability}. Based in {profile.location}.
                </p>
              </div>
  
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                {/* Opens a Gmail compose window addressed to me, in a new tab.
                    A plain `mailto:` does nothing on a machine with no mail app
                    set up, which is most laptops now; the address beside this
                    stays a `mailto:` for anyone who does have one. */}
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent("Hello Subhrajit")}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-grotesk text-[14px] font-medium text-[#0e4a29] transition-colors duration-200 hover:bg-white/90"
                >
                  Get in touch
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="break-all text-sm text-white/75 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline"
                >
                  {profile.email}
                </a>
              </div>
            </div>
  
            {/* The picture slot. Set CTA_IMAGE to a file under `public/` and it
                fills the panel; until then the panel holds a placeholder. */}
            <div className="relative min-h-64 overflow-hidden rounded-[1.25rem] bg-[#1f8a4c] lg:min-h-80">
              {CTA_IMAGE ? (
                <Image
                  src={CTA_IMAGE}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40rem, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-3 grid place-items-center rounded-xl border border-dashed border-white/30 text-center">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/60">
                    Image coming soon
                  </p>
                </div>
              )}
            </div>
          </div>
          </div>
      </div>
    </section>
  );
}
