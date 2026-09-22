import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Logo } from "@/components/logo";
import { COMPANY } from "@/lib/site";

/**
 * The link preview.
 *
 * Most visitors arrive from a WhatsApp link, and this image is what they see
 * before they tap. Until now there was none, so a shared link showed a bare
 * URL, which on a phone reads as a link nobody bothered to finish.
 *
 * Set in Archivo, the site's own face, from a static TrueType file in
 * src/assets. The renderer cannot read variable fonts or WOFF2, which is what
 * next/font downloads, hence the separate file. Archivo is licensed under the
 * SIL Open Font License, which permits bundling it.
 *
 * Generated once at build time and cached, so it costs nothing per request.
 */

export const alt = `${COMPANY.legalName}. MEP design and training.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0c2340";
const ACCENT = "#0a62a5";
const PAGE = "#f4f6f9";

export default async function Image() {
  const archivo = await readFile(
    join(process.cwd(), "src/assets/Archivo-Bold.ttf"),
  );

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "70px 80px",
        background: PAGE,
        fontFamily: "Archivo",
        // The drafting grid, the one texture the whole site shares.
        backgroundImage:
          "linear-gradient(to right, rgba(12,35,64,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(12,35,64,0.06) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <Logo style={{ width: 196, height: 70 }} />
        <div
          style={{
            fontSize: 34,
            color: INK,
            letterSpacing: "-0.01em",
          }}
        >
          ENGINEERING
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            width: 86,
            height: 8,
            background: "#097ccd",
            marginBottom: 34,
          }}
        />
        <div
          style={{
            fontSize: 78,
            color: INK,
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            maxWidth: 980,
          }}
        >
          We design the systems that make a building work.
        </div>
        <div
          style={{
            marginTop: 30,
            fontSize: 32,
            color: ACCENT,
          }}
        >
          Mechanical, electrical and plumbing design, and training
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Archivo", data: archivo, style: "normal", weight: 700 }],
    },
  );
}
