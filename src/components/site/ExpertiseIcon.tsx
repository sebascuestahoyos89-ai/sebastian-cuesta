import {
  FlaskConical,
  Cpu,
  Atom,
  Dna,
  TestTubes,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  FlaskConical,
  Cpu,
  Atom,
  Dna,
  TestTubes,
};

export function ExpertiseIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? Atom;
  return <Icon className={className} aria-hidden="true" />;
}
