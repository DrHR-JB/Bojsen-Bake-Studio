"use client";

import { useTimers } from "./TimerProvider";

/** Venlig forespørgsel om notifikationer – vises første gang, en timer startes. */
export function NotificationPrompt() {
  const { showPermissionPrompt, answerPermissionPrompt } = useTimers();
  if (!showPermissionPrompt) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-50 p-3 sm:p-6">
      <div
        role="dialog"
        aria-labelledby="notif-title"
        className="animate-rise mx-auto flex max-w-xl flex-col gap-4 rounded-3xl bg-flour p-5 shadow-[0_20px_50px_-12px_rgb(47_34_25/0.45)] ring-1 ring-wheat sm:flex-row sm:items-center"
      >
        <span className="text-3xl" aria-hidden>
          🔔
        </span>
        <div className="flex-1">
          <h2 id="notif-title" className="font-semibold">
            Skal vi sige til, når dejen er klar?
          </h2>
          <p className="text-sm text-rye">
            Så får du en besked, selv hvis du har skiftet faneblad. Fanen skal stadig være åben.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => answerPermissionPrompt(false)}
            className="min-h-11 rounded-full px-4 text-sm font-semibold text-rye ring-1 ring-wheat"
          >
            Ikke nu
          </button>
          <button
            type="button"
            onClick={() => answerPermissionPrompt(true)}
            className="min-h-11 rounded-full bg-crust px-4 text-sm font-semibold text-flour"
          >
            Ja tak
          </button>
        </div>
      </div>
    </div>
  );
}
