import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RecipeIllustration } from "@/components/Illustrations";
import { DifficultyDots } from "@/components/RecipeMeta";
import { formatGrams, formatMinutes, formatPercent, formatRange } from "@/lib/format";
import {
  bakersPercentage,
  getAllRecipes,
  getRecipeBySlug,
  recipeFormula,
  recipeTimes,
  stepTotalMinutes,
} from "@/lib/recipes";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const recipes = await getAllRecipes();
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const recipe = await getRecipeBySlug((await params).slug);
  return { title: recipe?.title ?? "Opskrift ikke fundet" };
}

export default async function RecipePage({ params }: Props) {
  const recipe = await getRecipeBySlug((await params).slug);
  if (!recipe) notFound();

  const times = recipeTimes(recipe);
  const formula = recipeFormula(recipe);

  return (
    <article className="animate-rise">
      <Link href="/" className="inline-flex items-center gap-1 py-2 text-sm font-medium text-crust hover:underline">
        ← Alle opskrifter
      </Link>

      <header className="mt-2 grid items-center gap-6 sm:grid-cols-[1fr_auto]">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-crust uppercase">{recipe.category}</p>
          <h1 className="font-display mt-2 text-5xl leading-none font-semibold tracking-tight sm:text-6xl">
            {recipe.title}
          </h1>
          <p className="font-display mt-3 text-xl text-rye italic">{recipe.subtitle}</p>
          <p className="mt-4 max-w-2xl leading-relaxed">{recipe.description}</p>
        </div>
        <RecipeIllustration category={recipe.category} className="hidden h-40 w-auto sm:block" />
      </header>

      <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-wheat ring-1 ring-wheat sm:grid-cols-4">
        {[
          ["Aktiv tid", formatMinutes(times.activeMinutes)],
          ["I alt inkl. hævning", formatMinutes(times.totalMinutes)],
          ["Heraf hævning", formatMinutes(times.riseMinutes)],
          ["Giver", recipe.yield],
        ].map(([label, value]) => (
          <div key={label} className="bg-flour p-4">
            <dt className="text-xs text-rye">{label}</dt>
            <dd className="mt-1 font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-sm text-rye">
        Sværhedsgrad: <DifficultyDots difficulty={recipe.difficulty} />
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr]">
        <section aria-labelledby="ingredienser" className="lg:sticky lg:top-6 lg:self-start">
          <h2 id="ingredienser" className="font-display text-3xl font-semibold">
            Ingredienser
          </h2>
          <p className="mt-1 text-sm text-rye">Bagerprocent er i forhold til den samlede mængde mel.</p>

          <div className="mt-5 space-y-5">
            {recipe.ingredientGroups.map((group) => (
              <div key={group.title} className="rounded-3xl bg-flour p-5 ring-1 ring-wheat">
                <h3 className="font-display text-lg font-semibold text-crust-dark">{group.title}</h3>
                <table className="tabular mt-2 w-full text-sm">
                  <thead className="sr-only">
                    <tr>
                      <th>Ingrediens</th>
                      <th>Gram</th>
                      <th>Bagerprocent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.ingredients.map((ingredient) => (
                      <tr key={ingredient.name} className="border-b border-dotted border-wheat-dark/40 last:border-0">
                        <td className="py-2 pr-2">
                          {ingredient.name}
                          {ingredient.note && <span className="block text-xs text-rye">{ingredient.note}</span>}
                        </td>
                        <td className="py-2 text-right font-semibold whitespace-nowrap">{formatGrams(ingredient.grams)}</td>
                        <td className="w-16 py-2 text-right whitespace-nowrap text-rye">
                          {formatPercent(bakersPercentage(ingredient.grams, formula.flour))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}

            <div className="rounded-3xl bg-oven p-5 text-flour">
              <h3 className="font-display text-lg font-semibold">Samlet formel</h3>
              <dl className="tabular mt-3 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-wheat">Mel i alt</dt>
                  <dd className="font-semibold">{formatGrams(formula.flour)} · 100 %</dd>
                </div>
                <div>
                  <dt className="text-wheat">Hydrering</dt>
                  <dd className="font-semibold">{formatPercent(formula.hydration)}</dd>
                </div>
                <div>
                  <dt className="text-wheat">Salt</dt>
                  <dd className="font-semibold">{formatPercent(formula.salt)}</dd>
                </div>
                <div>
                  <dt className="text-wheat">Samlet dejvægt</dt>
                  <dd className="font-semibold">{formatGrams(Math.round(formula.totalDough))}</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section aria-labelledby="fremgangsmaade">
          <h2 id="fremgangsmaade" className="font-display text-3xl font-semibold">
            Fremgangsmåde
          </h2>
          <ol className="mt-5 space-y-4">
            {recipe.steps.map((step, index) => (
              <li
                key={step.id}
                className={`relative grid grid-cols-[auto_1fr] gap-4 rounded-3xl p-5 ring-1 ${
                  step.isRise ? "bg-sage-light/70 ring-sage/30" : "bg-flour ring-wheat"
                }`}
              >
                <span className="font-display text-4xl leading-none font-semibold text-wheat-dark tabular">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-xl font-semibold">{step.title}</h3>
                    {step.isRise && (
                      <span className="rounded-full bg-sage px-2.5 py-0.5 text-xs font-semibold text-flour">Hævning</span>
                    )}
                  </div>
                  {step.durationMinutes !== undefined && (
                    <p className="mt-1 text-sm font-medium text-rye">
                      {step.repeat && step.repeat > 1
                        ? `${step.repeat} × ${formatMinutes(step.durationMinutes)} (${formatMinutes(stepTotalMinutes(step))} i alt)`
                        : step.durationRangeMinutes
                          ? `Ca. ${formatRange(step.durationRangeMinutes)}`
                          : formatMinutes(step.durationMinutes)}
                    </p>
                  )}
                  <p className="mt-2 leading-relaxed">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          {recipe.tips && recipe.tips.length > 0 && (
            <aside className="mt-8 rounded-3xl border-2 border-dashed border-wheat-dark/50 p-5">
              <h3 className="font-display text-lg font-semibold">Bagerens tips</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-rye">
                {recipe.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </aside>
          )}
        </section>
      </div>
    </article>
  );
}
