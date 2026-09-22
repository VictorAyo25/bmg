"use client";

import { useMemo, useState } from "react";
import { Note } from "./ui";
import { PROJECTS } from "@/lib/projects";

/**
 * The full project record, filterable by sector.
 *
 * The compact version of this on the home page is a summary. This one carries
 * the engineering detail, which is the part actually worth reading, so the
 * filter matters more here: a developer scanning for commercial work should
 * not have to read five private houses to find it.
 *
 * Counts are shown on the buttons because an empty-looking filter is
 * disorienting. Knowing there are two industrial projects before you click is
 * more useful than discovering it afterwards.
 *
 * All ten entries are in the markup before any script runs, so the record is
 * complete for search engines and for anyone whose JavaScript fails.
 */
export function ProjectRecord() {
  const [sector, setSector] = useState("All");

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of PROJECTS) map.set(p.sector, (map.get(p.sector) ?? 0) + 1);
    return map;
  }, []);

  const sectors = useMemo(
    () => ["All", ...Array.from(counts.keys())],
    [counts],
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
          const n = s === "All" ? PROJECTS.length : (counts.get(s) ?? 0);
          return (
            <button
              key={s}
              type="button"
              onClick={() => setSector(s)}
              aria-pressed={active}
              className={
                "ease-lux flex items-center gap-2.5 min-h-11 rounded-[var(--radius-sm)] border px-4 py-2.5 text-sm font-medium transition-all duration-400 " +
                (active
                  ? "border-transparent bg-brand-600 text-white"
                  : "border-rule text-fg-subtle hover:border-rule-strong hover:text-fg")
              }
            >
              {s}
              <span className={active ? "text-white/70" : "text-fg-subtle"}>
                {n}
              </span>
            </button>
          );
        })}
      </div>

      {/*
        Each entry used to open with the number alone on one line and the
        sector alone on the next, both in 10px tracked capitals, and close
        with a row of tiny tracked tags. On a phone that was floating orphan
        metadata above and below every entry, ten times over, which is the
        mechanical rhythm the reviewers read as generated.

        Now the number and sector share a line, the title carries the weight,
        and the highlights are ordinary readable text. The first entry in view
        is set larger, so the list opens on a lead rather than on item one of
        ten identical items.
      */}
      <ol className="mt-12">
        {shown.map((project, i) => {
          const lead = i === 0;
          return (
            <li
              key={project.slug}
              className="block border-t border-rule last:border-b"
            >
              <article
                className={`grid gap-5 lg:grid-cols-12 lg:gap-10 ${
                  lead ? "py-12 sm:py-14" : "py-9 sm:py-10"
                }`}
              >
                <div className="lg:col-span-5">
                  <p className="text-sm font-medium text-fg-subtle">
                    <span className="font-bold text-accent tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden className="mx-2.5 opacity-40">
                      /
                    </span>
                    {project.sector}
                  </p>
                  <h2
                    className={`mt-3 leading-[1.08] font-bold tracking-[-0.028em] text-balance ${
                      lead
                        ? "text-[2rem] sm:text-[2.5rem]"
                        : "text-[1.625rem] sm:text-[1.875rem]"
                    }`}
                  >
                    {project.title}
                  </h2>
                  <p className="mt-3 font-semibold text-accent">
                    {project.system}
                  </p>
                </div>

                <div className="lg:col-span-7">
                  <p
                    className={`max-w-2xl leading-relaxed text-fg-muted ${
                      lead ? "text-lg" : ""
                    }`}
                  >
                    {project.detail}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.highlights.map((h) => (
                      <li
                        key={h}
                        className="rounded-full border border-rule bg-white px-3 py-1 text-sm text-fg-muted"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          );
        })}
      </ol>

      <p className="mt-8" aria-live="polite">
        <Note className="text-fg-subtle">
          Showing {shown.length} of {PROJECTS.length} projects
        </Note>
      </p>
    </div>
  );
}
