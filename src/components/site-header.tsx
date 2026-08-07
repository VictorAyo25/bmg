"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./logo";
import { CONTACT, NAV } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link
          href="/"
          className="shrink-0"
          aria-label="BMG Engineering Limited, home"
          onClick={() => setOpen(false)}
        >
          <Logo className="h-6 w-auto sm:h-7" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-700 transition-colors hover:text-brand-700"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={CONTACT.mailto}
            className="rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
          >
            Get in touch
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-800 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="relative block h-4 w-5" aria-hidden>
            <span
              className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${
                open ? "top-1.5 rotate-45" : "top-0.5"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-ink-200/70 bg-white md:hidden"
      >
        <nav className="mx-auto max-w-6xl px-5 py-3" aria-label="Main, mobile">
          <ul className="divide-y divide-ink-100">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3.5 text-base font-medium text-ink-800"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={CONTACT.mailto}
            onClick={() => setOpen(false)}
            className="mt-4 mb-2 block rounded-full bg-ink-900 px-5 py-3 text-center text-sm font-medium text-white"
          >
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
}
