import type { Metadata } from "next";
import { Arrow, Container, Note, PageHero, SectionHead } from "@/components/ui";
import { CONTACT } from "@/lib/site";
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
        sheet="Sheet 04"
        label="Consultancy and delivery"
        title="Mechanical systems as a driver of building value."
        lead="We work with developers, architects and contractors from concept through to handover. Design, installation, and the project management that keeps the two honest."
      />

      <section className="bg-paper">
        <Container className="py-20 sm:py-28">
          <SectionHead
            sheet="Sec 01"
            label="Services"
            title="Three ways we work on your project."
          />

          <ul className="mt-16 border-t rule">
            {SERVICES.filter((s) => s.slug !== "training").map((service) => (
              <li
                key={service.slug}
                className="grid gap-4 border-b rule py-9 lg:grid-cols-12 lg:gap-12"
              >
                <div className="lg:col-span-1">
                  <Note className="text-brand-600">{service.index}</Note>
                </div>
                <h2 className="text-2xl leading-tight font-semibold tracking-display text-ink-950 lg:col-span-4">
                  {service.title}
                </h2>
                <p className="max-w-2xl leading-relaxed text-ink-600 lg:col-span-7">
                  {service.summary}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-brand-950 text-white">
        <Container className="py-20 sm:py-28">
          <SectionHead
            invert
            sheet="Sec 02"
            label="How we work"
            title="Three principles that decide every design."
            lead="None of them are unusual. What is unusual is holding to them when the programme is tight and somebody wants a number by Friday."
          />

          <ol className="mt-16 grid gap-px bg-white/12 lg:grid-cols-3">
            {APPROACH.map((item) => (
              <li key={item.index} className="bg-brand-950 py-8 lg:px-8">
                <Note className="text-brand-400">{item.index}</Note>
                <h3 className="mt-5 text-xl font-semibold tracking-display text-white">
                  {item.title}
                </h3>
                <p className="mt-4 leading-relaxed text-white/60">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t rule bg-white">
        <Container className="py-20 sm:py-28">
          <SectionHead
            sheet="Sec 03"
            label="Get in touch"
            title="Tell us about the building."
            lead="Send us the scope, the drawings, or just the problem. We will come back with what is involved and what it will take."
          />
          <a
            href={`${CONTACT.mailto}?subject=Consultancy%20enquiry`}
            className="group mt-12 inline-flex items-center gap-3 bg-ink-950 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
          >
            Email us
            <Arrow />
          </a>
        </Container>
      </section>
    </>
  );
}
