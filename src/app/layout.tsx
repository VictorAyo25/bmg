import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NavProgress } from "@/components/nav-progress";
import "./globals.css";

/**
 * Archivo carries the whole page. It is a grotesque with enough width and
 * weight to hold a 4rem headline without looking like a default, and it still
 * reads cleanly at 15px on a phone.
 *
 * Plex Mono is the annotation layer: sheet references, labels, schedule
 * columns. It is doing the job the callout text does on a drawing.
 */
const sans = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

const SITE = "https://bmgengineering.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "BMG Engineering Limited | MEP training and engineering consultancy",
    template: "%s | BMG Engineering Limited",
  },
  description:
    "Structured MEP training and mechanical engineering consultancy. " +
    "We teach engineers to design, calculate, select and deliver building systems that work.",
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "BMG Engineering Limited",
    title: "BMG Engineering Limited",
    description:
      "Structured MEP training and mechanical engineering consultancy.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#097ccd",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-70 focus:bg-ink-950 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <NavProgress />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
