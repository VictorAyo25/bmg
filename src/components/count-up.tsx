"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts to a number once it is on screen, then stops watching.
 *
 * A static figure is something a slide does. A figure that arrives is
 * something only a page can do, and it draws the eye to the one claim on the
 * section worth reading.
 *
 * Starts at the final value so that with no JavaScript, or under reduced
 * motion, the correct number is what renders. A count that never runs must
 * still show the truth.
 */
export function CountUp({
  to,
  suffix = "",
  duration = 1400,
  className = "",
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        setValue(0);

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          // Same deceleration as everything else that moves on this site.
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(to * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
