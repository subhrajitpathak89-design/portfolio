import type { IconType } from "react-icons";
import { FaDribbble, FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { Burst, HeartHandsSticker, Smiley } from "@/components/ui/Doodles";
import { VinylPlayer } from "@/components/ui/VinylPlayer";
import { profile } from "@/content/profile";

const SOCIAL_ICONS: Record<string, IconType> = {
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  dribbble: FaDribbble,
  github: FaGithub,
};

export function Footer() {
  const firstName = profile.name.split(" ")[0];
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    profile.location
  )}`;

  return (
    <footer id="contact" className="bg-v2-cream px-2 pb-2 sm:px-4 sm:pb-4">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-v2-periwinkle px-6 pt-12 sm:px-10 lg:px-14 lg:pt-16">
        <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_auto] xl:gap-8">
          {/* The reference is an agency hiring people; this is one designer
              looking for work, so the columns are flipped to answer what a
              visitor here would actually be asking. */}
          <Column label="open to work">
            <p className="footer-value">{profile.availability}</p>
          </Column>

          <Column label="based in">
            <p className="footer-value">{profile.location}</p>
            <a
              href={mapsHref}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 inline-block border-b-2 border-white/50 pb-0.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-white"
            >
              Google Maps
            </a>
          </Column>

          <Column label="say hello">
            <a
              href={`mailto:${profile.email}`}
              className="footer-value block break-all hover:underline"
            >
              {profile.email}
            </a>

            <ul className="mt-5 flex items-center gap-2.5">
              {/* An unset href is a link that goes nowhere, which reads worse than
                  no icon at all — so an entry only renders once it has a real URL. */}
              {profile.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform];
                if (!Icon || !social.href || social.href === "#") return null;

                return (
                  <li key={social.platform}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={social.label}
                      className="flex size-9 items-center justify-center rounded-lg bg-white/20 text-white transition-colors duration-200 hover:bg-white hover:text-v2-periwinkle"
                    >
                      <Icon aria-hidden className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </Column>

          <div className="sm:col-span-2 xl:col-span-1 xl:justify-self-end">
            <VinylPlayer />
          </div>
        </div>

        <Wordmark firstName={firstName} />

        <span className="absolute bottom-3 right-3 rounded bg-v2-ink px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white">
          credits
        </span>
      </div>
    </footer>
  );
}

function Column({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold text-v2-ink">
        {label}
      </span>
      <div className="mt-4">{children}</div>
    </div>
  );
}

/**
 * Oversized signature across the foot of the panel, with stickers slapped over
 * it. The negative bottom margin lets the descenders run past the panel edge —
 * the panel's `overflow-hidden` does the cropping, which is what stops it
 * reading as text that merely happens to be large.
 */
function Wordmark({ firstName }: { firstName: string }) {
  return (
    <div className="relative mt-14 lg:mt-20" aria-hidden>
      <p className="-mb-[5vw] select-none whitespace-nowrap text-center font-script text-[26vw] leading-[0.72] text-v2-cream">
        {firstName}
      </p>

      <Smiley className="absolute left-[16%] top-[6%] w-[7vw] max-w-[76px] text-[#9ec9ff]" />

      <HeartHandsSticker className="absolute left-[46%] top-[38%] w-[9vw] max-w-[96px] rotate-[6deg] text-v2-forest" />

      <StickerLabel
        className="absolute left-[4%] top-[46%] w-[11vw] max-w-[116px] -rotate-[12deg] text-v2-orange"
        text="bam"
      />

      <StickerLabel
        className="absolute right-[16%] top-[2%] w-[11vw] max-w-[116px] rotate-[10deg] text-v2-pink"
        text="100"
      />
    </div>
  );
}

function StickerLabel({ className, text }: { className?: string; text: string }) {
  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <Burst className="w-full" />
      <span className="absolute font-grotesk text-[2.6vw] font-black uppercase leading-none tracking-tight text-white [font-size:min(2.6vw,28px)]">
        {text}
      </span>
    </span>
  );
}
