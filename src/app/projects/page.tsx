import type { Metadata } from "next";
import { Arrow, Container, Note, PageHero, SectionHead } from "@/components/ui";
import { CONTACT } from "@/lib/site";
import { PROJECTS, PROJECT_COUNT } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Ten delivered mechanical and HVAC engineering projects across industrial, commercial, public and residential buildings.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        sheet="Sheet 03"
        label="Delivered work"
        title={`${PROJECT_COUNT} projects, from private homes to industrial plant.`}
        lead="Warehouses, hotels, high-rise residential, government offices and private houses. Different buildings, the same approach: calculate first, then select, then lay it out against what is actually on site."
      />

      <section className="border-b rule bg-white">
        <Container className="py-10">
          <div className="grid gap-4 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-3">
              <Note className="text-ink-500">On confidentiality</Note>
            </div>
            <p className="max-w-3xl leading-relaxed text-ink-600 lg:col-span-9">
              Client names are withheld throughout this record, and so are the
              drawings. A firm that would publish somebody else&rsquo;s
              documents to win your work would publish yours to win the next.
              What follows describes the buildings and the engineering instead.
              We are glad to talk through any of it in detail.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-paper">
        <Container className="py-20 sm:py-28">
          <ol className="border-t rule">
            {PROJECTS.map((project, i) => (
              <li key={project.slug} className="border-b rule">
                <article className="grid gap-6 py-10 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-1">
                    <Note className="text-brand-600">
                      {String(i + 1).padStart(2, "0")}
                    </Note>
                  </div>

                  <div className="lg:col-span-4">
                    <Note className="text-ink-400">{project.sector}</Note>
                    <h2 className="mt-4 text-2xl leading-snug font-semibold tracking-display text-balance text-ink-950">
                      {project.title}
                    </h2>
                    <p className="mt-3 text-sm font-medium text-brand-700">
                      {project.system}
                    </p>
                  </div>

                  <div className="lg:col-span-7">
                    <p className="max-w-2xl leading-relaxed text-ink-600">
                      {project.detail}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2.5">
                          <span
                            aria-hidden
                            className="h-1 w-1 rounded-full bg-brand-600"
                          />
                          <Note className="text-ink-500">{h}</Note>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t rule bg-white">
        <Container className="py-20 sm:py-28">
          <SectionHead
            sheet="Sec 02"
            label="Your project"
            title="Bring us the drawing and the constraint."
            lead="A load calculation, a full mechanical design, or a second opinion on somebody else's. Write to us and we will tell you plainly what is involved."
          />
          <a
            href={`${CONTACT.mailto}?subject=Project%20enquiry`}
            className="group mt-12 inline-flex items-center gap-3 bg-ink-950 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
          >
            Start a conversation
            <Arrow />
          </a>
        </Container>
      </section>
    </>
  );
}
