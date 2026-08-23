/**
 * Hand-drawn marks for the v2 sections. All are inline SVG rather than image
 * files so they inherit colour from the palette tokens and stay crisp at the
 * large sizes the collage uses.
 */

/** Big organic splat that sits behind the About collage. */
export function Blob({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 560" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M243 8c34-14 62 14 66 49 3 27-8 52-4 78 5 30 33 40 60 33 30-8 55-32 86-27 33 5 51 40 41 72-9 30-39 45-64 61-22 14-45 29-51 55-6 27 11 51 12 78 2 34-20 68-54 73-32 5-59-19-86-36-24-15-49-28-77-24-30 4-53 27-82 33-33 7-68-14-76-47-8-31 12-59 27-86 13-24 26-50 20-77-6-28-31-45-42-71-13-30-6-70 22-87 26-16 57-4 86 1 26 4 53 5 73-12 22-18 24-49 26-76 2-31 12-64 41-77Z"
      />
    </svg>
  );
}

/**
 * Sticker of two hands forming a heart. The hands are read as two mirrored
 * blobs with thumb/finger notches, and the heart is the gap between them —
 * outlined so it survives at sticker scale.
 */
export function HeartHandsSticker({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 130" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M22 34c-9 6-14 18-13 30 1 16 9 30 20 41 12 12 27 20 43 24 5 1 11 1 16 0 16-4 31-12 43-24 11-11 19-25 20-41 1-12-4-24-13-30-9-6-21-4-28 4-5 5-8 12-10 19-2-7-5-14-10-19-7-8-19-10-28-4-9-6-21-4-28 4-5 5-8 12-10 19-2-7-5-14-10-19-7-8-19-10-28-4Z"
      />
      <path
        d="M80 96c-11-3-21-9-29-17-8-8-13-18-14-28-1-8 3-16 9-20 6-4 14-3 19 3 4 4 6 9 8 15l7 22 7-22c2-6 4-11 8-15 5-6 13-7 19-3 6 4 10 12 9 20-1 10-6 20-14 28-8 8-18 14-29 17Z"
        fill="none"
        stroke="var(--v2-cream)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Loose double-loop underline that runs beneath the serif headline line. */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 60" className={className} aria-hidden>
      <path
        d="M8 30c60-22 140-26 210-14 42 7 82 21 124 25 38 4 76-3 112-15 34-11 70-21 106-16 26 4 50 18 62 41-30-16-66-14-98-4-40 12-78 32-120 36-38 4-75-7-112-16"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Three short speed-lines used as a small accent near the collage. */
export function SpeedLines({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M6 46C10 34 18 24 30 18" />
        <path d="M20 52C24 42 30 34 40 29" />
        <path d="M36 56C39 49 44 43 52 39" />
      </g>
    </svg>
  );
}

/** Spiky comic burst, used as the backing shape for sticker labels. */
export function Burst({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 104" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M60 2l11 17 19-11-4 21 21 3-13 15 17 12-21 7 7 19-20-7-6 19-12-17-17 10 1-20-21-5 14-14L2 51l20-7-6-18 20 6z"
      />
    </svg>
  );
}

/** Simple round smiley sticker. */
export function Smiley({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="20" r="19" fill="currentColor" />
      <circle cx="20" cy="20" r="19" fill="none" stroke="var(--v2-ink)" strokeWidth="1.6" />
      <ellipse cx="14" cy="16" rx="2.1" ry="3" fill="var(--v2-ink)" />
      <ellipse cx="26" cy="16" rx="2.1" ry="3" fill="var(--v2-ink)" />
      <path
        d="M12 25c2 3.6 4.8 5.3 8 5.3s6-1.7 8-5.3"
        fill="none"
        stroke="var(--v2-ink)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
