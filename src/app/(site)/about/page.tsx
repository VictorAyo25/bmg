import type { Metadata } from "next";
import { Container, Note, PageHero } from "@/components/ui";
import { MepPlan } from "@/components/mep-plan";
import { Reveal } from "@/components/reveal";
import { COMPANY, CONTACT } from "@/lib/site";
import { DESIGN_PROJECTS } from "@/lib/projects";
import { MODULES } from "@/lib/training";

export const metadata: Metadata = {
  title: "About",
  description:
    "BMG Engineering Limited is a mechanical engineering practice delivering MEP training, consultancy, installation and project management.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title="Engineering excellence, built on trust."
        lead="We deliver timely, accurate and code compliant designs, from first concept through to handover. The same standard runs through everything we teach."
      />

      <section>
        <Container className="py-20 sm:py-28">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-5">
              <MepPlan className="w-full text-white/60" />
              <p className="mt-5 border-t border-white/12 pt-4">
                <Note className="text-white/40">
                  Typical air side layout, supply and return
                </Note>
              </p>
            </Reveal>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                <Note className="text-sky">Why we exist</Note>
                <h2 className="mt-7 text-[2rem] leading-[1.08] font-bold tracking-[-0.03em] text-balance sm:text-[2.5rem]">
                  Most buildings are cooled by systems nobody calculated.
                </h2>
              </Reveal>

              <Reveal delay={80}>
                <div className="mt-8 space-y-6 text-lg leading-relaxed text-white/70">
                  <p>
                    There is a gap in this industry between an
                    architect&rsquo;s drawing and a building that works. It gets
                    filled by rules of thumb, by equipment sized to whatever was
                    installed last time, and by engineers who were never taught
                    the difference.
                  </p>
                  <p>
                    The result is buildings that are uncomfortable, expensive to
                    run and impossible to maintain, and clients who assume that
                    is simply how it goes. It is not. Every one of those
                    outcomes is a decision somebody made at design stage,
                    usually without realising they were making it.
                  </p>
                  <p>
                    BMG works on both sides of that gap. We design mechanical
                    systems ourselves, across {DESIGN_PROJECTS} design projects,
                    and we train the engineers who will design the next ones.
                    The training is not a side business. It is the same work
                    done upstream.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <p className="mt-10 border-t border-white/12 pt-8 text-[1.5rem] leading-snug font-semibold tracking-[-0.02em] text-sky sm:text-[1.75rem]">
                  {COMPANY.tagline}
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-white/12 bg-mid">
        <Container>
          <dl className="grid sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Registered name", COMPANY.legalName],
              ["RC number", COMPANY.rcNumber],
              ["Design projects", String(DESIGN_PROJECTS)],
              ["Design modules taught", String(MODULES.length).padStart(2, "0")],
              ["Disciplines", "Mechanical, electrical, plumbing"],
              ["Contact", CONTACT.email],
            ].map(([label, value]) => (
              <div
                key={label}
                className="border-t border-white/12 py-8 sm:px-8"
              >
                <dt>
                  <Note className="text-white/45">{label}</Note>
                </dt>
                <dd className="mt-3 break-words">{value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section>
        <Container className="py-20 sm:py-28">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12">
              <h2 className="text-[2rem] leading-[1.06] font-bold tracking-[-0.03em] text-balance sm:text-[2.75rem] lg:col-span-7">
                An engineer will read it, and an engineer will reply.
              </h2>
              <div className="lg:col-span-4 lg:col-start-9">
                <p className="leading-relaxed text-white/65">
                  No contact form and no ticket number. Write to us directly and
                  you will get an answer from somebody who can actually help.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={CONTACT.mailto}
                    className="bg-brand-600 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                  >
                    {CONTACT.email}
                  </a>
                  <a
                    href={CONTACT.tel}
                    className="border border-white/30 px-7 py-4 text-sm font-semibold transition-colors hover:bg-white/10"
                  >
                    {CONTACT.phone}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
