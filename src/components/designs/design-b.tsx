import Image from "next/image";
import { Logo } from "@/components/logo";
import { COMPANY, CONTACT } from "@/lib/site";
import { MODULES, PROGRAMME } from "@/lib/training";
import { PROJECTS, PROJECT_COUNT } from "@/lib/projects";

/**
 * Option B, Monograph.
 *
 * Blue dominant like the others, but the blue is deep and the page is quiet.
 * A serif set very large on navy, with one cream section as relief so the
 * blue has something to be measured against. Closer to an architecture
 * monograph than to a brochure, and the only direction here that whispers.
 */

const NAVY = "#0a2a52";
const DEEPER = "#061c3a";
const CREAM = "#f2ede3";
const BRIGHT = "#097ccd";
const SKY = "#8fcbf7";

const CAPS = "text-[0.6875rem] tracking-[0.22em] uppercase";

export function DesignB({ photo }: { photo: boolean }) {
  return (
    <div className="font-sans" style={{ backgroundColor: NAVY, color: CREAM }}>
      <header className="mx-auto flex max-w-[80rem] flex-wrap items-center justify-between gap-4 px-6 py-8 sm:px-10">
        <Logo mono className="h-6 w-auto" style={{ color: CREAM }} />
        <nav className="hidden gap-9 md:flex">
          {["Training", "Consultancy", "Projects", "About"].map((n) => (
            <span key={n} className={`${CAPS} opacity-65`}>
              {n}
            </span>
          ))}
        </nav>
        <a href={CONTACT.mailto} className={CAPS} style={{ color: SKY }}>
          Enquire
        </a>
      </header>

      {/* Opening spread */}
      <section className="mx-auto max-w-[80rem] px-6 pt-14 pb-20 sm:px-10 sm:pt-20 sm:pb-28">
        <p className={CAPS} style={{ color: SKY }}>
          One &nbsp;/&nbsp; The programme
        </p>

        <h1 className="mt-12 max-w-5xl font-serif text-[3.25rem] leading-[0.94] tracking-[-0.015em] text-balance sm:text-[5.5rem] lg:text-[6.75rem]">
          Learn to design building systems that{" "}
          <em className="italic" style={{ color: SKY }}>
            actually
          </em>{" "}
          get built.
        </h1>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:items-start">
          <dl className="lg:col-span-4">
            {[
              ["Duration", PROGRAMME.duration],
              ["Mode", PROGRAMME.mode],
              ["Commitment", PROGRAMME.commitment],
              ["On completion", PROGRAMME.outcome],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-6 border-t py-3"
                style={{ borderColor: "rgba(242,237,227,0.18)" }}
              >
                <dt className={CAPS} style={{ opacity: 0.55 }}>
                  {k}
                </dt>
                <dd className="font-serif text-xl">{v}</dd>
              </div>
            ))}
          </dl>

          <p className="max-w-md text-lg leading-[1.7] lg:col-span-5 lg:col-start-6">
            <span className="float-left mt-2 mr-3 font-serif text-[3.5rem] leading-[0.72]">
              S
            </span>
            ix months, six modules, taught against live project conditions by
            engineers who answer for these systems on site. You finish able to
            calculate a load, size a system, select the plant, and defend every
            decision in a design review.
          </p>

          <div className="lg:col-span-2 lg:col-start-11">
            <a
              href={CONTACT.mailto}
              className="inline-block border-b pb-1 text-lg"
              style={{ borderColor: BRIGHT, color: SKY }}
            >
              Request the syllabus
            </a>
          </div>
        </div>
      </section>

      {/* Plate. Portrait duotoned into the blue, or the statement running wide. */}
      <section
        className="border-y"
        style={{
          backgroundColor: DEEPER,
          borderColor: "rgba(242,237,227,0.14)",
        }}
      >
        <div className="mx-auto max-w-[80rem] px-6 py-16 sm:px-10 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {photo && (
              <figure className="lg:col-span-5">
                <div
                  className="relative aspect-5/6 w-full overflow-hidden"
                  style={{ backgroundColor: NAVY }}
                >
                  <Image
                    src="/founder.jpg"
                    alt="An engineer from the BMG team"
                    fill
                    sizes="(max-width: 1024px) 100vw, 32rem"
                    className="object-cover object-top grayscale"
                    priority
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 mix-blend-color"
                    style={{ backgroundColor: BRIGHT }}
                  />
                </div>
                <figcaption className={`${CAPS} mt-6 block`} style={{ opacity: 0.55 }}>
                  Taught by practising engineers
                </figcaption>
              </figure>
            )}

            <blockquote
              className={photo ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-7"}
            >
              <p className="font-serif text-[2.25rem] leading-[1.16] tracking-[-0.015em] text-balance sm:text-[3.25rem]">
                Most buildings are cooled by systems nobody calculated.
              </p>
              <p
                className="mt-8 max-w-md text-lg leading-[1.7]"
                style={{ opacity: 0.72 }}
              >
                Every uncomfortable room and every ruinous energy bill was a
                decision somebody made at design stage, usually without
                realising they were making it. That is the gap this programme
                exists to close.
              </p>
            </blockquote>

            {!photo && (
              <div className="lg:col-span-4 lg:col-start-9">
                <p
                  className="font-serif text-[5rem] leading-none"
                  style={{ color: SKY }}
                >
                  {PROJECT_COUNT}
                </p>
                <p className={`${CAPS} mt-4 block`} style={{ opacity: 0.55 }}>
                  Projects delivered
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contents, on cream. The one light section, so the blue reads as a choice. */}
      <section style={{ backgroundColor: CREAM, color: "#12253f" }}>
        <div className="mx-auto max-w-[80rem] px-6 py-20 sm:px-10 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className={CAPS} style={{ color: BRIGHT }}>
                Two &nbsp;/&nbsp; Contents
              </p>
              <p className="mt-8 font-serif text-3xl leading-tight">
                {PROGRAMME.promise}
              </p>
            </div>

            <ol className="lg:col-span-8 lg:col-start-5">
              {MODULES.map((m) => (
                <li
                  key={m.index}
                  className="grid gap-4 border-t py-8 sm:grid-cols-12"
                  style={{ borderColor: "rgba(18,37,63,0.16)" }}
                >
                  <span
                    className={`${CAPS} pt-2 sm:col-span-2`}
                    style={{ color: BRIGHT }}
                  >
                    {m.index}
                  </span>
                  <div className="sm:col-span-10">
                    <h3 className="font-serif text-2xl leading-snug sm:text-[1.75rem]">
                      {m.title}
                    </h3>
                    <p className="mt-3 max-w-xl leading-[1.7] opacity-75">
                      {m.description}
                    </p>
                    {m.tools && (
                      <p className={`${CAPS} mt-4`} style={{ color: BRIGHT }}>
                        {m.tools}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Selected work, back on navy */}
      <section className="mx-auto max-w-[80rem] px-6 py-20 sm:px-10 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className={CAPS} style={{ color: SKY }}>
              Three &nbsp;/&nbsp; Selected work
            </p>
            <h2 className="mt-8 font-serif text-[2.5rem] leading-[1.05] text-balance sm:text-[3.25rem]">
              {PROJECT_COUNT} projects, delivered.
            </h2>
            <p className="mt-6 max-w-xs leading-[1.7]" style={{ opacity: 0.7 }}>
              Client names are withheld throughout. We would rather show you the
              engineering than trade on somebody else&rsquo;s letterhead.
            </p>
          </div>

          <ol className="lg:col-span-7 lg:col-start-6">
            {PROJECTS.map((p, i) => (
              <li
                key={p.slug}
                className="flex items-baseline justify-between gap-8 border-t py-5"
                style={{ borderColor: "rgba(242,237,227,0.18)" }}
              >
                <span className="flex items-baseline gap-6">
                  <span className={CAPS} style={{ opacity: 0.45 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-xl sm:text-2xl">
                    {p.title}
                  </span>
                </span>
                <span
                  className={`${CAPS} hidden shrink-0 sm:block`}
                  style={{ opacity: 0.45 }}
                >
                  {p.sector}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Colophon */}
      <footer style={{ backgroundColor: BRIGHT }}>
        <div className="mx-auto max-w-[80rem] px-6 py-20 sm:px-10 sm:py-24">
          <p className="max-w-3xl font-serif text-[2rem] leading-[1.15] text-balance text-white sm:text-[3rem]">
            {COMPANY.tagline}
          </p>

          <div className="mt-14 grid gap-8 border-t border-white/25 pt-10 sm:grid-cols-3">
            {[
              ["Email", CONTACT.email, CONTACT.mailto],
              ["Telephone", CONTACT.phone, CONTACT.tel],
              ["Registration", `RC ${COMPANY.rcNumber}`, null],
            ].map(([label, value, href]) => (
              <div key={label as string}>
                <p className={`${CAPS} text-white/60`}>{label}</p>
                {href ? (
                  <a
                    href={href as string}
                    className="mt-3 block break-all text-lg text-white underline-offset-4 hover:underline"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="mt-3 text-lg text-white">{value}</p>
                )}
              </div>
            ))}
          </div>

          <p className={`${CAPS} mt-14 text-white/60`}>{COMPANY.legalName}</p>
        </div>
      </footer>
    </div>
  );
}
