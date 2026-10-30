/**
 * A Figma-style multiplayer cursor: the arrow plus a name tag in the same
 * colour. Purely decorative; it drifts on a CSS loop set by `variant`
 * (see `.v3-cursor-*` in globals.css).
 */
export function FigmaCursor({
  name,
  color,
  variant,
  className = "",
}: {
  name: string;
  color: string;
  variant: "a" | "b";
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`v3-cursor-${variant} pointer-events-none absolute z-10 select-none ${className}`}
    >
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
        <path
          d="M1 1L16.5 9.2L9.4 10.6L5.6 18.6L1 1Z"
          fill={color}
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="ml-3.5 -mt-0.5 inline-block whitespace-nowrap rounded-full rounded-tl-sm px-2 py-0.5 font-grotesk text-[12px] font-medium text-white"
        style={{ background: color }}
      >
        {name}
      </span>
    </div>
  );
}
