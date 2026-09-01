import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design",
  robots: { index: false, follow: false },
};

const CHIP =
  "border border-white/20 px-5 py-2.5 font-mono text-[0.625rem] tracking-[0.16em] uppercase transition-colors hover:border-white hover:bg-white hover:text-[#101318]";

export default function DesignIndex() {
  return (
    <main className="min-h-dvh bg-[#101318] px-5 py-16 text-white sm:px-8 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-white/40 uppercase">
          BMG Engineering Limited
        </p>

        <h1 className="mt-6 text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl">
          One decision left: the photograph.
        </h1>

        <p className="mt-6 leading-relaxed text-white/60">
          The direction is settled. The two versions below are identical in
          every other respect, so whichever you prefer is purely a judgement
          about whether the portrait helps or hurts.
        </p>

        <p className="mt-4 leading-relaxed text-white/60">
          Worth deciding with other people in the room rather than alone. It is
          the kind of choice where a second opinion is genuinely useful.
        </p>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/design/1" className={CHIP}>
            With photo
          </Link>
          <Link href="/design/1/plain" className={CHIP}>
            Without photo
          </Link>
        </div>

        <p className="mt-14 text-sm text-white/40">
          The live site is at{" "}
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
