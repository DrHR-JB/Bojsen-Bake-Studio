import Link from "next/link";
import { WheatMark } from "@/components/Illustrations";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
      <Link href="/" className="group flex items-center gap-2.5">
        <WheatMark className="h-8 w-8 text-crust transition-transform group-hover:-rotate-12" />
        <span className="font-display text-xl leading-none font-semibold tracking-tight">
          Bojsen <span className="text-crust italic">Bake</span> Studio
        </span>
      </Link>
      <nav className="flex items-center gap-1 text-sm font-medium">
        <Link href="/" className="rounded-full px-3 py-2 hover:bg-flour">
          Opskrifter
        </Link>
        <Link href="/timere" className="rounded-full px-3 py-2 hover:bg-flour">
          Mine timere
        </Link>
      </nav>
    </header>
  );
}
