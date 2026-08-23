"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cherry, Crown, Diamond, Heart, Sparkle, Star, Zap } from "lucide-react";
import { useMediaQuery } from "@/lib/useMediaQuery";

const SYMBOLS = [Star, Cherry, Zap, Heart, Diamond, Crown, Sparkle];

/** All three reels land here, so the sequence always pays out. */
const JACKPOT = 0;

const REEL_COUNT = 3;
const SPIN_TICK_MS = 90;

/**
 * Reels stop one at a time. Landing them together would read as a spinner
 * stopping; the stagger is what makes it a jackpot.
 */
const LOCK_AT_MS = [700, 1050, 1400];
const FINISH_MS = 1850;

/** Reduced motion skips straight to the payout. */
const REDUCED_FINISH_MS = 350;

export function Preloader() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const duration = reducedMotion ? REDUCED_FINISH_MS : FINISH_MS;

  // Elapsed time is the only state. Reel symbols, which reels have locked and
  // the progress bar are all derived from it during render — so there is no
  // second source of truth to fall out of sync, and the effect never has to
  // re-run to pick up a changed value.
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // `html` is the scrolling element on this page, so locking `body` alone —
    // which is what this did before — left the page scrollable behind the
    // overlay. Both have to be set.
    //
    // Caveat: Lenis drives scrolling programmatically, and `overflow: hidden`
    // does not stop a scripted scroll. This blocks native wheel and touch
    // input, which is what a reader would actually reach for during a two
    // second hold.
    const setLock = (value: string) => {
      document.documentElement.style.overflow = value;
      document.body.style.overflow = value;
    };

    setLock("hidden");

    const startedAt = Date.now();
    const ticker = setInterval(() => setElapsed(Date.now() - startedAt), 40);
    const finish = setTimeout(() => {
      setDone(true);
      setLock("");
    }, duration);

    return () => {
      clearInterval(ticker);
      clearTimeout(finish);
      setLock("");
    };
  }, [duration]);

  const progress = Math.min(100, Math.round((elapsed / duration) * 100));

  const reels = Array.from({ length: REEL_COUNT }, (_, index) => {
    const isLocked = reducedMotion || elapsed >= LOCK_AT_MS[index];
    return {
      locked: isLocked,
      // Offsetting by the reel index keeps the three from spinning in unison.
      symbol: isLocked
        ? JACKPOT
        : (Math.floor(elapsed / SPIN_TICK_MS) + index) % SYMBOLS.length,
    };
  });

  const allLocked = reels.every((reel) => reel.locked);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-v2-ink px-6"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Cabinet */}
          <div className="w-full max-w-sm rounded-[1.75rem] bg-[#1c2a18] p-5 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)] sm:p-7">
            {/* Screen. Scanlines are a repeating gradient rather than an image,
                so they stay crisp at any size. */}
            <div
              className="relative overflow-hidden rounded-2xl p-6 text-center shadow-[inset_0_0_40px_rgba(0,0,0,0.35)] sm:p-8"
              style={{
                backgroundColor: "#8ce028",
                backgroundImage:
                  "repeating-linear-gradient(to bottom, rgba(0,0,0,0.09) 0 2px, transparent 2px 5px)",
              }}
            >
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#16350a] sm:text-xs">
                Let&rsquo;s play a game
              </p>

              <ul className="mt-6 flex items-center justify-center gap-3 sm:gap-4">
                {reels.map((reel, index) => {
                  const Symbol = SYMBOLS[reel.symbol];

                  return (
                    <li
                      key={index}
                      className={`flex size-14 items-center justify-center rounded-lg border-2 transition-colors duration-200 sm:size-16 ${
                        reel.locked
                          ? "border-[#16350a] bg-[#16350a] text-[#8ce028]"
                          : "border-[#16350a]/30 bg-[#16350a]/10 text-[#16350a]"
                      }`}
                    >
                      <Symbol
                        aria-hidden
                        className="size-7 sm:size-8"
                        fill="currentColor"
                        strokeWidth={1.5}
                      />
                    </li>
                  );
                })}
              </ul>

              <p className="mt-6 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#16350a] transition-opacity duration-300 sm:text-xs">
                {allLocked ? "Jackpot — loading" : "Spinning"}
              </p>

              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#16350a]/20">
                <div
                  className="h-full rounded-full bg-[#16350a] transition-[width] duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="mt-2 font-mono text-[10px] font-bold tabular-nums text-[#16350a]/70">
                {progress}%
              </p>
            </div>

            {/* Cabinet buttons, purely decorative. */}
            <div className="mt-5 flex items-center justify-center gap-3" aria-hidden>
              <span className="size-3 rounded-full bg-v2-orange" />
              <span className="size-3 rounded-full bg-v2-yellow" />
              <span className="size-3 rounded-full bg-v2-pink" />
            </div>
          </div>

          <span className="sr-only" role="status">
            Loading
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
