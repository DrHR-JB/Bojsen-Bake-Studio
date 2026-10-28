"use client";

import { useState } from "react";
import { formatCountdown, formatMinutes } from "@/lib/format";
import { isActive, remainingMs, useTimers } from "./TimerProvider";

interface Props {
  recipeSlug: string;
  recipeTitle: string;
  stepId: string;
  stepTitle: string;
  defaultMinutes: number;
}

const MAX_MINUTES = 48 * 60;

export function StepTimerButton({ recipeSlug, recipeTitle, stepId, stepTitle, defaultMinutes }: Props) {
  const { timers, now, hydrated, startTimer } = useTimers();
  const [open, setOpen] = useState(false);
  const [minutes, setMinutes] = useState(defaultMinutes);

  const running = hydrated
    ? timers.find((t) => isActive(t) && t.recipeSlug === recipeSlug && t.stepId === stepId)
    : undefined;

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const setClamped = (value: number) => setMinutes(Math.min(MAX_MINUTES, Math.max(1, Math.round(value) || 1)));

  const start = () => {
    startTimer({ label: stepTitle, recipeTitle, recipeSlug, stepId, durationMs: minutes * 60_000 });
    setOpen(false);
  };

  return (
    <div className="mt-4">
      {running && (
        <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-oven px-3 py-1 text-sm font-semibold text-flour">
          <span className="h-2 w-2 animate-pulse rounded-full bg-wheat" aria-hidden />
          Timer {running.status === "paused" ? "på pause" : "kører"}:{" "}
          <span className="tabular">{formatCountdown(remainingMs(running, now))}</span>
        </p>
      )}

      {!open ? (
        <button
          type="button"
          onClick={() => {
            setMinutes(defaultMinutes);
            setOpen(true);
          }}
          className="block min-h-11 rounded-full bg-crust px-5 text-sm font-semibold text-flour shadow-sm transition hover:bg-crust-dark active:scale-95"
        >
          ▶ Start timer <span className="font-normal opacity-80">· {formatMinutes(defaultMinutes)}</span>
        </button>
      ) : (
        <div className="animate-rise rounded-2xl bg-flour p-4 ring-1 ring-wheat">
          <p className="text-sm font-semibold">Justér tiden før start</p>
          <div className="mt-3 flex flex-wrap items-end gap-3">
            <label className="flex flex-col text-xs text-rye">
              Timer
              <input
                type="number"
                inputMode="numeric"
                min={0}
                max={48}
                value={hours}
                onChange={(e) => setClamped(Number(e.target.value) * 60 + mins)}
                className="tabular mt-1 h-12 w-20 rounded-xl bg-cream px-3 text-lg font-semibold text-oven ring-1 ring-wheat focus:ring-2 focus:ring-crust focus:outline-none"
              />
            </label>
            <label className="flex flex-col text-xs text-rye">
              Minutter
              <input
                type="number"
                inputMode="numeric"
                min={0}
                max={59}
                value={mins}
                onChange={(e) => setClamped(hours * 60 + Number(e.target.value))}
                className="tabular mt-1 h-12 w-20 rounded-xl bg-cream px-3 text-lg font-semibold text-oven ring-1 ring-wheat focus:ring-2 focus:ring-crust focus:outline-none"
              />
            </label>
            <div className="flex gap-2">
              {[-15, -5, 5, 15].map((delta) => (
                <button
                  key={delta}
                  type="button"
                  onClick={() => setClamped(minutes + delta)}
                  className="tabular h-12 min-w-12 rounded-xl bg-wheat/60 px-2 text-sm font-semibold active:scale-95"
                  aria-label={`${delta > 0 ? "Læg" : "Træk"} ${Math.abs(delta)} minutter ${delta > 0 ? "til" : "fra"}`}
                >
                  {delta > 0 ? `+${delta}` : `−${Math.abs(delta)}`}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={start}
              className="min-h-11 flex-1 rounded-full bg-crust px-5 text-sm font-semibold text-flour active:scale-95 sm:flex-none"
            >
              Start {formatMinutes(minutes)}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="min-h-11 rounded-full px-4 text-sm font-semibold text-rye ring-1 ring-wheat"
            >
              Annuller
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
