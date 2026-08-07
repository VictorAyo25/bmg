import Link from "next/link";
import { Logo } from "./logo";
import { Note } from "./ui";
import { COMPANY, CONTACT, NAV } from "@/lib/site";

/** One cell of the title block. Mono label above, value below. */
function Cell({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`border-t rule-invert px-6 py-6 sm:px-8 ${className}`}>
      <Note className="text-white/40">{label}</Note>
      <div className="mt-3 text-sm text-white/85">{children}</div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-brand-950 text-white">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <div className="flex flex-col gap-10 py-16 sm:py-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Logo mono className="h-7 w-auto text-white" />
            <p className="mt-6 max-w-sm text-[1.375rem] leading-snug tracking-display text-white/90 sm:text-[1.75rem]">
              {COMPANY.tagline}
            </p>
          </div>
          <a
            href={CONTACT.mailto}
            className="group inline-flex w-fit items-center gap-3 border rule-invert px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-ink-950"
          >
            Start a conversation
            <span
              aria-hidden
              className="transition-transform duration-300 ease-out group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </a>
        </div>
      </div>

      {/* Title block. The panel every engineering drawing carries. */}
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          <Cell label="Pages">
            <ul className="space-y-2">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Cell>

          <Cell label="Email">
            <a
              href={CONTACT.mailto}
              className="break-all text-white/70 transition-colors hover:text-white"
            >
              {CONTACT.email}
            </a>
          </Cell>

          <Cell label="Telephone">
            <a
              href={CONTACT.tel}
              className="text-white/70 transition-colors hover:text-white"
            >
              {CONTACT.phone}
            </a>
          </Cell>

          <Cell label="Registration">
            <span className="text-white/70">RC {COMPANY.rcNumber}</span>
          </Cell>
        </div>

        <div className="flex flex-col gap-3 border-t rule-invert py-7 sm:flex-row sm:items-center sm:justify-between">
          <Note className="text-white/40">
            &copy; {new Date().getFullYear()} {COMPANY.legalName}
          </Note>
          <Note className="text-white/40">All rights reserved</Note>
        </div>
      </div>
    </footer>
  );
}
