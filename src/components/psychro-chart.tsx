/**
 * Psychrometric chart, with a real air conditioning process plotted on it.
 *
 * Why this chart: it is the single most recognisable image in HVAC design,
 * and it is the tool cooling load calculation is actually done on, which is
 * the first module BMG teaches. An engineer reads it instantly.
 *
 * Why it can be trusted: nothing here is drawn by hand. Every curve is
 * computed from the standard relations below, so unlike a sketched schematic
 * it cannot be subtly wrong in a way that embarrasses the firm.
 *
 *   Saturation vapour pressure, Magnus form, T in degrees C, result in Pa:
 *     pws(T) = 610.94 * exp(17.625 * T / (T + 243.04))
 *
 *   Humidity ratio at relative humidity phi, total pressure P:
 *     W = 0.62198 * phi * pws / (P - phi * pws)        kg per kg dry air
 *
 *   P is 101325 Pa, standard sea level, which suits a coastal city.
 *
 * The process is a textbook cooling and dehumidifying cycle:
 *   RA  room air          24 C, 50 percent
 *   OA  outside air       33 C, 65 percent, a hot humid design day
 *   MA  mixed air         25 percent outside air, so it lies on the RA to OA
 *                         line, a quarter of the way from RA
 *   SA  supply air        13 C, 95 percent, leaving the cooling coil
 *
 * MA to SA is the coil, cooling and wringing moisture out. SA to RA is the
 * room, picking up sensible heat and a little moisture. Supply air is drier
 * than room air, which is what a dehumidifying coil should produce. The
 * travelling marker follows that loop.
 */

const P = 101325;
const pws = (t: number) => 610.94 * Math.exp((17.625 * t) / (t + 243.04));
/** Humidity ratio in grams per kilogram of dry air. */
const w = (t: number, rh: number) => {
  const pw = rh * pws(t);
  return (0.62198 * pw * 1000) / (P - pw);
};

// Plot frame, in SVG user units.
const T_MAX = 45;
const W_MAX = 30;
const X0 = 44;
const X1 = 548;
const Y0 = 356;
const Y1 = 26;
const x = (t: number) => X0 + (t / T_MAX) * (X1 - X0);
const y = (g: number) => Y0 - (g / W_MAX) * (Y0 - Y1);

/** A constant humidity curve, clipped where it leaves the top of the chart. */
function rhPath(rh: number) {
  const pts: string[] = [];
  for (let t = 0; t <= T_MAX + 0.001; t += 0.5) {
    const g = w(t, rh);
    if (g > W_MAX) break;
    pts.push(`${x(t).toFixed(1)},${y(g).toFixed(1)}`);
  }
  return "M" + pts.join(" L");
}

/**
 * Where a curve ends, and which edge it leaves by, for placing its label.
 *
 * Decided by why the curve stopped, not by how close its last point is to the
 * top. Humidity ratio climbs steeply near saturation, so a curve can leave the
 * top with its last plotted point several units below the edge.
 */
function rhEnd(rh: number) {
  let t = 0;
  while (t + 0.5 <= T_MAX && w(t + 0.5, rh) <= W_MAX) t += 0.5;
  return { x: x(t), y: y(w(t, rh)), exitsTop: t + 0.5 <= T_MAX };
}

const RA = { t: 24, g: w(24, 0.5) };
const OA = { t: 33, g: w(33, 0.65) };
const MA = { t: RA.t + 0.25 * (OA.t - RA.t), g: RA.g + 0.25 * (OA.g - RA.g) };
const SA = { t: 13, g: w(13, 0.95) };

const at = (p: { t: number; g: number }) => ({ cx: x(p.t), cy: y(p.g) });
const pt = (p: { t: number; g: number }) =>
  `${x(p.t).toFixed(1)},${y(p.g).toFixed(1)}`;

/** The air loop the marker travels: mixed, through the coil, through the room. */
const LOOP = `M${pt(MA)} L${pt(SA)} L${pt(RA)} L${pt(MA)}`;

const RH_LINES = [0.2, 0.4, 0.6, 0.8];

export function PsychroChart({
  className = "",
  line = "currentColor",
  accent = "#7cc4f5",
}: {
  className?: string;
  line?: string;
  accent?: string;
}) {
  return (
    <svg
      viewBox="0 0 610 400"
      className={className}
      fill="none"
      role="img"
      aria-label="Psychrometric chart showing a cooling and dehumidifying process: outside and room air mix, pass through the cooling coil to become cold dry supply air, and warm up in the room before returning."
    >
      {/* Grid and frame */}
      <g stroke={line} strokeWidth={1} opacity={0.14}>
        {[10, 20, 30, 40].map((t) => (
          <line key={`t${t}`} x1={x(t)} y1={Y0} x2={x(t)} y2={Y1} />
        ))}
        {[10, 20].map((g) => (
          <line key={`g${g}`} x1={X0} y1={y(g)} x2={X1} y2={y(g)} />
        ))}
      </g>
      <path
        d={`M${X0},${Y1} L${X0},${Y0} L${X1},${Y0} L${X1},${Y1}`}
        stroke={line}
        strokeWidth={1}
        opacity={0.4}
        className="psy-draw"
        pathLength={1}
        style={{ ["--d" as string]: "0ms" }}
      />

      {/* Constant relative humidity, lightest first */}
      {RH_LINES.map((rh, i) => (
        <path
          key={rh}
          d={rhPath(rh)}
          stroke={line}
          strokeWidth={1}
          opacity={0.32}
          className="psy-draw"
          pathLength={1}
          style={{ ["--d" as string]: `${250 + i * 110}ms` }}
        />
      ))}

      {/* Saturation, the 100 percent line, and the heaviest on the chart */}
      <path
        d={rhPath(1)}
        stroke={line}
        strokeWidth={1.8}
        opacity={0.85}
        className="psy-draw"
        pathLength={1}
        style={{ ["--d" as string]: "700ms" }}
      />

      {/* The process. Mixing line, then the coil, then the room. */}
      <g stroke={accent} strokeWidth={2} strokeLinecap="round">
        <path
          d={`M${pt(RA)} L${pt(OA)}`}
          strokeDasharray="3 5"
          opacity={0.7}
          className="psy-fade"
          style={{ ["--d" as string]: "1300ms" }}
        />
        <path
          d={`M${pt(MA)} L${pt(SA)}`}
          className="psy-draw"
          pathLength={1}
          style={{ ["--d" as string]: "1500ms" }}
        />
        <path
          d={`M${pt(SA)} L${pt(RA)}`}
          className="psy-draw"
          pathLength={1}
          style={{ ["--d" as string]: "1850ms" }}
        />
      </g>

      {/* State points */}
      <g className="psy-fade" style={{ ["--d" as string]: "2100ms" }}>
        {[
          { p: OA, k: "OA", dx: 10, dy: -8 },
          { p: MA, k: "MA", dx: 10, dy: -8 },
          { p: RA, k: "RA", dx: 10, dy: 16 },
          { p: SA, k: "SA", dx: -30, dy: -8 },
        ].map(({ p, k, dx, dy }) => (
          <g key={k}>
            <circle {...at(p)} r={4.5} fill={accent} />
            <text
              x={at(p).cx + dx}
              y={at(p).cy + dy}
              fill={accent}
              fontSize={13}
              fontWeight={700}
              fontFamily="var(--font-sans), sans-serif"
            >
              {k}
            </text>
          </g>
        ))}
      </g>

      {/* Air moving round the cycle. Hidden under reduced motion. */}
      <circle r={5} fill="#fff" className="psy-dot">
        <animateMotion
          dur="7s"
          repeatCount="indefinite"
          rotate="auto"
          path={LOOP}
        />
      </circle>

      {/* Relative humidity labels, at the end of each curve */}
      <g
        fill={line}
        opacity={0.5}
        fontSize={11}
        fontFamily="var(--font-mono), monospace"
        className="psy-fade"
        style={{ ["--d" as string]: "900ms" }}
      >
        {[...RH_LINES, 1].map((rh) => {
          const e = rhEnd(rh);
          return e.exitsTop ? (
            <text key={rh} x={e.x} y={Y1 - 8} textAnchor="middle">
              {Math.round(rh * 100)}%
            </text>
          ) : (
            <text key={rh} x={X1 - 6} y={e.y - 7} textAnchor="end">
              {Math.round(rh * 100)}%
            </text>
          );
        })}
      </g>

      {/* Axes */}
      <g
        fill={line}
        opacity={0.55}
        fontSize={11}
        fontFamily="var(--font-mono), monospace"
      >
        {[0, 10, 20, 30, 40].map((t) => (
          <text key={t} x={x(t) - 5} y={Y0 + 18}>
            {t}
          </text>
        ))}
        {[0, 10, 20, 30].map((g) => (
          <text key={g} x={X1 + 8} y={y(g) + 4}>
            {g}
          </text>
        ))}
        <text x={X0} y={Y0 + 38}>
          Dry bulb, °C
        </text>
        <text
          x={X1 + 34}
          y={(Y0 + Y1) / 2}
          textAnchor="middle"
          transform={`rotate(90 ${X1 + 34} ${(Y0 + Y1) / 2})`}
        >
          Humidity ratio, g/kg
        </text>
      </g>
    </svg>
  );
}
