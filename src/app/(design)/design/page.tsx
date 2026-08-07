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
    body: "Hand drawn technical schematics, a ruled sheet border, registration marks, a revision table and a title block. Dense where the drawings are, near empty at the statement. This one could only belong to an engineering firm.",
    best: "Engineers and technical buyers",
  },
  {
    key: "B",
    href: "/design/b",
    name: "Editorial",
    line: "Quiet, expensive, senior.",
    body: "A serif set very large on warm paper, an asymmetric measure, a drop cap and a lot of air. Closer to an architecture monograph than to a website. The least shouty of the three and the most confident.",
    best: "Developers, architects, tender boards",
  },
  {
    key: "C",
    href: "/design/c",
    name: "Field",
    line: "Hard contrast, high energy.",
    body: "Near black, oversized numerals, a specification ticker and a dense module matrix. Industrial rather than corporate. Reads younger and moves faster than the other two.",
    best: "Engineers choosing a training programme",
  },
];

const CHIP =
  "border border-white/20 px-4 py-2 font-mono text-[0.625rem] tracking-[0.16em] uppercase transition-colors hover:border-white hover:bg-white hover:text-[#101318]";

export default function DesignIndex() {
  return (
    <main className="min-h-dvh bg-[#101318] px-5 py-16 text-white sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-white/40 uppercase">
          BMG Engineering Limited
        </p>
        <h1 className="mt-6 max-w-3xl text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl">
          Three directions, two versions of each. Same content and same words
          throughout.
        </h1>
        <p className="mt-6 max-w-xl leading-relaxed text-white/60">
          Look at all three, then pick the one that feels like the company you
          want people to think BMG is. Each comes with and without the
          photograph, so you can judge that separately from the layout. Nothing
          here is final, and whichever you choose gets built out across every
          page.
        </p>
        <p className="mt-4 max-w-xl leading-relaxed text-white/60">
          The brand blue is the same in all three, taken from the logo file
          itself.
        </p>

        <ul className="mt-16 border-t border-white/12">
          {OPTIONS.map((o) => (
            <li key={o.key} className="border-b border-white/12">
              <div className="grid gap-5 py-10 md:grid-cols-12 md:gap-10">
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

                <div className="md:col-span-7">
                  <p className="leading-relaxed text-white/70">{o.body}</p>
                  <p className="mt-4 font-mono text-[0.625rem] tracking-[0.16em] text-white/35 uppercase">
                    Suits: {o.best}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Link href={o.href} className={CHIP}>
                      With photo
                    </Link>
                    <Link href={o.href + "/plain"} className={CHIP}>
                      Without photo
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-sm text-white/40">
          The live site is unchanged at{" "}
          <Link
            href="/"
            className="underline underline-offset-4 hover:text-white"
          >
            the home page
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
