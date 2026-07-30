"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const GREETINGS = [
  "Hi",
  "Hola",
  "Bonjour",
  "Ciao",
  "Hallo",
  "Olá",
  "Namaste",
  "Konnichiwa",
  "Ni Hao",
  "Annyeong",
  "Salaam",
  "Merhaba",
];

export function Preloader() {
  const [done, setDone] = useState(false);
  const [display, setDisplay] = useState(0);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, { duration: 1800, bounce: 0 });
  const rounded = useTransform(smoothProgress, (v) => Math.round(v));

  useEffect(() => {
    document.body.style.overflow = "hidden";
    progress.set(100);

    const unsubscribe = rounded.on("change", (v) => setDisplay(v));

    const greetingInterval = setInterval(() => {
      setGreetingIndex((i) => (i + 1) % GREETINGS.length);
    }, 160);

    const timeout = setTimeout(() => {
      setDone(true);
      document.body.style.overflow = "";
    }, 2000);

    return () => {
      unsubscribe();
      clearInterval(greetingInterval);
      clearTimeout(timeout);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="font-script text-5xl text-foreground sm:text-7xl">
              {GREETINGS[greetingIndex]}
            </span>
            <span className="font-display text-3xl font-semibold tabular-nums text-foreground sm:text-4xl">
              {display}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
