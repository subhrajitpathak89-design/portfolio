/**
 * A product flow, drawn as a graph rather than a row of boxes.
 *
 * The thing a flow has to show is where it *branches* — one screen leading to
 * four, a step that everything must pass through. A horizontal strip of boxes
 * joined by arrows cannot say that, so this lays nodes out in columns and joins
 * them with rounded orthogonal connectors, with the path that matters drawn in
 * the accent and dotted at its junctions.
 *
 * Nodes are real HTML positioned over an SVG connector layer, not SVG text.
 * That keeps them on the site's own type and lets them inherit the card
 * styling; it costs an explicit width per column, which is a fair trade for
 * text that is actually legible and selectable.
 *
 * Geometry is fixed in pixels and the whole thing scrolls inside its own
 * container on narrow screens. Scaling it down to fit 375px instead would make
 * the labels unreadable, which defeats the point of drawing it.
 */

type Variant = "default" | "accent" | "gate";

type FlowNodeSpec = {
  label: string;
  variant?: Variant;
  /** Small line under the label — a count, a state, a qualifier. */
  note?: string;
};

export type FlowColumn = {
  nodes: FlowNodeSpec[];
  /** Column width in px. Set it wide enough for the longest label in it. */
  width: number;
};

/** `[column, row]` — an address into `columns`. */
type Ref = [number, number];

export type FlowEdge = {
  from: Ref;
  to: Ref;
  accent?: boolean;
  /**
   * Routes the edge below the diagram instead of between the columns — for a
   * loop back to an earlier step, which is otherwise drawn straight through
   * everything in between.
   */
  loop?: boolean;
};

const NODE_H = 46;
const V_GAP = 16;
const H_GAP = 60;
/** Corner radius on the connector elbows. */
const R = 12;

/**
 * Line colour for the live path.
 *
 * The project's raw brand rather than `--v3-accent`: the accent is deepened for
 * type contrast and reads almost black as a 1.25px stroke, where a flow wants a
 * legible blue. Strokes are graphics, not text, so the lighter value is the
 * right one here and still clears 3:1 on the page ground.
 */
const BRAND = "var(--v3-brand, #434ce6)";

type Placed = FlowNodeSpec & { x: number; y: number; w: number };

function layout(columns: FlowColumn[], gap: number) {
  let x = 0;
  const spans = columns.map((column) => {
    const at = x;
    x += column.width + gap;
    return at;
  });

  const height = Math.max(
    ...columns.map((c) => c.nodes.length * NODE_H + (c.nodes.length - 1) * V_GAP)
  );

  const placed: Placed[][] = columns.map((column, index) => {
    const own = column.nodes.length * NODE_H + (column.nodes.length - 1) * V_GAP;
    const top = (height - own) / 2;
    return column.nodes.map((node, row) => ({
      ...node,
      x: spans[index],
      y: top + row * (NODE_H + V_GAP),
      w: column.width,
    }));
  });

  return { placed, width: x - gap, height };
}

/**
 * Right edge of `a` to left edge of `b`, as an orthogonal path with rounded
 * corners: out, turn, across, turn, in. A same-row edge is a straight line.
 */
function connector(a: Placed, b: Placed) {
  const x1 = a.x + a.w;
  const y1 = a.y + NODE_H / 2;
  const x2 = b.x;
  const y2 = b.y + NODE_H / 2;

  if (Math.abs(y1 - y2) < 0.5) return `M${x1},${y1} H${x2}`;

  const mid = x1 + (x2 - x1) / 2;
  const dir = y2 > y1 ? 1 : -1;
  // Never let a corner radius exceed the room available for it.
  const r = Math.min(R, Math.abs(y2 - y1) / 2, Math.abs(mid - x1), Math.abs(x2 - mid));

  return [
    `M${x1},${y1}`,
    `H${mid - r}`,
    `Q${mid},${y1} ${mid},${y1 + dir * r}`,
    `V${y2 - dir * r}`,
    `Q${mid},${y2} ${mid + r},${y2}`,
    `H${x2}`,
  ].join(" ");
}

/** A return edge, routed under the diagram so it crosses nothing. */
function loopConnector(a: Placed, b: Placed, floor: number) {
  const x1 = a.x + a.w / 2;
  const y1 = a.y + NODE_H;
  const x2 = b.x + b.w / 2;
  const y2 = b.y + NODE_H;
  const drop = floor + 26;

  return [
    `M${x1},${y1}`,
    `V${drop - R}`,
    `Q${x1},${drop} ${x1 - R},${drop}`,
    `H${x2 + R}`,
    `Q${x2},${drop} ${x2},${drop - R}`,
    `V${y2}`,
  ].join(" ");
}

export function FlowDiagram({
  columns,
  edges,
  label,
  caption,
  gap = H_GAP,
}: {
  columns: FlowColumn[];
  edges: FlowEdge[];
  /** Names the flow, and becomes the accessible name of the whole figure. */
  label: string;
  caption?: string;
  /**
   * Horizontal space between columns. Tighten it on a wide flow so the whole
   * graph fits the reading column instead of needing to be scrolled — a flow
   * you cannot see the end of is not doing its job.
   */
  gap?: number;
}) {
  const { placed, width, height } = layout(columns, gap);
  const at = ([c, r]: Ref) => placed[c][r];

  const hasLoop = edges.some((e) => e.loop);
  const padBottom = hasLoop ? 48 : 0;

  return (
    <figure data-reveal-item className="mt-8">
      <figcaption className="mb-5 flex items-center gap-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-v3-accent">
        <span aria-hidden className="size-1.5 rounded-[2px] bg-v3-accent" />
        {label}
      </figcaption>

      {/* Scrolls rather than shrinks — see the file header. */}
      <div className="-mx-5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
        <div
          className="relative"
          style={{ width, height: height + padBottom, minWidth: width }}
        >
          <svg
            width={width}
            height={height + padBottom}
            viewBox={`0 0 ${width} ${height + padBottom}`}
            className="absolute inset-0 overflow-visible"
            aria-hidden
          >
            {edges.map((edge, index) => {
              const a = at(edge.from);
              const b = at(edge.to);
              const d = edge.loop
                ? loopConnector(a, b, height)
                : connector(a, b);

              return (
                <g key={index}>
                  <path
                    d={d}
                    fill="none"
                    strokeWidth={1.25}
                    stroke={edge.accent ? BRAND : undefined}
                    className={edge.accent ? undefined : "stroke-v3-line"}
                    strokeDasharray={edge.loop ? "3 4" : undefined}
                  />
                  {/* Junction dots, on the live path only — they are what
                      makes the route legible at a glance. */}
                  {edge.accent && !edge.loop && (
                    <>
                      <circle cx={a.x + a.w} cy={a.y + NODE_H / 2} r={3} fill={BRAND} />
                      <circle cx={b.x} cy={b.y + NODE_H / 2} r={3} fill={BRAND} />
                    </>
                  )}
                </g>
              );
            })}
          </svg>

          {placed.flat().map((node) => (
            <div
              key={node.label + node.x + node.y}
              style={{ left: node.x, top: node.y, width: node.w, height: NODE_H }}
              /* Every node carries the same card, so the route reads through
                 the lines rather than through six kinds of border. `accent`
                 only darkens the label; `gate` is the one node allowed to
                 fill, because it is the one step nothing may skip. */
              className={`absolute flex flex-col items-center justify-center rounded-[10px] px-3 text-center shadow-sm ${
                node.variant === "gate"
                  ? "bg-v3-accent text-v3-bg"
                  : node.variant === "accent"
                    ? "border border-v3-line bg-v3-surface text-v3-fg"
                    : "border border-v3-line bg-v3-surface text-v3-muted"
              }`}
            >
              <span className="font-grotesk text-[13px] font-medium leading-tight tracking-[-0.01em]">
                {node.label}
              </span>
              {node.note && (
                <span
                  className={`mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] ${
                    node.variant === "gate" ? "text-v3-bg/70" : "text-v3-muted/70"
                  }`}
                >
                  {node.note}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {caption && (
        <p className="mt-4 max-w-[46rem] text-sm leading-relaxed text-v3-muted">
          {caption}
        </p>
      )}

      {/* The diagram is decorative to a screen reader; this is the content. */}
      <ol className="sr-only">
        {edges
          .filter((e) => !e.loop)
          .map((edge, index) => (
            <li key={index}>
              {at(edge.from).label} leads to {at(edge.to).label}
            </li>
          ))}
      </ol>
    </figure>
  );
}
