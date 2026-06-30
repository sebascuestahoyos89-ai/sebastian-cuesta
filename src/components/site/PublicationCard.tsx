import { ExternalLink } from "lucide-react";
import type { Publication } from "@/content/site";

export function PublicationCard({ pub }: { pub: Publication }) {
  return (
    <article className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5 shadow-soft transition-colors hover:border-primary/40">
      <span className="text-xs font-semibold uppercase tracking-wide text-primary">
        {pub.category}
      </span>
      <h3 className="text-sm font-semibold leading-snug text-foreground">{pub.title}</h3>
      {pub.note && <p className="text-xs text-muted-foreground">{pub.note}</p>}
      {pub.doi && (
        <a
          href={`https://doi.org/${pub.doi}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex w-fit items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          <ExternalLink className="h-3.5 w-3.5" /> DOI: {pub.doi}
        </a>
      )}
    </article>
  );
}
