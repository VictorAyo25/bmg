import type { ReactNode } from "react";

/**
 * A slow horizontal band of text.
 *
 * This exists to break the vertical stack. Everything else on the page moves
 * downward, so one element travelling sideways is what stops the page reading
 * as a sequence of slides.
 *
 * The track is duplicated and the animation translates exactly minus fifty
 * percent, so the seam lands where the copy repeats and the loop is
 * invisible. aria-hidden on the copy, because a screen reader should hear the
 * list once, not twice.
 */
export function Marquee({
  items,
  className = "",
}: {
  items: readonly string[];
  className?: string;
}) {
  const track = (
    <ul className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-6 px-6">
          <span className="font-mono text-[0.6875rem] tracking-note whitespace-nowrap uppercase">
            {item}
          </span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-brand-600" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div className="marquee-track flex w-max">
        {track}
        <div aria-hidden>{track}</div>
      </div>
    </div>
  );
}

export function MarqueeRow({ children }: { children: ReactNode }) {
  return <div className="marquee overflow-hidden">{children}</div>;
}
