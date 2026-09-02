"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { Note } from "./ui";
import { CONTACT, NAV } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/12 bg-deep/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[92rem] items-center justify-between px-5 sm:px-8 lg:h-20">
        <Link
          href="/"
          aria-label="BMG Engineering Limited, home"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2"
        >
          <Logo mono className="h-6 w-auto text-white sm:h-7" />
          <span className="text-lg font-bold tracking-tight text-white sm:text-xl">
            ENGINEERING
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`px-4 py-2 text-sm transition-colors ${
                  active ? "text-white" : "text-white/65 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={CONTACT.mailto}
            className="ml-5 bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Enquire
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-white lg:hidden"
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
        className="border-t border-white/12 lg:hidden"
      >
        <nav className="px-5 py-2" aria-label="Main, mobile">
          <ul>
            {NAV.map((item, i) => (
              <li
                key={item.href}
                className="border-b border-white/10 last:border-0"
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-4"
                >
                  <Note className="text-sky">
                    {String(i + 1).padStart(2, "0")}
                  </Note>
                  <span className="text-lg font-semibold">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={CONTACT.mailto}
            onClick={() => setOpen(false)}
            className="mt-4 mb-5 block bg-brand-600 px-6 py-4 text-center text-sm font-semibold text-white"
          >
            Enquire
          </a>
        </nav>
      </div>
    </header>
  );
}
