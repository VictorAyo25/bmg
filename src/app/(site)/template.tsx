"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Runs on every navigation, unlike layout.tsx which persists.
 *
 * Two jobs. It carries the enter animation so a page arrives rather than
 * simply appearing, and it guarantees you land at the top.
 *
 * The scroll is deliberately instant rather than smooth. Smooth scrolling to
 * the top of a page you have not seen yet means watching content you already
 * read rush past, which reads as lag. The upward motion people actually want
 * is the content settling into place, and that is what the animation does.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return <div className="page-enter">{children}</div>;
}
