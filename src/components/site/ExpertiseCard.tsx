import { ExpertiseIcon } from "./ExpertiseIcon";

export function ExpertiseCard({
  icon,
  title,
  keywords,
}: {
  icon: string;
  title: string;
  keywords: string[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-accent text-primary-foreground">
          <ExpertiseIcon name={icon} className="h-5 w-5" />
        </div>
        <h3 className="font-display text-base font-bold leading-snug text-foreground">{title}</h3>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {keywords.map((k) => (
          <span
            key={k}
            className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-secondary-foreground"
          >
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}
