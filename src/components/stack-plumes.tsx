/**
 * Buoyancy plumes. Projects' device.
 *
 * Warm air rises, and in a tall building it keeps rising: the stack effect is
 * the reason a high rise behaves differently from a shed, and it is behind
 * three of the things this page's record keeps mentioning, which are stairwell
 * pressurisation, smoke extraction and shaft design. So the record gets a
 * background that moves upward while every other graphic on the site moves
 * across. That contrast is the point; the same device on every page was the
 * complaint.
 *
 * The plumes meander more the higher they get, because a rising column
 * entrains the air around it and widens as it goes. They are drawn from the
 * floor upward, so the travelling highlights run up the path.
 *
 * Unlike every other graphic here this one is stretched rather than sliced,
 * with preserveAspectRatio="none". That is deliberate and it is the reason
 * this device can back a whole tall section rather than only a band: a near
 * vertical meandering line stretched vertically is still a near vertical
 * meandering line, so there is no distortion worth seeing. Slicing a wide
 * frame into a tall one is what tore the airflow field into diagonal bars.
 */

const W = 1440;
const H = 900;

type Plume = {
  d: string;
  opacity: number;
  width: number;
  seconds: number;
  delay: number;
};

function build(count: number, waveScale: number): Plume[] {
  const plumes: Plume[] = [];

  for (let i = 0; i < count; i++) {
    // Spread across the width, nudged off the grid so they never look ruled.
    const base = ((i + 0.5) / count) * W + Math.sin(i * 2.7) * 14;
    const amplitude = 26 + 20 * Math.sin(i * 1.9);
    const wavelength = (300 + 120 * Math.cos(i * 1.3)) * waveScale;
    const phase = i * 0.9;

    const points: string[] = [];
    for (let yy = H + 40; yy >= -40; yy -= 10) {
      /*
       * Height above the floor, 0 at the bottom and 1 at the ceiling. The
       * meander is multiplied by it, so plumes leave the floor straight and
       * wander as they climb.
       */
      const risen = 1 - yy / H;
      const drift =
        Math.sin((yy / wavelength) * Math.PI * 2 + phase) *
        amplitude *
        Math.max(0, risen);
      points.push(`${(base + drift).toFixed(1)},${yy}`);
    }

    // Warmer plumes rise faster; the variation is what stops it looking ruled.
    const vigour = 0.5 + 0.5 * Math.sin(i * 2.1);
    plumes.push({
      d: "M" + points.join(" L"),
      opacity: 0.12 + 0.2 * vigour,
      width: 1 + 0.9 * vigour,
      seconds: Number((11 - 4.5 * vigour).toFixed(2)),
      delay: Number((-((i * 1.7) % 8)).toFixed(2)),
    });
  }

  return plumes;
}

const PLUMES = build(34, 1);

export function StackPlumes({
  className = "",
  stroke = "#097ccd",
}: {
  className?: string;
  stroke?: string;
}) {
  const fade =
    "linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)";

  return (
    <svg
      aria-hidden
      className={`pointer-events-none ${className}`}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      fill="none"
      style={{ maskImage: fade, WebkitMaskImage: fade }}
    >
      {PLUMES.map((p, i) => (
        <path
          key={`b${i}`}
          d={p.d}
          stroke={stroke}
          strokeWidth={p.width * 0.7}
          opacity={p.opacity * 0.45}
        />
      ))}
      {PLUMES.map((p, i) => (
        <path
          key={`s${i}`}
          d={p.d}
          stroke={stroke}
          strokeWidth={p.width}
          strokeLinecap="round"
          opacity={p.opacity}
          pathLength={100}
          strokeDasharray="10 40"
          className="air-flow"
          style={{
            animationDuration: `${p.seconds}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </svg>
  );
}
