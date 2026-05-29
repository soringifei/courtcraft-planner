import Link from "next/link";
import { AlertTriangle, Clock } from "lucide-react";
import { drillById } from "@/src/data/basketball/drills";
import type { PracticePlan, PracticePlanSegment, PracticeSegmentType } from "@/src/data/basketball/types";
import { IntensityBadge } from "./IntensityBadge";

type AgeGroupPracticeTimelineProps = {
  plan: PracticePlan;
  compact?: boolean;
};

const segmentLabels: Record<PracticeSegmentType, string> = {
  movement_prep: "Movement prep",
  speed_agility: "Speed / agility",
  skill_development: "Skill development",
  shooting: "Shooting",
  finishing: "Finishing",
  decision_making: "Decision making",
  team_concept: "Team concept",
  small_sided_game: "Small-sided game",
  conditioning: "Conditioning",
  cooldown: "Cooldown",
  water_break: "Water break",
  teaching: "Teaching",
};

const segmentStyles: Record<PracticeSegmentType, string> = {
  movement_prep: "border-orange-300/20 bg-orange-400/10",
  speed_agility: "border-orange-300/20 bg-orange-400/10",
  conditioning: "border-orange-300/20 bg-orange-400/10",
  cooldown: "border-emerald-300/20 bg-emerald-400/10",
  water_break: "border-emerald-300/20 bg-emerald-400/10",
  teaching: "border-cyan-300/20 bg-cyan-400/10",
  skill_development: "border-sky-300/20 bg-sky-400/10",
  shooting: "border-sky-300/20 bg-sky-400/10",
  finishing: "border-sky-300/20 bg-sky-400/10",
  decision_making: "border-sky-300/20 bg-sky-400/10",
  team_concept: "border-sky-300/20 bg-sky-400/10",
  small_sided_game: "border-sky-300/20 bg-sky-400/10",
};

function isHighLoad(segment: PracticePlanSegment): boolean {
  return segment.intensity === "high" && segment.durationMin >= 12;
}

export function AgeGroupPracticeTimeline({ plan, compact = false }: AgeGroupPracticeTimelineProps) {
  const total = plan.segments.reduce((sum, segment) => sum + segment.durationMin, 0);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <div>
          <p className="text-xs font-bold uppercase text-zinc-400">{plan.format} timeline</p>
          <h3 className="mt-1 text-xl font-black text-white">{plan.title}</h3>
          {!compact ? <p className="mt-2 text-sm leading-6 text-zinc-300">{plan.goal}</p> : null}
        </div>
        <div className="shrink-0 rounded-lg border border-white/10 bg-panel px-4 py-3 text-center">
          <Clock className="mx-auto h-5 w-5 text-signal" aria-hidden="true" />
          <p className="mt-1 text-2xl font-black text-white">{total}m</p>
        </div>
      </div>

      <ol className="space-y-3">
        {plan.segments.map((segment, index) => (
          <li
            key={segment.id}
            className={`grid gap-4 rounded-lg border p-4 md:grid-cols-[96px_1fr] ${
              segmentStyles[segment.segmentType]
            }`}
          >
            <div>
              <p className="text-xs font-bold uppercase text-zinc-400">Block {index + 1}</p>
              <p className="mt-1 text-2xl font-black text-white">{segment.durationMin}m</p>
              <p className="mt-1 text-xs font-semibold uppercase text-zinc-300">
                {segmentLabels[segment.segmentType]}
              </p>
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-start gap-2">
                <h4 className="mr-auto text-base font-black text-white">{segment.title}</h4>
                <IntensityBadge intensity={segment.intensity} />
                {isHighLoad(segment) ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/30 bg-amber-400/10 px-2.5 py-1 text-xs font-semibold text-amber-100">
                    <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                    High load
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-300">{segment.coachingEmphasis}</p>

              {segment.drillIds.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {segment.drillIds.map((drillId) => {
                    const drill = drillById[drillId];

                    return (
                      <Link
                        key={drillId}
                        href={`/drills/${drillId}`}
                        className="rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm font-semibold text-zinc-100 transition hover:border-orange-300/50 hover:text-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
                      >
                        {drill?.title ?? drillId}
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-4 rounded-md border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-sm font-semibold text-emerald-50">
                  Hydration, teaching reset, role rotation, and work:rest protection.
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
