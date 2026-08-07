import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/** Page gutter. Every full width section wraps its content in this. */
export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Section label. The small blue line plus caps sets the rhythm of the page
 * and echoes the numbered sections in the company profile.
 */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-brand-700 uppercase">
      <span aria-hidden className="h-px w-6 bg-brand-600" />
      {children}
    </p>
  );
}

export function SectionHeading({
  as: Tag = "h2",
  className = "",
  children,
}: {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={`font-display text-3xl leading-[1.1] font-semibold tracking-display text-balance text-ink-950 sm:text-4xl lg:text-5xl ${className}`}
    >
      {children}
    </Tag>
  );
}

export function Lead({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <p className={`text-lg leading-relaxed text-ink-600 ${className}`}>
      {children}
    </p>
  );
}

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
} & ComponentProps<typeof Link>;

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-medium transition-colors";
  const looks = {
    primary: "bg-brand-600 text-white hover:bg-brand-700",
    secondary:
      "border border-ink-200 text-ink-800 hover:border-ink-300 hover:bg-ink-50",
    ghost: "border border-white/25 text-white hover:bg-white/10",
  } as const;

  return <Link className={`${base} ${looks[variant]} ${className}`} {...props} />;
}

/** Page header used by every route except the home page. */
export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <section className="border-b border-ink-200 bg-ink-50/60">
      <Container className="py-16 sm:py-24">
        <Eyebrow>{eyebrow}</Eyebrow>
        <SectionHeading as="h1" className="mt-6 max-w-3xl">
          {title}
        </SectionHeading>
        <Lead className="mt-6 max-w-2xl">{lead}</Lead>
      </Container>
    </section>
  );
}
