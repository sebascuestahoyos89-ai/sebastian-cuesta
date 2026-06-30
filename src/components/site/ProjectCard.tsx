"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/site";
import { useContent } from "@/lib/i18n";

export function ProjectCard({ project }: { project: Project }) {
  const content = useContent();
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      {project.draft && (
        <span className="mb-3 inline-flex w-fit items-center rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-muted-foreground">
          {content.ui.projects.currentWork}
        </span>
      )}
      <h3 className="font-display text-lg font-bold leading-snug text-foreground">
        {project.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{project.short}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.keywords.map((k) => (
          <span
            key={k}
            className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
          >
            {k}
          </span>
        ))}
      </div>
      <Link
        href={`/projects/${project.slug}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:gap-2.5"
      >
        {content.ui.common.readMore} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
