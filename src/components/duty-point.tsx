/**
 * Fan curve, system curves, duty point. Consultancy's device.
 *
 * A fan does not have a flow rate. It has a curve, and where that curve
 * crosses the resistance of the ductwork is the only place the system can
 * actually sit. Close a damper and the system curve steepens, the crossing
 * slides up and to the left, and the fan delivers less air at a higher
 * pressure whether anyone intended that or not. Finding where a building
 * really sits, rather than where the schedule says it does, is the work this
 * page is selling.
 *
 * Everything here is computed rather than drawn by eye:
 *
 *   fan:     p = 1 - 0.15q - 0.85q^2      falling, with the usual droop
 *   system:  p = kq^2                     resistance rises with the square
 *
 * and the duty point is the real root of kq^2 = 1 - 0.15q - 0.85q^2, which is
 * the positive solution of (k + 0.85)q^2 + 0.15q - 1 = 0. Each marker sits on
 * that intersection because it was solved for, so no marker can drift off its
 * own curve. Axes carry no numbers, so the graphic asserts the shape of the
 * relationship and nothing more.
 *
 * UNLIKE THE OTHER DEVICES, THIS ONE KEEPS ITS PROPORTIONS. The first version
 * stretched to fill a full width band, and the system curves flattened into
 * straight rays from the origin, which is precisely the wrong reading for a
 * picture whose whole point is that resistance rises with the square of flow.
 * A stacked profile survives being stretched. A family of curves does not. So
 * the frame is chart shaped, it scales uniformly, and the page gives it a
 * chart sized place to sit rather than a whole band to smear across.
 */

const W = 760;
const H = 430;

const PAD = { left: 62, right: 46, top: 34, bottom: 46 };
const PLOT = { w: W - PAD.left - PAD.right, h: H - PAD.top - PAD.bottom };

const x = (q: number) => PAD.left + q * PLOT.w;
const y = (p: number) => PAD.top + (1 - p) * PLOT.h;

const fanPressure = (q: number) => 1 - 0.15 * q - 0.85 * q * q;

/** The positive root of kq^2 = 1 - 0.15q - 0.85q^2. */
function duty(k: number) {
  const a = k + 0.85;
  const q = (-0.15 + Math.sqrt(0.15 * 0.15 + 4 * a)) / (2 * a);
  return { q, p: fanPressure(q) };
}

function curve(at: (q: number) => number, from = 0, to = 1) {
  const points: string[] = [];
  for (let i = 0; i <= 80; i++) {
    const q = from + ((to - from) * i) / 80;
    points.push(`${x(q).toFixed(1)},${y(at(q)).toFixed(1)}`);
  }
  return "M" + points.join(" L");
}

const FAN = curve(fanPressure);

/** Damper wide open through to nearly shut. */
const RESISTANCES = [0.42, 0.66, 1.0, 1.55, 2.5, 4.2];

const SYSTEMS = RESISTANCES.map((k, i) => {
  const d = duty(k);
  return {
    // Drawn a little past the crossing, so the curves read as continuing.
    d: curve((q) => k * q * q, 0, Math.min(1, d.q * 1.14)),
    point: d,
    opacity: 0.3 - i * 0.03,
    seconds: 9 + i * 1.6,
  };
});

export function DutyPoint({
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
      /* Uniform, so the curves keep the shape that is the entire point. */
      preserveAspectRatio="xMidYMid meet"
      fill="none"
    >
      {/* Axes. Flow across, pressure up, no numbers on either. */}
      <line
        x1={PAD.left}
        y1={PAD.top - 14}
        x2={PAD.left}
        y2={y(0)}
        stroke={stroke}
        strokeWidth={1.25}
        opacity={0.28}
      />
      <line
        x1={PAD.left}
        y1={y(0)}
        x2={x(1) + 20}
        y2={y(0)}
        stroke={stroke}
        strokeWidth={1.25}
        opacity={0.28}
      />

      {SYSTEMS.map((s, i) => (
        <g key={i}>
          <path d={s.d} stroke={stroke} strokeWidth={1.3} opacity={s.opacity} />
          {/* Resistance building along the run. */}
          <path
            d={s.d}
            stroke={stroke}
            strokeWidth={2}
            strokeLinecap="round"
            opacity={s.opacity + 0.3}
            pathLength={100}
            strokeDasharray="7 43"
            className="air-flow"
            style={{ animationDuration: `${s.seconds}s` }}
          />
        </g>
      ))}

      {/* The fan curve, the one fixed thing in the picture. */}
      <path d={FAN} stroke={stroke} strokeWidth={2.4} opacity={0.6} />

      {/* Every place this fan could be made to sit. */}
      {SYSTEMS.map((s, i) => (
        <circle
          key={i}
          cx={x(s.point.q)}
          cy={y(s.point.p)}
          r={4}
          fill={stroke}
          opacity={0.5}
        />
      ))}

      {/* Where it is sitting now, travelling the length of the curve. */}
      <path
        d={FAN}
        stroke={stroke}
        strokeWidth={9}
        strokeLinecap="round"
        opacity={0.9}
        pathLength={100}
        strokeDasharray="0.55 99.45"
        className="trace-100"
        style={{ animationDuration: "11s" }}
      />
    </svg>
  );
}
