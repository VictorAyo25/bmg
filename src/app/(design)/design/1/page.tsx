import type { Metadata } from "next";
import { DesignA } from "@/components/designs/design-a";

export const metadata: Metadata = {
  title: "Option 1, with photograph",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <DesignA photo />;
}
