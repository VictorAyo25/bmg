/**
 * The living background.
 *
 * Reviewers asked twice for 2D motion graphics behind the content. What
 * existed was one drifting grid on a single band, which is not a background
 * treatment, it is a single section. This is the layer the rest of the site
 * was missing.
 *
 * It is airflow: long, slow curves with dashes travelling along them, the
 * same device as the duct plan but abstract enough that it states nothing
 * technical and so cannot be technically wrong. That distinction matters
 * here. A background is decoration, and decoration must not make claims an
 * engineer could fault.
 *
 * Cheap by construction. Six stroked paths and a CSS dash offset, no images,
 * no library, nothing per frame that touches layout. Paints on the
 * compositor and is switched off entirely under reduced motion.
 */
export function TechBackdrop({
  className = "",
  tone = "ink",
}: {
  className?: string;
  /** Match the surface: ink on light grounds, light on the dark ones. */
  tone?: "ink" | "light";
}) {
  const stroke = tone === "ink" ? "#0c2340" : "#ffffff";
  const grid =
    tone === "ink" ? "rgba(12,35,64,0.055)" : "rgba(255,255,255,0.07)";

  // Long shallow curves, roughly parallel, the way air moves down a duct run.
  const streams = [
    {
      d: "M-100 170 C 260 120, 520 250, 820 200 S 1320 120, 1640 190",
      o: 0.5,
      s: "0s",
    },
    {
      d: "M-100 330 C 300 300, 560 420, 900 360 S 1360 300, 1640 350",
      o: 0.38,
      s: "-3s",
    },
    {
      d: "M-100 520 C 240 470, 600 610, 940 540 S 1380 470, 1640 530",
      o: 0.3,
      s: "-6s",
    },
    {
      d: "M-100 700 C 320 660, 620 780, 980 710 S 1400 650, 1640 700",
      o: 0.22,
      s: "-9s",
    },
  ];

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="grid-drift absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${grid} 1px, transparent 1px), linear-gradient(to bottom, ${grid} 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {streams.map((s) => (
          <path
            key={s.d}
            d={s.d}
            stroke={stroke}
            strokeWidth={1.25}
            opacity={s.o * (tone === "ink" ? 0.22 : 0.3)}
            strokeDasharray="10 16"
            className="air-stream"
            style={{ animationDelay: s.s }}
          />
        ))}
      </svg>
    </div>
  );
}
