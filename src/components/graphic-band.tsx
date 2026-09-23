import type { ReactNode } from "react";
import { Container } from "@/components/ui";

/**
 * A full bleed white band carrying one of the background graphics.
 *
 * Two rules are baked in here, both learned the hard way.
 *
 * First, a graphic this strong gets its own room. Stretched behind a long
 * column of body copy it has to cover thousands of pixels of height from a
 * frame a few hundred deep, and the slice zooms it into fat diagonal bars
 * across the text. Sections that are there to be read keep a quiet backdrop;
 * this is where the loud work happens.
 *
 * Second, the band takes the graphic as a prop rather than owning one. The
 * first version hard coded the airflow field, so every page that wanted a
 * band got the same picture, and four identical bands is monotony pretending
 * to be a system. Each page now brings its own device and the band only
 * handles the things they share: the white ground, the seams, and keeping the
 * copy readable over the top.
 *
 * With copy, the words sit in the open part of the field. Without, the band
 * runs shorter and works as a breath between sections.
 */
export function GraphicBand({
  graphic,
  children,
  height = "h-40 sm:h-52",
}: {
  graphic: ReactNode;
  children?: ReactNode;
  /** Only for the silent bands; the ones carrying copy are sized by it. */
  height?: string;
}) {
  return (
    <section className="relative overflow-hidden border-y border-rule bg-white">
      {graphic}

      {children ? (
        <>
          {/*
            Narrow viewports: the copy runs the full width, so clearing the
            left of the frame does nothing and a line draws itself through the
            words like a strikethrough. Clear a horizontal band instead and
            let the graphic read above and below it.
          */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 sm:hidden"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.84) 26%, rgba(255,255,255,0.84) 74%, rgba(255,255,255,0) 100%)",
            }}
          />
          {/* Wider: the copy is inset, so the open left of the frame carries it. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden sm:block"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 32%, rgba(255,255,255,0) 64%)",
            }}
          />
          <Container className="relative py-28 sm:py-36">
            <p className="max-w-xl text-[1.5rem] leading-[1.15] font-bold tracking-[-0.03em] text-balance sm:text-[2.125rem]">
              {children}
            </p>
          </Container>
        </>
      ) : (
        <div className={height} />
      )}
    </section>
  );
}
