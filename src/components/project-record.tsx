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
      sector === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.sector === sector),
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
                "ease-lux flex items-center gap-2.5 rounded-[var(--radius-sm)] border px-4 py-2.5 font-mono text-[0.625rem] tracking-note uppercase transition-all duration-400 " +
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

      <ol className="mt-12">
        {shown.map((project, i) => (
          <li
            key={project.slug}
            className="block border-t border-rule last:border-b"
          >
            <article className="grid gap-6 py-10 lg:grid-cols-12 lg:gap-10">
              <Note className="text-accent lg:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </Note>

              <div className="lg:col-span-4">
                <Note className="text-fg-subtle">{project.sector}</Note>
                <h2 className="mt-4 text-2xl leading-snug font-semibold tracking-[-0.016em] text-balance">
                  {project.title}
                </h2>
                <p className="mt-3 text-sm font-semibold text-accent">
                  {project.system}
                </p>
              </div>

              <div className="lg:col-span-7">
                <p className="max-w-2xl leading-relaxed text-fg-muted">
                  {project.detail}
                </p>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2.5">
                      <span
                        aria-hidden
                        className="h-1 w-1 rounded-full bg-brand-600"
                      />
                      <Note className="text-fg-subtle">{h}</Note>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ol>

      <p className="mt-8" aria-live="polite">
        <Note className="text-fg-subtle">
          Showing {shown.length} of {PROJECTS.length} projects
        </Note>
      </p>
    </div>
  );
}
