import type { Metadata, Viewport } from "next";
import {
  Archivo,
  IBM_Plex_Mono,
  Instrument_Serif,
  Space_Grotesk,
} from "next/font/google";
import { NavProgress } from "@/components/nav-progress";
import "./globals.css";

/**
 * Four families are loaded while three design directions are being compared.
 * Whichever the client picks ships with its own two, and the rest come out.
 */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://bmgengineeringlimited.com";

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
    <html
      lang="en"
      className={`${archivo.variable} ${plexMono.variable} ${instrumentSerif.variable} ${spaceGrotesk.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <NavProgress />
        {children}
      </body>
    </html>
  );
}
