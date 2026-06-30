import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { en } from "@/content/site";
import { ProjectView } from "./project-view";

export function generateStaticParams() {
  return en.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = en.projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found — Sebastian Cuesta Hoyos" };

  const title = `${project.title} — Sebastian Cuesta Hoyos`;
  return {
    title,
    description: project.short,
    openGraph: {
      title,
      description: project.short,
      url: `/projects/${project.slug}`,
      type: "article",
    },
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!en.projects.some((p) => p.slug === slug)) notFound();
  return <ProjectView slug={slug} />;
}
