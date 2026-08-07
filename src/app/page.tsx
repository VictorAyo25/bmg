import { CONTACT } from "@/lib/site";

/**
 * Home page, first slice.
 *
 * Copy here is a draft built from the company profile and the training led
 * positioning. It exists to prove the type scale, spacing and colour system
 * on a real screen. Client names stay out by design.
 */
export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        {/* Soft brand wash, kept behind the type and out of the way of it. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60rem_40rem_at_75%_-10%,var(--color-brand-50),transparent_65%)]"
        />

        <div className="mx-auto max-w-6xl px-5 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-28 lg:pt-32">
          <p className="text-xs font-semibold tracking-[0.14em] text-brand-700 uppercase">
            MEP training and engineering consultancy
          </p>

          <h1 className="font-display mt-6 max-w-4xl text-[2.5rem] leading-[1.05] font-semibold tracking-display text-balance text-ink-950 sm:text-6xl lg:text-7xl">
            Learn to design building systems that actually get built.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-600 sm:text-xl">
            Structured mechanical, electrical and plumbing training that closes
            the gap between an architect&rsquo;s drawing and a system that
            works on site. Taught by engineers who design them for a living.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={CONTACT.mailto}
              className="inline-flex items-center justify-center rounded-full bg-brand-600 px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-brand-700"
            >
              Talk to us about training
            </a>
            <a
              href="/projects"
              className="inline-flex items-center justify-center rounded-full border border-ink-200 px-7 py-3.5 text-base font-medium text-ink-800 transition-colors hover:border-ink-300 hover:bg-ink-50"
            >
              See the work
            </a>
          </div>

          <dl className="mt-16 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-8 border-t border-ink-200 pt-10 sm:grid-cols-4">
            {[
              { value: "10", label: "Projects delivered" },
              { value: "4", label: "Core disciplines" },
              { value: "6", label: "Month programme" },
              { value: "1:1", label: "Design reviews" },
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
        </div>
      </section>
    </>
  );
}
