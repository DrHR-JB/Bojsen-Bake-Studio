import Link from "next/link";
import { RecipeIllustration } from "@/components/Illustrations";
import { DifficultyDots } from "@/components/RecipeMeta";
import { formatMinutes } from "@/lib/format";
import { recipeTimes } from "@/lib/recipes";
import type { Recipe } from "@/lib/types";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { activeMinutes, totalMinutes } = recipeTimes(recipe);

  return (
    <Link
      href={`/opskrifter/${recipe.slug}`}
      className="group flex flex-col overflow-hidden rounded-[28px] bg-flour shadow-[0_1px_0_rgb(108_56_23/0.08),0_12px_32px_-18px_rgb(108_56_23/0.35)] ring-1 ring-wheat/70 transition hover:-translate-y-1 hover:shadow-[0_1px_0_rgb(108_56_23/0.08),0_22px_40px_-20px_rgb(108_56_23/0.45)] focus-visible:outline-3 focus-visible:outline-crust"
    >
      <div className="relative flex h-44 items-end justify-center bg-gradient-to-b from-wheat/60 to-wheat px-6 pt-6">
        <span className="absolute top-4 left-4 rounded-full bg-flour/85 px-3 py-1 text-xs font-semibold tracking-wide text-crust-dark uppercase">
          {recipe.category}
        </span>
        <RecipeIllustration
          category={recipe.category}
          className="h-36 w-auto transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-2xl leading-tight font-semibold">{recipe.title}</h3>
        <p className="text-sm leading-relaxed text-rye">{recipe.description}</p>
        <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-dashed border-wheat-dark/40 pt-4 text-sm">
          <div>
            <dt className="text-xs text-rye">Aktiv tid</dt>
            <dd className="font-semibold">{formatMinutes(activeMinutes)}</dd>
          </div>
          <div>
            <dt className="text-xs text-rye">I alt inkl. hævning</dt>
            <dd className="font-semibold">{formatMinutes(totalMinutes)}</dd>
          </div>
          <div className="col-span-2 flex items-center justify-between text-rye">
            <DifficultyDots difficulty={recipe.difficulty} />
            <span className="font-medium text-crust transition-transform group-hover:translate-x-1">
              Se opskrift →
            </span>
          </div>
        </dl>
      </div>
    </Link>
  );
}
