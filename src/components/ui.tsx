import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-[86rem] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

/** Monospace annotation, the drawing callout of the system. */
export function Note({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`font-mono text-[0.6875rem] leading-none tracking-note uppercase ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Section header. A sheet reference sits on the left of a full width rule,
 * the title hangs below it. Replaces the eyebrow, heading, lead stack that
 * every other site uses.
 */
export function SectionHead({
  sheet,
  label,
  title,
  lead,
  aside,
  invert = false,
}: {
  sheet: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
  invert?: boolean;
}) {
  return (
    <header>
      <div
        className={`flex items-center gap-5 border-t pt-4 ${
          invert ? "rule-invert" : "rule"
        }`}
      >
        <Note className={invert ? "text-brand-400" : "text-brand-700"}>
          {sheet}
        </Note>
        <Note className={invert ? "text-white/45" : "text-ink-500"}>
          {label}
        </Note>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-12">
        <h2
          className={`text-[2rem] leading-[1.06] font-semibold tracking-display text-balance sm:text-[2.75rem] lg:col-span-7 lg:text-[3.25rem] ${
            invert ? "text-white" : "text-ink-950"
          }`}
        >
          {title}
        </h2>
        {(lead || aside) && (
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-2">
            {lead && (
              <p
                className={`text-[1.0625rem] leading-relaxed ${
                  invert ? "text-white/65" : "text-ink-600"
                }`}
              >
                {lead}
              </p>
            )}
            {aside}
          </div>
        )}
      </div>
    </header>
  );
}

type ButtonProps = {
  variant?: "solid" | "outline" | "invert";
} & ComponentProps<typeof Link>;

/**
 * Square cornered by design. Pill buttons are the single loudest tell of a
 * template, and they sit badly next to hairline rules.
 */
export function Button({
  variant = "solid",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "group inline-flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors duration-200";
  const looks = {
    solid: "bg-ink-950 text-white hover:bg-brand-700",
    outline: "border rule text-ink-900 hover:border-ink-950 hover:bg-white",
    invert: "border rule-invert text-white hover:bg-white hover:text-ink-950",
  } as const;

  return (
    <Link className={`${base} ${looks[variant]} ${className}`} {...props} />
  );
}

/** The small travelling arrow used inside buttons and links. */
export function Arrow() {
  return (
    <span
      aria-hidden
      className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
    >
      &rarr;
    </span>
  );
}

export function TextLink({
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      className={`group inline-flex items-center gap-2 text-sm font-medium text-ink-950 ${className}`}
      {...props}
    >
      <span className="link-draw">{children}</span>
      <Arrow />
    </Link>
  );
}

/** Page header for every route except the home page. */
export function PageHero({
  sheet,
  label,
  title,
  lead,
}: {
  sheet: string;
  label: string;
  title: string;
  lead: string;
}) {
  return (
    <section className="border-b rule bg-white">
      <Container className="pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="flex items-center gap-5">
          <Note className="text-brand-700">{sheet}</Note>
          <span aria-hidden className="h-px flex-1 bg-ink-950/12" />
          <Note className="text-ink-500">{label}</Note>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <h1 className="text-[2.25rem] leading-[1.04] font-semibold tracking-display text-balance text-ink-950 sm:text-[3.25rem] lg:col-span-7 lg:text-[4rem]">
            {title}
          </h1>
          <p className="text-[1.0625rem] leading-relaxed text-ink-600 lg:col-span-4 lg:col-start-9 lg:pt-3">
            {lead}
          </p>
        </div>
      </Container>
    </section>
  );
}
