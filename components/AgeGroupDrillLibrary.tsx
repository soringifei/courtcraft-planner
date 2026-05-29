"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BasketballCourtSvg } from "@/components/court/BasketballCourtSvg";
import type {
  CourtMode,
  Drill,
  Intensity,
  PhysicalQuality,
  PracticePlacement,
  TrainingCategoryId,
  TrainingDomain,
} from "@/src/data/basketball/types";
import type { TrainingCategory } from "@/src/data/basketball/training-categories";
import { IntensityBadge } from "./IntensityBadge";

type AgeGroupDrillLibraryProps = {
  drills: Drill[];
  categories: TrainingCategory[];
  equipment: string[];
};

type ViewMode = "cards" | "table";
type DurationFilter = "all" | "short" | "standard" | "extended";

const domainOptions: Array<"all" | TrainingDomain> = [
  "all",
  "basketball",
  "strength_conditioning",
  "hybrid",
];
const intensityOptions: Array<"all" | Intensity> = ["all", "low", "medium", "high"];
const courtOptions: Array<"all" | CourtMode> = ["all", "half", "full"];

const physicalQualityOptions: Array<"all" | PhysicalQuality> = [
  "all",
  "coordination",
  "balance",
  "acceleration",
  "deceleration",
  "lateral_speed",
  "multiplanar_speed",
  "landing_mechanics",
  "single_leg_strength",
  "core_stiffness",
  "reactive_agility",
  "conditioning",
  "recovery",
];

const placementOptions: Array<"all" | PracticePlacement> = [
  "all",
  "movement_prep",
  "skill_block",
  "shooting_block",
  "finishing_block",
  "decision_block",
  "team_block",
  "speed_agility_block",
  "conditioning_finisher",
  "cooldown",
];

function categoryLabel(categories: TrainingCategory[], id: TrainingCategoryId): string {
  return categories.find((category) => category.id === id)?.label ?? id.replaceAll("_", " ");
}

function matchesDuration(durationMin: number, filter: DurationFilter): boolean {
  if (filter === "short") return durationMin <= 8;
  if (filter === "standard") return durationMin > 8 && durationMin <= 12;
  if (filter === "extended") return durationMin > 12;
  return true;
}

export function AgeGroupDrillLibrary({ drills, categories, equipment }: AgeGroupDrillLibraryProps) {
  const [category, setCategory] = useState<"all" | TrainingCategoryId>("all");
  const [domain, setDomain] = useState<"all" | TrainingDomain>("all");
  const [physicalQuality, setPhysicalQuality] = useState<"all" | PhysicalQuality>("all");
  const [intensity, setIntensity] = useState<"all" | Intensity>("all");
  const [duration, setDuration] = useState<DurationFilter>("all");
  const [equipmentValue, setEquipmentValue] = useState("all");
  const [courtMode, setCourtMode] = useState<"all" | CourtMode>("all");
  const [placement, setPlacement] = useState<"all" | PracticePlacement>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("cards");

  const filteredDrills = useMemo(() => {
    return drills.filter((drill) => {
      const tags = drill.categoryTags ?? [];
      const qualities = drill.physicalQualities ?? [];
      const placements = drill.practicePlacement ?? [];

      return (
        (category === "all" || tags.includes(category)) &&
        (domain === "all" || drill.trainingDomain === domain) &&
        (physicalQuality === "all" || qualities.includes(physicalQuality)) &&
        (intensity === "all" || drill.intensity === intensity) &&
        matchesDuration(drill.durationMin, duration) &&
        (equipmentValue === "all" || drill.equipment.includes(equipmentValue)) &&
        (courtMode === "all" || drill.courtMode === courtMode) &&
        (placement === "all" || placements.includes(placement))
      );
    });
  }, [category, courtMode, domain, drills, duration, equipmentValue, intensity, physicalQuality, placement]);

  return (
    <section className="space-y-5">
      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="space-y-2 text-sm font-semibold text-zinc-200">
            Category
            <select
              value={category}
              onChange={(event) => setCategory(event.currentTarget.value as "all" | TrainingCategoryId)}
              className="w-full rounded-md border border-white/10 bg-ink px-3 py-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              <option value="all">All categories</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm font-semibold text-zinc-200">
            Training domain
            <select
              value={domain}
              onChange={(event) => setDomain(event.currentTarget.value as "all" | TrainingDomain)}
              className="w-full rounded-md border border-white/10 bg-ink px-3 py-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              {domainOptions.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? "All domains" : item.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm font-semibold text-zinc-200">
            Physical quality
            <select
              value={physicalQuality}
              onChange={(event) =>
                setPhysicalQuality(event.currentTarget.value as "all" | PhysicalQuality)
              }
              className="w-full rounded-md border border-white/10 bg-ink px-3 py-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              {physicalQualityOptions.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? "All qualities" : item.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm font-semibold text-zinc-200">
            Practice placement
            <select
              value={placement}
              onChange={(event) => setPlacement(event.currentTarget.value as "all" | PracticePlacement)}
              className="w-full rounded-md border border-white/10 bg-ink px-3 py-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              {placementOptions.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? "All placements" : item.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm font-semibold text-zinc-200">
            Intensity
            <select
              value={intensity}
              onChange={(event) => setIntensity(event.currentTarget.value as "all" | Intensity)}
              className="w-full rounded-md border border-white/10 bg-ink px-3 py-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              {intensityOptions.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? "All intensity" : item}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm font-semibold text-zinc-200">
            Duration
            <select
              value={duration}
              onChange={(event) => setDuration(event.currentTarget.value as DurationFilter)}
              className="w-full rounded-md border border-white/10 bg-ink px-3 py-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              <option value="all">Any duration</option>
              <option value="short">8 min or less</option>
              <option value="standard">9-12 min</option>
              <option value="extended">13+ min</option>
            </select>
          </label>

          <label className="space-y-2 text-sm font-semibold text-zinc-200">
            Equipment
            <select
              value={equipmentValue}
              onChange={(event) => setEquipmentValue(event.currentTarget.value)}
              className="w-full rounded-md border border-white/10 bg-ink px-3 py-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              <option value="all">Any equipment</option>
              {equipment.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm font-semibold text-zinc-200">
            Court mode
            <select
              value={courtMode}
              onChange={(event) => setCourtMode(event.currentTarget.value as "all" | CourtMode)}
              className="w-full rounded-md border border-white/10 bg-ink px-3 py-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              {courtOptions.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? "Half or full" : `${item} court`}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-zinc-300" aria-live="polite">
            Showing <span className="font-bold text-white">{filteredDrills.length}</span> of{" "}
            {drills.length} drills
          </p>
          <div className="flex rounded-md border border-white/10 bg-ink p-1" role="group" aria-label="View mode">
            {(["cards", "table"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                aria-pressed={viewMode === mode}
                onClick={() => setViewMode(mode)}
                className={`rounded px-3 py-2 text-sm font-semibold capitalize transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 ${
                  viewMode === mode ? "bg-signal text-white" : "text-zinc-300 hover:bg-white/10"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {viewMode === "cards" ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredDrills.map((drill) => (
            <article key={drill.id} className="overflow-hidden rounded-lg border border-white/10 bg-panel">
              <div className="p-3">
                <BasketballCourtSvg diagram={drill.diagram} label={`${drill.title} preview`} compact />
              </div>
              <div className="space-y-3 p-5 pt-2">
                <div className="flex flex-wrap gap-2">
                  <IntensityBadge intensity={drill.intensity} />
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-zinc-200">
                    {(drill.trainingDomain ?? "basketball").replaceAll("_", " ")}
                  </span>
                </div>
                <h3 className="text-lg font-black text-white">{drill.title}</h3>
                <p className="text-sm leading-6 text-zinc-300">{drill.objective}</p>
                <div className="flex flex-wrap gap-2">
                  {(drill.categoryTags ?? []).slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-md bg-white/[0.05] px-2 py-1 text-xs text-zinc-300">
                      {categoryLabel(categories, tag)}
                    </span>
                  ))}
                </div>
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
      ) : (
        <div className="overflow-x-auto rounded-lg border border-white/10 bg-panel">
          <table className="min-w-[900px] w-full text-left text-sm">
            <thead className="border-b border-white/10 bg-white/[0.04] text-xs uppercase text-zinc-400">
              <tr>
                <th className="px-4 py-3">Drill</th>
                <th className="px-4 py-3">Domain</th>
                <th className="px-4 py-3">Categories</th>
                <th className="px-4 py-3">Quality</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Intensity</th>
                <th className="px-4 py-3">Placement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredDrills.map((drill) => (
                <tr key={drill.id} className="align-top text-zinc-300">
                  <td className="px-4 py-3">
                    <Link
                      href={`/drills/${drill.id}`}
                      className="font-bold text-white hover:text-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
                    >
                      {drill.title}
                    </Link>
                    <p className="mt-1 max-w-xs text-xs leading-5 text-zinc-400">{drill.objective}</p>
                  </td>
                  <td className="px-4 py-3">{(drill.trainingDomain ?? "basketball").replaceAll("_", " ")}</td>
                  <td className="px-4 py-3">
                    {(drill.categoryTags ?? []).map((tag) => categoryLabel(categories, tag)).join(", ")}
                  </td>
                  <td className="px-4 py-3">
                    {(drill.physicalQualities ?? []).map((item) => item.replaceAll("_", " ")).join(", ") || "-"}
                  </td>
                  <td className="px-4 py-3">{drill.durationMin}m</td>
                  <td className="px-4 py-3">{drill.intensity}</td>
                  <td className="px-4 py-3">
                    {(drill.practicePlacement ?? []).map((item) => item.replaceAll("_", " ")).join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
