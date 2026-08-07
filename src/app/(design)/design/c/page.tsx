import type { Metadata } from "next";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { AhuSection } from "@/components/schematics";
import { CONTACT } from "@/lib/site";
import { MODULES, PROGRAMME } from "@/lib/training";
import { PROJECTS, PROJECT_COUNT } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Option C, Field",
  robots: { index: false, follow: false },
};

/**
 * Field direction.
 *
 * Near black, hard contrast, numerals doing the shouting. The rules here are
 * the opposite of option B: dense rather than airy, mechanical rather than
 * literary, and the accent used at full strength rather than sparingly.
 */

const BLACK = "#0a0b0d";
const EDGE = "rgba(255,255,255,0.14)";
const CYAN = "#2e97f0";

const MONO = "font-mono text-[0.625rem] tracking-[0.18em] uppercase";

export default function OptionC() {
  const ticker = [
    "Cooling load calculation",
    "Carrier HAP",
    "Duct design",
    "SMACNA",
    "Chilled water",
    "VRF and DX",
    "Air handling units",
    "Stairwell pressurisation",
    "Smoke extraction",
    "Commissioning",
  ];

  return (
    <div
      className="font-grotesk text-white"
      style={{ backgroundColor: BLACK }}
    >
      <header
        className="flex items-center justify-between border-b px-5 py-4 sm:px-8"
        style={{ borderColor: EDGE }}
      >
        <Logo mono className="h-5 w-auto text-white" />
        <nav className="hidden gap-8 md:flex">
          {["Training", "Consultancy", "Projects", "About"].map((n) => (
            <span key={n} className="text-sm text-white/55">
              {n}
            </span>
          ))}
        </nav>
        <a
          href={CONTACT.mailto}
          className="px-4 py-2 text-sm font-medium text-black"
          style={{ backgroundColor: CYAN }}
        >
          Enquire
        </a>
      </header>

      {/* Hero. Numerals set enormous, headline tight underneath. */}
      <section className="border-b px-5 pt-14 pb-0 sm:px-8" style={{ borderColor: EDGE }}>
        <div className="mx-auto max-w-[92rem]">
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
            <span className={MONO} style={{ color: CYAN }}>
              Intake open
            </span>
            <span className={`${MONO} text-white/40`}>
              HVAC design / {PROGRAMME.duration} / {PROGRAMME.commitment}
            </span>
          </div>

          <h1 className="mt-10 max-w-6xl text-[3rem] leading-[0.92] font-bold tracking-[-0.04em] text-balance sm:text-[5rem] lg:text-[7rem]">
            Design systems that
            <br />
            <span style={{ color: CYAN }}>actually get built.</span>
          </h1>

          <div className="mt-14 grid gap-10 pb-14 lg:grid-cols-12">
            <p className="max-w-md text-lg leading-relaxed text-white/60 lg:col-span-4">
              Six modules. Live project conditions. Taught by engineers who
              answer for these systems on site, not by a curriculum committee.
            </p>

            {/* Oversized figures, the loudest thing on the page. */}
            <dl className="grid grid-cols-3 gap-6 lg:col-span-7 lg:col-start-6">
              {[
                ["06", "Modules"],
                ["6", "Months"],
                [String(PROJECT_COUNT), "Projects delivered"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dd className="text-[3.5rem] leading-none font-bold tracking-[-0.05em] sm:text-[5rem]">
                    {n}
                  </dd>
                  <dt className={`${MONO} mt-3 block text-white/40`}>{l}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Specification ticker. */}
      <div
        className="overflow-hidden border-b py-3"
        style={{ borderColor: EDGE, backgroundColor: "#0f1115" }}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 sm:px-8">
          {ticker.map((t, i) => (
            <span key={t} className={`${MONO} flex items-center text-white/35`}>
              {t}
              {i < ticker.length - 1 && (
                <span style={{ color: CYAN }} className="ml-6">
                  /
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Curriculum, dense two column with a hairline matrix. */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[92rem]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-2xl text-[2.25rem] leading-[1.02] font-bold tracking-[-0.035em] text-balance sm:text-[3.25rem]">
              {PROGRAMME.promise}
            </h2>
            <span className={`${MONO} text-white/40`}>
              {MODULES.length} modules / certificate on completion
            </span>
          </div>

          <ol
            className="mt-14 grid gap-px border md:grid-cols-2 xl:grid-cols-3"
            style={{ borderColor: EDGE, backgroundColor: EDGE }}
          >
            {MODULES.map((m) => (
              <li
                key={m.index}
                className="group p-7 transition-colors sm:p-8"
                style={{ backgroundColor: BLACK }}
              >
                <div className="flex items-start justify-between">
                  <span
                    className="text-[2.5rem] leading-none font-bold tracking-[-0.05em]"
                    style={{ color: CYAN }}
                  >
                    {m.index}
                  </span>
                  {m.tools && (
                    <span className={`${MONO} text-white/35`}>{m.tools}</span>
                  )}
                </div>
                <h3 className="mt-8 text-xl font-semibold tracking-tight">
                  {m.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  {m.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Split: schematic against the portrait. */}
      <section
        className="grid border-y lg:grid-cols-2"
        style={{ borderColor: EDGE }}
      >
        <div
          className="flex flex-col justify-center border-b p-8 sm:p-14 lg:border-r lg:border-b-0"
          style={{ borderColor: EDGE }}
        >
          <AhuSection className="w-full" style={{ color: CYAN }} />
          <p className={`${MONO} mt-8 text-white/35`}>
            Air handling unit / section
          </p>
        </div>
        <div className="relative min-h-90">
          <Image
            src="/founder.jpg"
            alt="An engineer from the BMG team"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[center_20%] grayscale contrast-125"
          />
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-color"
            style={{ backgroundColor: CYAN, opacity: 0.55 }}
          />
          <div className="absolute inset-x-0 bottom-0 p-8">
            <p className={`${MONO} text-white/70`}>
              Taught by practising engineers
            </p>
          </div>
        </div>
      </section>

      {/* Work, as a dense register. */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[92rem]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-[2.25rem] leading-[1.02] font-bold tracking-[-0.035em] sm:text-[3.25rem]">
              Delivered work
            </h2>
            <span className={`${MONO} text-white/40`}>
              Client names withheld
            </span>
          </div>

          <ul className="mt-12 border-t" style={{ borderColor: EDGE }}>
            {PROJECTS.map((p, i) => (
              <li
                key={p.slug}
                className="grid gap-2 border-b py-5 transition-colors hover:bg-white/4 lg:grid-cols-12 lg:items-baseline lg:gap-6"
                style={{ borderColor: EDGE }}
              >
                <span className={`${MONO} lg:col-span-1`} style={{ color: CYAN }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-medium tracking-tight lg:col-span-4">
                  {p.title}
                </span>
                <span className="text-sm text-white/50 lg:col-span-3">
                  {p.system}
                </span>
                <span className={`${MONO} text-white/35 lg:col-span-4`}>
                  {p.sector}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Close. */}
      <footer
        className="border-t px-5 py-16 sm:px-8 sm:py-24"
        style={{ borderColor: EDGE }}
      >
        <div className="mx-auto max-w-[92rem]">
          <p className="max-w-4xl text-[2.25rem] leading-[1.02] font-bold tracking-[-0.04em] text-balance sm:text-[3.5rem]">
            Tell us what you are building, or what you want to learn.
          </p>

          <div className="mt-12 flex flex-wrap gap-3">
            <a
              href={CONTACT.mailto}
              className="px-8 py-4 font-medium text-black"
              style={{ backgroundColor: CYAN }}
            >
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.tel}
              className="border px-8 py-4 font-medium"
              style={{ borderColor: EDGE }}
            >
              {CONTACT.phone}
            </a>
          </div>

          <div
            className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-8"
            style={{ borderColor: EDGE }}
          >
            <span className={`${MONO} text-white/35`}>
              BMG Engineering Limited
            </span>
            <span className={`${MONO} text-white/35`}>RC 9085536</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
