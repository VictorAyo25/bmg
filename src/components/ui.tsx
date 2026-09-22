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
    <div className={`mx-auto w-full max-w-[92rem] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

/**
 * A small label. Sentence case, in the body face, at a size a phone can read.
 *
 * This used to be 10px monospace in wide tracked capitals, and it was on
 * almost everything: section eyebrows, sector tags, numbers, highlights. On
 * the Projects page it accounted for 49 of 101 text elements. The four HVAC
 * reference sites the reviewers supplied were measured for the same thing and
 * used between 0 and 4, and none of them used a monospace face anywhere.
 *
 * Tiny tracked mono capitals applied to everything is one of the most
 * recognisable tics of generated design, which is precisely what the
 * reviewers meant by the typesetting feeling AI generated. Used on every
 * element it reads as a system nobody made decisions in.
 *
 * Monospace survives only inside the technical drawing, where annotation is
 * genuinely what it is.
 */
export function Note({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`text-[0.8125rem] leading-snug font-medium tabular-nums ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Angled section label, lifted from the flyers. The cut corner is the one
 * device on those flyers that nothing else in this market is using.
 *
 * Set in the bold sans, not monospace. The flyers set these in heavy capitals
 * ("WHAT YOU WILL LEARN"), so this is closer to the source as well as easier
 * to read.
 */
export function Tab({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`edge-lit-strong inline-block bg-brand-600 px-4 py-2 text-[0.75rem] font-bold tracking-[0.06em] text-white uppercase ${className}`}
      style={{
        clipPath: "polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
      }}
    >
      {children}
    </span>
  );
}

/** Section header. Tab, then the title, with an optional column alongside. */
export function SectionHead({
  label,
  title,
  lead,
}: {
  label: string;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <header>
      <Tab>{label}</Tab>
      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
        <h2 className="text-[2rem] leading-[1.05] font-bold tracking-[-0.03em] text-balance lg:col-span-7 lg:text-[3rem]">
          {title}
        </h2>
        {lead && (
          <p className="leading-relaxed text-fg-muted lg:col-span-4 lg:col-start-9 lg:pt-2">
            {lead}
          </p>
        )}
      </div>
    </header>
  );
}

type ButtonProps = {
  variant?: "solid" | "outline";
} & ComponentProps<typeof Link>;

/** Square cornered. Pill buttons are the loudest template tell there is. */
export function Button({
  variant = "solid",
  className = "",
  ...props
}: ButtonProps) {
  const looks = {
    solid: "bg-brand-600 text-white edge-lit-strong hover:bg-brand-700",
    outline: "border border-rule-strong text-fg hover:bg-tint",
  } as const;

  return (
    <Link
      className={`ease-lux inline-flex items-center px-7 py-4 text-sm font-semibold transition-all duration-500 ${looks[variant]} ${className}`}
      {...props}
    />
  );
}

/** Page header for every route except the home page. */
import { BackgroundSlideshow } from "./background-slideshow";

export function PageHero({
  label,
  title,
  lead,
  image,
  images,
}: {
  label: string;
  title: string;
  lead?: string;
  /** Single image path for backward compatibility */
  image?: string;
  /** Array of image paths for slideshow */
  images?: string[];
}) {
  const bgImages = images || (image ? [image] : []);

  return (
    <section className="surface-dark panel-dark relative">
      {bgImages.length > 0 && <BackgroundSlideshow images={bgImages} />}

      {/*
        The drafting grid, drifting slowly over the photograph. Every page
        hero now has some ambient movement, which is most of what makes a
        page read as live rather than printed. Stops under reduced motion.
      */}
      <div
        aria-hidden
        className="grid-drift pointer-events-none absolute inset-0 z-[1] opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 -right-48 h-[34rem] w-[34rem] rounded-full bg-brand-500 opacity-20 blur-3xl"
      />
      <Container className="relative z-10 pt-16 pb-20 sm:pt-28 sm:pb-32">
        <Tab>{label}</Tab>
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <h1 className="text-[2.5rem] leading-[1.02] font-bold tracking-[-0.03em] text-balance lg:col-span-8 lg:text-[4rem]">
            {title}
          </h1>
          {lead && (
            <div className="lg:col-span-4 lg:col-start-9 lg:pt-3">
              <p className="text-lg leading-relaxed text-fg-muted sm:text-xl">
                {lead}
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
