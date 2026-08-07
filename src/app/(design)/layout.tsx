import { DesignSwitcher } from "@/components/design-switcher";

/**
 * Wrapper for the design previews. Deliberately outside the live site layout,
 * so none of these pages inherit its header, footer or type.
 */
export default function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DesignSwitcher />
      {children}
    </>
  );
}
