import type { Metadata } from "next";
import Link from "next/link";
import { Container, Note, PageHero, SectionHead } from "@/components/ui";
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

export default function ConsultancyPage() {
  return (
    <>
      <PageHero
        label="Consultancy and delivery"
        title="Mechanical systems as a driver of building value."
        images={["/img/consultancy.jpg", "/img/hero/02.jpg", "/img/hero/05.jpg"]}
      />

      <section className="panel-section">
        <Container className="py-20 sm:py-28">
          <Reveal>
            <SectionHead
              label="Services"
              title="Three ways we work on your project."
            />
          </Reveal>

          <ul className="mt-14">
            {SERVICES.filter((s) => s.slug !== "training").map((service, i) => (
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
                  <h2 className="text-2xl leading-tight font-bold tracking-[-0.02em] lg:col-span-4">
                    {service.title}
                  </h2>
                  <p className="max-w-2xl leading-relaxed text-fg-muted lg:col-span-7">
                    {service.summary}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="surface-dark panel-dark bg-mid">
        <Container className="py-20 sm:py-28">
          <Reveal>
            <SectionHead
              label="How we work"
              title="Three principles that decide every design."
            />
          </Reveal>

          <ol className="mt-14 grid gap-px bg-white/12 lg:grid-cols-3">
            {APPROACH.map((item, i) => (
              <Reveal
                as="li"
                key={item.index}
                delay={i * 70}
                className="block bg-mid py-8 lg:px-8"
              >
                <Note className="text-accent">{item.index}</Note>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-4 leading-relaxed text-fg-muted">
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
            <SectionHead
              label="Get in touch"
              title="Tell us about the building."
            />
            <Link
              href="/contact"
              className="mt-12 inline-flex bg-brand-600 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Contact us
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
