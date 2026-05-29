import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { BasketballCourtSvg } from "@/components/court/BasketballCourtSvg";
import type { Drill } from "@/src/data/basketball/types";
import { AgeGroupBadge } from "./AgeGroupBadge";
import { IntensityBadge } from "./IntensityBadge";
import { SafetyNotice } from "./SafetyNotice";

type DrillDetailProps = {
  drill: Drill;
};

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <h2 className="text-base font-bold text-white">{title}</h2>
      <ol className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function DrillDetail({ drill }: DrillDetailProps) {
  return (
    <article className="space-y-8">
      <header className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:items-start">
        <div className="space-y-5">
          <Link href="/drills" className="text-sm font-semibold text-orange-200 hover:text-white">
            Back to drills
          </Link>
          <div className="flex flex-wrap gap-2">
            {drill.ageGroups.map((ageGroupId) => (
              <AgeGroupBadge key={ageGroupId} ageGroupId={ageGroupId} />
            ))}
            <IntensityBadge intensity={drill.intensity} />
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-zinc-200">
              {drill.category.replaceAll("_", " ")}
            </span>
            {drill.trainingDomain ? (
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-zinc-200">
                {drill.trainingDomain.replaceAll("_", " ")}
              </span>
            ) : null}
          </div>
          <div>
            <h1 className="text-3xl font-black text-white sm:text-5xl">{drill.title}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">{drill.objective}</p>
          </div>
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <dt className="text-xs uppercase text-zinc-400">Duration</dt>
              <dd className="mt-1 text-xl font-black text-white">{drill.durationMin}m</dd>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <dt className="text-xs uppercase text-zinc-400">Players</dt>
              <dd className="mt-1 text-xl font-black text-white">
                {drill.playersMax ? `${drill.playersMin}-${drill.playersMax}` : `${drill.playersMin}+`}
              </dd>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <dt className="text-xs uppercase text-zinc-400">Court</dt>
              <dd className="mt-1 text-xl font-black capitalize text-white">{drill.courtMode}</dd>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <dt className="text-xs uppercase text-zinc-400">Equipment</dt>
              <dd className="mt-1 text-sm font-bold text-white">{drill.equipment.join(", ")}</dd>
            </div>
          </dl>
          <div className="rounded-lg border border-orange-300/20 bg-orange-400/10 p-4">
            <button
              type="button"
              aria-disabled="true"
              className="inline-flex items-center gap-2 rounded-md bg-signal px-4 py-3 text-sm font-bold text-white"
            >
              <PlusCircle className="h-4 w-4" aria-hidden="true" />
              Add to practice plan
            </button>
            <p className="mt-3 text-sm leading-6 text-orange-50">
              Planner save state is intentionally local-only for this MVP; use the generated planner
              route to assemble full sessions.
            </p>
          </div>
          {drill.basketballTransfer ? (
            <div className="rounded-lg border border-sky-300/20 bg-sky-400/10 p-4">
              <h2 className="text-base font-bold text-white">Basketball transfer</h2>
              <p className="mt-2 text-sm leading-6 text-sky-50">{drill.basketballTransfer}</p>
            </div>
          ) : null}
        </div>

        <BasketballCourtSvg diagram={drill.diagram} label={`${drill.title} diagram`} />
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        <ListBlock title="Setup" items={drill.setup} />
        <ListBlock title="Step-by-step execution" items={drill.execution} />
        <ListBlock title="Coaching cues" items={drill.coachingCues} />
        <ListBlock title="Common mistakes" items={drill.commonMistakes} />
      </div>

      <section className="grid gap-5 md:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-base font-bold text-white">Regression</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-300">{drill.regression}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-base font-bold text-white">Progression</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-300">{drill.progression}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-base font-bold text-white">Competitive scoring</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-300">{drill.scoring}</p>
        </div>
      </section>

      <SafetyNotice>{drill.safetyNote}</SafetyNotice>
    </article>
  );
}
