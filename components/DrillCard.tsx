import Link from "next/link";
import { ArrowRight, Clock, Users } from "lucide-react";
import { BasketballCourtSvg } from "@/components/court/BasketballCourtSvg";
import type { Drill } from "@/src/data/basketball/types";
import { AgeGroupBadge } from "./AgeGroupBadge";
import { IntensityBadge } from "./IntensityBadge";

type DrillCardProps = {
  drill: Drill;
};

export function DrillCard({ drill }: DrillCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-panel shadow-trainer">
      <div className="p-3">
        <BasketballCourtSvg diagram={drill.diagram} label={`${drill.title} preview`} compact />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5 pt-2">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            {drill.ageGroups.map((ageGroupId) => (
              <AgeGroupBadge key={ageGroupId} ageGroupId={ageGroupId} />
            ))}
            <IntensityBadge intensity={drill.intensity} />
          </div>
          <h2 className="text-lg font-bold text-white">{drill.title}</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-300">{drill.objective}</p>
        </div>

        <dl className="grid grid-cols-2 gap-3 text-sm text-zinc-300">
          <div className="rounded-md bg-white/[0.04] p-3">
            <dt className="flex items-center gap-2 text-zinc-400">
              <Clock className="h-4 w-4 text-signal" aria-hidden="true" />
              Duration
            </dt>
            <dd className="mt-1 font-semibold text-white">{drill.durationMin} min</dd>
          </div>
          <div className="rounded-md bg-white/[0.04] p-3">
            <dt className="flex items-center gap-2 text-zinc-400">
              <Users className="h-4 w-4 text-signal" aria-hidden="true" />
              Players
            </dt>
            <dd className="mt-1 font-semibold text-white">
              {drill.playersMax ? `${drill.playersMin}-${drill.playersMax}` : `${drill.playersMin}+`}
            </dd>
          </div>
        </dl>

        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase text-zinc-400">
            {drill.category.replaceAll("_", " ")} · {drill.courtMode} court
          </span>
          <Link
            href={`/drills/${drill.id}`}
            className="inline-flex items-center gap-2 rounded-md bg-signal px-3 py-2 text-sm font-bold text-white transition hover:bg-orange-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
          >
            View drill
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
