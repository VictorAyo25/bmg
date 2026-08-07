import Link from "next/link";
import { Button, Container, Eyebrow, Lead, SectionHeading } from "@/components/ui";
import { CONTACT } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { MODULES, PROGRAMME } from "@/lib/training";
import { PROJECTS, PROJECT_COUNT } from "@/lib/projects";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60rem_40rem_at_78%_-12%,var(--color-brand-50),transparent_62%)]"
        />
        <Container className="pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32">
          <Eyebrow>MEP training and engineering consultancy</Eyebrow>

          <h1 className="font-display mt-7 max-w-4xl text-[2.6rem] leading-[1.03] font-semibold tracking-display text-balance text-ink-950 sm:text-6xl lg:text-[4.5rem]">
            Learn to design building systems that actually get built.
          </h1>

          <Lead className="mt-7 max-w-xl sm:text-xl">
            Structured mechanical, electrical and plumbing training that closes
            the gap between an architect&rsquo;s drawing and a system that works
            on site. Taught by engineers who design them for a living.
          </Lead>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/training">Explore the programme</Button>
            <Button href="/projects" variant="secondary">
              See the work
            </Button>
          </div>

          <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-9 border-t border-ink-200 pt-10 sm:grid-cols-4">
            {[
              { value: PROGRAMME.duration, label: "Programme length" },
              { value: `${PROJECT_COUNT}`, label: "Projects delivered" },
              { value: `${MODULES.length}`, label: "Design modules" },
              { value: "Live", label: "Virtual classes" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="font-display block text-3xl font-semibold tracking-display text-ink-950 sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="mt-1.5 block text-sm text-ink-500">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Services */}
      <section className="border-t border-ink-200">
        <Container className="py-20 sm:py-28">
          <div className="max-w-2xl">
            <Eyebrow>What we do</Eyebrow>
            <SectionHeading className="mt-6">
              Four disciplines, one engineering standard.
            </SectionHeading>
          </div>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-ink-200 sm:grid-cols-2">
            {SERVICES.map((service) => (
              <li key={service.slug} className="bg-white">
                <Link
                  href={service.href}
                  className="group flex h-full flex-col p-8 transition-colors hover:bg-ink-50/70 sm:p-10"
                >
                  <span className="font-display text-sm font-semibold text-brand-600">
                    {service.index}
                  </span>
                  <h3 className="font-display mt-5 text-xl font-semibold text-ink-950 sm:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-[0.975rem] leading-relaxed text-ink-600">
                    {service.summary}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-700">
                    Learn more
                    <span
                      aria-hidden
                      className="transition-transform group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Training */}
      <section className="bg-brand-950 text-white">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
            <div>
              <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-brand-300 uppercase">
                <span aria-hidden className="h-px w-6 bg-brand-400" />
                The programme
              </p>
              <h2 className="font-display mt-6 text-3xl leading-[1.1] font-semibold tracking-display text-balance sm:text-4xl lg:text-5xl">
                {PROGRAMME.name} in {PROGRAMME.duration}.
              </h2>
              <p className="font-display mt-5 text-xl text-brand-300">
                {PROGRAMME.promise}
              </p>
              <p className="mt-6 leading-relaxed text-ink-300">
                Six modules taught one day a week, built around live project
                work rather than textbook exercises. You finish with a portfolio
                and a certificate, and with the judgement to defend a design.
              </p>

              <dl className="mt-10 space-y-4 border-t border-white/10 pt-8 text-sm">
                {[
                  ["Duration", PROGRAMME.duration],
                  ["Mode", PROGRAMME.mode],
                  ["Commitment", PROGRAMME.commitment],
                  ["On completion", PROGRAMME.outcome],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-6">
                    <dt className="text-ink-400">{label}</dt>
                    <dd className="text-right font-medium text-white">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <Button href="/training" variant="ghost" className="mt-10">
                Full curriculum
              </Button>
            </div>

            <ol className="grid gap-px self-start overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2">
              {MODULES.map((module) => (
                <li key={module.index} className="bg-brand-950 p-7">
                  <span className="font-display text-sm font-semibold text-brand-400">
                    {module.index}
                  </span>
                  <h3 className="font-display mt-3 text-lg font-semibold text-white">
                    {module.title}
                  </h3>
                  {module.tools && (
                    <p className="mt-2 text-xs tracking-wide text-brand-300 uppercase">
                      {module.tools}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Projects */}
      <section>
        <Container className="py-20 sm:py-28">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>Delivered work</Eyebrow>
              <SectionHeading className="mt-6">
                {PROJECT_COUNT} projects, from private homes to industrial
                plant.
              </SectionHeading>
            </div>
            <Link
              href="/projects"
              className="shrink-0 text-sm font-medium text-brand-700 hover:text-brand-800"
            >
              All projects &rarr;
            </Link>
          </div>

          <Lead className="mt-6 max-w-2xl">
            Client names are withheld throughout. This work was delivered under
            confidentiality, and we would rather show you the engineering than
            trade on somebody else&rsquo;s letterhead.
          </Lead>

          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.slice(0, 6).map((project) => (
              <li
                key={project.slug}
                className="border-t border-ink-200 pt-6"
              >
                <p className="text-xs font-medium tracking-wide text-brand-700 uppercase">
                  {project.sector}
                </p>
                <h3 className="font-display mt-3 text-lg leading-snug font-semibold text-ink-950">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-ink-500">{project.system}</p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-600">
                  {project.summary}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Contact */}
      <section className="border-t border-ink-200 bg-ink-50/60">
        <Container className="py-20 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-2xl">
              <Eyebrow>Get in touch</Eyebrow>
              <SectionHeading className="mt-6">
                Tell us what you are building, or what you want to learn.
              </SectionHeading>
              <Lead className="mt-6">
                Every enquiry reaches an engineer, not a contact form. Write to
                us and you will get a considered answer.
              </Lead>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={CONTACT.mailto}
                className="inline-flex items-center justify-center rounded-full bg-brand-600 px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-brand-700"
              >
                Email us
              </a>
              <a
                href={CONTACT.tel}
                className="inline-flex items-center justify-center rounded-full border border-ink-200 bg-white px-7 py-3.5 text-base font-medium text-ink-800 transition-colors hover:border-ink-300"
              >
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
