import { createFileRoute } from "@tanstack/react-router";
import { FileText, Clock } from "lucide-react";
import { Container, PageHeader } from "@/components/site/primitives";
import { scientificNotes } from "@/content/site";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Scientific Notes — Sebastian Cuesta Hoyos" },
      {
        name: "description",
        content:
          "Short technical articles on biophysical methods, computational chemistry supporting experimental biochemistry, and mechanistic thinking in enzyme science.",
      },
      { property: "og:title", content: "Scientific Notes — Sebastian Cuesta Hoyos" },
      { property: "og:url", content: "/notes" },
    ],
    links: [{ rel: "canonical", href: "/notes" }],
  }),
  component: Notes,
});

function Notes() {
  return (
    <>
      <PageHeader
        eyebrow="Scientific Notes"
        title="Short technical articles"
        intro={
          <p>
            A space for upcoming short, practical articles on methods and concepts at the
            intersection of chemistry, biology and computation. New notes are in preparation.
          </p>
        }
      />

      <section className="py-14 sm:py-20">
        <Container className="grid gap-6 md:grid-cols-3">
          {scientificNotes.map((note) => (
            <article
              key={note.title}
              className="flex h-full flex-col rounded-2xl border border-dashed border-border bg-card p-6 shadow-soft"
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                <Clock className="h-4 w-4" /> {note.status}
              </div>
              <h2 className="mt-4 flex-1 font-display text-lg font-bold leading-snug text-foreground">
                {note.title}
              </h2>
              <div className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" /> Article in preparation
              </div>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
