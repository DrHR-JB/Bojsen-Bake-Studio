import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { AlarmOverlay } from "@/components/timers/AlarmOverlay";
import { NotificationPrompt } from "@/components/timers/NotificationPrompt";
import { TimerDock } from "@/components/timers/TimerDock";
import { TimerProvider } from "@/components/timers/TimerProvider";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bojsen Bake Studio",
    template: "%s · Bojsen Bake Studio",
  },
  description: "Opskrifter på surdejsbrød og pizza med timere til hæveprocesserne.",
};

export const viewport: Viewport = {
  themeColor: "#f5ecdc",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="da" className={`${fraunces.variable} ${instrument.variable}`}>
      <body className="min-h-dvh antialiased">
        <TimerProvider>
          <SiteHeader />
          <main className="mx-auto w-full max-w-6xl px-4 pb-40 sm:px-6">{children}</main>
          <TimerDock />
          <NotificationPrompt />
          <AlarmOverlay />
        </TimerProvider>
      </body>
    </html>
  );
}
