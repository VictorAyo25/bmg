import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Served at /robots.txt. Everything is crawlable except the enquiry endpoint,
 * which is a POST handler with nothing to index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
