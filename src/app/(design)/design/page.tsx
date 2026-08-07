import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design options",
  robots: { index: false, follow: false },
};

const OPTIONS = [
  {
    n: "1",
    line: "Deep blue, white drawings.",
    body: "A real blueprint is white linework on deep blue, which is where the word comes from. So the page is blue and the technical drawings are white, with the duct schematic sitting on a white card the way the panels on your flyers do. The angled section tabs are lifted from the flyers too.",
    best: "Engineers and technical buyers",
  },
  {
    n: "2",
    line: "Navy and cream, set large.",
    body: "Deep navy with a serif running very big, and one cream section partway down so the blue reads as a decision rather than a default. The quietest of the three and the most senior. It looks like a company that has been doing this for twenty years.",
    best: "Developers, architects, tender boards",
  },
  {
    n: "3",
    line: "Brand blue at full strength.",
    body: "The logo blue as the page itself, with near black panels cut into it and numerals set enormous. The loudest of the three and the closest in energy to your flyers. Reads younger and moves faster than the other two.",
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
          Three options, two versions of each. Same content and same words
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
          All three are built on the logo blue, taken from the artwork itself.
        </p>

        <ul className="mt-16 border-t border-white/12">
          {OPTIONS.map((o) => (
            <li key={o.n} className="border-b border-white/12">
              <div className="grid gap-5 py-10 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-1">
                  <span className="font-mono text-2xl text-[#5fb6fa]">
                    {o.n}
                  </span>
                </div>

                <div className="md:col-span-4">
                  <p className="text-xl font-semibold tracking-tight text-balance">
                    {o.line}
                  </p>
                </div>

                <div className="md:col-span-7">
                  <p className="leading-relaxed text-white/70">{o.body}</p>
                  <p className="mt-4 font-mono text-[0.625rem] tracking-[0.16em] text-white/35 uppercase">
                    Suits: {o.best}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Link href={`/design/${o.n}`} className={CHIP}>
                      With photo
                    </Link>
                    <Link href={`/design/${o.n}/plain`} className={CHIP}>
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
