import { createFileRoute } from "@tanstack/react-router";
import { Container, PageHeader } from "@/components/site/primitives";
import { ProjectCard } from "@/components/site/ProjectCard";
import { useContent } from "@/lib/i18n";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Sebastian Cuesta Hoyos" },
      {
        name: "description",
        content:
          "High-level, method-focused case studies in enzyme engineering, computational and AI-guided drug discovery, molecular mechanisms, and membrane-protein biochemistry.",
      },
      { property: "og:title", content: "Projects — Sebastian Cuesta Hoyos" },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: Projects,
});

function Projects() {
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
