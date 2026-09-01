import Image from "next/image";
import Link from "next/link";
import {
  Arrow,
  Button,
  Container,
  Note,
  SectionHead,
  TextLink,
} from "@/components/ui";
import { CONTACT } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { MODULES, PROGRAMME } from "@/lib/training";
import { DESIGN_PROJECTS, PROJECTS } from "@/lib/projects";

const DISCIPLINES = [
  "Cooling load calculation",
  "Duct design",
  "Chilled water",
  "VRF and DX",
  "Air handling units",
  "Life safety",
  "Ventilation",
  "Commissioning",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b rule bg-white">
        <div
          aria-hidden
          className="blueprint pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(70rem_45rem_at_72%_0%,#000,transparent_75%)]"
        />

        <Container className="relative pt-12 pb-0 sm:pt-16">
          <div className="flex items-center gap-5">
            <Note className="text-brand-700">Sheet 01</Note>
            <span aria-hidden className="h-px flex-1 bg-ink-950/12" />
            <Note className="text-ink-500">MEP training and consultancy</Note>
          </div>

          <div className="grid gap-14 pt-14 pb-16 lg:grid-cols-12 lg:gap-12 lg:pt-20 lg:pb-24">
            <div className="lg:col-span-7">
              <h1 className="text-[2.5rem] leading-[1.02] font-semibold tracking-display text-balance text-ink-950 sm:text-[3.5rem] lg:text-[4.5rem] xl:text-[5rem]">
                Learn to design building systems that actually get built.
              </h1>

              <p className="mt-8 max-w-lg text-[1.0625rem] leading-relaxed text-ink-600 sm:text-lg">
                Structured mechanical, electrical and plumbing training that
                closes the gap between an architect&rsquo;s drawing and a system
                that works on site. Taught by engineers who design them for a
                living.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button href="/training">
                  Explore the programme
                  <Arrow />
                </Button>
                <Button href="/projects" variant="outline">
                  See the work
                  <Arrow />
                </Button>
              </div>
            </div>

            {/* Spec panel, read as the schedule block on a drawing. */}
            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="border rule bg-white/70 backdrop-blur-sm">
                <div className="border-b rule px-6 py-4">
                  <Note className="text-ink-500">Programme at a glance</Note>
                </div>
                <dl>
                  {[
                    ["Discipline", "HVAC design"],
                    ["Duration", PROGRAMME.duration],
                    ["Mode", PROGRAMME.mode],
                    ["Design projects", String(DESIGN_PROJECTS)],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-baseline justify-between gap-6 border-b rule px-6 py-3.5 last:border-0"
                    >
                      <dt className="text-sm text-ink-500">{label}</dt>
                      <dd className="text-sm font-medium text-ink-950">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </Container>

        {/* Disciplines strip, the marginalia along the edge of a sheet. */}
        <div className="border-t rule bg-paper">
          <Container>
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 py-4">
              {DISCIPLINES.map((d) => (
                <li key={d} className="flex items-center gap-2.5">
                  <span
                    aria-hidden
                    className="h-1 w-1 rounded-full bg-brand-600"
                  />
                  <Note className="text-ink-500">{d}</Note>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </section>

      {/* Services */}
      <section className="bg-paper">
        <Container className="py-14 sm:py-28">
          <SectionHead
            sheet="Sec 02"
            label="Capability"
            title="Four disciplines, one engineering standard."
            lead="Training is where we put most of our weight, because the shortage in this market is not equipment. It is engineers who can calculate."
          />

          <ul className="mt-16 border-t rule">
            {SERVICES.map((service) => (
              <li key={service.slug} className="border-b rule">
                <Link
                  href={service.href}
                  className="group grid items-start gap-4 py-9 transition-colors duration-200 hover:bg-white lg:grid-cols-12 lg:gap-12 lg:px-6"
                >
                  <div className="lg:col-span-1">
                    <Note className="text-brand-600">{service.index}</Note>
                  </div>
                  <h3 className="text-2xl leading-tight font-semibold tracking-display text-ink-950 lg:col-span-4 lg:text-[1.75rem]">
                    {service.title}
                  </h3>
                  <p className="max-w-xl leading-relaxed text-ink-600 lg:col-span-6">
                    {service.summary}
                  </p>
                  <span className="text-ink-400 transition-colors group-hover:text-brand-600 lg:col-span-1 lg:justify-self-end">
                    <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Training */}
      <section className="bg-brand-950 text-white">
        <Container className="py-14 sm:py-28">
          <SectionHead
            invert
            sheet="Sec 03"
            label="The programme"
            title={
              <>
                {PROGRAMME.name}, taught properly.
                <span className="mt-4 block text-brand-400">
                  {PROGRAMME.promise}
                </span>
              </>
            }
            lead="Six modules taught one day a week, built around live project work rather than textbook exercises. You finish with a portfolio and the judgement to defend a design."
          />

          <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-12">
            {/* Portrait, framed as a figure with a caption. */}
            <figure className="lg:col-span-4">
              <div className="relative aspect-4/5 overflow-hidden bg-brand-900">
                <Image
                  src="/founder.jpg"
                  alt="An engineer from the BMG team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 24rem"
                  className="object-cover object-top grayscale contrast-105"
                  priority
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-brand-600 mix-blend-color"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-brand-950 via-transparent to-transparent opacity-70"
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between border-t rule-invert pt-4">
                <Note className="text-white/40">Fig 01</Note>
                <Note className="text-white/40">Taught by practitioners</Note>
              </figcaption>
            </figure>

            <ol className="lg:col-span-8">
              {MODULES.map((module) => (
                <li
                  key={module.index}
                  className="group grid gap-3 border-t rule-invert py-6 last:border-b sm:grid-cols-12 sm:gap-6"
                >
                  <Note className="pt-1.5 text-brand-400 sm:col-span-1">
                    {module.index}
                  </Note>
                  <h3 className="text-xl font-semibold text-white sm:col-span-5">
                    {module.title}
                  </h3>
                  <div className="sm:col-span-6">
                    <p className="leading-relaxed text-white/60">
                      {module.description}
                    </p>
                    {module.tools && (
                      <p className="mt-3">
                        <Note className="text-brand-400">{module.tools}</Note>
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-12">
            <Button href="/training" variant="invert">
              Full curriculum
              <Arrow />
            </Button>
          </div>
        </Container>
      </section>

      {/* Projects, presented as a drawing schedule */}
      <section className="bg-paper">
        <Container className="py-14 sm:py-28">
          <SectionHead
            sheet="Sec 04"
            label="Delivered work"
            title={`${DESIGN_PROJECTS} design projects, from private homes to industrial plant.`}
            lead="A selection. Client names are withheld throughout. We would rather show you the engineering than trade on somebody else's letterhead."
          />

          <div className="mt-16">
            <div className="hidden grid-cols-12 gap-6 border-b rule pb-3 lg:grid">
              <Note className="col-span-1 text-ink-400">Ref</Note>
              <Note className="col-span-4 text-ink-400">Building</Note>
              <Note className="col-span-3 text-ink-400">System</Note>
              <Note className="col-span-4 text-ink-400">Scope</Note>
            </div>

            <ul>
              {PROJECTS.slice(0, 6).map((project, i) => (
                <li
                  key={project.slug}
                  className="grid gap-2 border-b rule py-6 transition-colors duration-200 hover:bg-white lg:grid-cols-12 lg:items-baseline lg:gap-6 lg:px-4"
                >
                  <div className="flex items-center gap-3 lg:col-span-1">
                    <Note className="text-brand-600">
                      {String(i + 1).padStart(2, "0")}
                    </Note>
                    <Note className="text-ink-400 lg:hidden">
                      {project.sector}
                    </Note>
                  </div>
                  <h3 className="text-lg leading-snug font-medium text-ink-950 lg:col-span-4">
                    {project.title}
                  </h3>
                  <p className="text-sm text-ink-500 lg:col-span-3">
                    {project.system}
                  </p>
                  <p className="text-sm leading-relaxed text-ink-600 lg:col-span-4">
                    {project.summary}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <TextLink href="/projects">Read the full record</TextLink>
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section className="border-t rule bg-white">
        <Container className="py-14 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Note className="text-brand-700">Sec 05</Note>
              <p className="mt-8 text-[2rem] leading-[1.1] font-semibold tracking-display text-balance text-ink-950 sm:text-[2.75rem] lg:text-[3.25rem]">
                Tell us what you are building, or what you want to learn.
              </p>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <p className="leading-relaxed text-ink-600">
                Every enquiry reaches an engineer, not a contact form. Write to
                us and you will get a considered answer.
              </p>
              <div className="mt-8 border-t rule">
                <a
                  href={CONTACT.mailto}
                  className="group flex items-center justify-between border-b rule py-5 transition-colors hover:text-brand-700"
                >
                  <span className="text-sm break-all">{CONTACT.email}</span>
                  <Arrow />
                </a>
                <a
                  href={CONTACT.tel}
                  className="group flex items-center justify-between border-b rule py-5 transition-colors hover:text-brand-700"
                >
                  <span className="text-sm">{CONTACT.phone}</span>
                  <Arrow />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
