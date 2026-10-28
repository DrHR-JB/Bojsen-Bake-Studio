import { RecipeCard } from "@/components/RecipeCard";
import { getAllRecipes } from "@/lib/recipes";

export default async function Home() {
  const recipes = await getAllRecipes();

  return (
    <>
      <section className="relative py-10 sm:py-16">
        <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-crust uppercase">Hjemmebageri</p>
        <h1 className="font-display max-w-3xl text-5xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-7xl">
          Godt brød tager tid. <span className="text-crust italic">Vi holder øje med uret.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-rye">
          Opskrifter med gram og bagerprocenter og en timer til hvert hævetrin. Du kan gå fra
          dejen, mens den arbejder.
        </p>
      </section>

      <section aria-labelledby="opskrifter">
        <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-wheat-dark/40 pb-3">
          <h2 id="opskrifter" className="font-display text-3xl font-semibold">
            Opskrifter
          </h2>
          <span className="text-sm text-rye">{recipes.length} opskrifter</span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </section>
    </>
  );
}
