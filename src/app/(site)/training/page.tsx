import type { Metadata } from "next";
import Link from "next/link";
import { Button, Container, Note, PageHero, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { AUDIENCE, MODULES, OUTCOMES, PROGRAMME } from "@/lib/training";

export const metadata: Metadata = {
  title: "HVAC design training",
  description:
    "HVAC design training taught by practising engineers. Cooling load calculation, duct design, equipment selection, chilled water, air handling units and rooftop systems.",
};

export default function TrainingPage() {
  return (
    <>
      <PageHero
        label="The programme"
        title="Become an HVAC design engineer."
        images={["/img/training.jpg", "/img/hero/04.jpg", "/img/hero/02.jpg"]}
      />

      <section className="border-b border-white/12 bg-mid">
        <Container>
          <dl className="grid sm:grid-cols-3">
            {[
              ["Duration", PROGRAMME.duration],
              ["Mode", PROGRAMME.mode],
              ["On completion", PROGRAMME.outcome],
            ].map(([label, value], i) => (
              <div
                key={label}
                className={`py-8 sm:px-8 ${
                  i > 0
                    ? "border-t border-white/12 sm:border-t-0 sm:border-l"
                    : ""
                }`}
              >
                <dt>
                  <Note className="text-white/70">{label}</Note>
                </dt>
                <dd className="mt-3 text-xl font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section>
        <Container className="py-20 sm:py-28">
          <Reveal>
            <SectionHead
              label="Curriculum"
              title={PROGRAMME.promise}
            />
          </Reveal>

          <ol className="mt-14">
            {MODULES.map((m, i) => (
              <Reveal
                as="li"
                key={m.index}
                delay={i * 40}
                className="block border-t border-white/12 py-8 last:border-b"
              >
                <div className="grid gap-4 lg:grid-cols-12 lg:gap-10">
                  <Note className="pt-2 text-sky lg:col-span-1">{m.index}</Note>
                  <div className="lg:col-span-4">
                    <h2 className="text-xl font-semibold tracking-tight lg:text-2xl">
                      {m.title}
                    </h2>
                    {m.tools && (
                      <p className="mt-3">
                        <Note className="text-sky">{m.tools}</Note>
                      </p>
                    )}
                  </div>
                  <p className="leading-relaxed text-white/75 lg:col-span-7">
                    {m.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-mid">
        <Container className="py-20 sm:py-28">
          <Reveal>
            <SectionHead
              label="Who it is for"
              title="Built for engineers who want to design, not just install."
            />
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <ul>
                {AUDIENCE.map((who, i) => (
                  <li
                    key={who}
                    className="flex items-baseline gap-5 border-t border-white/12 py-4 last:border-b"
                  >
                    <Note className="text-sky">
                      {String(i + 1).padStart(2, "0")}
                    </Note>
                    <span className="text-white/85">{who}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="lg:col-span-6 lg:col-start-7">
              {OUTCOMES.map((o, i) => (
                <Reveal
                  key={o.title}
                  delay={i * 60}
                  className="block border-t border-white/12 py-6 last:border-b"
                >
                  <h3 className="text-lg font-semibold">{o.title}</h3>
                  <p className="mt-3 leading-relaxed text-white/75">{o.body}</p>
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
              <h2 className="text-[2rem] leading-[1.06] font-bold tracking-[-0.03em] text-balance sm:text-[2.75rem] lg:col-span-7">
                Places are limited, and the group is kept small on purpose.
              </h2>
              <div className="lg:col-span-4 lg:col-start-9">
                <p className="leading-relaxed text-white/75">
                  Write to us for the next intake, the fee and how payment
                  works. You will hear back from an engineer who can answer
                  questions about the curriculum itself.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="bg-brand-600 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
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
