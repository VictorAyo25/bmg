import Image from "next/image";
import { Logo } from "@/components/logo";
import { AhuSection, ChilledWaterLoop, DuctRun } from "@/components/schematics";
import { COMPANY, CONTACT } from "@/lib/site";
import { MODULES, PROGRAMME } from "@/lib/training";
import { PROJECTS, PROJECT_COUNT } from "@/lib/projects";

/**
 * Option A, Cyanotype.
 *
 * A real blueprint is white linework on Prussian blue, which is where the
 * word comes from. So the page is blue and the drawings are white, rather
 * than a white page with blue trim. Blue is the substrate, which is how the
 * BMG flyers already use it.
 */

const DEEP = "#062147";
const MID = "#0b3a76";
const BRIGHT = "#097ccd";
const SKY = "#7cc4f5";
const CARD = "#f4f7fb";
const HAIR = "rgba(255,255,255,0.16)";

const MONO = "font-mono text-[0.625rem] tracking-[0.18em] uppercase";

/** Angled tab. The section label device from the flyers. */
function Tab({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={`${MONO} inline-block px-4 py-2 text-white`}
      style={{
        backgroundColor: BRIGHT,
        clipPath: "polygon(0 0, 100% 0, calc(100% - 11px) 100%, 0 100%)",
      }}
    >
      {children}
    </span>
  );
}

export function DesignA({ photo }: { photo: boolean }) {
  return (
    <div className="font-sans text-white" style={{ backgroundColor: DEEP }}>
      <header className="border-b" style={{ borderColor: HAIR }}>
        <div className="mx-auto flex max-w-[92rem] flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Logo mono className="h-6 w-auto text-white" />
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
            {["Training", "Consultancy", "Projects", "About"].map((n) => (
              <span key={n} className="text-sm text-white/65">
                {n}
              </span>
            ))}
            <a
              href={CONTACT.mailto}
              className="px-5 py-2.5 text-sm font-semibold text-white"
              style={{ backgroundColor: BRIGHT }}
            >
              Enquire
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-52 -right-52 h-[40rem] w-[40rem] rounded-full opacity-50 blur-3xl"
          style={{ backgroundColor: MID }}
        />

        <div className="relative mx-auto grid max-w-[92rem] gap-12 px-5 pt-14 pb-16 sm:px-8 lg:grid-cols-12 lg:pt-20 lg:pb-24">
          <div className="lg:col-span-6">
            <Tab>Drawing 01 / HVAC design programme</Tab>

            <h1 className="mt-9 text-[2.75rem] leading-[0.96] font-bold tracking-[-0.035em] text-balance sm:text-[4rem] xl:text-[4.75rem]">
              Learn to design building systems that{" "}
              <span style={{ color: SKY }}>actually get built.</span>
            </h1>

            <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/70">
              Six months. Six modules. Taught against live project conditions by
              engineers who answer for these systems on site.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={CONTACT.mailto}
                className="px-7 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: BRIGHT }}
              >
                Enquire about the programme
              </a>
              <a
                href="#work"
                className="border border-white/30 px-7 py-4 text-sm font-semibold transition-colors hover:bg-white/10"
              >
                See the work
              </a>
            </div>
          </div>

          {/* White card floating on the blue field, the flyer's core device. */}
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="p-7 sm:p-8" style={{ backgroundColor: CARD }}>
              <DuctRun
                className="w-full"
                style={{ color: MID }}
                labelColor={DEEP}
              />
              <div
                className="mt-7 flex flex-wrap items-center justify-between gap-2 border-t pt-4"
                style={{ borderColor: "rgba(6,33,71,0.15)" }}
              >
                <span className={MONO} style={{ color: BRIGHT }}>
                  Fig 01 / Supply duct run
                </span>
                <span className={MONO} style={{ color: "#5a6b82" }}>
                  Module 02
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spec band, solid bright blue */}
      <section style={{ backgroundColor: BRIGHT }}>
        <dl className="mx-auto grid max-w-[92rem] grid-cols-2 gap-y-8 px-5 py-9 sm:px-8 lg:grid-cols-4">
          {[
            ["Duration", PROGRAMME.duration],
            ["Modules", String(MODULES.length).padStart(2, "0")],
            ["Mode", PROGRAMME.mode],
            ["Projects delivered", String(PROJECT_COUNT)],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className={`${MONO} text-white/70`}>{k}</dt>
              <dd className="mt-2 text-2xl font-bold tracking-tight text-white">
                {v}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Statement */}
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <p className="mx-auto max-w-4xl text-center text-[1.75rem] leading-[1.22] font-semibold tracking-[-0.025em] text-balance sm:text-[2.75rem]">
          Most buildings are cooled by systems{" "}
          <span style={{ color: SKY }}>nobody calculated.</span> Every
          uncomfortable room was a decision somebody made at design stage.
        </p>
      </section>

      {/* Curriculum, drawings inverted to white on blue */}
      <section style={{ backgroundColor: MID }}>
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-24">
          <Tab>Drawing 02 / Curriculum</Tab>
          <h2 className="mt-8 max-w-2xl text-[2rem] leading-[1.06] font-bold tracking-[-0.03em] sm:text-[3rem]">
            {PROGRAMME.promise}
          </h2>

          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            <div className="space-y-10 lg:col-span-5">
              <figure>
                <ChilledWaterLoop
                  className="w-full"
                  style={{ color: "#ffffff" }}
                  labelColor={SKY}
                />
                <figcaption className={`${MONO} mt-4 block text-white/50`}>
                  Fig 02 / Chilled water circuit
                </figcaption>
              </figure>
              <figure>
                <AhuSection
                  className="w-full"
                  style={{ color: "#ffffff" }}
                  labelColor={SKY}
                />
                <figcaption className={`${MONO} mt-4 block text-white/50`}>
                  Fig 03 / AHU section
                </figcaption>
              </figure>
            </div>

            <ol className="lg:col-span-6 lg:col-start-7">
              {MODULES.map((m) => (
                <li
                  key={m.index}
                  className="border-b py-6 first:border-t"
                  style={{ borderColor: HAIR }}
                >
                  <div className="flex items-baseline gap-5">
                    <span className="text-lg font-bold" style={{ color: SKY }}>
                      {m.index}
                    </span>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {m.title}
                    </h3>
                  </div>
                  <p className="mt-3 pl-11 leading-relaxed text-white/65">
                    {m.description}
                  </p>
                  {m.tools && (
                    <p className={`${MONO} mt-3 block pl-11 text-white/45`}>
                      {m.tools}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Schedule, a white card on the blue */}
      <section id="work" className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[92rem]">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <Tab>Drawing 03 / Delivered work</Tab>
              <h2 className="mt-8 text-[2rem] leading-[1.06] font-bold tracking-[-0.03em] text-balance sm:text-[2.75rem]">
                {PROJECT_COUNT} projects, homes to industrial plant.
              </h2>
            </div>
            <p className={`${MONO} text-white/45`}>Client names withheld</p>
          </div>

          <ul
            className="mt-12"
            style={{ backgroundColor: CARD, color: "#0c1524" }}
          >
            {PROJECTS.map((p, i) => (
              <li
                key={p.slug}
                className="grid gap-2 border-b px-6 py-5 last:border-b-0 sm:px-8 lg:grid-cols-12 lg:items-baseline lg:gap-6"
                style={{ borderColor: "rgba(6,33,71,0.12)" }}
              >
                <span
                  className={`${MONO} lg:col-span-1`}
                  style={{ color: BRIGHT }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-semibold lg:col-span-4">{p.title}</span>
                <span
                  className="text-sm lg:col-span-3"
                  style={{ color: "#54637a" }}
                >
                  {p.system}
                </span>
                <span
                  className={`${MONO} lg:col-span-4`}
                  style={{ color: "#54637a" }}
                >
                  {p.sector}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Close */}
      <section style={{ backgroundColor: MID }}>
        <div className="mx-auto grid max-w-[92rem] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-12">
          {photo && (
            <div className="lg:col-span-4">
              <div
                className="relative aspect-5/6 overflow-hidden"
                style={{ backgroundColor: DEEP }}
              >
                <Image
                  src="/founder.jpg"
                  alt="An engineer from the BMG team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 26rem"
                  className="object-cover object-top grayscale"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 mix-blend-color"
                  style={{ backgroundColor: BRIGHT }}
                />
              </div>
              <p className={`${MONO} mt-4 block text-white/50`}>
                Taught by practising engineers
              </p>
            </div>
          )}

          <div
            className={photo ? "lg:col-span-7 lg:col-start-6" : "lg:col-span-8"}
          >
            <h2 className="text-[2rem] leading-[1.06] font-bold tracking-[-0.03em] text-balance sm:text-[2.75rem]">
              Tell us what you are building, or what you want to learn.
            </h2>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={CONTACT.mailto}
                className="px-7 py-4 text-sm font-semibold text-white"
                style={{ backgroundColor: BRIGHT }}
              >
                {CONTACT.email}
              </a>
              <a
                href={CONTACT.tel}
                className="border border-white/30 px-7 py-4 text-sm font-semibold"
              >
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t px-5 py-7 sm:px-8" style={{ borderColor: HAIR }}>
        <div className="mx-auto flex max-w-[92rem] flex-wrap items-center justify-between gap-3">
          <span className={`${MONO} text-white/45`}>{COMPANY.legalName}</span>
          <span className={`${MONO} text-white/45`}>RC {COMPANY.rcNumber}</span>
        </div>
      </footer>
    </div>
  );
}
