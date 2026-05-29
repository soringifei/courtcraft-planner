import type { Intensity } from "@/src/data/basketball/types";

type IntensityBadgeProps = {
  intensity: Intensity;
};

const intensityClass: Record<Intensity, string> = {
  low: "border-emerald-300/30 bg-emerald-400/10 text-emerald-100",
  medium: "border-amber-300/30 bg-amber-400/10 text-amber-100",
  high: "border-rose-300/30 bg-rose-400/10 text-rose-100",
};

export function IntensityBadge({ intensity }: IntensityBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${intensityClass[intensity]}`}
    >
      {intensity}
    </span>
  );
}
