import Link from "next/link";
import { Clock } from "lucide-react";
import { drillById } from "@/src/data/basketball/drills";
import type { PracticePlanSegment } from "@/src/data/basketball/types";
import { IntensityBadge } from "./IntensityBadge";

type PracticeTimelineProps = {
  segments: PracticePlanSegment[];
};

export function PracticeTimeline({ segments }: PracticeTimelineProps) {
  const total = segments.reduce((sum, segment) => sum + segment.durationMin, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <div>
          <p className="text-sm font-semibold uppercase text-zinc-400">Practice timeline</p>
          <p className="mt-1 text-2xl font-black text-white">{total} minutes</p>
        </div>
        <Clock className="h-7 w-7 text-signal" aria-hidden="true" />
      </div>

      <ol className="space-y-3">
        {segments.map((segment, index) => (
          <li
            key={segment.id}
            className="grid gap-4 rounded-lg border border-white/10 bg-panel p-4 md:grid-cols-[92px_1fr]"
          >
            <div>
              <p className="text-xs font-bold uppercase text-zinc-500">Block {index + 1}</p>
              <p className="mt-1 text-2xl font-black text-orange-200">{segment.durationMin}m</p>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="mr-auto text-lg font-bold text-white">{segment.title}</h3>
                <IntensityBadge intensity={segment.intensity} />
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
                        className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-zinc-100 transition hover:border-orange-300/40 hover:text-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
                      >
                        {drill?.title ?? drillId}
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-4 rounded-md border border-cyan-300/20 bg-cyan-400/10 px-3 py-2 text-sm font-semibold text-cyan-50">
                  Hydration, breath reset, teaching check, and role rotation.
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
