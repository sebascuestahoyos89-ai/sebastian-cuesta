import { createFileRoute } from "@tanstack/react-router";
import { Container, PageHeader } from "@/components/site/primitives";
import { ExpertiseCard } from "@/components/site/ExpertiseCard";
import { expertiseAreas } from "@/content/site";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research & Expertise — Sebastian Cuesta Hoyos" },
      {
        name: "description",
        content:
          "Expertise across enzyme discovery and biocatalysis, computational and AI-guided drug discovery, protein science and biochemistry, analytical and pharmaceutical R&D, and molecular mechanisms.",
      },
      { property: "og:title", content: "Research & Expertise — Sebastian Cuesta Hoyos" },
      { property: "og:url", content: "/research" },
    ],
    links: [{ rel: "canonical", href: "/research" }],
  }),
  component: Research,
});

function Research() {
  return (
    <>
      <PageHeader
        eyebrow="Research / Expertise"
        title="Expertise across chemistry, biology and computation"
        intro={
          <p>
            A multidisciplinary toolkit spanning enzyme science, computational and AI-guided drug
            discovery, protein biochemistry, analytical and pharmaceutical R&D, and the study of
            molecular mechanisms.
          </p>
        }
      />

      <section className="py-14 sm:py-20">
        <Container className="grid gap-6 lg:grid-cols-2">
          {expertiseAreas.map((area) => (
            <ExpertiseCard
              key={area.title}
              icon={area.icon}
              title={area.title}
              keywords={area.keywords}
            />
          ))}
        </Container>
      </section>
    </>
  );
}
