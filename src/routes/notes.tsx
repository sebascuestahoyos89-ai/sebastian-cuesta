import { createFileRoute } from "@tanstack/react-router";
import { FileText, Clock } from "lucide-react";
import { Container, PageHeader } from "@/components/site/primitives";
import { useContent } from "@/lib/i18n";

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
  const content = useContent();
  return (
    <>
      <PageHeader
        eyebrow={content.ui.notes.eyebrow}
        title={content.ui.notes.title}
        intro={<p>{content.ui.notes.intro}</p>}
      />

      <section className="py-14 sm:py-20">
        <Container className="grid gap-6 md:grid-cols-3">
          {content.scientificNotes.map((note) => (
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
                <FileText className="h-4 w-4" /> {content.ui.notes.inPreparation}
              </div>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
