import type { Recipe } from "@/lib/types";

/**
 * Opskrifterne i MVP'en. Når der kommer en database, kan denne fil
 * erstattes af et seed-script – resten af appen læser via `src/lib/recipes.ts`.
 */
export const recipes: Recipe[] = [
  {
    slug: "surdejsbroed",
    title: "Surdejsbrød",
    subtitle: "Landbrød med sprød skorpe og åben krumme",
    description:
      "Et klassisk landbrød med levain, lang koldhævning og bagning i støbejernsgryde. Det meste af tiden passer dejen sig selv.",
    category: "Brød",
    difficulty: "mellem",
    yield: "1 brød à ca. 900 g",
    ingredientGroups: [
      {
        title: "Levain",
        ingredients: [
          { name: "Aktiv surdejsgrund (100 % hydrering)", grams: 20, kind: "surdej" },
          { name: "Hvedemel", grams: 50, kind: "mel" },
          { name: "Vand, ca. 26 °C", grams: 50, kind: "vand" },
        ],
      },
      {
        title: "Dej",
        ingredients: [
          { name: "Hvedemel (brødmel, ca. 12 % protein)", grams: 400, kind: "mel" },
          { name: "Fuldkornshvedemel", grams: 50, kind: "mel" },
          { name: "Vand til autolyse", grams: 290, kind: "vand" },
          { name: "Vand til salt (bassinage)", grams: 25, kind: "vand" },
          { name: "Salt", grams: 10, kind: "salt" },
        ],
      },
    ],
    steps: [
      {
        id: "levain",
        title: "Fodr levain",
        description:
          "Rør surdejsgrund, mel og lunt vand sammen i et glas. Sæt et elastik ud for overfladen og lad den stå lunt, til den er fordoblet og hvælvet.",
        durationMinutes: 300,
        durationRangeMinutes: [240, 360],
        isRise: true,
        activeMinutes: 5,
      },
      {
        id: "autolyse",
        title: "Autolyse",
        description:
          "Bland de 450 g mel med 290 g vand, til der ikke er tørt mel tilbage. Dæk skålen og lad den hvile. Glutenen begynder at danne sig af sig selv.",
        durationMinutes: 45,
        activeMinutes: 5,
      },
      {
        id: "bland",
        title: "Tilsæt levain og salt",
        description:
          "Fordel al levain over dejen og klem den ind med våde hænder. Drys saltet over, hæld de sidste 25 g vand på og klem/fold, til dejen er samlet og glat igen.",
        durationMinutes: 10,
      },
      {
        id: "straek-og-fold",
        title: "Stræk og fold",
        description:
          "Med våde hænder: tag fat i den ene side af dejen, stræk den op og fold den ind over midten. Drej skålen en kvart omgang og gentag hele vejen rundt. Lav 4 runder med 30 minutters mellemrum. Dejen hæver samtidig.",
        durationMinutes: 30,
        repeat: 4,
        isRise: true,
        activeMinutes: 8,
      },
      {
        id: "bulk",
        title: "Bulkhævning",
        description:
          "Lad dejen hæve videre under låg ved ca. 24–26 °C. Den er klar, når den er vokset 50–75 %, har bobler i siderne og en let hvælvet overflade. Bulkhævningen tager ca. 4–5 timer i alt inklusive stræk-og-fold.",
        durationMinutes: 150,
        durationRangeMinutes: [120, 180],
        isRise: true,
      },
      {
        id: "forform",
        title: "Forformning og bænkhvile",
        description:
          "Vend dejen ud på et let meldrysset bord, form den løst til en kugle med dejskraberen og lad den hvile udækket.",
        durationMinutes: 20,
        activeMinutes: 5,
      },
      {
        id: "form",
        title: "Slutformning",
        description:
          "Form dejen stramt til en bâtard eller boule. Læg den med sømmen opad i en hævekurv, der er drysset med rismel.",
        durationMinutes: 10,
      },
      {
        id: "koldhaevning",
        title: "Koldhævning i køleskab",
        description:
          "Kom en pose over kurven og stil den i køleskabet ved ca. 4 °C. Den lange, kolde hævning giver smag og gør dejen nem at snitte.",
        durationMinutes: 840,
        durationRangeMinutes: [720, 960],
        isRise: true,
      },
      {
        id: "forvarm",
        title: "Forvarm ovn og gryde",
        description:
          "Sæt støbejernsgryden med låg i ovnen og forvarm til 250 °C over/undervarme. Gryden skal være gennemvarm.",
        durationMinutes: 45,
        activeMinutes: 2,
      },
      {
        id: "bag",
        title: "Bagning i støbejernsgryde",
        description:
          "Vend brødet ud på bagepapir, snit det med et barberblad og løft det ned i den varme gryde. Bag 20 minutter med låg, tag låget af, skru ned til 230 °C og bag 20–25 minutter mere, til skorpen er dybt gyldenbrun.",
        durationMinutes: 45,
        activeMinutes: 5,
      },
      {
        id: "afkoel",
        title: "Afkøling",
        description: "Lad brødet køle af på en rist. Krummen sætter sig stadig, så vent med at skære.",
        durationMinutes: 60,
        activeMinutes: 0,
      },
    ],
    tips: [
      "Er køkkenet koldt, tager bulkhævningen længere. Se på dejen, ikke kun på uret.",
      "En levain er klar, når en klat af den flyder i vand.",
    ],
  },
  {
    slug: "pizza-med-poolish",
    title: "Pizza med poolish",
    subtitle: "Luftige kanter og en let, aromatisk bund",
    description:
      "Neapolitansk inspireret pizzadej med en poolish, der står natten over. Giver fire bunde med sprøde, boblende kanter.",
    category: "Pizza",
    difficulty: "let",
    yield: "4 pizzaer à ca. 250 g dej",
    ingredientGroups: [
      {
        title: "Poolish",
        ingredients: [
          { name: "Tipo 00-mel", grams: 200, kind: "mel" },
          { name: "Vand, ca. 20 °C", grams: 200, kind: "vand" },
          { name: "Tørgær", grams: 0.5, kind: "gær", note: "En knivspids" },
        ],
      },
      {
        title: "Dej",
        ingredients: [
          { name: "Tipo 00-mel", grams: 400, kind: "mel" },
          { name: "Vand, koldt", grams: 190, kind: "vand" },
          { name: "Salt", grams: 15, kind: "salt" },
          { name: "Tørgær", grams: 1.5, kind: "gær" },
        ],
      },
    ],
    steps: [
      {
        id: "poolish",
        title: "Poolish",
        description:
          "Opløs gæren i vandet, rør melet i, til der ikke er klumper, og dæk skålen. Lad den stå ved stuetemperatur, til den er fuld af bobler og lige er begyndt at falde en smule i midten.",
        durationMinutes: 840,
        durationRangeMinutes: [720, 960],
        isRise: true,
        activeMinutes: 5,
      },
      {
        id: "bland",
        title: "Bland dejen",
        description:
          "Kom poolish, det kolde vand og gæren i en skål. Tilsæt melet og bland, til dejen er samlet. Tilsæt saltet og ælt i ca. 8–10 minutter, til dejen er glat og elastisk.",
        durationMinutes: 15,
      },
      {
        id: "bulk",
        title: "Bulkhævning",
        description:
          "Dæk skålen og lad dejen hæve ved stuetemperatur. Giv den gerne en runde stræk-og-fold efter den første time.",
        durationMinutes: 120,
        isRise: true,
        activeMinutes: 2,
      },
      {
        id: "del",
        title: "Del i kugler",
        description:
          "Vend dejen ud og del den i 4 stykker à ca. 250 g. Form stramme kugler og læg dem i en let olieret kasse med låg.",
        durationMinutes: 10,
      },
      {
        id: "kugler",
        title: "Hævning af kugler",
        description:
          "Lad kuglerne hæve under låg ved stuetemperatur, til de er luftige og bløde, og et let tryk langsomt fjedrer tilbage.",
        durationMinutes: 300,
        durationRangeMinutes: [240, 360],
        isRise: true,
      },
      {
        id: "forvarm",
        title: "Forvarm ovn og bagesten",
        description:
          "Læg bagesten eller -stål øverst i ovnen og forvarm på højeste temperatur (helst 275–300 °C) i mindst en time.",
        durationMinutes: 60,
        activeMinutes: 2,
      },
      {
        id: "bag",
        title: "Form og bag",
        description:
          "Tryk luften ud mod kanten med fingerspidserne og stræk bunden til ca. 30 cm. Kom fyld på, skyd den ind på stenen og bag 6–8 minutter, gerne med grill de sidste minutter. Gentag med resten.",
        durationMinutes: 8,
        repeat: 4,
      },
    ],
    tips: [
      "Er det varmt i køkkenet, kan poolish blive klar efter 10–12 timer. Den må gerne stå i køleskabet til sidst.",
      "Brug semulje på pizzaskovlen, så bunden glider let af.",
    ],
  },
];
