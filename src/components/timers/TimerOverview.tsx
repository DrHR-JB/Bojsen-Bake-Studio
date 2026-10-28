"use client";

import Link from "next/link";
import { formatClock, formatMinutes } from "@/lib/format";
import type { BakeTimer } from "@/lib/timers/types";
import { isActive, remainingMs, useTimers } from "./TimerProvider";
import { TimerRow } from "./TimerRow";

function HistoryRow({ timer }: { timer: BakeTimer }) {
  const { restartTimer, removeTimer } = useTimers();
  const finished = timer.status === "finished";
  return (
    <li className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl bg-flour/70 p-4 ring-1 ring-wheat">
      <span
        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${finished ? "bg-sage text-flour" : "bg-wheat text-oven"}`}
      >
        {finished ? "Færdig" : "Stoppet"}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold">{timer.label}</p>
        <p className="truncate text-xs text-rye">
          {timer.recipeTitle && `${timer.recipeTitle} · `}
          {formatMinutes(timer.durationMs / 60_000)}
          {timer.finishedAt && ` · ${finished ? "udløb" : "stoppet"} kl. ${formatClock(timer.finishedAt)}`}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => restartTimer(timer.id)}
          className="min-h-11 rounded-full bg-crust px-4 text-sm font-semibold text-flour active:scale-95"
        >
          Start igen
        </button>
        <button
          type="button"
          onClick={() => removeTimer(timer.id)}
          className="min-h-11 rounded-full px-4 text-sm font-semibold text-rye ring-1 ring-wheat"
          aria-label={`Fjern ${timer.label} fra historikken`}
        >
          Fjern
        </button>
      </div>
    </li>
  );
}

export function TimerOverview() {
  const { timers, now, hydrated, clearHistory } = useTimers();

  if (!hydrated) {
    return <p className="mt-8 text-rye">Henter timere …</p>;
  }

  const active = timers.filter(isActive).sort((a, b) => remainingMs(a, now) - remainingMs(b, now));
  const history = timers
    .filter((t) => !isActive(t))
    .sort((a, b) => (b.finishedAt ?? b.createdAt) - (a.finishedAt ?? a.createdAt));

  return (
    <div className="mt-8 space-y-12">
      <section aria-labelledby="aktive">
        <h2 id="aktive" className="font-display text-2xl font-semibold">
          Aktive timere <span className="text-rye">({active.length})</span>
        </h2>
        {active.length === 0 ? (
          <div className="mt-4 rounded-3xl border-2 border-dashed border-wheat-dark/50 p-6 text-rye">
            Ingen timere kører lige nu. Åbn en{" "}
            <Link href="/" className="font-semibold text-crust underline-offset-4 hover:underline">
              opskrift
            </Link>{" "}
            og tryk <span className="font-semibold">Start timer</span> ved et trin.
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {active.map((timer) => (
              <TimerRow key={timer.id} timer={timer} size="large" />
            ))}
          </div>
        )}
      </section>

      <section aria-labelledby="historik">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="historik" className="font-display text-2xl font-semibold">
            Nyligt afsluttede
          </h2>
          {history.length > 0 && (
            <button type="button" onClick={clearHistory} className="text-sm font-semibold text-crust hover:underline">
              Ryd historik
            </button>
          )}
        </div>
        <p className="text-sm text-rye">Timere fra det seneste døgn.</p>
        {history.length === 0 ? (
          <p className="mt-4 text-rye">Ingen afsluttede timere endnu.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {history.map((timer) => (
              <HistoryRow key={timer.id} timer={timer} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
