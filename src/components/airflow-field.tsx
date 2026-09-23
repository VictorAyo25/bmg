/**
 * An airflow field.
 *
 * The background before this was 1.25px lines at 6 percent opacity. That is a
 * texture, not a graphic, and the client was right that it did not register.
 * This is built to be seen.
 *
 * What it shows is laminar flow through a constriction: the streamlines
 * squeeze together, accelerate, and open out again, which is what air does
 * passing a reducer or a damper. It is drawn in two layers, and the split is
 * the whole trick. The lines themselves are continuous and quiet, so the eye
 * reads the shape of the flow field. The motion rides on top as bright
 * travelling highlights, so the eye reads speed. An earlier version put both
 * jobs on one dashed stroke and got neither: every line came apart into
 * scattered ticks and the field looked like stipple.
 *
 * Where the lines bunch, the highlights travel faster, because that is what
 * actually happens. Halve the area and the velocity doubles. The duration is
 * derived from how much of each line's length sits inside the squeeze rather
 * than picked by eye, so the motion is a consequence of the geometry instead
 * of a decoration laid over it.
 *
 * The throat sits off centre, at 62 percent across. A symmetrical pinch with
 * text over the middle puts the copy in the one part of the frame worth
 * looking at, and then needs the copy's background scrubbed white to stay
 * readable, which deletes that same part. Off centre, the open left of the
 * field carries the words and the throat is left intact to the right of them.
 *
 * It states nothing an engineer could mark wrong. No components, no labels, no
 * numbers. It is the behaviour of air, drawn honestly, which is the most that
 * decoration should ever claim.
 *
 * Cost is a set of stroked paths and one dash offset each. No canvas, no
 * library, nothing per frame that touches layout, and it stops completely
 * under reduced motion.
 */

const W = 1440;
const H = 460;

/** Where the constriction sits across the frame, and how tight it closes. */
const THROAT_AT = 0.62;
const THROAT_TO = 0.42;

/** How wide the band of flow is at a given x, as a fraction of its full width. */
function widthAt(x: number) {
  const t = x / W;
  const pinch = Math.exp(-Math.pow((t - THROAT_AT) / 0.2, 2));
  return 1 - (1 - THROAT_TO) * pinch;
}

type Line = {
  d: string;
  /** The continuous line that shows the shape of the field. */
  bodyOpacity: number;
  bodyWidth: number;
  /** The travelling highlight that shows the speed. */
  streakOpacity: number;
  streakWidth: number;
  seconds: number;
  delay: number;
};

function buildLines(count: number): Line[] {
  const lines: Line[] = [];
  const cy = H / 2;

  for (let i = 0; i < count; i++) {
    // Position across the band, -1 at the top edge to +1 at the bottom.
    const across = (i / (count - 1)) * 2 - 1;
    const amplitude = 8 + 6 * Math.sin(i * 1.3);
    const wavelength = 640 + 200 * Math.cos(i * 0.8);
    const phase = i * 0.55;

    const points: string[] = [];
    for (let x = -120; x <= W + 120; x += 12) {
      const spread = widthAt(Math.max(0, Math.min(W, x)));
      const y =
        cy +
        across * (H * 0.47) * spread +
        Math.sin((x / wavelength) * Math.PI * 2 + phase) * amplitude * spread;
      points.push(`${x},${y.toFixed(1)}`);
    }

    /*
     * Continuity. The throat closes to 42 percent of the open width, so flow
     * through it runs about 1 / 0.42 times faster. A line near the centre of
     * the band spends more of its length inside the squeeze than one at the
     * edge, so it carries more of that speed into its average.
     */
    const centreness = 1 - Math.abs(across);
    const seconds = 11.5 - 5.2 * centreness;

    lines.push({
      d: "M" + points.join(" L"),
      // The edges of the band are quieter, so the eye lands on the throat.
      bodyOpacity: 0.1 + 0.13 * centreness,
      bodyWidth: 0.9 + 0.35 * centreness,
      streakOpacity: 0.3 + 0.45 * centreness,
      streakWidth: 1.2 + 1.1 * centreness,
      seconds: Number(seconds.toFixed(2)),
      // Scattered rather than sequential, so it never marches in step.
      delay: Number((-((i * 2.7) % 9)).toFixed(2)),
    });
  }
  return lines;
}

const LINES = buildLines(30);

export function AirflowField({
  className = "",
  stroke = "#097ccd",
  count,
}: {
  className?: string;
  stroke?: string;
  /** Only pass this to thin the field out; the default is tuned. */
  count?: number;
}) {
  const lines = count ? buildLines(count) : LINES;

  // Fade in from the left edge and out at the right, so the flow arrives and
  // leaves rather than stopping dead at the frame.
  const fade =
    "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)";

  return (
    <svg
      aria-hidden
      className={`pointer-events-none ${className}`}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      style={{ maskImage: fade, WebkitMaskImage: fade }}
    >
      {/* The field. Continuous, so it reads as flow and not as scatter. */}
      {lines.map((l, i) => (
        <path
          key={`b${i}`}
          d={l.d}
          stroke={stroke}
          strokeWidth={l.bodyWidth}
          opacity={l.bodyOpacity}
        />
      ))}

      {/*
       * The motion. pathLength normalises every line to 100 regardless of how
       * long it actually is, so one dash pattern and one keyframe cover all of
       * them and the loop is seamless: the dash period is 50 and the animation
       * travels exactly 50.
       */}
      {lines.map((l, i) => (
        <path
          key={`s${i}`}
          d={l.d}
          stroke={stroke}
          strokeWidth={l.streakWidth}
          strokeLinecap="round"
          opacity={l.streakOpacity}
          pathLength={100}
          strokeDasharray="11 39"
          className="air-flow"
          style={{
            animationDuration: `${l.seconds}s`,
            animationDelay: `${l.delay}s`,
          }}
        />
      ))}
    </svg>
  );
}
