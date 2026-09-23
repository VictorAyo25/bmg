/**
 * CANDIDATE for the Projects band. Not yet approved.
 *
 * Static pressure falling along a duct run. It leaves the fan at its highest
 * and arrives at the last terminal with just enough left to push air through
 * the grille. What happens in between is the entire argument for calculating
 * rather than guessing.
 *
 * The shape of the fall is the only claim, and it is the uncontentious one:
 * straight duct loses pressure gradually and steadily, while fittings, coils
 * and filters take it in steps. A bend costs more than the metre of duct
 * either side of it. That is why the line is a staircase with slopes rather
 * than a diagonal, and why the steep parts are short.
 *
 * Reading downhill left to right is not decoration either. It is the one
 * direction the air can go.
 */

const W = 1440;
const H = 300;

const TOP = 34;
const BASE = H - 30;

/**
 * Each entry is a stretch of the run: how far it goes, and how much pressure
 * it costs. Straight runs are long and cheap, fittings are short and dear.
 */
const RUN: { len: number; drop: number; step: boolean }[] = [
  { len: 150, drop: 0.04, step: false },
  { len: 26, drop: 0.16, step: true }, // filter
  { len: 175, drop: 0.05, step: false },
  { len: 26, drop: 0.11, step: true }, // coil
  { len: 210, drop: 0.06, step: false },
  { len: 24, drop: 0.08, step: true }, // bend
  { len: 235, drop: 0.07, step: false },
  { len: 24, drop: 0.07, step: true }, // branch takeoff
  { len: 250, drop: 0.06, step: false },
  { len: 24, drop: 0.09, step: true }, // damper
  { len: 296, drop: 0.05, step: false },
];

function build() {
  const spanX = RUN.reduce((a, s) => a + s.len, 0);
  const totalDrop = RUN.reduce((a, s) => a + s.drop, 0);

  const points: string[] = [];
  const marks: number[] = [];
  let x = 0;
  let p = 1;

  const px = (v: number) => (v / spanX) * W;
  const py = (v: number) => BASE - v * (BASE - TOP);

  points.push(`${px(x).toFixed(1)},${py(p).toFixed(1)}`);

  for (const seg of RUN) {
    const steps = seg.step ? 8 : 18;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      /*
       * A fitting loses its pressure over a very short length, so the curve
       * is eased rather than a vertical cliff. A straight run loses it evenly.
       */
      const shape = seg.step ? (1 - Math.cos(t * Math.PI)) / 2 : t;
      points.push(
        `${px(x + seg.len * t).toFixed(1)},${py(p - (seg.drop / totalDrop) * shape).toFixed(1)}`,
      );
    }
    x += seg.len;
    p -= seg.drop / totalDrop;
    if (seg.step) marks.push(px(x - seg.len / 2));
  }

  const line = "M" + points.join(" L");
  return {
    line,
    area: `${line} L${W},${BASE} L0,${BASE} Z`,
    marks,
  };
}

const { line, area, marks } = build();

export function PressureDrop({
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
      preserveAspectRatio="none"
      fill="none"
    >
      {/* Where the run loses pressure in a step rather than a slope. */}
      {marks.map((x, i) => (
        <line
          key={i}
          x1={x}
          y1={TOP - 10}
          x2={x}
          y2={BASE}
          stroke={stroke}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          opacity={0.16}
        />
      ))}

      <path d={area} fill={stroke} opacity={0.09} />

      <line
        x1={0}
        y1={BASE}
        x2={W}
        y2={BASE}
        stroke={stroke}
        strokeWidth={1.25}
        vectorEffect="non-scaling-stroke"
        opacity={0.3}
      />

      <path
        d={line}
        stroke={stroke}
        strokeWidth={2.2}
        vectorEffect="non-scaling-stroke"
        opacity={0.5}
      />
      <path
        d={line}
        stroke={stroke}
        strokeWidth={2.8}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        opacity={0.85}
        pathLength={100}
        strokeDasharray="10 40"
        className="air-flow"
        style={{ animationDuration: "9s" }}
      />

      {/* One marker running the whole length, the way the air does. */}
      <path
        d={line}
        stroke={stroke}
        strokeWidth={8}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        opacity={0.9}
        pathLength={100}
        strokeDasharray="0.6 99.4"
        className="trace-100"
        style={{ animationDuration: "13s" }}
      />
    </svg>
  );
}
