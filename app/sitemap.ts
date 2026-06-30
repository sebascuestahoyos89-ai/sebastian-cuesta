import type { MetadataRoute } from "next";
import { en } from "@/content/site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: { path: string; priority: number }[] = [
    { path: "/", priority: 1.0 },
    { path: "/about", priority: 0.8 },
    { path: "/research", priority: 0.8 },
    { path: "/projects", priority: 0.8 },
    { path: "/publications", priority: 0.7 },
    { path: "/notes", priority: 0.5 },
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
