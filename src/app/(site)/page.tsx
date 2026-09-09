import Link from "next/link";
import Image from "next/image";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { Button, Container, Note, Tab } from "@/components/ui";
import { MepPlan } from "@/components/mep-plan";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";
import { CountUp } from "@/components/count-up";
import { ProjectIndex } from "@/components/project-index";
import { CONTACT } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { MODULES, PROGRAMME } from "@/lib/training";
import { DESIGN_PROJECTS_COUNT } from "@/lib/projects";

const DISCIPLINES = [
  "Cooling load calculation",
  "Duct design",
  "Chilled water",
  "VRF and DX",
  "Air handling units",
  "Life safety",
  "Smoke extraction",
  "Stairwell pressurisation",
  "Ventilation",
  "Commissioning",
];

/**
 * The home page.
 *
 * Rebuilt because the previous version read as a slide deck, which was a fair
 * charge: every section was a rounded card of the same height holding a
 * heading and a list, stacked in a column. Cards in sequence are slides.
 *
 * What separates a page from a deck is structural variety and behaviour a
 * slide cannot perform. The sections below deliberately differ: full bleed
 * against inset, tall against thin, a band that travels sideways while
 * everything else moves down, a column that holds while its neighbour
 * scrolls, a list you can interrogate, and figures that arrive rather than
 * sit there.
 */
export default function Home() {
  return (
    <>
      {/* 1. Full bleed, tall, immersive. Nothing else on the page is this. */}
      <section className="surface-dark relative overflow-hidden">
        <HeroSlideshow />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-56 -right-56 h-[44rem] w-[44rem] rounded-full bg-mid opacity-55 blur-3xl"
        />

        <Container className="relative pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <Reveal>
                <Tab>MEP design and training</Tab>
              </Reveal>
              <Reveal delay={60}>
                <h1 className="mt-9 text-[2.25rem] leading-[1.02] font-semibold tracking-[-0.016em] text-balance sm:text-[2.875rem] xl:text-[3.5rem]">
                  We design the systems that make a building work.
                </h1>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-7 max-w-xl leading-relaxed text-fg-muted">
                  Mechanical, electrical and plumbing, from load calculation
                  through to handover. And we train the engineers who do it.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Button href="/training">Explore the training</Button>
                  <Button href="/projects" variant="outline">
                    See the work
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={140} className="lg:col-span-6">
              <MepPlan className="w-full text-fg-muted" />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 2. A thin band travelling sideways. Breaks the vertical stack. */}
      <div className="border-b border-rule bg-white py-4 text-fg-subtle">
        <Marquee items={DISCIPLINES} />
      </div>

      {/* 3. Asymmetric. Oversized numerals, not a grid of equal cards. */}
      <section>
        <Container className="py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Note className="text-accent">What we do</Note>
              <h2 className="mt-6 text-[1.75rem] leading-[1.1] font-semibold tracking-[-0.016em] text-balance sm:text-[2.25rem]">
                Four disciplines, one standard.
              </h2>
              <p className="mt-6 leading-relaxed text-fg-muted">
                Training leads, because the shortage in this market is not
                equipment. It is engineers who can calculate.
              </p>
            </Reveal>

            <div className="lg:col-span-7 lg:col-start-6">
              {SERVICES.map((service, i) => (
                <Reveal
                  key={service.slug}
                  delay={i * 70}
                  className="block border-t border-rule last:border-b"
                >
                  <Link
                    href={service.href}
                    className="lift -mx-4 flex items-baseline gap-6 px-4 py-7 hover:bg-tint sm:gap-10"
                  >
                    <span className="font-mono text-2xl leading-none text-brand-200 sm:text-3xl">
                      {service.index}
                    </span>
                    <span>
                      <span className="block text-xl font-semibold tracking-[-0.014em]">
                        {service.title}
                      </span>
                      <span className="mt-2 block max-w-xl text-sm leading-relaxed text-fg-muted">
                        {service.summary}
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/*
        4. Full bleed image, tall and quiet. A held breath between two dense
        sections, and the only centred thing on the page.
      */}
      <section className="surface-dark relative overflow-hidden">
        <Image
          src="/img/statement.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-deep/80" />
        <Container className="relative py-24 sm:py-36">
          <Reveal>
            <p className="mx-auto max-w-4xl text-center text-[1.5rem] leading-[1.24] font-semibold tracking-[-0.016em] text-balance sm:text-[2.125rem]">
              Most buildings are cooled by systems{" "}
              <span className="text-accent">nobody calculated.</span> Every
              uncomfortable room was a decision somebody made at design stage.
            </p>
          </Reveal>
        </Container>
      </section>

      {/*
        5. Sticky column. The heading holds while the modules scroll past,
        which is the clearest single thing a slide cannot do.
      */}
      <section className="panel-section">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <Reveal>
                  <Tab>The programme</Tab>
                  <h2 className="mt-8 text-[1.75rem] leading-[1.1] font-semibold tracking-[-0.016em] text-balance sm:text-[2.25rem]">
                    {PROGRAMME.name}.
                  </h2>
                  <p className="mt-3 text-[1.25rem] font-semibold text-accent sm:text-[1.5rem]">
                    {PROGRAMME.promise}
                  </p>
                  <p className="mt-6 leading-relaxed text-fg-muted">
                    Taught against live project conditions by engineers who
                    answer for these systems on site. Scheduling is flexible, so
                    ask us about the next intake.
                  </p>
                  <Button href="/training" variant="outline" className="mt-8">
                    Full curriculum
                  </Button>
                </Reveal>
              </div>
            </div>

            <ol className="lg:col-span-7 lg:col-start-6">
              {MODULES.map((m, i) => (
                <Reveal
                  as="li"
                  key={m.index}
                  delay={i * 50}
                  className="block border-t border-rule py-8 last:border-b"
                >
                  <div className="flex items-baseline gap-5">
                    <Note className="text-accent">{m.index}</Note>
                    <h3 className="text-xl font-semibold tracking-[-0.014em]">
                      {m.title}
                    </h3>
                  </div>
                  <p className="mt-4 pl-12 leading-relaxed text-fg-muted">
                    {m.description}
                  </p>
                  {m.tools && (
                    <p className="mt-3 pl-12">
                      <Note className="text-accent">{m.tools}</Note>
                    </p>
                  )}
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* 6. Interactive. A list you can interrogate, not one you scroll past. */}
      <section>
        <Container className="py-20 sm:py-28">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <Note className="text-accent">Delivered work</Note>
                <h2 className="mt-6 text-[1.75rem] leading-[1.1] font-semibold tracking-[-0.016em] text-balance sm:text-[2.25rem]">
                  <CountUp to={DESIGN_PROJECTS_COUNT} suffix="+" /> design projects,
                  homes to industrial plant.
                </h2>
              </div>
              <p className="leading-relaxed text-fg-muted lg:col-span-5 lg:col-start-8 lg:pt-8">
                A selection is listed below. Client names are withheld
                throughout, because a firm that would publish somebody
                else&rsquo;s documents to win your work would publish yours to
                win the next.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80} className="mt-14 block">
            <ProjectIndex />
          </Reveal>
        </Container>
      </section>

      {/* 7. Dark band, tight and numeric. Short, after two tall sections. */}
      <section className="surface-dark bg-mid">
        <Container className="py-16 sm:py-20">
          <dl className="grid gap-10 sm:grid-cols-3">
            {[
              { value: DESIGN_PROJECTS_COUNT, suffix: "+", label: "Design projects" },
              {
                value: MODULES.length,
                suffix: "",
                label: "Curriculum modules",
              },
              { value: 3, suffix: "", label: "Disciplines, M, E and P" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 90}>
                <dt>
                  <Note className="text-fg-subtle">{stat.label}</Note>
                </dt>
                <dd className="mt-3 text-[2.5rem] leading-none font-semibold tracking-[-0.02em] sm:text-[3.25rem]">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* 8. Close. Light and quiet, so the page does not end on a shout. */}
      <section>
        <Container className="py-20 sm:py-28">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12">
              <h2 className="text-[1.75rem] leading-[1.1] font-semibold tracking-[-0.016em] text-balance sm:text-[2.25rem] lg:col-span-6">
                Tell us what you are building, or what you want to learn.
              </h2>
              <div className="lg:col-span-5 lg:col-start-8">
                <p className="leading-relaxed text-fg-muted">
                  Every enquiry reaches an engineer. Write to us and you will
                  get a considered answer, not a brochure.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/contact">Start a conversation</Button>
                  <a
                    href={CONTACT.tel}
                    className="ease-lux inline-flex items-center rounded-[var(--radius-sm)] border border-rule-strong px-7 py-4 text-sm font-semibold transition-all duration-500 hover:bg-tint"
                  >
                    {CONTACT.phone}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
