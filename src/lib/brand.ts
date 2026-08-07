/**
 * The brand blue, and the two steps of it that exist for legibility.
 *
 * BLUE is the logo, sampled from the artwork. It is the accent in all three
 * design directions and nothing else may take its place.
 *
 * The other two are the same hue moved up or down so small text stays
 * readable. BLUE at 10px measures 4.48:1 on near black and 3.85:1 on warm
 * paper, both under the 4.5:1 needed for body text, so ON_DARK and ON_LIGHT
 * carry small copy on those backgrounds. Display type and fills always use
 * BLUE itself, where the contrast requirement is only 3:1.
 */
export const BRAND = {
  /** The logo blue. Display type, fills, rules, drawings. */
  BLUE: "#097ccd",
  /** Lightened, for small text on dark backgrounds. */
  ON_DARK: "#5fb6fa",
  /** Darkened, for small text on light backgrounds. */
  ON_LIGHT: "#0e5288",
  /** The logo grey. */
  GREY: "#808080",
} as const;
