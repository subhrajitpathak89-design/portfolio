"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Pause, Play, Star } from "lucide-react";
import { music } from "@/content/music";

/**
 * Record player card. The disc spins and the tonearm drops onto the record
 * while audio is playing.
 *
 * Playing state is read from the audio element's own events rather than
 * toggled optimistically, so the visuals can never claim to be playing when
 * they are not — a failed play(), a track ending, or the user pausing from
 * their OS media keys all settle the disc correctly.
 */
export function VinylPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const hasTrack = Boolean(music.src);

  useEffect(() => {
    const element = audioRef.current;
    if (!element) return;

    const onPlay = () => setPlaying(true);
    const onStop = () => setPlaying(false);

    element.addEventListener("play", onPlay);
    element.addEventListener("pause", onStop);
    element.addEventListener("ended", onStop);

    return () => {
      element.removeEventListener("play", onPlay);
      element.removeEventListener("pause", onStop);
      element.removeEventListener("ended", onStop);
    };
  }, []);

  const toggle = () => {
    const element = audioRef.current;
    if (!element) return;

    if (element.paused) {
      // Autoplay policies and missing files both reject here; the `pause`/
      // `play` listeners keep state honest either way.
      void element.play().catch(() => setPlaying(false));
    } else {
      element.pause();
    }
  };

  return (
    <div className="w-[248px] rounded-[1.75rem] bg-gradient-to-b from-neutral-100 to-neutral-300 p-4 shadow-[0_20px_44px_-18px_rgba(17,17,17,0.5)]">
      <button
        type="button"
        onClick={toggle}
        disabled={!hasTrack}
        aria-pressed={playing}
        aria-label={
          hasTrack
            ? `${playing ? "Pause" : "Play"} ${music.title}`
            : `${music.title} — no track loaded yet`
        }
        className="group relative block aspect-square w-full rounded-xl disabled:cursor-default"
      >
        {/* Record. Grooves are a repeating radial gradient rather than dozens
            of circles, so they stay crisp at any size. */}
        <div
          className={`absolute inset-[6%] rounded-full ${playing ? "animate-v2-spin" : ""}`}
          style={{
            backgroundImage:
              "repeating-radial-gradient(circle at 50% 50%, #141414 0 3px, #1f1f1f 3px 4px)",
          }}
        >
          <div className="absolute inset-[30%] rounded-full bg-v2-green" />
          <div className="absolute inset-[45%] rounded-full bg-neutral-200" />

          {/* Stickers stuck to the disc, so they ride the spin. */}
          <span className="absolute left-[14%] top-[46%] flex size-6 items-center justify-center rounded-md bg-v2-pink text-white">
            <Heart aria-hidden className="size-3" fill="currentColor" strokeWidth={0} />
          </span>
          <span className="absolute right-[16%] top-[20%] flex size-6 items-center justify-center rounded-md bg-v2-orange text-white">
            <Star aria-hidden className="size-3" fill="currentColor" strokeWidth={0} />
          </span>
          <span className="absolute left-[24%] top-[20%] h-4 w-12 -rotate-12 rounded-sm bg-v2-lime" />
        </div>

        {/* Tonearm: pivots from its top-right mount and swings onto the record
            while playing. */}
        <div className="absolute right-0 top-0 size-[26%]">
          <div className="absolute right-0 top-0 size-full rounded-full bg-neutral-300 shadow-inner" />
          <div
            className="absolute right-[42%] top-[42%] h-[150%] w-[7px] origin-top rounded-full bg-neutral-800 transition-transform duration-700 ease-out"
            style={{ transform: `rotate(${playing ? 28 : 52}deg)` }}
          >
            <span className="absolute -bottom-1 -left-[5px] size-[17px] rotate-45 rounded-[3px] bg-neutral-900" />
          </div>
        </div>

        {/* Play affordance, centred over the spindle. */}
        <span className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-v2-ink/80 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          {playing ? (
            <Pause aria-hidden className="size-4" fill="currentColor" strokeWidth={0} />
          ) : (
            <Play aria-hidden className="size-4" fill="currentColor" strokeWidth={0} />
          )}
        </span>
      </button>

      <div className="mt-4 px-1 pb-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
          {hasTrack ? music.label : "No track loaded"}
        </p>
        <p className="mt-1 font-grotesk text-base font-black leading-tight text-neutral-900">
          {music.title}
        </p>
      </div>

      {music.src && (
        <audio ref={audioRef} src={music.src} preload="none" loop />
      )}
    </div>
  );
}
