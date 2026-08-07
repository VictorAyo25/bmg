import type { Metadata } from "next";
import { Container, Eyebrow, Lead, PageHero, SectionHeading } from "@/components/ui";
import { CONTACT } from "@/lib/site";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Engineering consultancy",
  description:
    "Mechanical and MEP consultancy, installation and project management for commercial, industrial and residential buildings in Nigeria.",
};

const APPROACH = [
  {
    index: "01",
    title: "Calculate before you specify",
    body: "Every system starts from a calculated load, not a rule of thumb or a figure carried over from the last job. Oversizing is the most expensive habit in this industry, and it is invisible until the bills arrive.",
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
        eyebrow="Consultancy and delivery"
        title="Mechanical systems as a driver of building value."
        lead="We work with developers, architects and contractors from concept through to handover. Design, installation and the project management that keeps the two honest."
      />

      <section>
        <Container className="py-16 sm:py-24">
          <ul className="grid gap-px overflow-hidden rounded-2xl bg-ink-200 lg:grid-cols-3">
            {SERVICES.filter((s) => s.slug !== "training").map((service) => (
              <li key={service.slug} className="bg-white p-8 sm:p-10">
                <span className="font-display text-sm font-semibold text-brand-600">
                  {service.index}
                </span>
                <h2 className="font-display mt-5 text-xl font-semibold text-ink-950 sm:text-2xl">
                  {service.title}
                </h2>
                <p className="mt-4 leading-relaxed text-ink-600">
                  {service.summary}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-ink-200">
        <Container className="py-16 sm:py-24">
          <div className="max-w-2xl">
            <Eyebrow>How we work</Eyebrow>
            <SectionHeading className="mt-6">
              Three principles that decide every design.
            </SectionHeading>
          </div>

          <ol className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-14">
            {APPROACH.map((item) => (
              <li key={item.index} className="border-t border-ink-200 pt-6">
                <span className="font-display text-sm font-semibold text-brand-600">
                  {item.index}
                </span>
                <h3 className="font-display mt-4 text-xl font-semibold text-ink-950">
                  {item.title}
                </h3>
                <p className="mt-4 leading-relaxed text-ink-600">{item.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t border-ink-200 bg-ink-50/60">
        <Container className="py-16 sm:py-24">
          <div className="max-w-2xl">
            <Eyebrow>Get in touch</Eyebrow>
            <SectionHeading className="mt-6">
              Tell us about the building.
            </SectionHeading>
            <Lead className="mt-6">
              Send us the scope, the drawings or just the problem. We will come
              back with what is involved and what it will take.
            </Lead>
            <a
              href={`${CONTACT.mailto}?subject=Consultancy%20enquiry`}
              className="mt-9 inline-flex items-center justify-center rounded-full bg-brand-600 px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-brand-700"
            >
              Email us
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
