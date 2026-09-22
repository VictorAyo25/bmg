import type { MetadataRoute } from "next";
import { PAGES, SITE_URL } from "@/lib/seo";

/**
 * Served at /sitemap.xml. Built from the single PAGES list in lib/seo.ts, so
 * adding a page there is enough to have it discovered.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PAGES.map((page) => ({
    url: `${SITE_URL}${page.path === "/" ? "" : page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
