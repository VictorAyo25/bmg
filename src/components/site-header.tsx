"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { Note } from "./ui";
import { NAV } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  /*
   * Clicking the link for the page you are already on changes no pathname, so
   * the template effect never fires and nothing happens. People reasonably
   * expect a nav click to take them to the top, so handle that case here.
   * Smooth, because unlike a real navigation you can see where you came from.
   */
  const toTopIfSamePage = (href: string) => () => {
    setOpen(false);
    if (href !== pathname) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  /*
   * Condense once the page has moved. The bar shortens and gains a shadow, so
   * it reads as lifting off the content rather than sitting in it.
   *
   * Passive, because a scroll listener that can block scrolling is worse than
   * having no effect at all. The opacity stays high in both states: at 85 the
   * dark hero showed through and muddied the logo.
   */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "ease-lux sticky top-0 z-50 border-b border-rule bg-page/95 backdrop-blur-md transition-shadow duration-500 " +
        (scrolled ? "shadow-[0_6px_24px_-14px_rgb(12_35_64_/_0.3)]" : "")
      }
    >
      <div
        className={
          "ease-lux mx-auto flex max-w-[92rem] items-center justify-between px-5 transition-all duration-500 sm:px-8 " +
          (scrolled ? "h-14 lg:h-16" : "h-16 lg:h-20")
        }
      >
        <Link
          href="/"
          aria-label="BMG Engineering Limited, home"
          onClick={toTopIfSamePage("/")}
          className="flex items-center gap-2"
        >
          <Logo className="h-6 w-auto sm:h-7" />
          <span className="text-lg font-semibold tracking-[-0.014em] text-fg sm:text-xl">
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
                onClick={toTopIfSamePage(item.href)}
                className={`px-4 py-2 text-sm transition-colors ${
                  active ? "text-fg" : "text-fg-muted hover:text-fg"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="ml-5 rounded-[var(--radius-sm)] bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Enquire
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-fg lg:hidden"
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
        className="border-t border-rule lg:hidden"
      >
        <nav className="px-5 py-2" aria-label="Main, mobile">
          <ul>
            {NAV.map((item, i) => (
              <li
                key={item.href}
                className="border-b border-rule last:border-0"
              >
                <Link
                  href={item.href}
                  onClick={toTopIfSamePage(item.href)}
                  className="flex items-baseline gap-4 py-4"
                >
                  <Note className="text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </Note>
                  <span className="text-lg font-semibold">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 mb-5 block bg-brand-600 px-6 py-4 text-center text-sm font-semibold text-white"
          >
            Enquire
          </Link>
        </nav>
      </div>
    </header>
  );
}
