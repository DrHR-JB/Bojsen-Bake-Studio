import { recipes } from "@/data/recipes";
import type { Ingredient, Recipe, RecipeStep } from "@/lib/types";

/**
 * Data-adgangslag. Funktionerne er async, så de kan erstattes af
 * databasekald (fx Prisma/Drizzle) uden at ændre kaldende kode.
 */
export async function getAllRecipes(): Promise<Recipe[]> {
  return recipes;
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | undefined> {
  return recipes.find((recipe) => recipe.slug === slug);
}

export function stepTotalMinutes(step: RecipeStep): number {
  return (step.durationMinutes ?? 0) * (step.repeat ?? 1);
}

export function stepActiveMinutes(step: RecipeStep): number {
  if (step.activeMinutes !== undefined) return step.activeMinutes * (step.repeat ?? 1);
  return step.isRise ? 0 : stepTotalMinutes(step);
}

export function recipeTimes(recipe: Recipe) {
  return {
    activeMinutes: recipe.steps.reduce((sum, step) => sum + stepActiveMinutes(step), 0),
    totalMinutes: recipe.steps.reduce((sum, step) => sum + stepTotalMinutes(step), 0),
    riseMinutes: recipe.steps
      .filter((step) => step.isRise)
      .reduce((sum, step) => sum + stepTotalMinutes(step), 0),
  };
}

function allIngredients(recipe: Recipe): Ingredient[] {
  return recipe.ingredientGroups.flatMap((group) => group.ingredients);
}

/** Samlet mel i opskriften – grundlaget for bagerprocenter. */
export function totalFlour(recipe: Recipe): number {
  return allIngredients(recipe)
    .filter((ingredient) => ingredient.kind === "mel")
    .reduce((sum, ingredient) => sum + ingredient.grams, 0);
}

export function bakersPercentage(grams: number, flour: number): number {
  return flour > 0 ? (grams / flour) * 100 : 0;
}

export function recipeFormula(recipe: Recipe) {
  const ingredients = allIngredients(recipe);
  const sumOf = (kind: Ingredient["kind"]) =>
    ingredients.filter((i) => i.kind === kind).reduce((sum, i) => sum + i.grams, 0);
  const flour = totalFlour(recipe);
  return {
    flour,
    water: sumOf("vand"),
    hydration: bakersPercentage(sumOf("vand"), flour),
    salt: bakersPercentage(sumOf("salt"), flour),
    totalDough: ingredients.reduce((sum, i) => sum + i.grams, 0),
  };
}
