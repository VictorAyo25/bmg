import Link from "next/link";
import Image from "next/image";
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

/** Monospace annotation. The drawing callout of the system. */
export function Note({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`font-mono text-[0.625rem] leading-none tracking-note uppercase ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Angled section label, lifted from the flyers. The cut corner is the one
 * device on those flyers that nothing else in this market is using.
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
      className={`inline-block bg-brand-600 px-4 py-2 font-mono text-[0.625rem] tracking-note text-white uppercase ${className}`}
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
        <h2 className="text-[2rem] leading-[1.06] font-bold tracking-[-0.03em] text-balance lg:col-span-7 lg:text-[3rem]">
          {title}
        </h2>
        {lead && (
          <p className="leading-relaxed text-white/65 lg:col-span-4 lg:col-start-9 lg:pt-2">
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
    solid: "bg-brand-600 text-white hover:bg-brand-700",
    outline: "border border-white/30 text-white hover:bg-white/10",
  } as const;

  return (
    <Link
      className={`inline-flex items-center px-7 py-4 text-sm font-semibold transition-colors duration-200 ${looks[variant]} ${className}`}
      {...props}
    />
  );
}

/** Page header for every route except the home page. */
export function PageHero({
  label,
  title,
  lead,
  image,
}: {
  label: string;
  title: string;
  lead: string;
  /** Path under /img. Duotoned to the brand blue before it ever ships. */
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/12">
      {image && image.endsWith(".mp4") ? (
        <>
          <video
            src={image}
            aria-hidden="true"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 object-cover w-full h-full"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-r from-deep from-20% via-deep/75 to-deep/25"
          />
        </>
      ) : image ? (
        <>
          <Image
            src={image}
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          {/*
            Scrim. The photograph is already darkened, but headline contrast
            cannot depend on what happens to be in the top left of a photo,
            so the gradient guarantees it regardless of the image.
          */}
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-r from-deep from-20% via-deep/75 to-deep/25"
          />
        </>
      ) : null}
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
        className="pointer-events-none absolute -top-48 -right-48 h-[34rem] w-[34rem] rounded-full bg-mid opacity-50 blur-3xl"
      />
      <Container className="relative pt-14 pb-16 sm:pt-20 sm:pb-24">
        <Tab>{label}</Tab>
        <div className="mt-9 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <h1 className="text-[2.5rem] leading-[0.98] font-bold tracking-[-0.035em] text-balance lg:col-span-7 lg:text-[4rem]">
            {title}
          </h1>
          <p className="text-lg leading-relaxed text-white/70 lg:col-span-4 lg:col-start-9 lg:pt-3">
            {lead}
          </p>
        </div>
      </Container>
    </section>
  );
}
