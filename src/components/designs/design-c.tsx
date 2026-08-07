import Image from "next/image";
import { Logo } from "@/components/logo";
import { AhuSection, ChilledWaterLoop } from "@/components/schematics";
import { COMPANY, CONTACT } from "@/lib/site";
import { MODULES, PROGRAMME } from "@/lib/training";
import { PROJECTS, PROJECT_COUNT } from "@/lib/projects";

/**
 * Option C, Signal.
 *
 * The brand blue at full strength as the page itself, with near black panels
 * cut into it. The loudest of the three and the closest in energy to the
 * flyers, where a saturated blue field carries white type and dark blocks
 * sit on top of it.
 */

const BLUE = "#097ccd";
const DEEP = "#065089";
const INK = "#0a0f16";
const SKY = "#7cc4f5";
const MONO = "font-mono text-[0.625rem] tracking-[0.18em] uppercase";

const TICKER = [
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

export function DesignC({ photo }: { photo: boolean }) {
  return (
    <div className="font-grotesk text-white" style={{ backgroundColor: BLUE }}>
      <header
        className="flex flex-wrap items-center justify-between gap-4 border-b px-5 py-4 sm:px-8"
        style={{ borderColor: "rgba(255,255,255,0.28)" }}
      >
        <Logo mono className="h-5 w-auto text-white" />
        <nav className="hidden gap-8 md:flex">
          {["Training", "Consultancy", "Projects", "About"].map((n) => (
            <span key={n} className="text-sm text-white/80">
              {n}
            </span>
          ))}
        </nav>
        <a
          href={CONTACT.mailto}
          className="px-4 py-2 text-sm font-semibold text-white"
          style={{ backgroundColor: INK }}
        >
          Enquire
        </a>
      </header>

      {/* Hero on a full blue field */}
      <section
        className="border-b px-5 pt-14 sm:px-8"
        style={{ borderColor: "rgba(255,255,255,0.28)" }}
      >
        <div className="mx-auto max-w-[92rem]">
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
            <span
              className={`${MONO} px-3 py-1.5`}
              style={{ backgroundColor: INK }}
            >
              Intake open
            </span>
            <span className={`${MONO} text-white/70`}>
              HVAC design / {PROGRAMME.duration} / {PROGRAMME.commitment}
            </span>
          </div>

          <h1 className="mt-10 max-w-6xl text-[3rem] leading-[0.92] font-bold tracking-[-0.04em] text-balance sm:text-[5rem] lg:text-[7rem]">
            Design systems that
            <br />
            <span style={{ color: INK }}>actually get built.</span>
          </h1>

          <div className="mt-14 grid gap-10 pb-14 lg:grid-cols-12">
            <p className="max-w-md text-lg leading-relaxed text-white lg:col-span-4">
              Six modules. Live project conditions. Taught by engineers who
              answer for these systems on site, not by a curriculum committee.
            </p>

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
                  <dt className={`${MONO} mt-3 block text-white/70`}>{l}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Ticker, black cut into the blue */}
      <div className="py-3" style={{ backgroundColor: INK }}>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 sm:px-8">
          {TICKER.map((t, i) => (
            <span key={t} className={`${MONO} flex items-center text-white/45`}>
              {t}
              {i < TICKER.length - 1 && (
                <span style={{ color: BLUE }} className="ml-6">
                  /
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Curriculum, black cards on the blue field */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[92rem]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-2xl text-[2.25rem] leading-[1.02] font-bold tracking-[-0.035em] text-balance sm:text-[3.25rem]">
              {PROGRAMME.promise}
            </h2>
            <span className={`${MONO} text-white/70`}>
              {MODULES.length} modules / certificate on completion
            </span>
          </div>

          <ol className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {MODULES.map((m) => (
              <li
                key={m.index}
                className="p-7 sm:p-8"
                style={{ backgroundColor: INK }}
              >
                <div className="flex items-start justify-between">
                  <span
                    className="text-[2.5rem] leading-none font-bold tracking-[-0.05em]"
                    style={{ color: BLUE }}
                  >
                    {m.index}
                  </span>
                  {m.tools && (
                    <span className={`${MONO} text-white/40`}>{m.tools}</span>
                  )}
                </div>
                <h3 className="mt-8 text-xl font-semibold tracking-tight">
                  {m.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {m.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Split panel, black */}
      <section className="grid lg:grid-cols-2" style={{ backgroundColor: INK }}>
        <div
          className="flex flex-col justify-center border-b p-8 sm:p-14 lg:border-r lg:border-b-0"
          style={{ borderColor: "rgba(255,255,255,0.14)" }}
        >
          <AhuSection
            className="w-full"
            style={{ color: BLUE }}
            labelColor={SKY}
          />
          <p className={`${MONO} mt-8 text-white/40`}>
            Air handling unit / section
          </p>
        </div>

        {photo ? (
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
              style={{ backgroundColor: BLUE, opacity: 0.75 }}
            />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <p className={`${MONO} text-white/80`}>
                Taught by practising engineers
              </p>
            </div>
          </div>
        ) : (
          <div className="flex min-h-90 flex-col justify-center p-8 sm:p-14">
            <ChilledWaterLoop
              className="w-full"
              style={{ color: BLUE }}
              labelColor={SKY}
            />
            <p className={`${MONO} mt-8 text-white/40`}>
              Chilled water / primary circuit
            </p>
          </div>
        )}
      </section>

      {/* Delivered work, back on blue */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[92rem]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-[2.25rem] leading-[1.02] font-bold tracking-[-0.035em] sm:text-[3.25rem]">
              Delivered work
            </h2>
            <span className={`${MONO} text-white/70`}>
              Client names withheld
            </span>
          </div>

          <ul
            className="mt-12 border-t"
            style={{ borderColor: "rgba(255,255,255,0.3)" }}
          >
            {PROJECTS.map((p, i) => (
              <li
                key={p.slug}
                className="grid gap-2 border-b py-5 transition-colors hover:bg-white/10 lg:grid-cols-12 lg:items-baseline lg:gap-6"
                style={{ borderColor: "rgba(255,255,255,0.3)" }}
              >
                <span className={`${MONO} lg:col-span-1`} style={{ color: INK }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-semibold tracking-tight lg:col-span-4">
                  {p.title}
                </span>
                <span className="text-sm text-white/75 lg:col-span-3">
                  {p.system}
                </span>
                <span className={`${MONO} text-white/60 lg:col-span-4`}>
                  {p.sector}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer
        className="px-5 py-16 sm:px-8 sm:py-24"
        style={{ backgroundColor: DEEP }}
      >
        <div className="mx-auto max-w-[92rem]">
          <p className="max-w-4xl text-[2.25rem] leading-[1.02] font-bold tracking-[-0.04em] text-balance sm:text-[3.5rem]">
            Tell us what you are building, or what you want to learn.
          </p>

          <div className="mt-12 flex flex-wrap gap-3">
            <a
              href={CONTACT.mailto}
              className="px-8 py-4 font-semibold text-white"
              style={{ backgroundColor: INK }}
            >
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.tel}
              className="border border-white/40 px-8 py-4 font-semibold"
            >
              {CONTACT.phone}
            </a>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/25 pt-8">
            <span className={`${MONO} text-white/60`}>{COMPANY.legalName}</span>
            <span className={`${MONO} text-white/60`}>
              RC {COMPANY.rcNumber}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
