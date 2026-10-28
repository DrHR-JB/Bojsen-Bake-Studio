"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  notificationPermission,
  registerServiceWorker,
  requestNotificationPermission,
  showNotification,
} from "@/lib/timers/notifications";
import { playAlarm, unlockAudio } from "@/lib/timers/sound";
import {
  NOTIFICATION_ASKED_KEY,
  TIMERS_STORAGE_KEY,
  loadTimers,
  newTimerId,
  readFlag,
  saveTimers,
  writeFlag,
} from "@/lib/timers/storage";
import type { BakeTimer, NewTimer } from "@/lib/timers/types";

interface TimerContextValue {
  timers: BakeTimer[];
  now: number;
  hydrated: boolean;
  startTimer: (timer: NewTimer) => void;
  pauseTimer: (id: string) => void;
  resumeTimer: (id: string) => void;
  stopTimer: (id: string) => void;
  restartTimer: (id: string) => void;
  removeTimer: (id: string) => void;
  dismissAlarm: (id?: string) => void;
  clearHistory: () => void;
  showPermissionPrompt: boolean;
  answerPermissionPrompt: (allow: boolean) => void;
}

const TimerContext = createContext<TimerContextValue | null>(null);

export function remainingMs(timer: BakeTimer, now: number): number {
  if (timer.status === "running" && timer.endsAt !== null) return Math.max(0, timer.endsAt - now);
  if (timer.status === "paused") return timer.remainingMs;
  return 0;
}

export const isActive = (t: BakeTimer) => t.status === "running" || t.status === "paused";
export const isRinging = (t: BakeTimer) => t.status === "finished" && !t.alarmDismissed;

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [timers, setTimers] = useState<BakeTimer[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false);

  // Indlæs fra localStorage ved første render i browseren og hold faner i sync.
  useEffect(() => {
    setTimers(loadTimers());
    setHydrated(true);
    registerServiceWorker();

    const onStorage = (event: StorageEvent) => {
      if (event.key === TIMERS_STORAGE_KEY) setTimers(loadTimers());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (hydrated) saveTimers(timers);
  }, [timers, hydrated]);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  // Marker udløbne timere som færdige og send alarm. Sluttidspunktet er
  // gemt, så en timer, der udløb mens siden var lukket, alarmerer ved næste besøg.
  useEffect(() => {
    const expired = timers.filter((t) => t.status === "running" && t.endsAt !== null && t.endsAt <= now);
    if (expired.length === 0) return;

    const expiredIds = new Set(expired.map((t) => t.id));
    setTimers((current) =>
      current.map((t) =>
        expiredIds.has(t.id)
          ? { ...t, status: "finished", finishedAt: t.endsAt ?? now, endsAt: null, remainingMs: 0, alarmDismissed: false }
          : t,
      ),
    );
    playAlarm();
    expired.forEach((t) => {
      void showNotification(
        "Tiden er gået!",
        t.recipeTitle ? `${t.recipeTitle}: ${t.label}` : t.label,
        `bbs-timer-${t.id}`,
      );
    });
  }, [now, timers]);

  // Bliv ved med at ringe, indtil alarmen bliver slået fra.
  const ringing = timers.some(isRinging);
  useEffect(() => {
    if (!ringing) return;
    const id = window.setInterval(playAlarm, 4000);
    return () => window.clearInterval(id);
  }, [ringing]);

  useEffect(() => {
    if (!hydrated) return;
    const base = "Bojsen Bake Studio";
    if (ringing) document.title = "⏰ Tiden er gået! · " + base;
    else if (document.title.startsWith("⏰")) document.title = base;
  }, [ringing, hydrated]);

  const update = useCallback((id: string, fn: (t: BakeTimer) => BakeTimer) => {
    setTimers((current) => current.map((t) => (t.id === id ? fn(t) : t)));
  }, []);

  const startTimer = useCallback((input: NewTimer) => {
    unlockAudio();
    const startedAt = Date.now();
    setTimers((current) => [
      ...current,
      {
        ...input,
        id: newTimerId(),
        endsAt: startedAt + input.durationMs,
        remainingMs: input.durationMs,
        status: "running",
        createdAt: startedAt,
      },
    ]);
    setNow(startedAt);
    if (notificationPermission() === "default" && !readFlag(NOTIFICATION_ASKED_KEY)) {
      setShowPermissionPrompt(true);
    }
  }, []);

  const pauseTimer = useCallback(
    (id: string) =>
      update(id, (t) =>
        t.status === "running" && t.endsAt !== null
          ? { ...t, status: "paused", remainingMs: Math.max(0, t.endsAt - Date.now()), endsAt: null }
          : t,
      ),
    [update],
  );

  const resumeTimer = useCallback(
    (id: string) => {
      unlockAudio();
      update(id, (t) => (t.status === "paused" ? { ...t, status: "running", endsAt: Date.now() + t.remainingMs } : t));
    },
    [update],
  );

  const stopTimer = useCallback(
    (id: string) =>
      update(id, (t) => ({
        ...t,
        status: t.status === "finished" ? "finished" : "stopped",
        remainingMs: remainingMs(t, Date.now()),
        endsAt: null,
        finishedAt: t.finishedAt ?? Date.now(),
        alarmDismissed: true,
      })),
    [update],
  );

  const restartTimer = useCallback(
    (id: string) => {
      const timer = timers.find((t) => t.id === id);
      if (!timer) return;
      startTimer({
        label: timer.label,
        recipeTitle: timer.recipeTitle,
        recipeSlug: timer.recipeSlug,
        stepId: timer.stepId,
        durationMs: timer.durationMs,
      });
    },
    [timers, startTimer],
  );

  const removeTimer = useCallback((id: string) => {
    setTimers((current) => current.filter((t) => t.id !== id));
  }, []);

  const dismissAlarm = useCallback((id?: string) => {
    setTimers((current) => current.map((t) => (isRinging(t) && (!id || t.id === id) ? { ...t, alarmDismissed: true } : t)));
  }, []);

  const clearHistory = useCallback(() => {
    setTimers((current) => current.filter((t) => isActive(t) || isRinging(t)));
  }, []);

  const answerPermissionPrompt = useCallback((allow: boolean) => {
    writeFlag(NOTIFICATION_ASKED_KEY);
    setShowPermissionPrompt(false);
    if (allow) void requestNotificationPermission();
  }, []);

  const value = useMemo<TimerContextValue>(
    () => ({
      timers,
      now,
      hydrated,
      startTimer,
      pauseTimer,
      resumeTimer,
      stopTimer,
      restartTimer,
      removeTimer,
      dismissAlarm,
      clearHistory,
      showPermissionPrompt,
      answerPermissionPrompt,
    }),
    [
      timers,
      now,
      hydrated,
      startTimer,
      pauseTimer,
      resumeTimer,
      stopTimer,
      restartTimer,
      removeTimer,
      dismissAlarm,
      clearHistory,
      showPermissionPrompt,
      answerPermissionPrompt,
    ],
  );

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
}

export function useTimers(): TimerContextValue {
  const context = useContext(TimerContext);
  if (!context) throw new Error("useTimers skal bruges inde i <TimerProvider>");
  return context;
}
