import type { Metadata } from "next";
import Link from "next/link";
import { Button, Container, Note, PageHero, Tab } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { AUDIENCE, MODULES, OUTCOMES, PROGRAMME } from "@/lib/training";

export const metadata: Metadata = {
  title: "HVAC design training",
  description:
    "HVAC design training taught by practising engineers. Cooling load calculation, duct design, equipment selection, chilled water, air handling units and rooftop systems.",
};

/**
 * Training.
 *
 * Structural device for this page: the numbered curriculum runs as one
 * continuous spine with the module number set very large in the margin, so
 * scrolling it feels like moving along a course rather than reading a stack
 * of equal boxes. The audience list then interlocks with the outcomes rather
 * than sitting beside them in a matching column.
 *
 * Every page gets a different device on purpose. If they all get the same
 * one, the site is uniform again and back to reading as a deck.
 */
export default function TrainingPage() {
  return (
    <>
      <PageHero
        label="The programme"
        title="Become an HVAC design engineer."
        images={["/img/training.jpg", "/img/hero/04.jpg", "/img/hero/02.jpg"]}
      />

      {/* Tight numeric band. Short, straight after a tall hero. */}
      <section className="surface-dark bg-mid">
        <Container className="py-14 sm:py-16">
          <dl className="grid gap-10 sm:grid-cols-4">
            <Reveal>
              <dt>
                <Note className="text-fg-subtle">Modules</Note>
              </dt>
              <dd className="mt-3 text-[2.5rem] leading-none font-semibold tracking-[-0.02em]">
                <CountUp to={MODULES.length} />
              </dd>
            </Reveal>
            {[
              ["Duration", PROGRAMME.duration],
              ["Mode", PROGRAMME.mode],
              ["On completion", PROGRAMME.outcome],
            ].map(([label, value], i) => (
              <Reveal key={label} delay={(i + 1) * 80}>
                <dt>
                  <Note className="text-fg-subtle">{label}</Note>
                </dt>
                <dd className="mt-3 text-xl font-semibold">{value}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/*
        The spine. One continuous rule down the page with oversized numerals
        hanging off it, so the curriculum reads as a route rather than a list
        of equal blocks.
      */}
      <section>
        <Container className="py-20 sm:py-28">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <Tab>Curriculum</Tab>
                <h2 className="mt-8 text-[1.75rem] leading-[1.1] font-semibold tracking-[-0.016em] text-balance sm:text-[2.25rem]">
                  {PROGRAMME.promise}
                </h2>
              </div>
              <p className="leading-relaxed text-fg-muted lg:col-span-5 lg:col-start-8 lg:pt-14">
                Each module builds on the one before it. By the last, you are
                working the way a design office works rather than the way a
                classroom does.
              </p>
            </div>
          </Reveal>

          <ol className="mt-16">
            {MODULES.map((m, i) => (
              <Reveal
                as="li"
                key={m.index}
                delay={i * 45}
                className="group relative block border-l border-rule pb-14 pl-6 last:pb-0 sm:pl-10"
              >
                {/* The marker sits on the spine itself. */}
                <span
                  aria-hidden
                  className="absolute top-2 -left-[5px] h-2.5 w-2.5 rounded-full bg-brand-600 ring-4 ring-white"
                />
                <div className="grid gap-4 lg:grid-cols-12 lg:gap-10">
                  <span className="font-mono text-[2.5rem] leading-none text-brand-100 sm:text-[3.5rem] lg:col-span-2">
                    {m.index}
                  </span>
                  <div className="lg:col-span-4">
                    <h3 className="text-xl font-semibold tracking-[-0.014em] lg:text-2xl">
                      {m.title}
                    </h3>
                    {m.tools && (
                      <p className="mt-3">
                        <Note className="text-accent">{m.tools}</Note>
                      </p>
                    )}
                  </div>
                  <p className="leading-relaxed text-fg-muted lg:col-span-6">
                    {m.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/*
        Interlocked rather than parallel. The audience runs as a tight column
        of short lines, the outcomes as wide paragraphs, so the two halves
        differ in texture instead of mirroring each other.
      */}
      <section className="panel-section">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Reveal>
                  <Tab>Who it is for</Tab>
                  <h2 className="mt-8 text-[1.75rem] leading-[1.1] font-semibold tracking-[-0.016em] text-balance sm:text-[2.25rem]">
                    For engineers who want to design, not just install.
                  </h2>
                  <p className="mt-6 leading-relaxed text-fg-muted">
                    If you can already read a drawing but could not produce one
                    from first principles, this is aimed squarely at you.
                  </p>
                  <ul className="mt-10 flex flex-wrap gap-2">
                    {AUDIENCE.map((who) => (
                      <li
                        key={who}
                        className="rounded-[var(--radius-sm)] border border-rule px-3.5 py-2"
                      >
                        <Note className="text-fg-subtle">{who}</Note>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              {OUTCOMES.map((o, i) => (
                <Reveal
                  key={o.title}
                  delay={i * 70}
                  className="block border-t border-rule py-8 last:border-b"
                >
                  <div className="flex items-baseline gap-5">
                    <Note className="text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </Note>
                    <h3 className="text-lg font-semibold tracking-[-0.014em]">
                      {o.title}
                    </h3>
                  </div>
                  <p className="mt-4 pl-12 leading-relaxed text-fg-muted">
                    {o.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-20 sm:py-28">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12">
              <h2 className="text-[1.75rem] leading-[1.1] font-semibold tracking-[-0.016em] text-balance sm:text-[2.25rem] lg:col-span-6">
                Places are limited, and the group is kept small on purpose.
              </h2>
              <div className="lg:col-span-5 lg:col-start-8">
                <p className="leading-relaxed text-fg-muted">
                  Write to us for the next intake, the fee and how payment
                  works. You will hear back from an engineer who can answer
                  questions about the curriculum itself.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="ease-lux inline-flex items-center rounded-[var(--radius-sm)] bg-brand-600 px-7 py-4 text-sm font-semibold text-white transition-all duration-500 hover:bg-brand-700"
                  >
                    Enquire about the programme
                  </Link>
                  <Button href="/projects" variant="outline">
                    See our project work
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
