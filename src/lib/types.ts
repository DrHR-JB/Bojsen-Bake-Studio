/**
 * Datamodel for opskrifter. Typerne er bevidst holdt uafhængige af,
 * hvor data kommer fra, så `src/data/recipes.ts` senere kan erstattes
 * af en database uden at UI'et skal ændres.
 */

export type Difficulty = "let" | "mellem" | "svær";

export type RecipeCategory = "Brød" | "Pizza" | "Kager" | "Morgenbrød";

/** Bruges til at beregne bagerprocenter og hydrering. */
export type IngredientKind = "mel" | "vand" | "salt" | "gær" | "surdej" | "andet";

export interface Ingredient {
  name: string;
  grams: number;
  kind: IngredientKind;
  note?: string;
}

export interface IngredientGroup {
  /** Fx "Levain", "Poolish" eller "Dej". */
  title: string;
  ingredients: Ingredient[];
}

export interface RecipeStep {
  id: string;
  title: string;
  description: string;
  /** Varighed for ét gennemløb af trinnet. Bruges også som standardtid for timeren. */
  durationMinutes?: number;
  /** Realistisk spænd, fx 12–16 timer for koldhævning. Kun til visning. */
  durationRangeMinutes?: [number, number];
  /** Antal gentagelser, fx 4 runder stræk-og-fold. Standard: 1. */
  repeat?: number;
  /** Om trinnet er en hæveproces (dejen arbejder, du venter). */
  isRise?: boolean;
  /** Hvor meget af trinnets tid der kræver dine hænder. Standard: hele varigheden for ikke-hævetrin, 0 for hævetrin. */
  activeMinutes?: number;
}

export interface Recipe {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: RecipeCategory;
  difficulty: Difficulty;
  /** Fx "1 brød à ca. 900 g". */
  yield: string;
  ingredientGroups: IngredientGroup[];
  steps: RecipeStep[];
  tips?: string[];
}
