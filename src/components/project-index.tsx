"use client";

import { useMemo, useState } from "react";
import { Note } from "./ui";
import { PROJECTS } from "@/lib/projects";

/**
 * The project record, filterable by sector.
 *
 * The point is not the filter itself, it is that the page does something when
 * you touch it. A list you can interrogate is the clearest difference between
 * a website and a slide of bullet points, and it happens to be genuinely
 * useful here: a developer only cares about the commercial work.
 *
 * Filtering is client side over ten rows, so there is no request and no
 * spinner. The whole set is in the markup before any script runs, which means
 * the record is readable and indexable even if the filter never initialises.
 */
export function ProjectIndex() {
  const [sector, setSector] = useState<string>("All");

  const sectors = useMemo(
    () => ["All", ...Array.from(new Set(PROJECTS.map((p) => p.sector)))],
    [],
  );

  const shown = useMemo(
    () =>
      sector === "All" ? PROJECTS : PROJECTS.filter((p) => p.sector === sector),
    [sector],
  );

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter projects by sector"
      >
        {sectors.map((s) => {
          const active = s === sector;
          return (
            <button
              key={s}
              type="button"
              onClick={() => setSector(s)}
              aria-pressed={active}
              className={
                "ease-lux rounded-[var(--radius-sm)] border px-4 py-2 font-mono text-[0.625rem] tracking-note uppercase transition-all duration-400 " +
                (active
                  ? "border-transparent bg-brand-600 text-white"
                  : "border-rule text-fg-subtle hover:border-rule-strong hover:text-fg")
              }
            >
              {s}
            </button>
          );
        })}
      </div>

      <p className="mt-6" aria-live="polite">
        <Note className="text-fg-subtle">
          Showing {shown.length} of {PROJECTS.length}
        </Note>
      </p>

      <ul className="mt-4 border-t border-rule">
        {shown.map((p, i) => (
          <li
            key={p.slug}
            className="lift -mx-4 grid gap-2 border-b border-rule px-4 py-6 hover:bg-tint sm:grid-cols-12 sm:gap-6 lg:items-baseline"
          >
            <Note className="text-accent lg:col-span-1">
              {String(i + 1).padStart(2, "0")}
            </Note>
            <span className="text-lg font-semibold tracking-[-0.014em] lg:col-span-4">
              {p.title}
            </span>
            <span className="text-sm text-fg-muted lg:col-span-3">
              {p.system}
            </span>
            <span className="lg:col-span-4">
              <Note className="text-fg-subtle">{p.sector}</Note>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
