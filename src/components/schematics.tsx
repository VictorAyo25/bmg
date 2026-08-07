/**
 * Technical line drawings, hand authored.
 *
 * These are the reason the page reads as an engineering firm rather than a
 * template. Every one is a real schematic of something taught in the
 * programme, drawn to a consistent line weight, with the labels an engineer
 * would expect to find on it.
 *
 * All strokes inherit currentColor so the same drawing works on paper or on
 * a dark panel. Nothing here is decorative filler.
 */

const LABEL = "font-mono text-[9px] tracking-[0.14em] uppercase";

/** Small filled triangle marking flow direction along a pipe or duct. */
function Flow({
  x,
  y,
  dir = "right",
}: {
  x: number;
  y: number;
  dir?: "right" | "left" | "down";
}) {
  const points =
    dir === "right"
      ? `${x},${y - 4} ${x + 7},${y} ${x},${y + 4}`
      : dir === "left"
        ? `${x},${y - 4} ${x - 7},${y} ${x},${y + 4}`
        : `${x - 4},${y} ${x},${y + 7} ${x + 4},${y}`;
  return <polygon points={points} fill="currentColor" opacity={0.85} />;
}

/**
 * Chilled water circuit. Chiller, primary pump, air handling coil, return.
 * The loop taught in module 04.
 */
export function ChilledWaterLoop({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 480 250"
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      role="img"
      aria-label="Schematic of a chilled water circuit: chiller, pump, air handling unit coil and return line"
    >
      {/* Chiller */}
      <rect x="18" y="70" width="108" height="86" />
      <path d="M18 92h108" opacity={0.45} />
      <text x="72" y="86" textAnchor="middle" className={LABEL} fill="currentColor" stroke="none">
        Chiller
      </text>
      <path d="M38 112h22M38 124h22M38 136h22" opacity={0.4} />
      <circle cx="98" cy="124" r="13" opacity={0.55} />
      <path d="M98 111v26M85 124h26" opacity={0.55} />

      {/* Flow pipe, chiller to coil */}
      <path d="M126 96h84" />
      <Flow x={168} y={96} />
      <path d="M244 96h108" />
      <Flow x={300} y={96} />

      {/* Primary pump */}
      <circle cx="227" cy="96" r="17" />
      <path d="M227 79v34" opacity={0.5} />
      <polygon points="227,84 240,96 227,108" fill="currentColor" opacity={0.75} stroke="none" />
      <text x="227" y="140" textAnchor="middle" className={LABEL} fill="currentColor" stroke="none">
        Pump
      </text>
      <path d="M227 118v14" opacity={0.35} strokeDasharray="2 3" />

      {/* Air handling unit with coil */}
      <rect x="352" y="58" width="110" height="110" />
      <text x="407" y="50" textAnchor="middle" className={LABEL} fill="currentColor" stroke="none">
        AHU coil
      </text>
      <path
        d="M372 82h70M372 82v14h70v14h-70v14h70v14h-70"
        strokeWidth={1.4}
      />
      <path d="M372 152h70" opacity={0.45} />

      {/* Return line */}
      <path d="M352 150H126v-54" opacity={0.9} />
      <Flow x={250} y={150} dir="left" />
      <text x="238" y="168" textAnchor="middle" className={LABEL} fill="currentColor" stroke="none" opacity={0.75}>
        Return
      </text>

      {/* Dimension line beneath, drafting convention */}
      <g opacity={0.5}>
        <path d="M18 208h444" strokeWidth={0.9} />
        <path d="M18 202v12M462 202v12M126 204v8M352 204v8" strokeWidth={0.9} />
        <text x="240" y="228" textAnchor="middle" className={LABEL} fill="currentColor" stroke="none">
          Primary circuit
        </text>
      </g>
    </svg>
  );
}

/**
 * Supply duct run off an air handling unit, with branch takeoffs and
 * diffusers. Module 02, laid out the way it appears on a floor plan.
 */
export function DuctRun({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 480 230"
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      role="img"
      aria-label="Schematic of a supply duct run with branch takeoffs and ceiling diffusers"
    >
      {/* Plant */}
      <rect x="16" y="46" width="76" height="64" />
      <text x="54" y="38" textAnchor="middle" className={LABEL} fill="currentColor" stroke="none">
        AHU
      </text>
      <path d="M30 62h48M30 78h48M30 94h48" opacity={0.4} />

      {/* Main trunk, reducing as air is dropped off */}
      <path d="M92 54h180v10h116v8" />
      <path d="M92 102h180V88h116v-8" />
      <Flow x={140} y={78} />
      <Flow x={330} y={78} />

      {/* Branch takeoffs with diffusers */}
      {[
        { x: 150, w: 26 },
        { x: 240, w: 24 },
        { x: 340, w: 22 },
        { x: 412, w: 20 },
      ].map((b) => (
        <g key={b.x}>
          <path d={`M${b.x} 102v34`} />
          <path d={`M${b.x + b.w} 102v34`} />
          <path d={`M${b.x - 8} 136h${b.w + 16}`} strokeWidth={1.5} />
          <path
            d={`M${b.x - 8} 136l10 12M${b.x + b.w + 8} 136l-10 12`}
            opacity={0.6}
          />
          <Flow x={b.x + b.w / 2} y={120} dir="down" />
        </g>
      ))}

      <text x="196" y="176" textAnchor="middle" className={LABEL} fill="currentColor" stroke="none" opacity={0.75}>
        Ceiling diffusers
      </text>

      {/* Static pressure annotation, leader line and note */}
      <g opacity={0.55}>
        <path d="M272 64l44-26h58" strokeWidth={0.9} />
        <circle cx="272" cy="64" r="2.5" fill="currentColor" stroke="none" />
        <text x="380" y="35" className={LABEL} fill="currentColor" stroke="none">
          Pressure drop
        </text>
      </g>

      <g opacity={0.5}>
        <path d="M16 206h448" strokeWidth={0.9} />
        <path d="M16 200v12M464 200v12M92 202v8" strokeWidth={0.9} />
        <text x="240" y="226" textAnchor="middle" className={LABEL} fill="currentColor" stroke="none">
          Supply air distribution
        </text>
      </g>
    </svg>
  );
}

/**
 * Air handling unit in section: filter, cooling coil, fan. Drawn the way it
 * appears in a plant room layout, air travelling left to right.
 */
export function AhuSection({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 480 200"
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      role="img"
      aria-label="Section through an air handling unit showing filter, cooling coil and supply fan"
    >
      <rect x="60" y="42" width="360" height="104" />
      <path d="M172 42v104M284 42v104" opacity={0.7} />

      {/* Intake */}
      <path d="M20 78h40M20 110h40" opacity={0.8} />
      <Flow x={44} y={94} />
      <text x="26" y="66" className={LABEL} fill="currentColor" stroke="none" opacity={0.75}>
        Return
      </text>

      {/* Filter bank, hatched the way a filter is shown in section */}
      {Array.from({ length: 9 }, (_, i) => (
        <path
          key={i}
          d={`M${84 + i * 10} 146L${104 + i * 10} 42`}
          opacity={0.45}
          strokeWidth={0.9}
        />
      ))}
      <text x="116" y="170" textAnchor="middle" className={LABEL} fill="currentColor" stroke="none">
        Filter
      </text>

      {/* Cooling coil, serpentine with connections */}
      <path d="M196 60v68M212 60v68M228 60v68M244 60v68M260 60v68" strokeWidth={1.4} />
      <path d="M196 60h64M196 128h64" strokeWidth={1.4} />
      <path d="M188 74h-16M188 114h-16" opacity={0.6} />
      <text x="228" y="170" textAnchor="middle" className={LABEL} fill="currentColor" stroke="none">
        Cooling coil
      </text>

      {/* Supply fan */}
      <circle cx="352" cy="94" r="34" />
      <circle cx="352" cy="94" r="7" fill="currentColor" stroke="none" opacity={0.8} />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <path
          key={deg}
          d="M352 94L352 63"
          transform={`rotate(${deg} 352 94)`}
          opacity={0.65}
        />
      ))}
      <text x="352" y="170" textAnchor="middle" className={LABEL} fill="currentColor" stroke="none">
        Supply fan
      </text>

      {/* Discharge */}
      <path d="M420 78h40M420 110h40" opacity={0.8} />
      <Flow x={452} y={94} />
      <text x="424" y="66" className={LABEL} fill="currentColor" stroke="none" opacity={0.75}>
        Supply
      </text>
    </svg>
  );
}
