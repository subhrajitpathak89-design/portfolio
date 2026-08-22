"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type StackCardProps = {
  children: ReactNode;
  index: number;
  isLast: boolean;
};

export function StackCard({ children, index, isLast }: StackCardProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 18%", "end 18%"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.78, 1], [1, 1, isLast ? 1 : 0.93]);
  const y = useTransform(scrollYProgress, [0, 0.78, 1], [0, 0, isLast ? 0 : -24]);
  const opacity = useTransform(scrollYProgress, [0, 0.88, 1], [1, 1, isLast ? 1 : 0.72]);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[112svh] pb-8 sm:min-h-[118svh] sm:pb-10"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        className="sticky top-20 sm:top-24"
        style={{
          scale: shouldReduceMotion ? 1 : scale,
          y: shouldReduceMotion ? 0 : y,
          opacity: shouldReduceMotion ? 1 : opacity,
          transformOrigin: "center top",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">{children}</div>
      </motion.div>
    </div>
  );
}
