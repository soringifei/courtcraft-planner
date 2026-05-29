import Link from "next/link";
import { Dumbbell } from "lucide-react";

const navItems = [
  { href: "/drills", label: "Drills" },
  { href: "/planner", label: "Planner" },
  { href: "/plans", label: "Plans" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
        >
          <span className="grid h-10 w-10 place-items-center rounded-md bg-signal">
            <Dumbbell className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-sm font-black">CourtCraft Planner</span>
            <span className="block text-xs text-zinc-400">Elite player development</span>
          </span>
        </Link>
        <nav aria-label="Primary navigation" className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
