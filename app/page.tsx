import Link from "next/link";
import { ArrowRight, ClipboardList, Filter, Map } from "lucide-react";
import { ageGroups } from "@/src/data/basketball/age-groups";
import { drills } from "@/src/data/basketball/drills";
import { presetPracticePlans } from "@/src/data/basketball/practice-plans";

const cards = [
  {
    title: "Age-specific drills",
    text: "Filter by U8, U11, U14, U16, and High School / Elite so the workload, teaching language, and constraints fit the group.",
    icon: Filter,
  },
  {
    title: "Court diagrams",
    text: "Every drill includes a data-driven half-court or full-court diagram with players, cones, actions, and coaching flow.",
    icon: Map,
  },
  {
    title: "2-hour practice builder",
    text: "Generate exact-duration timelines with warm-up, skill blocks, competitive play, team concepts, rest, and review.",
    icon: ClipboardList,
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto grid min-h-[calc(100svh-73px)] max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
        <div className="flex flex-col justify-center">
          <p className="mb-4 text-sm font-bold uppercase text-orange-200">
            Advanced trainer standard
          </p>
          <h1 className="max-w-4xl text-4xl font-black text-white sm:text-6xl">
            Plan age-specific basketball practices with pro-level drill structure.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
            Build real practice plans from complete drill data, coaching cues, court diagrams, and
            age-appropriate load rules. Designed for coaches using a phone courtside.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/drills"
              className="inline-flex items-center gap-2 rounded-md bg-signal px-5 py-3 font-bold text-white transition hover:bg-orange-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              Browse drills
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/planner"
              className="inline-flex items-center gap-2 rounded-md border border-white/15 px-5 py-3 font-bold text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              Build practice
            </Link>
          </div>
        </div>

        <div className="grid content-center gap-4">
          <div className="rounded-lg border border-white/10 bg-panel p-5 shadow-trainer">
            <p className="text-sm font-bold uppercase text-zinc-400">Content library</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-white/[0.04] p-4">
                <p className="text-3xl font-black text-white">{drills.length}</p>
                <p className="mt-1 text-xs text-zinc-400">complete drills</p>
              </div>
              <div className="rounded-lg bg-white/[0.04] p-4">
                <p className="text-3xl font-black text-white">{ageGroups.length}</p>
                <p className="mt-1 text-xs text-zinc-400">age groups</p>
              </div>
              <div className="rounded-lg bg-white/[0.04] p-4">
                <p className="text-3xl font-black text-white">{presetPracticePlans.length}</p>
                <p className="mt-1 text-xs text-zinc-400">preset plans</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-limecourt/15 text-lime-100">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="font-bold text-white">{card.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-zinc-300">{card.text}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
