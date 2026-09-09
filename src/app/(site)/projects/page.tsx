import type { Metadata } from "next";
import Link from "next/link";
import { Container, Note, PageHero } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ProjectRecord } from "@/components/project-record";
import { DESIGN_PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Mechanical and HVAC design across industrial, commercial, public and residential buildings.",
};

/**
 * Projects.
 *
 * Structural device for this page: the record is filterable by sector, with
 * counts on the controls. It is the one page where a visitor arrives with a
 * question rather than to be persuaded, and a developer should not have to
 * read five private houses to find the commercial work.
 */
export default function ProjectsPage() {
  return (
    <>
      <PageHero
        label="Delivered work"
        title={`${DESIGN_PROJECTS} design projects, homes to industrial plant.`}
        images={["/img/projects.jpg", "/img/hero/03.jpg", "/img/hero/01.jpg"]}
      />

      {/*
        The confidentiality note. It had gone missing from this page, which
        mattered: without it the anonymous entries read as vagueness rather
        than as a deliberate position.
      */}
      <section className="surface-dark bg-mid">
        <Container className="py-12 sm:py-14">
          <Reveal>
            <div className="grid gap-4 lg:grid-cols-12 lg:gap-10">
              <Note className="text-fg-subtle lg:col-span-3">
                On confidentiality
              </Note>
              <p className="max-w-3xl leading-relaxed text-fg-muted lg:col-span-9">
                Client names are withheld throughout this record, and so are
                the drawings. A firm that would publish somebody else&rsquo;s
                documents to win your work would publish yours to win the next.
                What follows describes the buildings and the engineering
                instead, and the list is a selection rather than the whole
                record.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section>
        <Container className="py-20 sm:py-28">
          <Reveal>
            <ProjectRecord />
          </Reveal>
        </Container>
      </section>

      <section className="panel-section">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12">
              <h2 className="text-[1.75rem] leading-[1.1] font-semibold tracking-[-0.016em] text-balance sm:text-[2.25rem] lg:col-span-6">
                Bring us the drawing and the constraint.
              </h2>
              <div className="lg:col-span-5 lg:col-start-8">
                <p className="leading-relaxed text-fg-muted">
                  A load calculation, a full mechanical design, or a second
                  opinion on somebody else&rsquo;s. Write to us and we will
                  tell you plainly what is involved.
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
