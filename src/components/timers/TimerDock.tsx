"use client";

import Link from "next/link";
import { useState } from "react";
import { formatCountdown } from "@/lib/format";
import { isActive, remainingMs, useTimers } from "./TimerProvider";
import { TimerRow } from "./TimerRow";

/** Fast timerpanel i bunden af skærmen med alle aktive timere. */
export function TimerDock() {
  const { timers, now, hydrated } = useTimers();
  const [open, setOpen] = useState(false);

  if (!hydrated) return null;
  const active = timers.filter(isActive).sort((a, b) => remainingMs(a, now) - remainingMs(b, now));
  if (active.length === 0) return null;

  const next = active[0];

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6">
      <section
        aria-label="Aktive timere"
        className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-oven text-flour shadow-[0_20px_50px_-12px_rgb(47_34_25/0.6)]"
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center gap-3 px-5 py-3 text-left"
        >
          <span className="relative flex h-3 w-3" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wheat opacity-60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-wheat" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold">{next.label}</span>
            <span className="block text-xs text-wheat">
              {active.length === 1 ? "1 aktiv timer" : `${active.length} aktive timere`}
              {" · "}tryk for at {open ? "skjule" : "se alle"}
            </span>
          </span>
          <span className="font-display tabular text-2xl font-semibold">
            {formatCountdown(remainingMs(next, now))}
          </span>
          <svg
            viewBox="0 0 20 20"
            className={`h-5 w-5 text-wheat transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            aria-hidden
          >
            <path d="m5 12.5 5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {open && (
          <div className="max-h-[55dvh] space-y-2 overflow-y-auto px-3 pb-3 text-oven">
            {active.map((timer) => (
              <TimerRow key={timer.id} timer={timer} />
            ))}
            <Link href="/timere" className="block py-2 text-center text-sm font-semibold text-wheat hover:underline">
              Gå til Mine timere →
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
