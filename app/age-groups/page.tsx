import Link from "next/link";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { ageGroupTrainingProfiles } from "@/src/data/basketball/age-group-training";
import { drills } from "@/src/data/basketball/drills";

export const metadata = {
  title: "Age Groups | CourtCraft Planner",
};

export default function AgeGroupsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 max-w-3xl">
        <p className="text-sm font-bold uppercase text-orange-200">Age group training hubs</p>
        <h1 className="mt-3 text-3xl font-black text-white sm:text-5xl">
          Start from the athletes, then choose the drills.
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-300">
          Each group integrates basketball skills, S&amp;C, multiplanar speed, session structure,
          load guidance, and age-filtered drill options.
        </p>
      </header>

      <section className="grid gap-5 md:grid-cols-2">
        {ageGroupTrainingProfiles.map((profile) => {
          const groupDrills = drills.filter((drill) => drill.ageGroups.includes(profile.ageGroupId));
          const strengthDrills = groupDrills.filter(
            (drill) => drill.trainingDomain === "strength_conditioning",
          );
          const needsWarning = profile.ageGroupId !== "hs_elite";

          return (
            <article
              key={profile.ageGroupId}
              className="flex min-h-full flex-col rounded-lg border border-white/10 bg-panel p-5 shadow-trainer"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold uppercase text-zinc-400">{profile.ageRange}</p>
                  <h2 className="mt-2 text-2xl font-black text-white">{profile.title}</h2>
                </div>
                {needsWarning ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/30 bg-amber-400/10 px-2.5 py-1 text-xs font-semibold text-amber-100">
                    <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                    120m camp only
                  </span>
                ) : (
                  <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-100">
                    120m normal
                  </span>
                )}
              </div>

              <p className="mt-4 text-sm leading-6 text-zinc-300">{profile.mainGoal}</p>

              <dl className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-md bg-white/[0.04] p-3">
                  <dt className="text-xs uppercase text-zinc-400">Recommended</dt>
                  <dd className="mt-1 text-lg font-black text-white">
                    {profile.recommendedDurationMin}-{profile.recommendedDurationMax}m
                  </dd>
                </div>
                <div className="rounded-md bg-white/[0.04] p-3">
                  <dt className="text-xs uppercase text-zinc-400">Camp option</dt>
                  <dd className="mt-1 text-lg font-black text-white">{profile.intensiveDurationMin}m</dd>
                </div>
                <div className="rounded-md bg-white/[0.04] p-3">
                  <dt className="text-xs uppercase text-zinc-400">Drills</dt>
                  <dd className="mt-1 text-lg font-black text-white">{groupDrills.length}</dd>
                </div>
                <div className="rounded-md bg-white/[0.04] p-3">
                  <dt className="text-xs uppercase text-zinc-400">S&amp;C drills</dt>
                  <dd className="mt-1 text-lg font-black text-white">{strengthDrills.length}</dd>
                </div>
              </dl>

              <div className="mt-5">
                <p className="text-xs font-bold uppercase text-zinc-400">Main development priorities</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-300">
                  {profile.developmentPriorities.slice(0, 4).map((priority) => (
                    <li key={priority.title} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                      <span>{priority.description}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/age-groups/${profile.ageGroupId}`}
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-signal px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
              >
                View training plan
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          );
        })}
      </section>
    </main>
  );
}
