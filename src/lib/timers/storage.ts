import type { BakeTimer } from "./types";

export const TIMERS_STORAGE_KEY = "bbs:timers:v1";
export const NOTIFICATION_ASKED_KEY = "bbs:notifications-asked";

/** Afsluttede timere vises i historikken så længe. */
export const HISTORY_MS = 24 * 60 * 60 * 1000;

function isTimer(value: unknown): value is BakeTimer {
  if (!value || typeof value !== "object") return false;
  const t = value as Partial<BakeTimer>;
  return typeof t.id === "string" && typeof t.label === "string" && typeof t.durationMs === "number";
}

export function loadTimers(): BakeTimer[] {
  try {
    const raw = window.localStorage.getItem(TIMERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const cutoff = Date.now() - HISTORY_MS;
    return parsed
      .filter(isTimer)
      .filter((t) => t.status === "running" || t.status === "paused" || (t.finishedAt ?? t.createdAt) > cutoff);
  } catch {
    return [];
  }
}

export function saveTimers(timers: BakeTimer[]) {
  try {
    window.localStorage.setItem(TIMERS_STORAGE_KEY, JSON.stringify(timers));
  } catch {
    // Privat browsing eller fuld storage – timerne virker stadig i denne fane.
  }
}

export function readFlag(key: string): boolean {
  try {
    return window.localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

export function writeFlag(key: string) {
  try {
    window.localStorage.setItem(key, "1");
  } catch {
    // ignorer
  }
}

export function newTimerId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
