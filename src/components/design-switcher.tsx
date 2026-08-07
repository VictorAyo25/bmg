"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const OPTIONS = [
  { key: "a", label: "A", name: "Blueprint" },
  { key: "b", label: "B", name: "Editorial" },
  { key: "c", label: "C", name: "Field" },
];

const CHIP =
  "px-3 py-1.5 font-mono text-[0.625rem] tracking-[0.16em] uppercase transition-colors";

/**
 * Scaffolding for the review, not part of any design. Lets the client move
 * between the three directions and flip the photograph on and off without
 * losing their place. All of this comes out once one is chosen.
 */
export function DesignSwitcher() {
  const pathname = usePathname();
  const match = pathname.match(/^\/design\/([abc])(\/plain)?$/);
  const current = match?.[1];
  const isPlain = Boolean(match?.[2]);

  return (
    <div className="sticky top-0 z-100 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 bg-[#101318] px-4 py-2.5 text-white sm:px-6">
      <Link
        href="/design"
        className="font-mono text-[0.625rem] tracking-[0.16em] text-white/50 uppercase transition-colors hover:text-white"
      >
        BMG / Design options
      </Link>

      <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
        <nav aria-label="Design options" className="flex items-center gap-1">
          {OPTIONS.map((o) => {
            const active = current === o.key;
            return (
              <Link
                key={o.key}
                href={`/design/${o.key}${isPlain ? "/plain" : ""}`}
                aria-current={active ? "page" : undefined}
                className={`${CHIP} ${
                  active
                    ? "bg-white text-[#101318]"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {o.label}
                <span className="ml-2 hidden sm:inline">{o.name}</span>
              </Link>
            );
          })}
        </nav>

        {current && (
          <div
            className="ml-2 flex items-center border border-white/15"
            role="group"
            aria-label="Portrait variant"
          >
            <Link
              href={`/design/${current}`}
              aria-current={!isPlain ? "page" : undefined}
              className={`${CHIP} ${
                !isPlain
                  ? "bg-[#097ccd] text-white"
                  : "text-white/55 hover:text-white"
              }`}
            >
              Photo
            </Link>
            <Link
              href={`/design/${current}/plain`}
              aria-current={isPlain ? "page" : undefined}
              className={`${CHIP} ${
                isPlain
                  ? "bg-[#097ccd] text-white"
                  : "text-white/55 hover:text-white"
              }`}
            >
              No photo
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
