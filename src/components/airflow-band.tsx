import type { ReactNode } from "react";
import { AirflowField } from "@/components/airflow-field";
import { Container } from "@/components/ui";

/**
 * A full bleed white band carrying the airflow field.
 *
 * The field is deliberately not used as a page-wide background. Stretched
 * behind a long column of body copy it has to cover thousands of pixels of
 * height from a 1440x460 frame, which zooms the streamlines into fat diagonal
 * bars that cross the text. Motion this strong needs its own room, so it gets
 * a band of its own and the reading sections keep the quiet backdrop.
 *
 * With copy, the words sit in the open left of the field and the constriction
 * is left untouched to the right of them. Without copy, the band runs shorter
 * and works as a breath between sections.
 */
export function AirflowBand({ children }: { children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-y border-rule bg-white">
      <AirflowField className="absolute inset-0 h-full w-full" />

      {children ? (
        <>
          {/*
            Narrow viewports: the copy runs the full width, so clearing the
            left of the frame does nothing and a streamline draws itself
            through the words like a strikethrough. Clear a horizontal band
            instead and let the field read above and below it.
          */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 sm:hidden"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.84) 26%, rgba(255,255,255,0.84) 74%, rgba(255,255,255,0) 100%)",
            }}
          />
          {/* Wider: the copy is inset, so the open left of the field carries it. */}
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
        <div className="h-40 sm:h-52" />
      )}
    </section>
  );
}
