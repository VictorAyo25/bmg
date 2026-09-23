/**
 * A cooling load profile over twenty four hours. Training's device.
 *
 * This is the thing the training actually teaches. A building's cooling load
 * is not one number, it is several components that each peak at a different
 * hour, and the job is knowing when they add up. Size for the sum of the
 * peaks and you have oversized the plant; size for the peak of the sum and
 * you have not.
 *
 * Stacked from the bottom: fabric, ventilation, internal gains, solar.
 *
 * The shapes carry the only claims here, and they are the uncontroversial
 * ones. Solar through glazing is zero overnight and peaks around the middle
 * of the day. Internal gains switch on and off with occupancy rather than
 * ramping. Ventilation follows outdoor temperature, so it lags solar by a
 * couple of hours. Fabric lags furthest, because heat conducted into a heavy
 * envelope arrives hours after the sun that drove it, which is why the total
 * peaks mid afternoon rather than at noon. There are no numbers on it, so it
 * asserts timing and nothing else.
 *
 * Cost is four filled paths, five stroked outlines and two CSS animations.
 */

const W = 1440;

/*
 * Kept shallow on purpose. The graphic is stretched to whatever height it is
 * given, and a tall frame squashed into a band flattens the afternoon peak
 * into a bump. At this height a band barely distorts it, and the taller
 * placement stretches it a little, which only makes the peak clearer.
 */
const H = 360;

/** Hours are plotted left to right across the full width. */
const HOURS = 24;

function bell(h: number, peak: number, spread: number) {
  return Math.exp(-Math.pow((h - peak) / spread, 2));
}

/** A soft on and off, rather than a ramp: people arrive and they leave. */
function occupancy(h: number) {
  const on = 1 / (1 + Math.exp(-(h - 7.6) * 2.2));
  const off = 1 / (1 + Math.exp(-(h - 18.2) * 2.2));
  return on - off;
}

const LAYERS = [
  { at: (h: number) => 5 + 11 * bell(h, 17.2, 5.4), fill: 0.07 },
  { at: (h: number) => 3 + 13 * bell(h, 15.3, 5.2), fill: 0.1 },
  { at: (h: number) => 19 * occupancy(h), fill: 0.14 },
  { at: (h: number) => 27 * bell(h, 13, 3.1), fill: 0.19 },
];

const STEPS = 144;

function build() {
  // Cumulative totals at every step, so each layer sits on the one below it.
  const xs: number[] = [];
  const stacks: number[][] = [];
  for (let i = 0; i <= STEPS; i++) {
    const h = (i / STEPS) * HOURS;
    xs.push((i / STEPS) * W);
    let running = 0;
    const column: number[] = [0];
    for (const layer of LAYERS) {
      running += Math.max(0, layer.at(h));
      column.push(running);
    }
    stacks.push(column);
  }

  const peak = Math.max(...stacks.map((c) => c[c.length - 1]));
  const baseline = H - 22;
  const scale = (baseline - 36) / peak;
  const y = (v: number) => baseline - v * scale;

  const edge = (level: number) =>
    "M" +
    xs
      .map((x, i) => `${x.toFixed(1)},${y(stacks[i][level]).toFixed(1)}`)
      .join(" L");

  const areas = LAYERS.map((layer, l) => {
    const top = xs.map(
      (x, i) => `${x.toFixed(1)},${y(stacks[i][l + 1]).toFixed(1)}`,
    );
    const bottom = xs
      .map((x, i) => `${x.toFixed(1)},${y(stacks[i][l]).toFixed(1)}`)
      .reverse();
    return {
      d: `M${top.join(" L")} L${bottom.join(" L")} Z`,
      fill: layer.fill,
      // The boundary of this layer, which is where its own highlight runs.
      edge: edge(l + 1),
    };
  });

  return { areas, outline: edge(LAYERS.length), baseline };
}

const { areas, outline, baseline } = build();

export function LoadProfile({
  className = "",
  stroke = "#097ccd",
}: {
  className?: string;
  stroke?: string;
}) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none ${className}`}
      viewBox={`0 0 ${W} ${H}`}
      /*
       * Stretched, not sliced. Slicing cropped the afternoon peak straight off
       * the top of a short band, which loses the one thing the graphic exists
       * to show. A stacked profile stretched vertically is still that profile,
       * and the full twenty four hours stays in frame at any height. Strokes
       * are held constant so the stretch never thickens a line.
       */
      preserveAspectRatio="none"
      fill="none"
    >
      {/* Three hourly marks. Unlabelled: they give rhythm, not readings. */}
      {Array.from({ length: HOURS / 3 + 1 }, (_, i) => {
        const x = (i / (HOURS / 3)) * W;
        return (
          <line
            key={i}
            x1={x}
            y1={18}
            x2={x}
            y2={baseline}
            stroke={stroke}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            opacity={0.08}
          />
        );
      })}

      {areas.map((a, i) => (
        <path key={`a${i}`} d={a.d} fill={stroke} opacity={a.fill} />
      ))}

      {/*
       * Each component's own boundary, with a highlight running along it. The
       * four of them travel at different speeds, so the eye picks out that
       * these are separate loads arriving at separate times rather than one
       * shaded hill.
       */}
      {areas.map((a, i) => (
        <g key={`e${i}`}>
          <path
            d={a.edge}
            stroke={stroke}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            opacity={0.22}
          />
          <path
            d={a.edge}
            stroke={stroke}
            strokeWidth={1.8}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            opacity={0.5}
            pathLength={100}
            strokeDasharray="6 44"
            className="air-flow"
            style={{ animationDuration: `${17 - i * 2.4}s` }}
          />
        </g>
      ))}

      <line
        x1={0}
        y1={baseline}
        x2={W}
        y2={baseline}
        stroke={stroke}
        strokeWidth={1.25}
        vectorEffect="non-scaling-stroke"
        opacity={0.3}
      />

      {/* The total, and a highlight running the whole day along it. */}
      <path
        d={outline}
        stroke={stroke}
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
        opacity={0.5}
      />
      <path
        d={outline}
        stroke={stroke}
        strokeWidth={2.6}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        opacity={0.85}
        pathLength={100}
        strokeDasharray="9 91"
        className="trace-100"
        style={{ animationDuration: "15s" }}
      />

      {/* The hour under consideration, crossing the day. */}
      <g className="load-sweep">
        <line
          x1={0}
          y1={18}
          x2={0}
          y2={baseline}
          stroke={stroke}
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
          opacity={0.45}
        />
      </g>
    </svg>
  );
}
