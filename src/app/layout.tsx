import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

/**
 * Two cuts of one superfamily. Inter Tight takes the headlines, where the
 * tighter fit suits the bold grotesque of the logo, and Inter takes body copy
 * where the wider forms stay readable at small sizes on a phone.
 */
const display = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const SITE = "https://bmgengineeringlimited.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "BMG Engineering Limited | MEP training and engineering consultancy",
    template: "%s | BMG Engineering Limited",
  },
  description:
    "Structured MEP training and mechanical engineering consultancy in Nigeria. " +
    "We teach engineers to design, calculate, select and deliver building systems that work.",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE,
    siteName: "BMG Engineering Limited",
    title: "BMG Engineering Limited",
    description:
      "Structured MEP training and mechanical engineering consultancy in Nigeria.",
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
    <html lang="en-NG" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-ink-900 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
