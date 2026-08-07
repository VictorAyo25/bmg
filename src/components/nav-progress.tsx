"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Thin bar across the top on navigation.
 *
 * Every page is statically generated and prefetched on hover, so the actual
 * wait is usually a few milliseconds. This is deliberately short: it
 * acknowledges the click and gets out of the way, rather than inventing a
 * delay to look busy.
 */
export function NavProgress() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setRun((n) => n + 1);
    const done = setTimeout(() => setRun(0), 560);
    return () => clearTimeout(done);
  }, [pathname]);

  if (run === 0) return null;

  return (
    <div
      key={run}
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-60 h-px"
    >
      <div
        className="h-full w-full origin-left bg-brand-600"
        style={{
          animation:
            "bar-grow 0.24s cubic-bezier(0.22,1,0.36,1) forwards, bar-done 0.28s 0.24s ease-in forwards",
        }}
      />
    </div>
  );
}
