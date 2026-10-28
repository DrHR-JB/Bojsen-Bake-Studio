/** Formaterer minutter som fx "4 t 30 min" eller "45 min". */
export function formatMinutes(minutes: number): string {
  const rounded = Math.round(minutes);
  const hours = Math.floor(rounded / 60);
  const rest = rounded % 60;
  if (hours === 0) return `${rest} min`;
  if (rest === 0) return `${hours} t`;
  return `${hours} t ${rest} min`;
}

export function formatRange([min, max]: [number, number]): string {
  if (min % 60 === 0 && max % 60 === 0) return `${min / 60}–${max / 60} timer`;
  return `${formatMinutes(min)}–${formatMinutes(max)}`;
}

/** Nedtælling som "1:04:09" eller "04:09". */
export function formatCountdown(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`;
}

export function formatGrams(grams: number): string {
  return `${grams.toLocaleString("da-DK", { maximumFractionDigits: 1 })} g`;
}

export function formatPercent(value: number): string {
  return `${value.toLocaleString("da-DK", { maximumFractionDigits: 1 })} %`;
}

export function formatClock(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString("da-DK", { hour: "2-digit", minute: "2-digit" });
}
