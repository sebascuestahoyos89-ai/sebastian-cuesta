import type { MetadataRoute } from "next";

const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://sebastiancuesta.com",
).origin;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
