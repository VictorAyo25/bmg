import Link from "next/link";
import { Logo } from "./logo";
import { Note } from "./ui";
import { COMPANY, CONTACT, NAV } from "@/lib/site";

/** One cell of the title block. */
function Cell({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-white/12 px-0 py-6 sm:px-8">
      <Note className="text-white/40">{label}</Note>
      <div className="mt-3 text-sm text-white/80">{children}</div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/12 bg-mid">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
        <div className="flex flex-col gap-10 py-16 sm:py-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Logo mono className="h-7 w-auto text-white" />
            <p className="mt-6 max-w-sm text-[1.5rem] leading-snug font-semibold tracking-[-0.02em] sm:text-[1.875rem]">
              {COMPANY.tagline}
            </p>
          </div>
          <a
            href={CONTACT.mailto}
            className="inline-flex w-fit bg-brand-600 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Start a conversation
          </a>
        </div>

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

        <div className="flex flex-col gap-3 border-t border-white/12 py-7 sm:flex-row sm:items-center sm:justify-between">
          <Note className="text-white/40">
            &copy; {new Date().getFullYear()} {COMPANY.legalName}
          </Note>
          <div className="flex items-center gap-6">
            <Link
              href="/credits"
              className="font-mono text-[0.625rem] tracking-note text-white/40 uppercase transition-colors hover:text-white/70"
            >
              Image credits
            </Link>
            <Note className="text-white/40">All rights reserved</Note>
          </div>
        </div>
      </div>
    </footer>
  );
}
