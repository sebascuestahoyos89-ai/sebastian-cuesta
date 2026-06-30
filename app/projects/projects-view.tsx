"use client";

import { Container, PageHeader } from "@/components/site/primitives";
import { ProjectCard } from "@/components/site/ProjectCard";
import { useContent } from "@/lib/i18n";

export function ProjectsView() {
  const content = useContent();
  return (
    <>
      <PageHeader
        eyebrow={content.ui.projects.eyebrow}
        title={content.ui.projects.title}
        intro={<p>{content.ui.projects.intro}</p>}
      />

      <section className="py-14 sm:py-20">
        <Container className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </Container>
      </section>
    </>
  );
}
