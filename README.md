# Bojsen Bake Studio

En bageapp til hjemmebageren: opskrifter med gram og bagerprocenter og timere til hæveprocesserne. Den er bygget til at blive brugt på mobilen i køkkenet.

## Hvad appen kan

- **Forside med opskrifter**: kort med titel, beskrivelse, aktiv tid, samlet tid inkl. hævning, sværhedsgrad og kategori.
- **Detaljeside** for hver opskrift med ingredienser i gram, bagerprocenter (i forhold til samlet mel), samlet formel (hydrering, salt, dejvægt) og trin-for-trin fremgangsmåde. Hævetrin er markeret.
- **Timere til hvert trin med varighed**: "Start timer" bruger trinnets standardtid, som kan justeres før start.
  - Flere timere kan køre samtidig, også på tværs af opskrifter.
  - Et fast timerpanel i bunden viser alle aktive timere med resterende tid, pause, genoptag og stop.
  - Timerne gemmer deres **sluttidspunkt** i `localStorage` og overlever derfor genindlæsning og lukkede faner.
  - Når en timer udløber, spilles en lyd, der vises en tydelig alarm, og der sendes en browsernotifikation. Appen spørger venligt om lov til notifikationer, første gang du starter en timer.
- **Mine timere** (`/timere`): aktive timere og timere afsluttet inden for det seneste døgn, med "Start igen".
- **Health check** på `/api/health`.

> Bemærk: Notifikationer og lyd kræver, at appen er åben i en fane (der er ingen push-server i MVP'en). Udløber en timer, mens siden er lukket, alarmerer den, næste gang du åbner appen.

Opskrifterne i MVP'en er **Surdejsbrød** og **Pizza med poolish**.

## Teknik

- Next.js (App Router), TypeScript og Tailwind CSS.
- Ingen database endnu. Opskrifterne ligger som typede data i `src/data/recipes.ts`.
- Al dataadgang går gennem `src/lib/recipes.ts` (async-funktioner som `getAllRecipes` og `getRecipeBySlug`). Når der kommer en database, er det kun den fil, der skal skrives om.

```
src/
  app/                 sider og API-routes (/, /opskrifter/[slug], /timere, /api/health)
  components/          UI-komponenter
  components/timers/   timer-context, timerpanel, alarm og knapper
  data/recipes.ts      opskriftsdata
  lib/                 typer, dataadgang, formattering og timer-logik
```

## Kør lokalt

Kræver Node.js 20.18 eller nyere (se `engines` i `package.json`, `.nvmrc` peger på Node 22).

```bash
npm install
npm run dev        # udviklingsserver på http://localhost:3000
```

Produktionsbuild lokalt:

```bash
npm run build
npm start          # lytter på $PORT (standard 3000)
```

Kvalitetstjek:

```bash
npm run lint
npm run build
```

Tip: Vil du teste på mobilen i køkkenet, så åbn `http://<din-computers-ip>:3000`. Notifikationer kræver dog HTTPS (eller `localhost`), så de virker først rigtigt, når appen er deployet.

## Deploy til Railway (trin for trin)

Repoet indeholder en `railway.json` med build-kommando (`npm run build`), start-kommando (`npm run start`) og health check (`/api/health`). Next.js læser selv `PORT`, som Railway sætter automatisk.

1. Log ind på [railway.com](https://railway.com) med din GitHub-konto.
2. Klik **New Project** og vælg **Deploy from GitHub repo**.
3. Vælg repoet **Bojsen-Bake-Studio**. Giv Railway adgang til repoet, hvis det ikke står på listen.
4. Railway opretter en service og deployer som standard `main`. Vil du deploye feature-branchen:
   - Åbn servicen → **Settings** → **Source**.
   - Skift **Branch** til `feature/mvp`.
5. Railway finder `railway.json` automatisk og bygger med `npm run build`. Du behøver ikke sætte nogen miljøvariabler.
6. Når deployet er færdigt: gå til **Settings** → **Networking** og klik **Generate Domain** for at få en offentlig URL.
7. Tjek, at `https://<dit-domæne>/api/health` svarer `{"status":"ok", ...}`.
8. Hvert nyt push til den valgte branch deployer automatisk. Når PR'en er merget, kan du skifte branch tilbage til `main` under **Settings** → **Source**.

Fejlsøgning: Se **Deployments** → vælg deployet → **Build Logs** / **Deploy Logs**. Fejler health check, så tjek, at start-kommandoen er `npm run start`, og at der ikke er sat en anden port manuelt.
