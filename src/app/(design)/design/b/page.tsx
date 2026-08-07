import type { Metadata } from "next";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { CONTACT } from "@/lib/site";
import { MODULES, PROGRAMME } from "@/lib/training";
import { PROJECTS, PROJECT_COUNT } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Option B, Editorial",
  robots: { index: false, follow: false },
};

/**
 * Editorial direction.
 *
 * Rules of this system: warm paper, one serif doing all the display work,
 * almost no boxes or borders, and space carrying the hierarchy instead of
 * containers. Text sits on a narrow measure offset from centre, the way a
 * printed monograph sets a column, rather than filling the viewport.
 */

const PAPER = "#f3efe7";
const INK = "#191714";
const ACCENT = "#0a62a5";

const CAPS = "text-[0.6875rem] tracking-[0.22em] uppercase";

export default function OptionB() {
  return (
    <div
      className="font-sans"
      style={{ backgroundColor: PAPER, color: INK }}
    >
      <header className="mx-auto flex max-w-[78rem] items-center justify-between px-6 py-8 sm:px-10">
        <Logo className="h-6 w-auto" />
        <nav className="hidden gap-9 md:flex">
          {["Training", "Consultancy", "Projects", "About"].map((n) => (
            <span key={n} className={`${CAPS} opacity-60`}>
              {n}
            </span>
          ))}
        </nav>
        <a href={CONTACT.mailto} className={CAPS} style={{ color: ACCENT }}>
          Enquire
        </a>
      </header>

      {/* Opening spread. Type does everything, nothing is boxed. */}
      <section className="mx-auto max-w-[78rem] px-6 pt-16 pb-24 sm:px-10 sm:pt-24 sm:pb-32">
        <p className={CAPS} style={{ opacity: 0.5 }}>
          One &nbsp;&mdash;&nbsp; The programme
        </p>

        <h1
          className="mt-12 max-w-5xl font-serif text-[3.25rem] leading-[0.94] tracking-[-0.015em] text-balance sm:text-[5.5rem] lg:text-[7rem]"
        >
          Learn to design building systems that{" "}
          <em className="italic" style={{ color: ACCENT }}>
            actually
          </em>{" "}
          get built.
        </h1>

        {/* Offset column, not centred, not full width. */}
        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <p className="max-w-md text-lg leading-[1.7] lg:col-span-5 lg:col-start-6">
            <span className="float-left mt-2 mr-3 font-serif text-[3.5rem] leading-[0.72]">
              S
            </span>
            ix months, six modules, taught against live project conditions by
            engineers who answer for these systems on site. You finish able to
            calculate a load, size a system, select the plant, and defend every
            decision in a design review.
          </p>
          <div className="lg:col-span-3 lg:col-start-11">
            <a
              href={CONTACT.mailto}
              className="inline-block border-b pb-1 text-lg"
              style={{ borderColor: ACCENT, color: ACCENT }}
            >
              Request the syllabus
            </a>
          </div>
        </div>
      </section>

      {/* Portrait against the pull quote.
          The photograph was shot on white, so multiplying it into the paper
          drops the studio background out entirely and the subject reads as
          printed on the page rather than pasted onto it. */}
      <section className="mx-auto max-w-[78rem] px-6 py-16 sm:px-10 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <figure className="lg:col-span-5">
            <div
              className="relative aspect-5/6 w-full overflow-hidden"
              style={{ backgroundColor: PAPER }}
            >
              <Image
                src="/founder.jpg"
                alt="An engineer from the BMG team"
                fill
                sizes="(max-width: 1024px) 100vw, 32rem"
                className="object-cover object-top grayscale mix-blend-multiply"
                priority
              />
            </div>
            <figcaption
              className={`${CAPS} mt-6 block`}
              style={{ opacity: 0.5 }}
            >
              Taught by practising engineers
            </figcaption>
          </figure>

          <blockquote className="lg:col-span-6 lg:col-start-7">
            <p className="font-serif text-[2rem] leading-[1.2] tracking-[-0.01em] text-balance sm:text-[2.75rem]">
              Most buildings are cooled by systems nobody calculated.
            </p>
            <p
              className="mt-8 max-w-md text-lg leading-[1.7]"
              style={{ opacity: 0.72 }}
            >
              Every uncomfortable room and every ruinous energy bill was a
              decision somebody made at design stage, usually without realising
              they were making it. That is the gap this programme exists to
              close.
            </p>
          </blockquote>
        </div>
      </section>

      {/* Curriculum as a printed contents list. */}
      <section className="mx-auto max-w-[78rem] px-6 pb-24 sm:px-10 sm:pb-36">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className={CAPS} style={{ opacity: 0.5 }}>
              Two &nbsp;&mdash;&nbsp; Contents
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
                style={{ borderColor: `${INK}1f` }}
              >
                <span
                  className={`${CAPS} pt-2 sm:col-span-2`}
                  style={{ opacity: 0.45 }}
                >
                  {m.index}
                </span>
                <div className="sm:col-span-10">
                  <h3 className="font-serif text-2xl leading-snug sm:text-[1.75rem]">
                    {m.title}
                  </h3>
                  <p
                    className="mt-3 max-w-xl leading-[1.7]"
                    style={{ opacity: 0.72 }}
                  >
                    {m.description}
                  </p>
                  {m.tools && (
                    <p className={`${CAPS} mt-4`} style={{ color: ACCENT }}>
                      {m.tools}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Work, set as an index rather than a grid of cards. */}
      <section
        className="border-t"
        style={{ borderColor: `${INK}1f` }}
      >
        <div className="mx-auto max-w-[78rem] px-6 py-24 sm:px-10 sm:py-32">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className={CAPS} style={{ opacity: 0.5 }}>
                Three &nbsp;&mdash;&nbsp; Selected work
              </p>
              <h2 className="mt-8 font-serif text-[2.5rem] leading-[1.05] text-balance sm:text-[3.25rem]">
                {PROJECT_COUNT} projects, delivered.
              </h2>
              <p className="mt-6 max-w-xs leading-[1.7]" style={{ opacity: 0.7 }}>
                Client names are withheld throughout. We would rather show you
                the engineering than trade on somebody else&rsquo;s letterhead.
              </p>
            </div>

            <ol className="lg:col-span-7 lg:col-start-6">
              {PROJECTS.map((p, i) => (
                <li
                  key={p.slug}
                  className="flex items-baseline justify-between gap-8 border-t py-5"
                  style={{ borderColor: `${INK}1f` }}
                >
                  <span className="flex items-baseline gap-6">
                    <span className={CAPS} style={{ opacity: 0.4 }}>
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
        </div>
      </section>

      {/* Colophon. */}
      <footer style={{ backgroundColor: INK, color: PAPER }}>
        <div className="mx-auto max-w-[78rem] px-6 py-20 sm:px-10 sm:py-28">
          <p className="max-w-3xl font-serif text-[2rem] leading-[1.15] text-balance sm:text-[3rem]">
            Creating your vision, one design at a time.
          </p>

          <div className="mt-16 grid gap-8 border-t border-white/15 pt-10 sm:grid-cols-3">
            <div>
              <p className={CAPS} style={{ opacity: 0.45 }}>
                Email
              </p>
              <a
                href={CONTACT.mailto}
                className="mt-3 block break-all text-lg underline-offset-4 hover:underline"
              >
                {CONTACT.email}
              </a>
            </div>
            <div>
              <p className={CAPS} style={{ opacity: 0.45 }}>
                Telephone
              </p>
              <a href={CONTACT.tel} className="mt-3 block text-lg">
                {CONTACT.phone}
              </a>
            </div>
            <div>
              <p className={CAPS} style={{ opacity: 0.45 }}>
                Registration
              </p>
              <p className="mt-3 text-lg">RC 9085536</p>
            </div>
          </div>

          <p className={`${CAPS} mt-16`} style={{ opacity: 0.35 }}>
            BMG Engineering Limited
          </p>
        </div>
      </footer>
    </div>
  );
}
