import type { Metadata } from "next";
import { DesignC } from "@/components/designs/design-c";

export const metadata: Metadata = {
  title: "Option C, Field, with photograph",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <DesignC photo />;
}
