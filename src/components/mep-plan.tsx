/**
 * MEP duct layout plan.
 *
 * Drawn the way a real Revit MEP plan is drawn: ducts as double lines with a
 * dashed centreline, tapered transitions where the size changes, terminals on
 * short runouts off the branch.
 *
 * THE ENGINEERING, so it can be checked rather than trusted:
 *
 *   1. Air path is a closed loop. Outside air enters the mixing box, mixes
 *      with return air, passes filter then cooling coil then supply fan, out
 *      to the supply trunk, through branches to the diffusers, back through
 *      the return grilles, along the return trunk, into the mixing box. The
 *      return connects to the unit. It does not stop in mid air.
 *   2. Draw through arrangement, filter before coil before fan, which is the
 *      normal order for a unit this size.
 *   3. The supply trunk REDUCES after each branch takeoff, because it is
 *      carrying less air downstream of each one.
 *   4. The return trunk GROWS toward the unit, for the same reason in
 *      reverse. It is collecting.
 *   5. Relief air is taken off the return main upstream of the mixing box,
 *      with a damper, so the building can relieve the outside air it takes in.
 *   6. Dampers are shown on outside air and relief, which is where the control
 *      dampers actually sit.
 *
 * If any of that is wrong for how BMG detail a system, it is wrong here on
 * purpose rather than by accident, and it is a small edit to correct.
 */

type Pt = { x: number; h: number };

/** Duct wall outline. Straight runs joined by tapered transition pieces. */
function ductWalls(pts: Pt[], axis: "h" | "v", centre: number) {
  const near = pts
    .map((p) =>
      axis === "h" ? `${p.x},${centre - p.h}` : `${centre - p.h},${p.x}`,
    )
    .join(" ");
  const far = pts
    .map((p) =>
      axis === "h" ? `${p.x},${centre + p.h}` : `${centre + p.h},${p.x}`,
    )
    .join(" ");
  return { near, far };
}

const SUPPLY_Y = 120;
const RETURN_Y = 400;
const BRANCHES = [270, 430, 600];

/** Supply trunk steps down after each takeoff. */
const SUPPLY: Pt[] = [
  { x: 180, h: 9 },
  { x: 300, h: 9 },
  { x: 320, h: 6.5 },
  { x: 490, h: 6.5 },
  { x: 510, h: 4.5 },
  { x: 730, h: 4.5 },
];

/** Return trunk steps up as it collects, travelling right to left. */
const RETURN: Pt[] = [
  { x: 540, h: 4.5 },
  { x: 400, h: 4.5 },
  { x: 380, h: 6.5 },
  { x: 240, h: 6.5 },
  { x: 220, h: 10 },
  { x: 55, h: 10 },
];

/**
 * Return grilles sit between the supply branches, never beneath them. Air has
 * to cross the space to get from a diffuser to a grille, which is the point of
 * the layout. Stacking them read as supply discharging into return.
 */
const RETURN_GRILLES = [520, 360, 200];

/** Half width of the return trunk at each grille, for the runout to meet. */
const RETURN_H: Record<number, number> = { 520: 4.5, 360: 6.5, 200: 10 };

const BRANCH_H = 4.5;
const BRANCH_END = 307;

function Diffuser({
  x,
  y,
  size = 26,
}: {
  x: number;
  y: number;
  size?: number;
}) {
  const r = size / 2;
  return (
    <g>
      <rect x={x - r} y={y - r} width={size} height={size} fill="none" />
      <line x1={x - r} y1={y - r} x2={x + r} y2={y + r} />
      <line x1={x + r} y1={y - r} x2={x - r} y2={y + r} />
    </g>
  );
}

/** Two lines across the duct, the plan symbol for a damper. */
function Damper({ x, y, w = 7 }: { x: number; y: number; w?: number }) {
  return (
    <g>
      <line x1={x - w} y1={y - 4} x2={x + w} y2={y + 4} />
      <line x1={x - w} y1={y + 4} x2={x + w} y2={y - 4} />
    </g>
  );
}

export function MepPlan({
  className = "",
  line = "currentColor",
  accent = "#5fb6fa",
  animate = true,
}: {
  className?: string;
  line?: string;
  accent?: string;
  animate?: boolean;
}) {
  const supply = ductWalls(SUPPLY, "h", SUPPLY_Y);
  const ret = ductWalls(RETURN, "h", RETURN_Y);

  const flow = animate ? "mep-flow" : undefined;

  return (
    <svg
      viewBox="0 0 800 500"
      className={className}
      fill="none"
      role="img"
      aria-label="Mechanical services plan showing an air handling unit, supply ductwork reducing along its run to ceiling diffusers, and return ductwork collecting back to the unit."
    >
      <g
        stroke={line}
        strokeWidth={1.1}
        strokeLinecap="square"
        vectorEffect="non-scaling-stroke"
      >
        {/* Floor plate and plant room */}
        <rect x={30} y={40} width={740} height={430} opacity={0.45} />
        <g opacity={0.3} strokeDasharray="5 5">
          <line x1={200} y1={40} x2={200} y2={210} />
          <line x1={30} y1={210} x2={200} y2={210} />
        </g>

        {/* Structural grid */}
        <g opacity={0.28}>
          {[190, 350, 510, 670].map((x) =>
            [150, 300, 440].map((y) => (
              <g key={`${x}-${y}`}>
                <line x1={x - 4} y1={y} x2={x + 4} y2={y} />
                <line x1={x} y1={y - 4} x2={x} y2={y + 4} />
              </g>
            )),
          )}
        </g>

        {/* Air handling unit. Mixing, filter, coil, fan, in that order. */}
        <rect x={60} y={80} width={120} height={80} />
        <g opacity={0.55}>
          <line x1={95} y1={80} x2={95} y2={160} />
          <line x1={120} y1={80} x2={120} y2={160} />
          <line x1={150} y1={80} x2={150} y2={160} />
        </g>
        {/* Filter, drawn as its media pleat */}
        <g opacity={0.6} strokeDasharray="3 3">
          <line x1={107} y1={84} x2={107} y2={156} />
        </g>
        {/* Cooling coil, drawn as its serpentine */}
        <path
          d="M126 88 h18 M126 100 h18 M126 112 h18 M126 124 h18 M126 136 h18 M126 148 h18"
          opacity={0.75}
        />
        {/* Supply fan */}
        <circle cx={165} cy={120} r={11} opacity={0.85} />
        <path d="M165 109 A11 11 0 0 1 176 120" opacity={0.85} />

        {/* Outside air, damper, into the mixing box */}
        <line x1={68} y1={40} x2={68} y2={80} />
        <line x1={82} y1={40} x2={82} y2={80} />
        <Damper x={75} y={58} />

        {/* Supply trunk */}
        <polyline points={supply.near} />
        <polyline points={supply.far} />
        <line x1={730} y1={SUPPLY_Y - 4.5} x2={730} y2={SUPPLY_Y + 4.5} />

        {/* Return trunk, elbow, and riser into the mixing box */}
        <polyline points={ret.near} />
        <polyline points={ret.far} />
        <line x1={540} y1={RETURN_Y - 4.5} x2={540} y2={RETURN_Y + 4.5} />
        <polyline points={`55,390 55,130 60,130`} />
        <polyline points={`35,410 35,110 60,110`} />

        {/* Relief air off the return main, damper, to the louvre */}
        <line x1={455.5} y1={404.5} x2={455.5} y2={455} />
        <line x1={464.5} y1={404.5} x2={464.5} y2={455} />
        <Damper x={460} y={432} w={5} />
        <line x1={448} y1={455} x2={472} y2={455} strokeWidth={2} />

        {/* Supply branches, diffusers on runouts, terminal diffuser */}
        {BRANCHES.map((bx) => (
          <g key={`s-${bx}`}>
            <line
              x1={bx - BRANCH_H}
              y1={SUPPLY_Y}
              x2={bx - BRANCH_H}
              y2={BRANCH_END}
            />
            <line
              x1={bx + BRANCH_H}
              y1={SUPPLY_Y}
              x2={bx + BRANCH_H}
              y2={BRANCH_END}
            />
            <line
              x1={bx - BRANCH_H}
              y1={BRANCH_END}
              x2={bx + BRANCH_H}
              y2={BRANCH_END}
            />

            <line x1={bx - BRANCH_H} y1={196} x2={bx - 43} y2={196} />
            <line x1={bx - BRANCH_H} y1={204} x2={bx - 43} y2={204} />
            <Diffuser x={bx - 56} y={200} />

            <line x1={bx + BRANCH_H} y1={256} x2={bx + 43} y2={256} />
            <line x1={bx + BRANCH_H} y1={264} x2={bx + 43} y2={264} />
            <Diffuser x={bx + 56} y={260} />

            <Diffuser x={bx} y={320} />
          </g>
        ))}

        {/* Return grilles on runouts up to the return trunk */}
        {RETURN_GRILLES.map((bx) => (
          <g key={`r-${bx}`}>
            <line
              x1={bx - BRANCH_H}
              y1={RETURN_Y - RETURN_H[bx]}
              x2={bx - BRANCH_H}
              y2={372}
            />
            <line
              x1={bx + BRANCH_H}
              y1={RETURN_Y - RETURN_H[bx]}
              x2={bx + BRANCH_H}
              y2={372}
            />
            <Diffuser x={bx} y={358} />
          </g>
        ))}
      </g>

      {/* Airflow. Supply travels away from the unit, return travels back. */}
      <g
        stroke={accent}
        strokeWidth={1.6}
        strokeDasharray="7 11"
        fill="none"
        opacity={0.95}
        vectorEffect="non-scaling-stroke"
      >
        <polyline className={flow} points={`180,${SUPPLY_Y} 730,${SUPPLY_Y}`} />
        {BRANCHES.map((bx) => (
          <polyline
            key={`fs-${bx}`}
            className={flow}
            points={`${bx},${SUPPLY_Y} ${bx},${BRANCH_END}`}
          />
        ))}
        <polyline
          className={flow}
          points={`540,${RETURN_Y} 45,${RETURN_Y} 45,120 60,120`}
        />
      </g>

      {/* Annotation */}
      <g
        fill={accent}
        fontFamily="var(--font-mono), monospace"
        fontSize={11}
        letterSpacing={1.6}
      >
        <text x={60} y={180}>
          AHU 01
        </text>
        <text x={94} y={62}>
          OA
        </text>
        <text x={476} y={436}>
          RELIEF
        </text>
      </g>
      <g
        fill={line}
        opacity={0.55}
        fontFamily="var(--font-mono), monospace"
        fontSize={10}
        letterSpacing={1.6}
      >
        <text x={640} y={110}>
          SUPPLY
        </text>
        <text x={640} y={390}>
          RETURN
        </text>
        <text x={30} y={488}>
          SCALE 1:100
        </text>
        <text x={686} y={488}>
          DWG 01
        </text>
      </g>
    </svg>
  );
}
