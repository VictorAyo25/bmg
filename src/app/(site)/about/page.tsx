import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
        images={["/img/about.jpg", "/img/hero/01.jpg", "/img/hero/04.jpg"]}
      />

      <section className="panel-section">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-5">
              <MepPlan className="w-full text-fg-muted" />
              <p className="mt-5 border-t border-rule pt-4">
                <Note className="text-fg-subtle">
                  Typical air side layout, supply and return
                </Note>
              </p>
            </Reveal>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                <Note className="text-accent">Why we exist</Note>
                <h2 className="mt-7 text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.016em] text-balance sm:text-[2.125rem]">
                  Most buildings are cooled by systems nobody calculated.
                </h2>
              </Reveal>

              <Reveal delay={80}>
                <div className="mt-8 space-y-6 leading-relaxed text-fg-muted">
                  <p>
                    There is a gap in this industry between an architect&rsquo;s
                    drawing and a building that works. It gets filled by rules
                    of thumb, by equipment sized to whatever was installed last
                    time, and by engineers who were never taught the difference.
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
                <p className="mt-10 border-t border-rule pt-8 text-[1.5rem] leading-snug font-semibold tracking-[-0.02em] text-accent sm:text-[1.75rem]">
                  {COMPANY.tagline}
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="surface-dark panel-dark bg-mid">
        <Container>
          <dl className="grid sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Registered name", COMPANY.legalName],
              ["RC number", COMPANY.rcNumber],
              ["Design projects", String(DESIGN_PROJECTS)],
              [
                "Design modules taught",
                String(MODULES.length).padStart(2, "0"),
              ],
              ["Disciplines", "Mechanical, electrical, plumbing"],
              ["Contact", CONTACT.email],
            ].map(([label, value]) => (
              <div
                key={label}
                className="border-t border-rule py-8 sm:px-8"
              >
                <dt>
                  <Note className="text-fg-subtle">{label}</Note>
                </dt>
                <dd className="mt-3 break-words">{value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/*
        The one genuinely real photograph on the site. Everything else is
        licensed atmosphere, so this earns a block of its own rather than
        being dropped into a column beside a drawing.
      */}
      <section className="panel-section">
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-4">
              <figure>
                <div className="relative aspect-4/5 overflow-hidden rounded-[var(--radius)] bg-brand-50">
                  <Image
                    src="/founder.jpg"
                    alt="Favour Olayode of BMG Engineering Limited"
                    fill
                    sizes="(max-width: 1024px) 100vw, 24rem"
                    className="object-cover object-top"
                  />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between border-t border-rule pt-4">
                  <span className="font-semibold">Favour Olayode</span>
                  {/* TODO: confirm the job title to run alongside the name. */}
                  <Note className="text-fg-subtle">BMG Engineering</Note>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={90} className="lg:col-span-7 lg:col-start-6">
              <Note className="text-accent">Who you deal with</Note>
              <h2 className="mt-6 text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.016em] text-balance sm:text-[2.125rem]">
                Small enough that the person who answers is the person who
                designs.
              </h2>
              <p className="mt-6 leading-relaxed text-fg-muted">
                There is no account manager between you and the engineering. An
                enquiry is read by somebody who can tell you straight away
                whether the thing you are asking for is sensible, what it will
                involve, and where the cost actually sits.
              </p>
              <p className="mt-4 leading-relaxed text-fg-muted">
                That is a deliberate limit on how much work we take at once,
                and it is the reason the answers are worth having.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-20 sm:py-28">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12">
              <h2 className="text-[1.75rem] leading-[1.1] font-semibold tracking-[-0.016em] text-balance sm:text-[2.25rem] lg:col-span-7">
                That is the standard we work to. Hold us to it.
              </h2>
              <div className="lg:col-span-4 lg:col-start-9">
                <p className="leading-relaxed text-fg-muted">
                  Send us a drawing, a scope, or a problem you have not been
                  able to solve. We will tell you plainly what is involved and
                  what it will take.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="bg-brand-600 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                  >
                    Contact us
                  </Link>
                  <a
                    href={CONTACT.tel}
                    className="border border-rule-strong px-7 py-4 text-sm font-semibold transition-colors hover:bg-tint"
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
