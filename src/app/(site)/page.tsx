import Link from "next/link";
import Image from "next/image";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { Button, Container, Note, SectionHead, Tab } from "@/components/ui";
import { MepPlan } from "@/components/mep-plan";
import { Reveal } from "@/components/reveal";
import { CONTACT } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { MODULES, PROGRAMME } from "@/lib/training";
import { PROJECTS, DESIGN_PROJECTS } from "@/lib/projects";

export default function Home() {
  return (
    <>
      {/*
        Hero, as one composition rather than two.
        The previous version put a second bold statement in a white card
        beside the headline, so two claims competed and neither won. Now
        there is a single headline, the services line supports it directly
        underneath, the drawing sits alongside as evidence rather than as a
        rival, and the four services anchor the bottom as one quiet strip.
      */}
      <section className="relative overflow-hidden border-b border-white/12">
        <HeroSlideshow />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-56 -right-56 h-[44rem] w-[44rem] rounded-full bg-mid opacity-55 blur-3xl"
        />

        <Container className="relative pt-12 pb-14 sm:pt-16 lg:pb-16">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <Reveal>
                <Tab>MEP design and training</Tab>
              </Reveal>

              <Reveal delay={60}>
                <h1 className="mt-9 text-[2.75rem] leading-[0.95] font-bold tracking-[-0.035em] text-balance sm:text-[4rem] xl:text-[4.75rem]">
                  We design the systems that make a building work.
                </h1>
              </Reveal>

              <Reveal delay={120}>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75">
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

            {/* The drawing sits on the field itself, not in a card. */}
            <Reveal delay={140} className="lg:col-span-6">
              <MepPlan className="w-full text-white/70" />
            </Reveal>
          </div>
        </Container>

        {/* Services strip, anchoring the composition. */}
        <div className="border-t border-white/12">
          <Container>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((service, i) => (
                <li
                  key={service.slug}
                  className="border-b border-white/10 sm:border-b-0 lg:border-l lg:border-white/10 lg:first:border-l-0"
                >
                  <Link
                    href={service.href}
                    className="flex items-baseline gap-4 px-0 py-5 transition-colors hover:text-sky lg:px-6"
                  >
                    <Note className="text-sky">
                      {String(i + 1).padStart(2, "0")}
                    </Note>
                    <span className="font-semibold">{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </section>

      {/* Statement */}
      <section className="relative overflow-hidden border-b border-white/12">
        <Image
          src="/img/statement.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-deep/80"
        />
        <Container className="relative py-20 sm:py-28">
          <Reveal>
            <p className="mx-auto max-w-4xl text-center text-[1.75rem] leading-[1.2] font-bold tracking-[-0.028em] text-balance sm:text-[2.75rem]">
              Most buildings are cooled by systems{" "}
              <span className="text-sky">nobody calculated.</span> Every
              uncomfortable room was a decision somebody made at design stage.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Training */}
      <section>
        <Container className="py-20 sm:py-28">
          <Reveal>
            <SectionHead
              label="The programme"
              title={
                <>
                  {PROGRAMME.name}.
                  <span className="mt-3 block text-sky">
                    {PROGRAMME.promise}
                  </span>
                </>
              }
              lead="Taught against live project conditions by engineers who answer for these systems on site. Scheduling is flexible, so ask us about the next intake."
            />
          </Reveal>

          <ol className="mt-14">
            {MODULES.map((m, i) => (
              <Reveal
                as="li"
                key={m.index}
                delay={i * 40}
                className="grid gap-3 border-t border-white/12 py-6 last:border-b sm:grid-cols-12 sm:gap-6"
              >
                <Note className="pt-2 text-sky sm:col-span-1">{m.index}</Note>
                <h3 className="text-xl font-semibold tracking-tight sm:col-span-4">
                  {m.title}
                </h3>
                <div className="sm:col-span-7">
                  <p className="leading-relaxed text-white/65">
                    {m.description}
                  </p>
                  {m.tools && (
                    <p className="mt-3">
                      <Note className="text-sky">{m.tools}</Note>
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-12">
            <Button href="/training" variant="outline">
              Full curriculum
            </Button>
          </Reveal>
        </Container>
      </section>

      {/* Work */}
      <section className="relative overflow-hidden border-b border-white/12">
        <Image
          src="/img/projects.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-deep/80"
        />
        <Container className="relative py-20 sm:py-28">
          <Reveal>
            <SectionHead
              label="Delivered work"
              title={`${DESIGN_PROJECTS} design projects, homes to industrial plant.`}
              lead="A selection is listed below. Client names are withheld throughout, because a firm that would publish somebody else's documents to win your work would publish yours to win the next."
            />
          </Reveal>

          <div className="mt-14">
            <ul className="border-t border-white/12">
              {PROJECTS.map((p, i) => (
                <Reveal
                  as="li"
                  delay={i * 40}
                  key={p.slug}
                  className="grid gap-3 border-b border-white/12 py-6 sm:grid-cols-12 sm:gap-6 lg:items-baseline"
                >
                  <Note className="text-sky lg:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </Note>
                  <span className="text-xl font-semibold tracking-tight lg:col-span-4 text-white">
                    {p.title}
                  </span>
                  <span className="text-white/65 lg:col-span-3">
                    {p.system}
                  </span>
                  <Note className="text-sky lg:col-span-4">{p.sector}</Note>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal className="mt-12">
            <Button href="/projects" variant="outline">
              Read the full record
            </Button>
          </Reveal>
        </Container>
      </section>

      {/* Close */}
      <section className="relative overflow-hidden">
        <Image
          src="/img/statement.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-deep from-30% via-deep/90 to-deep/50"
        />
        <Container className="relative py-20 sm:py-28">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <h2 className="text-[2rem] leading-[1.06] font-bold tracking-[-0.03em] text-balance sm:text-[2.75rem]">
                  Tell us what you are building, or what you want to learn.
                </h2>
              </div>
              <div className="lg:col-span-4 lg:col-start-9">
                <p className="leading-relaxed text-white/65">
                  Every enquiry reaches an engineer, not a contact form. Write
                  to us and you will get a considered answer.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={CONTACT.mailto}
                    className="bg-brand-600 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                  >
                    {CONTACT.email}
                  </a>
                  <a
                    href={CONTACT.tel}
                    className="border border-white/30 px-7 py-4 text-sm font-semibold transition-colors hover:bg-white/10"
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
