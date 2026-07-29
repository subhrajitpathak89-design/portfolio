import { cn } from "@/lib/utils";

type PlaceholderImageProps = {
  seed: string;
  label: string;
  caption?: string;
  className?: string;
};

function hash(value: string) {
  let result = 0;
  for (let i = 0; i < value.length; i += 1) {
    result = (result * 31 + value.charCodeAt(i)) % 100000;
  }
  return result;
}

function wrap(text: string, maxChars: number) {
  const lines: string[] = [];
  let current = "";
  for (const word of text.split(" ")) {
    if (!current) {
      current = word;
    } else if (`${current} ${word}`.length <= maxChars) {
      current = `${current} ${word}`;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 3);
}

export function PlaceholderImage({ seed, label, caption, className }: PlaceholderImageProps) {
  const seedValue = hash(seed);
  const hue = seedValue % 360;
  const hueShift = (hue + 42 + (seedValue % 40)) % 360;
  const gradientId = `ph-gradient-${seed}`;
  const gridId = `ph-grid-${seed}`;
  const lines = wrap(label, 16);
  const startY = 356 - (lines.length - 1) * 40;

  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${label} placeholder artwork`}
      className={cn("h-full w-full", className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={`hsl(${hue} 62% 58%)`} />
          <stop offset="55%" stopColor={`hsl(${hueShift} 58% 44%)`} />
          <stop offset="100%" stopColor={`hsl(${hueShift} 52% 26%)`} />
        </linearGradient>
        <pattern id={gridId} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="800" height="500" fill={`url(#${gradientId})`} />
      <rect width="800" height="500" fill={`url(#${gridId})`} />
      <circle
        cx={120 + (seedValue % 560)}
        cy={90 + (seedValue % 160)}
        r={150 + (seedValue % 90)}
        fill="rgba(255,255,255,0.10)"
      />
      <text
        x="400"
        y={startY}
        textAnchor="middle"
        fill="#ffffff"
        fontSize="46"
        fontWeight="600"
        letterSpacing="-0.5"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        {lines.map((line, index) => (
          <tspan key={line} x="400" dy={index === 0 ? 0 : 54}>
            {line}
          </tspan>
        ))}
      </text>
      {caption ? (
        <text
          x="400"
          y={startY + (lines.length - 1) * 54 + 46}
          textAnchor="middle"
          fill="rgba(255,255,255,0.78)"
          fontSize="20"
          letterSpacing="3"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          {caption.toUpperCase()}
        </text>
      ) : null}
    </svg>
  );
}
