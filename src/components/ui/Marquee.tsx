import { Fragment, type ReactNode } from "react";

type MarqueeProps = {
  /** One repeating unit of the ticker. */
  children: ReactNode;
  /** How many units make up a single copy of the track. */
  repeat?: number;
  /** Scroll right instead of left. */
  reverse?: boolean;
  /** Seconds for one full loop — larger is slower. */
  duration?: number;
  className?: string;
};

/**
 * Pure-CSS infinite ticker. No JS and no measurement: the track renders two
 * identical copies of its content and slides exactly -50%, so it lands on the
 * start of the second copy and repeats without a visible seam.
 *
 * IMPORTANT — `repeat` must make one copy at least as wide as the widest
 * viewport this will run on. At the loop point the second copy alone has to
 * fill the frame; if it is narrower, the track runs out and a gap opens at the
 * trailing edge. The seam looks perfect at every other moment, which is what
 * makes this easy to miss. Sized here for ultrawide (~3440px).
 *
 * The whole thing is decorative repetition, so it is hidden from assistive
 * tech — the section's real heading carries the meaning.
 */
export function Marquee({
  children,
  repeat = 8,
  reverse = false,
  duration = 24,
  className = "",
}: MarqueeProps) {
  const copy = (
    <div className="flex shrink-0 items-stretch">
      {Array.from({ length: repeat }, (_, index) => (
        <Fragment key={index}>{children}</Fragment>
      ))}
    </div>
  );

  return (
    <div aria-hidden className={`flex overflow-hidden ${className}`}>
      <div
        className="animate-v2-marquee flex w-max items-stretch"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {copy}
        {copy}
      </div>
    </div>
  );
}
