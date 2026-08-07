import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design options",
  robots: { index: false, follow: false },
};

const OPTIONS = [
  {
    key: "A",
    href: "/design/a",
    name: "Blueprint",
    line: "The document, committed to properly.",
    body: "Hand drawn technical schematics, dimension lines, a revision table. Cyan and navy on white. This one could only belong to an engineering firm, and it puts the actual discipline on the page rather than describing it.",
    best: "Engineers and technical buyers",
  },
  {
    key: "B",
    href: "/design/b",
    name: "Editorial",
    line: "Quiet, expensive, senior.",
    body: "A serif set very large on warm paper, an asymmetric magazine grid, the portrait running full height. Closer to an architecture monograph than a website. The least shouty of the three and the most confident.",
    best: "Developers, architects, tender boards",
  },
  {
    key: "C",
    href: "/design/c",
    name: "Field",
    line: "Hard contrast, high energy.",
    body: "Near black, heavy numerals, dense data strips, a ticker of live specification. Industrial rather than corporate. Reads younger and moves faster than the other two.",
    best: "Engineers choosing a training programme",
  },
];

export default function DesignIndex() {
  return (
    <main className="min-h-dvh bg-[#101318] px-5 py-16 text-white sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-white/40 uppercase">
          BMG Engineering Limited
        </p>
        <h1 className="mt-6 max-w-2xl text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl">
          Three directions. Same content, same words, three different points of
          view.
        </h1>
        <p className="mt-6 max-w-xl leading-relaxed text-white/60">
          Look at all three, then pick the one that feels like the company you
          want people to think BMG is. There is no wrong answer here, and none
          of this is final. Whichever you choose gets built out across every
          page.
        </p>

        <ul className="mt-16 border-t border-white/12">
          {OPTIONS.map((o) => (
            <li key={o.key} className="border-b border-white/12">
              <Link
                href={o.href}
                className="group grid gap-5 py-10 transition-colors hover:bg-white/4 md:grid-cols-12 md:gap-10 md:px-5"
              >
                <div className="md:col-span-1">
                  <span className="font-mono text-sm text-[#5fb6fa]">
                    {o.key}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {o.name}
                  </h2>
                  <p className="mt-2 text-white/50">{o.line}</p>
                </div>
                <div className="md:col-span-6">
                  <p className="leading-relaxed text-white/70">{o.body}</p>
                  <p className="mt-4 font-mono text-[0.625rem] tracking-[0.16em] text-white/35 uppercase">
                    Suits: {o.best}
                  </p>
                </div>
                <div className="text-white/30 transition-all group-hover:translate-x-1 group-hover:text-white md:col-span-1 md:justify-self-end">
                  &rarr;
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-sm text-white/40">
          The live site is unchanged at{" "}
          <Link href="/" className="underline underline-offset-4 hover:text-white">
            the home page
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
