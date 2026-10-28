"use client";

import Link from "next/link";
import { formatClock, formatCountdown } from "@/lib/format";
import type { BakeTimer } from "@/lib/timers/types";
import { remainingMs, useTimers } from "./TimerProvider";

const buttonBase =
  "inline-flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-semibold transition active:scale-95";

export function TimerRow({ timer, size = "compact" }: { timer: BakeTimer; size?: "compact" | "large" }) {
  const { now, pauseTimer, resumeTimer, stopTimer } = useTimers();
  const left = remainingMs(timer, now);
  const progress = timer.durationMs > 0 ? 1 - left / timer.durationMs : 1;
  const paused = timer.status === "paused";

  return (
    <div className="relative overflow-hidden rounded-2xl bg-flour p-3 ring-1 ring-wheat sm:p-4">
      <div
        className={`absolute inset-y-0 left-0 ${paused ? "bg-wheat/50" : "bg-sage-light"} transition-[width] duration-1000 ease-linear`}
        style={{ width: `${Math.min(100, progress * 100)}%` }}
        aria-hidden
      />
      <div className="relative flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className={`min-w-0 ${size === "large" ? "flex-1" : "basis-full sm:basis-0 sm:flex-1"}`}>
          <p className="truncate font-semibold">{timer.label}</p>
          <p className="truncate text-xs text-rye">
            {timer.recipeSlug ? (
              <Link href={`/opskrifter/${timer.recipeSlug}`} className="hover:underline">
                {timer.recipeTitle}
              </Link>
            ) : (
              timer.recipeTitle
            )}
            {timer.status === "running" && timer.endsAt && <> · færdig kl. {formatClock(timer.endsAt)}</>}
            {paused && <> · på pause</>}
          </p>
        </div>
        <p
          className={`font-display tabular flex-1 font-semibold sm:flex-none ${size === "large" ? "text-4xl" : "text-2xl"} ${paused ? "text-rye" : ""}`}
          aria-live="off"
        >
          {formatCountdown(left)}
        </p>
        <div className="flex gap-2">
          {paused ? (
            <button type="button" onClick={() => resumeTimer(timer.id)} className={`${buttonBase} bg-sage text-flour`}>
              Genoptag
            </button>
          ) : (
            <button type="button" onClick={() => pauseTimer(timer.id)} className={`${buttonBase} bg-wheat text-oven`}>
              Pause
            </button>
          )}
          <button
            type="button"
            onClick={() => stopTimer(timer.id)}
            className={`${buttonBase} bg-transparent text-crust-dark ring-1 ring-crust/40`}
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}
