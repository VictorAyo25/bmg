import type { Metadata } from "next";
import { Container, Eyebrow, Lead, PageHero, SectionHeading } from "@/components/ui";
import { CONTACT } from "@/lib/site";
import { PROJECTS, PROJECT_COUNT } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Ten delivered mechanical and HVAC engineering projects across industrial, commercial, public and residential buildings in Nigeria.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Delivered work"
        title={`${PROJECT_COUNT} projects, from private homes to industrial plant.`}
        lead="Warehouses, hotels, high-rise residential, government offices and private houses. Different buildings, the same approach: calculate first, then select, then lay it out against what is actually on site."
      />

      <section>
        <Container className="py-14 sm:py-20">
          <div className="rounded-2xl border border-ink-200 bg-ink-50/60 p-6 sm:p-8">
            <h2 className="font-display text-base font-semibold text-ink-950">
              Why there are no client names here
            </h2>
            <p className="mt-3 max-w-3xl text-[0.975rem] leading-relaxed text-ink-600">
              This work was delivered under confidentiality. Publishing a
              client&rsquo;s name, or their drawings, is not ours to do, and a
              firm that would do it to them would do it to you. What follows
              describes the buildings and the engineering instead. We are happy
              to talk through any of it in detail.
            </p>
          </div>

          <ol className="mt-16 space-y-px overflow-hidden rounded-2xl bg-ink-200">
            {PROJECTS.map((project, i) => (
              <li key={project.slug} className="bg-white p-7 sm:p-10">
                <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,32rem)] lg:gap-14">
                  <div>
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-sm font-semibold text-brand-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs font-medium tracking-wide text-ink-500 uppercase">
                        {project.sector}
                      </span>
                    </div>
                    <h3 className="font-display mt-4 text-2xl leading-snug font-semibold text-balance text-ink-950">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm font-medium text-brand-700">
                      {project.system}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {project.highlights.map((h) => (
                        <li
                          key={h}
                          className="rounded-full border border-ink-200 px-3 py-1 text-xs text-ink-600"
                        >
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="leading-relaxed text-ink-600">
                    {project.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t border-ink-200 bg-ink-50/60">
        <Container className="py-16 sm:py-24">
          <div className="max-w-2xl">
            <Eyebrow>Your project</Eyebrow>
            <SectionHeading className="mt-6">
              Bring us the drawing and the constraint.
            </SectionHeading>
            <Lead className="mt-6">
              Whether it is a load calculation, a full mechanical design or a
              second opinion on somebody else&rsquo;s, write to us and we will
              tell you plainly what is involved.
            </Lead>
            <a
              href={`${CONTACT.mailto}?subject=Project%20enquiry`}
              className="mt-9 inline-flex items-center justify-center rounded-full bg-brand-600 px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-brand-700"
            >
              Start a conversation
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
