// Brand mark: a benzene ring with Kekulé double bonds. Drawn with
// `stroke="currentColor"` so it inherits the surrounding text color and adapts
// to light/dark themes — set the color via a Tailwind class (e.g. text-primary).
export function BenzeneMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 68 68"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Sebastian Cuesta logo"
    >
      <polygon points="34,5 59,19.5 59,48.5 34,63 9,48.5 9,19.5" strokeWidth={4} />
      <line x1="32.3" y1="12.7" x2="51.7" y2="22.2" strokeWidth={2.6} />
      <line x1="51.7" y1="45.8" x2="35.3" y2="55.3" strokeWidth={2.6} />
      <line x1="15" y1="24.5" x2="15" y2="43.5" strokeWidth={2.6} />
    </svg>
  );
}
