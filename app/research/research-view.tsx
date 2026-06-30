"use client";

import { Container, PageHeader } from "@/components/site/primitives";
import { ExpertiseCard } from "@/components/site/ExpertiseCard";
import { useContent } from "@/lib/i18n";

export function ResearchView() {
  const content = useContent();
  return (
    <>
      <PageHeader
        eyebrow={content.ui.research.eyebrow}
        title={content.ui.research.title}
        intro={<p>{content.ui.research.intro}</p>}
      />

      <section className="py-14 sm:py-20">
        <Container className="grid gap-6 lg:grid-cols-2">
          {content.expertiseAreas.map((area) => (
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
