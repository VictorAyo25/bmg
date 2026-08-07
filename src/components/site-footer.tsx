import Link from "next/link";
import { Logo } from "./logo";
import { COMPANY, CONTACT, NAV } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-brand-950 text-ink-300">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between md:gap-8">
          <div className="max-w-xs">
            <Logo mono className="h-7 w-auto text-white" />
            <p className="mt-5 text-sm leading-relaxed text-ink-400">
              {COMPANY.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div>
              <h2 className="text-xs font-semibold tracking-wider text-white uppercase">
                Explore
              </h2>
              <ul className="mt-4 space-y-3">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-ink-300 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-semibold tracking-wider text-white uppercase">
                Contact
              </h2>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href={CONTACT.mailto}
                    className="text-sm break-all text-ink-300 transition-colors hover:text-white"
                  >
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.tel}
                    className="text-sm text-ink-300 transition-colors hover:text-white"
                  >
                    {CONTACT.phone}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-8 text-xs text-ink-400 sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY.legalName}. All rights
            reserved.
          </p>
          <p>RC {COMPANY.rcNumber}</p>
        </div>
      </div>
    </footer>
  );
}
