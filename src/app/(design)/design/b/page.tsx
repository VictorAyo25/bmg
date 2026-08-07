import type { Metadata } from "next";
import { DesignB } from "@/components/designs/design-b";

export const metadata: Metadata = {
  title: "Option B, Editorial, with photograph",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <DesignB photo />;
}
