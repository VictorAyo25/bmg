import type { Metadata } from "next";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { AhuSection, ChilledWaterLoop, DuctRun } from "@/components/schematics";
import { CONTACT } from "@/lib/site";
import { MODULES, PROGRAMME } from "@/lib/training";
import { PROJECTS, PROJECT_COUNT } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Option A, Blueprint",
  robots: { index: false, follow: false },
};

const MONO = "font-mono text-[0.625rem] tracking-[0.16em] uppercase";

/** Corner tick, the registration mark at the corner of a drawing sheet. */
function Tick({ at }: { at: "tl" | "tr" | "bl" | "br" }) {
  const pos = {
    tl: "top-0 left-0 border-t border-l",
    tr: "top-0 right-0 border-t border-r",
    bl: "bottom-0 left-0 border-b border-l",
    br: "bottom-0 right-0 border-b border-r",
  }[at];
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-4 w-4 border-[#097ccd] ${pos}`}
    />
  );
}

export default function OptionA() {
  return (
    <div className="bg-white font-sans text-[#0c0f13]">
      {/* Masthead. Not sticky, not blurred. It sits at the top of the sheet. */}
      <header className="border-b border-[#0c0f13]/12">
        <div className="mx-auto flex max-w-[90rem] flex-col gap-3 px-5 py-4 sm:px-8 md:flex-row md:items-center md:justify-between">
          <Logo className="h-6 w-auto" />
          <div className="flex flex-wrap items-center gap-x-7 gap-y-1">
            {["Training", "Consultancy", "Projects", "About"].map((n) => (
              <span key={n} className="text-sm text-[#414750]">
                {n}
              </span>
            ))}
            <a href={CONTACT.mailto} className={`${MONO} text-[#0a62a5]`}>
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </header>

      {/* Sheet. A ruled border wraps the entire drawing, as it would on paper. */}
      <div className="mx-auto max-w-[90rem] px-3 py-3 sm:px-5 sm:py-5">
        <div className="relative border border-[#0c0f13]/15">
          <Tick at="tl" />
          <Tick at="tr" />
          <Tick at="bl" />
          <Tick at="br" />

          {/* Hero. Dense: type and drawing share the space. */}
          <section className="grid lg:grid-cols-12">
            <div className="border-b border-[#0c0f13]/12 px-6 py-12 sm:px-10 sm:py-16 lg:col-span-7 lg:border-r lg:border-b-0">
              <p className={`${MONO} text-[#097ccd]`}>
                Drawing 01 &nbsp;/&nbsp; HVAC design programme
              </p>

              <h1 className="mt-10 text-[2.6rem] leading-[0.98] font-semibold tracking-[-0.035em] text-balance sm:text-[3.75rem] xl:text-[4.5rem]">
                Learn to design building systems that actually get built.
              </h1>

              <p className="mt-8 max-w-md text-[1.0625rem] leading-relaxed text-[#414750]">
                Six months. Six modules. Taught against live project
                conditions by engineers who answer for these systems on site.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={CONTACT.mailto}
                  className="bg-[#0c0f13] px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-[#097ccd]"
                >
                  Enquire about the programme
                </a>
                <a
                  href="#work"
                  className="border border-[#0c0f13]/20 px-7 py-4 text-sm font-medium transition-colors hover:border-[#0c0f13]"
                >
                  See the work
                </a>
              </div>
            </div>

            {/* The drawing carries the right side rather than white space. */}
            <div className="relative flex flex-col justify-center bg-[#f7f9fb] px-6 py-12 sm:px-10 lg:col-span-5">
              <DuctRun className="w-full text-[#0a62a5]" />
              <div className="mt-10 flex items-end justify-between border-t border-[#0c0f13]/12 pt-4">
                <span className={`${MONO} text-[#5a606a]`}>
                  Fig 01 / Supply duct run
                </span>
                <span className={`${MONO} text-[#5a606a]`}>Module 02</span>
              </div>
            </div>
          </section>

          {/* Revision table. Real drawing furniture, used as the stat row. */}
          <section className="border-t border-[#0c0f13]/12">
            <dl className="grid grid-cols-2 lg:grid-cols-4">
              {[
                ["Duration", PROGRAMME.duration],
                ["Modules", String(MODULES.length).padStart(2, "0")],
                ["Mode", PROGRAMME.mode],
                ["Projects delivered", String(PROJECT_COUNT)],
              ].map(([k, v], i) => (
                <div
                  key={k}
                  className={`px-6 py-7 sm:px-10 ${
                    i % 2 === 1 ? "border-l" : ""
                  } ${i > 1 ? "border-t lg:border-t-0" : ""} ${
                    i === 2 ? "lg:border-l" : ""
                  } border-[#0c0f13]/12`}
                >
                  <dt className={`${MONO} text-[#5a606a]`}>{k}</dt>
                  <dd className="mt-3 text-2xl font-semibold tracking-tight">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Statement. Deliberately near empty after the dense block above. */}
          <section className="border-t border-[#0c0f13]/12 px-6 py-20 sm:px-10 sm:py-32">
            <p className="mx-auto max-w-4xl text-center text-[1.75rem] leading-[1.25] font-medium tracking-[-0.02em] text-balance sm:text-[2.5rem]">
              Most buildings are cooled by systems{" "}
              <span className="text-[#097ccd]">nobody calculated.</span> Every
              uncomfortable room and every ruinous energy bill was a decision
              somebody made at design stage.
            </p>
          </section>

          {/* Curriculum, with a schematic against the modules it belongs to. */}
          <section className="border-t border-[#0c0f13]/12 grid lg:grid-cols-12">
            <div className="border-b border-[#0c0f13]/12 px-6 py-12 sm:px-10 lg:col-span-5 lg:border-r lg:border-b-0">
              <p className={`${MONO} text-[#097ccd]`}>Drawing 02 / Curriculum</p>
              <h2 className="mt-8 text-[2rem] leading-[1.08] font-semibold tracking-[-0.03em] sm:text-[2.5rem]">
                {PROGRAMME.promise}
              </h2>
              <div className="mt-12 space-y-12">
                <figure>
                  <ChilledWaterLoop className="w-full text-[#0a62a5]" />
                  <figcaption className={`${MONO} mt-3 block text-[#5a606a]`}>
                    Fig 02 / Chilled water circuit
                  </figcaption>
                </figure>
                <figure>
                  <AhuSection className="w-full text-[#0a62a5]" />
                  <figcaption className={`${MONO} mt-3 block text-[#5a606a]`}>
                    Fig 03 / AHU section
                  </figcaption>
                </figure>
              </div>
            </div>

            <ol className="lg:col-span-7">
              {MODULES.map((m) => (
                <li
                  key={m.index}
                  className="border-b border-[#0c0f13]/12 px-6 py-8 last:border-b-0 sm:px-10"
                >
                  <div className="flex items-baseline gap-5">
                    <span className={`${MONO} text-[#097ccd]`}>{m.index}</span>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {m.title}
                    </h3>
                  </div>
                  <p className="mt-3 max-w-2xl pl-12 leading-relaxed text-[#414750]">
                    {m.description}
                  </p>
                  {m.tools && (
                    <p className={`${MONO} mt-3 block pl-12 text-[#0a62a5]`}>
                      {m.tools}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </section>

          {/* Schedule of delivered work. */}
          <section id="work" className="border-t border-[#0c0f13]/12">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#0c0f13]/12 px-6 py-6 sm:px-10">
              <p className={`${MONO} text-[#097ccd]`}>
                Drawing 03 / Schedule of delivered work
              </p>
              <p className={`${MONO} text-[#5a606a]`}>
                {PROJECT_COUNT} entries / client names withheld
              </p>
            </div>

            <ul>
              {PROJECTS.map((p, i) => (
                <li
                  key={p.slug}
                  className="grid gap-2 border-b border-[#0c0f13]/12 px-6 py-5 transition-colors last:border-b-0 hover:bg-[#f2f7fb] sm:px-10 lg:grid-cols-12 lg:items-baseline lg:gap-6"
                >
                  <span className={`${MONO} text-[#097ccd] lg:col-span-1`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium lg:col-span-4">{p.title}</span>
                  <span className="text-sm text-[#5a606a] lg:col-span-3">
                    {p.system}
                  </span>
                  <span className={`${MONO} text-[#5a606a] lg:col-span-2`}>
                    {p.sector}
                  </span>
                  <span className="text-sm text-[#414750] lg:col-span-2">
                    {p.highlights[0]}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Title block, the panel that closes every drawing sheet. */}
          <section className="border-t border-[#0c0f13]/12 grid lg:grid-cols-12">
            <div className="border-b border-[#0c0f13]/12 lg:col-span-4 lg:border-r lg:border-b-0">
              <div className="relative aspect-5/6 overflow-hidden lg:aspect-auto lg:h-full lg:min-h-80">
                <Image
                  src="/founder.jpg"
                  alt="An engineer from the BMG team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 30rem"
                  className="object-cover object-top grayscale"
                />
              </div>
            </div>

            <div className="grid lg:col-span-8 sm:grid-cols-2">
              {[
                ["Drawn by", "BMG Engineering Limited"],
                ["Registration", `RC 9085536`],
                ["Email", CONTACT.email],
                ["Telephone", CONTACT.phone],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="border-b border-[#0c0f13]/12 px-6 py-7 sm:px-10 sm:odd:border-r"
                >
                  <p className={`${MONO} text-[#5a606a]`}>{k}</p>
                  <p className="mt-3 break-words">{v}</p>
                </div>
              ))}
              <div className="px-6 py-10 sm:col-span-2 sm:px-10">
                <p className="text-2xl leading-snug font-medium tracking-tight">
                  Creating your vision, one design at a time.
                </p>
                <a
                  href={CONTACT.mailto}
                  className="mt-7 inline-block bg-[#097ccd] px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-[#0c0f13]"
                >
                  Start a conversation
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Sheet footer, outside the ruled border. */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-1 py-3">
          <span className={`${MONO} text-[#949aa4]`}>
            BMG Engineering Limited
          </span>
          <span className={`${MONO} text-[#949aa4]`}>Sheet 1 of 1</span>
        </div>
      </div>
    </div>
  );
}
