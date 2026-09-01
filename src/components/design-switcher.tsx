"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const CHIP =
  "px-3.5 py-1.5 font-mono text-[0.625rem] tracking-[0.16em] uppercase transition-colors";

/**
 * Review scaffolding, not part of the design. The direction is settled, so all
 * this does now is flip the photograph on and off, which is the one decision
 * still open. It comes out once that is answered.
 */
export function DesignSwitcher() {
  const pathname = usePathname();
  const isDesign = /^\/design\/1(\/plain)?$/.test(pathname);
  const isPlain = pathname.endsWith("/plain");

  return (
    <div className="sticky top-0 z-100 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 bg-[#101318] px-4 py-2.5 text-white sm:px-6">
      <Link
        href="/design"
        className="font-mono text-[0.625rem] tracking-[0.16em] text-white/50 uppercase transition-colors hover:text-white"
      >
        BMG / Design
      </Link>

      {isDesign && (
        <div
          className="flex items-center border border-white/15"
          role="group"
          aria-label="Portrait variant"
        >
          <Link
            href="/design/1"
            aria-current={!isPlain ? "page" : undefined}
            className={`${CHIP} ${
              !isPlain
                ? "bg-[#097ccd] text-white"
                : "text-white/55 hover:text-white"
            }`}
          >
            With photo
          </Link>
          <Link
            href="/design/1/plain"
            aria-current={isPlain ? "page" : undefined}
            className={`${CHIP} ${
              isPlain
                ? "bg-[#097ccd] text-white"
                : "text-white/55 hover:text-white"
            }`}
          >
            Without photo
          </Link>
        </div>
      )}
    </div>
  );
}
