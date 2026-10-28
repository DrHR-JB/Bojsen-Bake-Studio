"use client";

import Link from "next/link";
import { formatClock } from "@/lib/format";
import { isRinging, useTimers } from "./TimerProvider";

/** Tydelig visuel alarm, når en eller flere timere er udløbet. */
export function AlarmOverlay() {
  const { timers, hydrated, dismissAlarm } = useTimers();
  if (!hydrated) return null;
  const ringing = timers.filter(isRinging);
  if (ringing.length === 0) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="alarm-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-oven/70 p-4 backdrop-blur-sm"
    >
      <div className="animate-alarm w-full max-w-md rounded-[32px] bg-ember p-6 text-flour sm:p-8">
        <p className="text-5xl" aria-hidden>
          ⏰
        </p>
        <h2 id="alarm-title" className="font-display mt-3 text-4xl leading-tight font-semibold">
          Tiden er gået!
        </h2>
        <ul className="mt-4 space-y-3">
          {ringing.map((timer) => (
            <li key={timer.id} className="flex items-center gap-3 rounded-2xl bg-flour/15 p-3">
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{timer.label}</p>
                <p className="text-sm opacity-85">
                  {timer.recipeTitle}
                  {timer.finishedAt && ` · udløb kl. ${formatClock(timer.finishedAt)}`}
                </p>
              </div>
              {ringing.length > 1 && (
                <button
                  type="button"
                  onClick={() => dismissAlarm(timer.id)}
                  className="min-h-11 rounded-full bg-flour/20 px-3 text-sm font-semibold"
                >
                  OK
                </button>
              )}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => dismissAlarm()}
          autoFocus
          className="mt-6 min-h-14 w-full rounded-full bg-flour text-lg font-bold text-ember transition active:scale-[0.98]"
        >
          {ringing.length > 1 ? "Slå alle alarmer fra" : "Slå alarmen fra"}
        </button>
        {ringing[0].recipeSlug && (
          <Link
            href={`/opskrifter/${ringing[0].recipeSlug}`}
            onClick={() => dismissAlarm()}
            className="mt-3 block text-center text-sm font-semibold underline-offset-4 hover:underline"
          >
            Slå fra og gå til opskriften
          </Link>
        )}
      </div>
    </div>
  );
}
