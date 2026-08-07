import type { Metadata } from "next";
import Image from "next/image";
import { Arrow, Container, Note, PageHero } from "@/components/ui";
import { COMPANY, CONTACT } from "@/lib/site";
import { PROJECT_COUNT } from "@/lib/projects";
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
        sheet="Sheet 05"
        label="About"
        title="Engineering excellence, built on trust."
        lead="We deliver timely, accurate and code compliant designs, from first concept through to installation and handover. The same standard runs through everything we teach."
      />

      <section className="bg-paper">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <figure className="lg:col-span-4">
              <div className="relative aspect-4/5 overflow-hidden bg-white">
                <Image
                  src="/founder.jpg"
                  alt="An engineer from the BMG team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 26rem"
                  className="object-cover object-top"
                  priority
                />
              </div>
              {/* TODO: confirm the name and title to run in this caption. */}
              <figcaption className="mt-4 flex items-center justify-between border-t rule pt-4">
                <Note className="text-ink-400">Fig 01</Note>
                <Note className="text-ink-400">BMG Engineering</Note>
              </figcaption>
            </figure>

            <div className="lg:col-span-7 lg:col-start-6">
              <Note className="text-brand-700">Why we exist</Note>
              <h2 className="mt-8 text-[2rem] leading-[1.1] font-semibold tracking-display text-balance text-ink-950 sm:text-[2.5rem]">
                Most buildings are cooled by systems nobody calculated.
              </h2>

              <div className="mt-8 space-y-6 text-[1.0625rem] leading-relaxed text-ink-600">
                <p>
                  There is a gap in this industry between an architect&rsquo;s
                  drawing and a building that works. It gets filled by rules of
                  thumb, by equipment sized to whatever was installed last time,
                  and by engineers who were never taught the difference.
                </p>
                <p>
                  The result is buildings that are uncomfortable, expensive to
                  run and impossible to maintain, and clients who assume that is
                  simply how it goes. It is not. Every one of those outcomes is
                  a decision somebody made at design stage, usually without
                  realising they were making it.
                </p>
                <p>
                  BMG works on both sides of that gap. We design and deliver
                  mechanical systems ourselves, across {PROJECT_COUNT} completed
                  projects, and we train the engineers who will design the next
                  ones. The training is not a side business. It is the same work
                  done upstream.
                </p>
              </div>

              <p className="mt-10 border-t rule pt-8 text-[1.375rem] leading-snug tracking-display text-ink-900 sm:text-[1.625rem]">
                {COMPANY.tagline}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y rule bg-white">
        <Container>
          <dl className="grid sm:grid-cols-3">
            {[
              ["Registered name", COMPANY.legalName],
              ["RC number", COMPANY.rcNumber],
              ["Projects delivered", String(PROJECT_COUNT)],
              ["Design modules taught", String(MODULES.length).padStart(2, "0")],
              ["Disciplines", "Mechanical, electrical, plumbing"],
              ["Contact", CONTACT.email],
            ].map(([label, value]) => (
              <div key={label} className="border-t rule py-8 sm:px-8">
                <dt>
                  <Note className="text-ink-500">{label}</Note>
                </dt>
                <dd className="mt-3 break-words text-ink-950">{value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bg-paper">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Note className="text-brand-700">Talk to us</Note>
              <p className="mt-8 text-[2rem] leading-[1.1] font-semibold tracking-display text-balance text-ink-950 sm:text-[2.75rem]">
                An engineer will read it, and an engineer will reply.
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="leading-relaxed text-ink-600">
                No contact form and no ticket number. Write to us directly and
                you will get an answer from somebody who can actually help.
              </p>
              <div className="mt-8 border-t rule">
                <a
                  href={CONTACT.mailto}
                  className="group flex items-center justify-between border-b rule py-5 transition-colors hover:text-brand-700"
                >
                  <span className="text-sm break-all">{CONTACT.email}</span>
                  <Arrow />
                </a>
                <a
                  href={CONTACT.tel}
                  className="group flex items-center justify-between border-b rule py-5 transition-colors hover:text-brand-700"
                >
                  <span className="text-sm">{CONTACT.phone}</span>
                  <Arrow />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
