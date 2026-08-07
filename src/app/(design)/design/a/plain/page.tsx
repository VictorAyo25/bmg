import type { Metadata } from "next";
import { DesignA } from "@/components/designs/design-a";

export const metadata: Metadata = {
  title: "Option A, Blueprint, without photograph",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <DesignA photo={false} />;
}
