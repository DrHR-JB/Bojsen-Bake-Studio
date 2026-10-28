import type { Difficulty } from "@/lib/types";

const levels: Record<Difficulty, number> = { let: 1, mellem: 2, svær: 3 };

export function DifficultyDots({ difficulty }: { difficulty: Difficulty }) {
  const level = levels[difficulty];
  return (
    <span className="inline-flex items-center gap-1.5" title={`Sværhedsgrad: ${difficulty}`}>
      <span className="flex gap-0.5" aria-hidden>
        {[1, 2, 3].map((n) => (
          <span key={n} className={`h-2 w-2 rounded-full ${n <= level ? "bg-crust" : "bg-wheat"}`} />
        ))}
      </span>
      <span className="capitalize">{difficulty}</span>
    </span>
  );
}
