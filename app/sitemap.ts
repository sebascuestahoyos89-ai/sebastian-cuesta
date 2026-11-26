import type { MetadataRoute } from "next";
import { en } from "@/content/site";

const SITE_URL = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sebastiancuesta.com").origin;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: { path: string; priority: number }[] = [
    { path: "/", priority: 1.0 },
    { path: "/about", priority: 0.8 },
    { path: "/projects", priority: 0.8 },
    { path: "/contact", priority: 0.6 },
  ];

  const projectPaths = en.projects.map((p) => ({
    path: `/projects/${p.slug}`,
    priority: 0.6,
  }));

  return [...staticPaths, ...projectPaths].map((e) => ({
    url: `${SITE_URL}${e.path}`,
    changeFrequency: "monthly" as const,
    priority: e.priority,
  }));
}
