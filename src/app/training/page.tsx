import type { Metadata } from "next";
import { Arrow, Button, Container, Note, PageHero, SectionHead } from "@/components/ui";
import { CONTACT } from "@/lib/site";
import { AUDIENCE, MODULES, OUTCOMES, PROGRAMME } from "@/lib/training";

export const metadata: Metadata = {
  title: "HVAC design training",
  description:
    "A six month HVAC design programme taught by practising engineers. Cooling load calculation, duct design, equipment selection, chilled water, air handling units and rooftop systems.",
};

export default function TrainingPage() {
  return (
    <>
      <PageHero
        sheet="Sheet 02"
        label="The programme"
        title={`Become an HVAC design engineer in ${PROGRAMME.duration}.`}
        lead="Six modules, one day a week, taught against live project conditions. You finish able to calculate a load, size a system, select the plant and defend every decision in a design review."
      />

      <section className="border-b rule bg-white">
        <Container>
          <dl className="grid sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Duration", PROGRAMME.duration],
              ["Mode", PROGRAMME.mode],
              ["Commitment", PROGRAMME.commitment],
              ["On completion", PROGRAMME.outcome],
            ].map(([label, value], i) => (
              <div
                key={label}
                className={`py-8 sm:px-8 ${i > 0 ? "border-t rule sm:border-t-0 sm:border-l" : ""} ${i === 2 ? "sm:border-t lg:border-t-0" : ""} ${i === 3 ? "sm:border-t lg:border-t-0" : ""}`}
              >
                <dt>
                  <Note className="text-ink-500">{label}</Note>
                </dt>
                <dd className="mt-3 text-lg font-medium text-ink-950">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bg-paper">
        <Container className="py-20 sm:py-28">
          <SectionHead
            sheet="Sec 01"
            label="Curriculum"
            title={PROGRAMME.promise}
            lead="Each module builds on the last. By the final one you are working the way a design office works, not the way a classroom does."
          />

          <ol className="mt-16 border-t rule">
            {MODULES.map((module) => (
              <li
                key={module.index}
                className="grid gap-4 border-b rule py-9 lg:grid-cols-12 lg:gap-12"
              >
                <div className="lg:col-span-1">
                  <Note className="text-brand-600">{module.index}</Note>
                </div>
                <div className="lg:col-span-4">
                  <h3 className="text-xl leading-snug font-semibold tracking-display text-ink-950 lg:text-2xl">
                    {module.title}
                  </h3>
                  {module.tools && (
                    <p className="mt-3">
                      <Note className="text-brand-700">{module.tools}</Note>
                    </p>
                  )}
                </div>
                <p className="max-w-2xl leading-relaxed text-ink-600 lg:col-span-7">
                  {module.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-brand-950 text-white">
        <Container className="py-20 sm:py-28">
          <SectionHead
            invert
            sheet="Sec 02"
            label="Who it is for"
            title="Built for engineers who want to design, not just install."
            lead="If you can already read a drawing but could not produce one from first principles, this is aimed squarely at you."
          />

          <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-12">
            <ul className="border-t rule-invert lg:col-span-5">
              {AUDIENCE.map((who, i) => (
                <li
                  key={who}
                  className="flex items-baseline gap-5 border-b rule-invert py-4"
                >
                  <Note className="text-brand-400">
                    {String(i + 1).padStart(2, "0")}
                  </Note>
                  <span className="text-white/85">{who}</span>
                </li>
              ))}
            </ul>

            <div className="lg:col-span-6 lg:col-start-7">
              {OUTCOMES.map((outcome) => (
                <div
                  key={outcome.title}
                  className="border-t rule-invert py-6 last:border-b"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {outcome.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-white/60">
                    {outcome.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t rule bg-white">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Note className="text-brand-700">Next intake</Note>
              <p className="mt-8 text-[2rem] leading-[1.1] font-semibold tracking-display text-balance text-ink-950 sm:text-[2.75rem]">
                Places are limited, and the group is kept small on purpose.
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="leading-relaxed text-ink-600">
                Write to us for the current intake dates, the fee and how
                payment works. You will hear back from an engineer who can
                answer questions about the curriculum itself.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={`${CONTACT.mailto}?subject=HVAC%20design%20training%20enquiry`}
                  className="group inline-flex items-center justify-between bg-ink-950 px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-brand-700"
                >
                  Enquire about the programme
                  <Arrow />
                </a>
                <Button href="/projects" variant="outline">
                  See our project work
                  <Arrow />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
