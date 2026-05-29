import { SafetyNotice } from "@/components/SafetyNotice";
import { PracticeTimeline } from "@/components/PracticeTimeline";
import { AgeGroupBadge } from "@/components/AgeGroupBadge";
import { presetPracticePlans } from "@/src/data/basketball/practice-plans";

export default function PlansPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 max-w-3xl">
        <p className="text-sm font-bold uppercase text-orange-200">Preset practice plans</p>
        <h1 className="mt-3 text-3xl font-black text-white sm:text-5xl">
          Ready-made session structures by age group.
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-300">
          Recommended plans and 2-hour camp/intensive formats are seeded locally. Every segment links
          back to drill detail pages.
        </p>
        <a
          href="/basketball-training-plans.pdf"
          className="mt-5 inline-flex rounded-md bg-signal px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
        >
          Download training PDF
        </a>
      </header>

      <div className="space-y-8">
        {presetPracticePlans.map((plan) => (
          <article key={plan.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-3xl">
                <div className="mb-3 flex flex-wrap gap-2">
                  <AgeGroupBadge ageGroupId={plan.ageGroupId} />
                  {plan.isIntensive ? (
                    <span className="inline-flex items-center rounded-full border border-amber-300/30 bg-amber-400/10 px-2.5 py-1 text-xs font-semibold text-amber-100">
                      Camp / intensive
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-emerald-300/30 bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-100">
                      Recommended
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-black text-white">{plan.title}</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-300">{plan.introGoal}</p>
                <p className="mt-3 text-sm font-semibold text-zinc-200">Load note: {plan.loadNote}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-panel px-5 py-4 text-center">
                <p className="text-xs font-bold uppercase text-zinc-400">Total</p>
                <p className="mt-1 text-3xl font-black text-white">{plan.durationMin}m</p>
              </div>
            </div>

            {plan.warning ? (
              <div className="mb-5">
                <SafetyNotice>{plan.warning}</SafetyNotice>
              </div>
            ) : null}

            <PracticeTimeline segments={plan.segments} />
          </article>
        ))}
      </div>
    </main>
  );
}
