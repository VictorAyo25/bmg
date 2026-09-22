import { COMPANY, CONTACT } from "./site";

/**
 * The site's canonical origin.
 *
 * Until September 2026 this was hardcoded to bmgengineeringlimited.com, a
 * domain that has not been bought yet and does not resolve. Every page was
 * declaring a dead address as its own URL, so every WhatsApp and social
 * preview pointed nowhere, and any sitemap would have done the same. Google
 * ignores sitemap URLs on a host it cannot reach.
 *
 * Resolved in order:
 *   1. NEXT_PUBLIC_SITE_URL, if someone sets it deliberately.
 *   2. VERCEL_PROJECT_PRODUCTION_URL, which Vercel fills in on every build.
 *      Per Vercel's docs it is the shortest custom production domain, or the
 *      vercel.app domain when none is attached. So this is correct today,
 *      and switches to the real domain by itself once it is added in Vercel,
 *      with nothing for anybody to remember.
 *   3. The known live address, in case system variables are switched off.
 *
 * Server only. Kept out of site.ts because client components import that,
 * and these variables do not exist in the browser.
 */
export const SITE_URL = (() => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "https://bmgengineering.vercel.app";
})();

/** Every public page, for the sitemap. Kept in one place so none is missed. */
export const PAGES = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/training", priority: 0.9, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.8, changeFrequency: "monthly" },
  { path: "/consultancy", priority: 0.8, changeFrequency: "yearly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
] as const;

/**
 * Structured data for the firm.
 *
 * Deliberately Organization rather than LocalBusiness. LocalBusiness expects
 * a street address, and the site does not publish one yet at the client's
 * request. Claiming a local business type with no location in it is worse
 * than claiming the accurate, broader type. When an address can be published
 * this is the place to upgrade it, and it is the single biggest thing left
 * for local search.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: COMPANY.legalName,
    alternateName: COMPANY.shortName,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    slogan: COMPANY.tagline,
    description:
      "Mechanical, electrical and plumbing design, engineering consultancy, and structured MEP training for engineers.",
    email: CONTACT.email,
    telephone: CONTACT.phone.replace(/\s+/g, ""),
    identifier: {
      "@type": "PropertyValue",
      propertyID: "CAC RC",
      value: COMPANY.rcNumber,
    },
    knowsAbout: [
      "HVAC design",
      "Cooling load calculation",
      "Duct design",
      "Chilled water systems",
      "Mechanical, electrical and plumbing engineering",
    ],
  };
}

/** Structured data for the training programme, the offer that leads. */
export function courseJsonLd(course: {
  name: string;
  description: string;
  modules: readonly { title: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    url: `${SITE_URL}/training`,
    provider: { "@id": `${SITE_URL}/#organization` },
    teaches: course.modules.map((m) => m.title),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
    },
  };
}

/**
 * Serialise structured data for a script tag. Escaping the opening angle
 * bracket is what the Next docs recommend, so no value can close the tag
 * early and inject markup.
 */
export function jsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
