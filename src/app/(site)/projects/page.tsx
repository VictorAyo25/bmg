import type { Metadata } from "next";
import Link from "next/link";
import { Container, Note, PageHero, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { PROJECTS, DESIGN_PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Mechanical and HVAC design across industrial, commercial, public and residential buildings.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        label="Delivered work"
        title={`${DESIGN_PROJECTS} design projects, homes to industrial plant.`}
        images={["/img/projects.jpg", "/img/hero/03.jpg", "/img/hero/01.jpg"]}
      />



      <section>
        <Container className="py-20 sm:py-28">
          <ol>
            {PROJECTS.map((project, i) => (
              <Reveal
                as="li"
                key={project.slug}
                delay={(i % 3) * 50}
                className="block border-t border-white/12 last:border-b"
              >
                <article className="grid gap-6 py-10 lg:grid-cols-12 lg:gap-10">
                  <Note className="text-sky lg:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </Note>

                  <div className="lg:col-span-4">
                    <Note className="text-white/45">{project.sector}</Note>
                    <h2 className="mt-4 text-2xl leading-snug font-bold tracking-[-0.02em] text-balance">
                      {project.title}
                    </h2>
                    <p className="mt-3 text-sm font-semibold text-sky">
                      {project.system}
                    </p>
                  </div>

                  <div className="lg:col-span-7">
                    <p className="max-w-2xl leading-relaxed text-white/70">
                      {project.detail}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2.5">
                          <span
                            aria-hidden
                            className="h-1 w-1 rounded-full bg-brand-600"
                          />
                          <Note className="text-white/50">{h}</Note>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-mid">
        <Container className="py-20 sm:py-28">
          <Reveal>
            <SectionHead
              label="Your project"
              title="Bring us the drawing and the constraint."
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
