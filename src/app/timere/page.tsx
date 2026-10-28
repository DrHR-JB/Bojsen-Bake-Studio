import type { Metadata } from "next";
import { TimerOverview } from "@/components/timers/TimerOverview";

export const metadata: Metadata = { title: "Mine timere" };

export default function TimersPage() {
  return (
    <div className="animate-rise py-6">
      <p className="text-sm font-semibold tracking-[0.2em] text-crust uppercase">Køkkenuret</p>
      <h1 className="font-display mt-2 text-5xl font-semibold tracking-tight">Mine timere</h1>
      <p className="mt-3 max-w-xl text-rye">
        Timerne gemmer deres sluttidspunkt i browseren, så de fortsætter, selv om du lukker eller genindlæser siden.
      </p>
      <TimerOverview />
    </div>
  );
}
