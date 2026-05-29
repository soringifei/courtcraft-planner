import Link from "next/link";
import { BasketballCourtSvg } from "@/components/court/BasketballCourtSvg";
import { AgeGroupBadge } from "@/components/AgeGroupBadge";
import { IntensityBadge } from "@/components/IntensityBadge";
import { drills } from "@/src/data/basketball/drills";
import type { Drill } from "@/src/data/basketball/types";

export const metadata = {
  title: "Strength & Conditioning | CourtCraft Planner",
};

const groups: Array<{ title: string; description: string; match: (drill: Drill) => boolean }> = [
  {
    title: "Movement Preparation",
    description: "Coordination, balance, warm-up movement, stopping quality, and landing readiness.",
    match: (drill) => drill.categoryTags?.includes("movement_prep") ?? false,
  },
  {
    title: "Strength",
    description: "Bodyweight strength games, single-leg control, trunk stiffness, and stable contact positions.",
    match: (drill) => drill.categoryTags?.includes("strength_conditioning") ?? false,
  },
  {
    title: "Speed / Agility",
    description: "Acceleration, deceleration, lateral speed, closeout mechanics, and reactive agility.",
    match: (drill) =>
      drill.physicalQualities?.some((quality) =>
        ["acceleration", "deceleration", "lateral_speed", "reactive_agility"].includes(quality),
      ) ?? false,
  },
  {
    title: "Multiplanar Speed",
    description: "Sprint, shuffle, backpedal, hip turn, crossover run, closeout, contain, and recover patterns.",
    match: (drill) => drill.categoryTags?.includes("multiplanar_speed") ?? false,
  },
  {
    title: "Conditioning",
    description: "Basketball-specific repeat-effort work with enough rest to protect skill quality.",
    match: (drill) => drill.categoryTags?.includes("conditioning") ?? false,
  },
  {
    title: "Recovery",
    description: "Cooldown, balance reset, breathing, trunk control, and low-intensity review work.",
    match: (drill) => drill.categoryTags?.includes("recovery") ?? false,
  },
];

export default function StrengthConditioningPage() {
  const strengthDrills = drills.filter((drill) => drill.trainingDomain === "strength_conditioning");

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 max-w-3xl">
        <p className="text-sm font-bold uppercase text-orange-200">Global S&amp;C library</p>
        <h1 className="mt-3 text-3xl font-black text-white sm:text-5xl">
          Strength, speed, conditioning, and recovery for basketball.
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-300">
          This is the global library. The practical coaching view lives inside each age group page,
          where the same S&amp;C drills are integrated into complete sessions.
        </p>
      </header>

      <section className="space-y-8">
        {groups.map((group) => {
          const groupDrills = strengthDrills.filter(group.match);

          return (
            <section key={group.title} className="space-y-4">
              <div>
                <h2 className="text-2xl font-black text-white">{group.title}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-300">{group.description}</p>
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {groupDrills.map((drill) => (
                  <article key={drill.id} className="overflow-hidden rounded-lg border border-white/10 bg-panel">
                    <div className="p-3">
                      <BasketballCourtSvg diagram={drill.diagram} label={`${drill.title} preview`} compact />
                    </div>
                    <div className="space-y-3 p-5 pt-2">
                      <div className="flex flex-wrap gap-2">
                        {drill.ageGroups.map((ageGroupId) => (
                          <AgeGroupBadge key={ageGroupId} ageGroupId={ageGroupId} />
                        ))}
                        <IntensityBadge intensity={drill.intensity} />
                      </div>
                      <h3 className="text-lg font-black text-white">{drill.title}</h3>
                      <p className="text-sm leading-6 text-zinc-300">{drill.objective}</p>
                      <p className="rounded-md border border-orange-300/20 bg-orange-400/10 p-3 text-sm leading-6 text-orange-50">
                        Transfer: {drill.basketballTransfer}
                      </p>
                      <Link
                        href={`/drills/${drill.id}`}
                        className="inline-flex rounded-md bg-signal px-3 py-2 text-sm font-bold text-white transition hover:bg-orange-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
                      >
                        View drill
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </section>
    </main>
  );
}
