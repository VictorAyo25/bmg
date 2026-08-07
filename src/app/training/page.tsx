import type { Metadata } from "next";
import { Button, Container, Eyebrow, Lead, PageHero, SectionHeading } from "@/components/ui";
import { CONTACT } from "@/lib/site";
import { AUDIENCE, MODULES, OUTCOMES, PROGRAMME } from "@/lib/training";

export const metadata: Metadata = {
  title: "HVAC design training",
  description:
    "A six month HVAC design programme taught by practising engineers. Cooling load calculation, duct design, equipment selection, chilled water, AHUs and rooftop systems.",
};

export default function TrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="The programme"
        title={`Become an HVAC design engineer in ${PROGRAMME.duration}.`}
        lead="Six modules, one day a week, taught against live project conditions. You finish able to calculate a load, size a system, select the plant and defend every decision in a design review."
      />

      <section>
        <Container className="py-16 sm:py-24">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink-200 lg:grid-cols-4">
            {[
              ["Duration", PROGRAMME.duration],
              ["Mode", PROGRAMME.mode],
              ["Commitment", PROGRAMME.commitment],
              ["On completion", PROGRAMME.outcome],
            ].map(([label, value]) => (
              <div key={label} className="bg-white p-6 sm:p-8">
                <dt className="text-xs font-medium tracking-wide text-ink-500 uppercase">
                  {label}
                </dt>
                <dd className="font-display mt-3 text-lg font-semibold text-ink-950">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="border-t border-ink-200">
        <Container className="py-16 sm:py-24">
          <div className="max-w-2xl">
            <Eyebrow>Curriculum</Eyebrow>
            <SectionHeading className="mt-6">
              {PROGRAMME.promise}
            </SectionHeading>
            <Lead className="mt-6">
              Each module builds on the last. By the final one you are working
              the way a design office works, not the way a classroom does.
            </Lead>
          </div>

          <ol className="mt-14 space-y-px overflow-hidden rounded-2xl bg-ink-200">
            {MODULES.map((module) => (
              <li
                key={module.index}
                className="grid gap-4 bg-white p-7 sm:grid-cols-[5rem_1fr] sm:gap-8 sm:p-9"
              >
                <span className="font-display text-2xl font-semibold text-brand-600">
                  {module.index}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink-950">
                    {module.title}
                  </h3>
                  {module.tools && (
                    <p className="mt-2 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-medium tracking-wide text-brand-700 uppercase">
                      {module.tools}
                    </p>
                  )}
                  <p className="mt-4 leading-relaxed text-ink-600">
                    {module.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-brand-950 text-white">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-brand-300 uppercase">
                <span aria-hidden className="h-px w-6 bg-brand-400" />
                Who it is for
              </p>
              <h2 className="font-display mt-6 text-3xl leading-[1.1] font-semibold tracking-display sm:text-4xl">
                Built for engineers who want to design, not just install.
              </h2>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {AUDIENCE.map((who) => (
                  <li
                    key={who}
                    className="flex items-start gap-3 text-ink-300"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"
                    />
                    {who}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              {OUTCOMES.map((outcome) => (
                <div
                  key={outcome.title}
                  className="border-t border-white/10 pt-6"
                >
                  <h3 className="font-display text-lg font-semibold text-white">
                    {outcome.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-300">
                    {outcome.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-ink-200 bg-ink-50/60">
        <Container className="py-16 sm:py-24">
          <div className="max-w-2xl">
            <Eyebrow>Next intake</Eyebrow>
            <SectionHeading className="mt-6">
              Places are limited, and the group is kept small on purpose.
            </SectionHeading>
            <Lead className="mt-6">
              Write to us for the current intake dates, the fee and how payment
              works. You will hear back from an engineer who can answer
              questions about the curriculum itself.
            </Lead>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={`${CONTACT.mailto}?subject=HVAC%20design%20training%20enquiry`}
                className="inline-flex items-center justify-center rounded-full bg-brand-600 px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-brand-700"
              >
                Enquire about the programme
              </a>
              <Button href="/projects" variant="secondary">
                See our project work
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
