import type { Metadata } from "next";
import Image from "next/image";
import { Container, Eyebrow, Lead, PageHero, SectionHeading } from "@/components/ui";
import { COMPANY, CONTACT } from "@/lib/site";
import { PROJECT_COUNT } from "@/lib/projects";

export const metadata: Metadata = {
  title: "About",
  description:
    "BMG Engineering Limited is a Nigerian mechanical engineering practice delivering MEP training, consultancy, installation and project management.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Engineering excellence, built on trust."
        lead="BMG Engineering Limited delivers timely, accurate and code compliant designs, from first concept through to installation and handover. The same standard runs through everything we teach."
      />

      <section>
        <Container className="py-16 sm:py-24">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
            <div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-ink-100">
                <Image
                  src="/founder.jpg"
                  alt="Founder of BMG Engineering Limited"
                  width={1142}
                  height={1536}
                  priority
                  sizes="(max-width: 1024px) 100vw, 22rem"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* TODO: confirm the name and title to run beneath this portrait. */}
            </div>

            <div className="max-w-2xl">
              <Eyebrow>Why we exist</Eyebrow>
              <SectionHeading className="mt-6">
                Most buildings are cooled by systems nobody calculated.
              </SectionHeading>

              <div className="mt-8 space-y-6 leading-relaxed text-ink-600">
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
                  realising it.
                </p>
                <p>
                  BMG exists on both sides of that gap. We design and deliver
                  mechanical systems ourselves, across {PROJECT_COUNT} completed
                  projects, and we train the engineers who will design the next
                  ones. The training is not a side business. It is the same work
                  done upstream.
                </p>
                <p className="font-display text-lg text-ink-800">
                  {COMPANY.tagline}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-ink-200">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Registered name", COMPANY.legalName],
              ["RC number", COMPANY.rcNumber],
              ["Projects delivered", `${PROJECT_COUNT}`],
              ["Based in", "Lagos, Nigeria"],
            ].map(([label, value]) => (
              <div key={label} className="border-t border-ink-200 pt-6">
                <p className="text-xs font-medium tracking-wide text-ink-500 uppercase">
                  {label}
                </p>
                <p className="font-display mt-3 text-lg font-semibold text-ink-950">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-ink-200 bg-ink-50/60">
        <Container className="py-16 sm:py-24">
          <div className="max-w-2xl">
            <Eyebrow>Talk to us</Eyebrow>
            <SectionHeading className="mt-6">
              An engineer will read it, and an engineer will reply.
            </SectionHeading>
            <Lead className="mt-6">
              No contact form, no ticket number. Write to us directly and you
              will get an answer from somebody who can actually help.
            </Lead>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={CONTACT.mailto}
                className="inline-flex items-center justify-center rounded-full bg-brand-600 px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-brand-700"
              >
                {CONTACT.email}
              </a>
              <a
                href={CONTACT.tel}
                className="inline-flex items-center justify-center rounded-full border border-ink-200 bg-white px-7 py-3.5 text-base font-medium text-ink-800 transition-colors hover:border-ink-300"
              >
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
