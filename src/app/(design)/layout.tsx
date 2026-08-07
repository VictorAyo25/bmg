import Link from "next/link";

const OPTIONS = [
  { href: "/design/a", key: "A", name: "Blueprint" },
  { href: "/design/b", key: "B", name: "Editorial" },
  { href: "/design/c", key: "C", name: "Field" },
];

/**
 * Wrapper for the three design previews. Deliberately outside the live site
 * layout, so none of these pages inherit the header, footer or type of the
 * current build. The switcher is scaffolding and comes out once one is picked.
 */
export default function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="sticky top-0 z-100 flex items-center justify-between gap-4 bg-[#101318] px-4 py-2.5 text-white sm:px-6">
        <Link
          href="/design"
          className="font-mono text-[0.625rem] tracking-[0.16em] text-white/50 uppercase transition-colors hover:text-white"
        >
          BMG / Design options
        </Link>
        <nav className="flex items-center gap-1.5">
          {OPTIONS.map((o) => (
            <Link
              key={o.href}
              href={o.href}
              className="px-3 py-1.5 font-mono text-[0.625rem] tracking-[0.16em] text-white/60 uppercase transition-colors hover:bg-white/10 hover:text-white"
            >
              <span className="text-white/90">{o.key}</span>
              <span className="ml-2 hidden sm:inline">{o.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      {children}
    </>
  );
}
