/**
 * Runs on every navigation, unlike layout.tsx which persists. That makes it
 * the right place for the enter animation, so each page arrives rather than
 * simply appearing.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
