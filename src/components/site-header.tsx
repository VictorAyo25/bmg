"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { Note } from "./ui";
import { COMPANY, CONTACT, NAV } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b rule bg-paper/85 backdrop-blur-md">
      {/* Title block strip. The data a drawing sheet carries in its header. */}
      <div className="hidden border-b rule lg:block">
        <div className="mx-auto flex max-w-[86rem] items-center justify-between px-8 py-2">
          <Note className="text-ink-500">{COMPANY.legalName}</Note>
          <div className="flex items-center gap-8">
            <Note className="text-ink-500">RC {COMPANY.rcNumber}</Note>
            <Note className="text-ink-500">MEP design and training</Note>
            <a
              href={CONTACT.tel}
              className="font-mono text-[0.6875rem] tracking-note text-ink-700 uppercase transition-colors hover:text-brand-700"
            >
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-[86rem] items-center justify-between px-5 sm:px-8 lg:h-[4.5rem]">
        <Link
          href="/"
          aria-label="BMG Engineering Limited, home"
          onClick={() => setOpen(false)}
          className="shrink-0"
        >
          <Logo className="h-[1.375rem] w-auto sm:h-6" />
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Main">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative px-5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-ink-950"
                    : "text-ink-600 hover:text-ink-950"
                }`}
              >
                {item.label}
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-x-5 -bottom-0.5 h-px bg-brand-600"
                  />
                )}
              </Link>
            );
          })}
          <a
            href={CONTACT.mailto}
            className="group ml-6 inline-flex items-center gap-3 bg-ink-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700"
          >
            Get in touch
            <span
              aria-hidden
              className="transition-transform duration-300 ease-out group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-ink-900 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="relative block h-3.5 w-5" aria-hidden>
            <span
              className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-5 bg-current transition-all duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t rule bg-paper lg:hidden"
      >
        <nav className="px-5 py-2" aria-label="Main, mobile">
          <ul>
            {NAV.map((item, i) => (
              <li key={item.href} className="border-b rule last:border-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-4"
                >
                  <Note className="text-brand-700">
                    {String(i + 1).padStart(2, "0")}
                  </Note>
                  <span className="text-lg font-medium text-ink-950">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={CONTACT.mailto}
            onClick={() => setOpen(false)}
            className="mt-4 mb-5 flex items-center justify-between bg-ink-950 px-6 py-4 text-sm font-medium text-white"
          >
            Get in touch
            <span aria-hidden>&rarr;</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
