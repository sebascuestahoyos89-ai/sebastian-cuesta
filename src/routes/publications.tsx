import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, BadgeCheck, Linkedin } from "lucide-react";
import { Container, PageHeader } from "@/components/site/primitives";
import { AnchorButton } from "@/components/site/buttons";
import { PublicationCard } from "@/components/site/PublicationCard";
import { publications, publicationCategories, profile } from "@/content/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Publications — Sebastian Cuesta Hoyos" },
      {
        name: "description",
        content:
          "30+ peer-reviewed publications across computational chemistry, drug discovery, molecular modelling, antimicrobial peptides, chemical reactivity, enzyme mechanisms and biocatalysis.",
      },
      { property: "og:title", content: "Publications — Sebastian Cuesta Hoyos" },
      { property: "og:url", content: "/publications" },
    ],
    links: [{ rel: "canonical", href: "/publications" }],
  }),
  component: Publications,
});

function Publications() {
  const [active, setActive] = useState<string>("All");
  const filters = ["All", ...publicationCategories];
  const list =
    active === "All" ? publications : publications.filter((p) => p.category === active);

  return (
    <>
      <PageHeader
        eyebrow="Publications"
        title="Peer-reviewed research"
        intro={
          <p>
            Sebastian has authored 30+ peer-reviewed publications across computational chemistry,
            drug discovery, molecular modelling, antimicrobial peptides, chemical reactivity, enzyme
            mechanisms and biocatalysis.
          </p>
        }
      />

      <section className="py-12 sm:py-16">
        <Container>
          <div className="flex flex-wrap gap-3">
            <AnchorButton href={profile.links.scholar} variant="outline">
              <GraduationCap className="h-4 w-4" /> Google Scholar
            </AnchorButton>
            <AnchorButton href={profile.links.orcid} variant="outline">
              <BadgeCheck className="h-4 w-4" /> ORCID
            </AnchorButton>
            <AnchorButton href={profile.links.linkedin} variant="outline">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </AnchorButton>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  active === f
                    ? "bg-gradient-accent text-primary-foreground"
                    : "border border-border bg-background text-muted-foreground hover:text-foreground",
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {list.map((pub) => (
              <PublicationCard key={pub.title} pub={pub} />
            ))}
          </div>

          <p className="mt-10 rounded-xl border border-border bg-secondary/40 p-4 text-sm text-muted-foreground">
            For the most updated citation metrics, please visit Google Scholar. Publication entries
            shown here are placeholders — replace titles and add DOI links once verified.
          </p>
        </Container>
      </section>
    </>
  );
}
