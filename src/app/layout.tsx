import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { NavProgress } from "@/components/nav-progress";
import "./globals.css";

/**
 * Two families, both belonging to the chosen design. Archivo carries the
 * page, Plex Mono is the annotation layer.
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

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://bmgengineeringlimited.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default:
      "BMG Engineering Limited | MEP training and engineering consultancy",
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
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <head>
        {/*
          Marks that script is running, before first paint. The reveal styles
          hide content until an observer shows it, so without this a visitor
          with JavaScript disabled gets a page that is empty below the fold.
          Content must never depend on script merely to be visible.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        <NavProgress />
        {children}
      </body>
    </html>
  );
}
