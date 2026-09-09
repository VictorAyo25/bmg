import type { Metadata } from "next";
import Link from "next/link";
import { Container, Note, PageHero, Tab } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Engineering consultancy",
  description:
    "Mechanical and MEP consultancy, installation and project management for commercial, industrial and residential buildings.",
};

const APPROACH = [
  {
    index: "01",
    title: "Calculate before you specify",
    body: "Every system starts from a calculated load, not a rule of thumb or a figure carried over from the last job. Oversizing is the most expensive habit in this industry, and it stays invisible until the bills arrive.",
  },
  {
    index: "02",
    title: "Design for the building that gets built",
    body: "Drawings meet roof hips, fire walls, structural shafts and a ceiling void somebody else has already claimed. We resolve those conflicts on paper, where they are cheap, rather than on site where they are not.",
  },
  {
    index: "03",
    title: "Design for whoever maintains it",
    body: "A system that cannot be serviced without a shutdown will not be serviced. Access, replaceability and sensible controls carry more weight over twenty years than a marginal efficiency gain at selection.",
  },
];

/**
 * Consultancy.
 *
 * Structural device for this page: the three principles run as a numbered
 * sequence with the numeral set enormous, one after another down the page,
 * rather than as three equal cards side by side. Three equal boxes is the
 * most deck-like arrangement there is, and these are an argument in order,
 * not a menu of options.
 */
export default function ConsultancyPage() {
  return (
    <>
      <PageHero
        label="Consultancy and delivery"
        title="Mechanical systems as a driver of building value."
        images={[
          "/img/consultancy.jpg",
          "/img/hero/02.jpg",
          "/img/hero/05.jpg",
        ]}
      />

      <section className="panel-section">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <Reveal>
                  <Tab>Services</Tab>
                  <h2 className="mt-8 text-[1.75rem] leading-[1.1] font-semibold tracking-[-0.016em] text-balance sm:text-[2.25rem]">
                    Three ways we work on your project.
                  </h2>
                  <p className="mt-6 leading-relaxed text-fg-muted">
                    Design, delivery, and the oversight that keeps the two
                    honest. Training sits alongside these rather than under
                    them.
                  </p>
                </Reveal>
              </div>
            </div>

            <ul className="lg:col-span-7 lg:col-start-6">
              {SERVICES.filter((s) => s.slug !== "training").map(
                (service, i) => (
                  <Reveal
                    as="li"
                    key={service.slug}
                    delay={i * 60}
                    className="block border-t border-rule py-8 last:border-b"
                  >
                    <div className="grid gap-4 lg:grid-cols-12 lg:gap-10">
                      <Note className="pt-2 text-accent lg:col-span-1">
                        {service.index}
                      </Note>
                      <h2 className="text-2xl leading-tight font-semibold tracking-[-0.016em] lg:col-span-4">
                        {service.title}
                      </h2>
                      <p className="max-w-2xl leading-relaxed text-fg-muted lg:col-span-7">
                        {service.summary}
                      </p>
                    </div>
                  </Reveal>
                ),
              )}
            </ul>
          </div>
        </Container>
      </section>

      <section className="surface-dark bg-mid">
        <Container className="py-20 sm:py-28">
          <Reveal>
            <Tab>How we work</Tab>
            <h2 className="mt-8 max-w-2xl text-[1.75rem] leading-[1.1] font-semibold tracking-[-0.016em] text-balance sm:text-[2.25rem]">
              Three principles that decide every design.
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-fg-muted">
              None of them are unusual. What is unusual is holding to them when
              the programme is tight and somebody wants a number by Friday.
            </p>
          </Reveal>

          <ol className="mt-16">
            {APPROACH.map((item, i) => (
              <Reveal
                as="li"
                key={item.index}
                delay={i * 80}
                className="grid items-baseline gap-6 border-t border-rule py-12 last:border-b lg:grid-cols-12 lg:gap-12"
              >
                <span className="font-mono text-[3rem] leading-none text-white/20 sm:text-[4.5rem] lg:col-span-2">
                  {item.index}
                </span>
                <h3 className="text-xl font-semibold tracking-[-0.014em] lg:col-span-4 lg:text-2xl">
                  {item.title}
                </h3>
                <p className="leading-relaxed text-fg-muted lg:col-span-6">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section>
        <Container className="py-20 sm:py-28">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12">
              <h2 className="text-[1.75rem] leading-[1.1] font-semibold tracking-[-0.016em] text-balance sm:text-[2.25rem] lg:col-span-6">
                Tell us about the building.
              </h2>
              <div className="lg:col-span-5 lg:col-start-8">
                <p className="leading-relaxed text-fg-muted">
                  Send us the scope, the drawings, or just the problem. We will
                  come back with what is involved and what it will take.
                </p>
                <Link
                  href="/contact"
                  className="ease-lux mt-8 inline-flex items-center rounded-[var(--radius-sm)] bg-brand-600 px-7 py-4 text-sm font-semibold text-white transition-all duration-500 hover:bg-brand-700"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
