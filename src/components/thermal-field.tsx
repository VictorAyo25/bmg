/**
 * A thermal field: isotherms around heat sources.
 *
 * The home hero was a photograph blended to luminosity at 70 percent under a
 * heavy navy scrim, which is a reliable way to turn a picture into murk. It
 * had no structure and nothing moved in it worth watching. This replaces the
 * background it was serving as.
 *
 * Isotherms are the lines joining points at the same temperature, and around
 * a heat source in a room they nest: tight near the source, loose and lazy
 * further out. That nesting is the whole shape of the graphic. Rings are
 * denser and brighter close in, sparse and faint at the edge, which is the
 * one thing about a thermal map that has to be true for it to read as one.
 *
 * Each ring is a circle perturbed by three harmonics, and each turns at its
 * own speed with its neighbours turning against it. Nothing is morphing in
 * the code; the interference between counter-rotating irregular rings is what
 * makes the field look like it is slowly reorganising itself. It is much
 * cheaper than recomputing contours and it never repeats within a session,
 * because the periods do not divide into one another.
 *
 * The rings are drawn round and then squashed by the group above them, so the
 * rotation happens before the squash. Rotating an already flattened ellipse
 * reads as a spinning ellipse, which looks like a loading spinner. Rotating
 * first and flattening after reads as a shape changing.
 *
 * Abstract on purpose, like the rest of the background layer. There are no
 * numbers and no legend, so there is nothing here an engineer could mark
 * wrong.
 */

const W = 1440;
const H = 900;

/** A closed contour around the origin, drawn round; the caller squashes it. */
function contour(radius: number, seed: number) {
  const points: string[] = [];
  const steps = 60;
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const r =
      radius *
      (1 +
        0.17 * Math.sin(3 * t + seed) +
        0.1 * Math.sin(5 * t + seed * 1.7) +
        0.06 * Math.sin(2 * t - seed * 0.6));
    points.push(
      `${(r * Math.cos(t)).toFixed(1)},${(r * Math.sin(t)).toFixed(1)}`,
    );
  }
  return "M" + points.join(" L") + " Z";
}

type Source = {
  cx: number;
  cy: number;
  /** Vertical squash, so the field suits a wide frame. */
  flatten: number;
  rings: number;
  /** Tightest and loosest isotherm. */
  inner: number;
  outer: number;
  seed: number;
};

const SOURCES: Source[] = [
  /*
   * Placed so the crowded inner rings sit clear of the drawing, which lives
   * in the upper right of the hero. A background that tangles with a
   * technical drawing makes both of them harder to read.
   */
  {
    cx: 250,
    cy: 330,
    flatten: 0.68,
    rings: 14,
    inner: 44,
    outer: 620,
    seed: 0.8,
  },
  {
    cx: 1180,
    cy: 830,
    flatten: 0.58,
    rings: 12,
    inner: 38,
    outer: 540,
    seed: 2.4,
  },
];

type Ring = {
  d: string;
  opacity: number;
  width: number;
  seconds: number;
  reverse: boolean;
};

function buildRings(s: Source): Ring[] {
  const rings: Ring[] = [];
  for (let i = 0; i < s.rings; i++) {
    const t = i / (s.rings - 1);
    /*
     * Radius grows faster than linearly, so the rings crowd near the source
     * and open out at the edge. That gradient is what makes it read as heat
     * falling away from something rather than as a set of circles.
     */
    const radius = s.inner + (s.outer - s.inner) * Math.pow(t, 1.45);
    rings.push({
      d: contour(radius, s.seed + i * 0.9),
      opacity: 0.32 - 0.26 * t,
      width: 1.7 - 1 * t,
      // Outer rings turn slower, the way a large body of air moves slower.
      seconds: Math.round(90 + 150 * t),
      reverse: i % 2 === 1,
    });
  }
  return rings;
}

const FIELD = SOURCES.map((s) => ({ source: s, rings: buildRings(s) }));

export function ThermalField({
  className = "",
  stroke = "#ffffff",
}: {
  className?: string;
  stroke?: string;
}) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none ${className}`}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        {/* The warm core each set of isotherms is drawn around. */}
        <radialGradient id="tf-core">
          <stop offset="0%" stopColor="#3aa0e8" stopOpacity="0.4" />
          <stop offset="55%" stopColor="#1e6fbf" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#1e6fbf" stopOpacity="0" />
        </radialGradient>
      </defs>

      {FIELD.map(({ source, rings }, s) => (
        <g
          key={s}
          transform={`translate(${source.cx} ${source.cy}) scale(1 ${source.flatten})`}
        >
          <circle r={source.outer * 0.85} fill="url(#tf-core)" />
          {rings.map((ring, i) => (
            <g
              key={i}
              className="thermal-turn"
              style={{
                animationDuration: `${ring.seconds}s`,
                animationDirection: ring.reverse ? "reverse" : "normal",
              }}
            >
              <path
                d={ring.d}
                stroke={stroke}
                strokeWidth={ring.width}
                opacity={ring.opacity}
              />
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}
