export type TimerStatus = "running" | "paused" | "finished" | "stopped";

export interface BakeTimer {
  id: string;
  /** Typisk trinnets titel, fx "Koldhævning i køleskab". */
  label: string;
  recipeTitle?: string;
  recipeSlug?: string;
  stepId?: string;
  durationMs: number;
  /** Sluttidspunkt (epoch ms), mens timeren kører. Det er det, der gør, at timeren overlever en genindlæsning. */
  endsAt: number | null;
  /** Resterende tid, mens timeren er sat på pause. */
  remainingMs: number;
  status: TimerStatus;
  createdAt: number;
  finishedAt?: number;
  /** Sat, når brugeren har slået alarmen fra for en udløbet timer. */
  alarmDismissed?: boolean;
}

export type NewTimer = Pick<BakeTimer, "label" | "recipeTitle" | "recipeSlug" | "stepId" | "durationMs">;
