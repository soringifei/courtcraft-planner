"use client";

import { useMemo, useState } from "react";
import type { AgeGroup } from "@/src/data/basketball/types";
import type { Drill, DrillCategory, Intensity, CourtMode } from "@/src/data/basketball/types";
import { DrillCard } from "./DrillCard";

type DrillFiltersProps = {
  drills: Drill[];
  ageGroups: AgeGroup[];
  equipment: string[];
  categories: DrillCategory[];
};

type DurationFilter = "all" | "short" | "standard" | "extended";
type PlayerFilter = "all" | "small" | "medium" | "large";

const intensityOptions: Array<"all" | Intensity> = ["all", "low", "medium", "high"];
const courtOptions: Array<"all" | CourtMode> = ["all", "half", "full"];

function matchesDuration(durationMin: number, filter: DurationFilter): boolean {
  if (filter === "short") return durationMin <= 10;
  if (filter === "standard") return durationMin > 10 && durationMin <= 14;
  if (filter === "extended") return durationMin >= 15;
  return true;
}

function matchesPlayers(drill: Drill, filter: PlayerFilter): boolean {
  const max = drill.playersMax ?? 99;

  if (filter === "small") return drill.playersMin <= 4;
  if (filter === "medium") return drill.playersMin <= 8 && max >= 5;
  if (filter === "large") return max >= 9;
  return true;
}

export function DrillFilters({ drills, ageGroups, equipment, categories }: DrillFiltersProps) {
  const [ageGroupId, setAgeGroupId] = useState("all");
  const [category, setCategory] = useState("all");
  const [intensity, setIntensity] = useState<(typeof intensityOptions)[number]>("all");
  const [duration, setDuration] = useState<DurationFilter>("all");
  const [players, setPlayers] = useState<PlayerFilter>("all");
  const [courtMode, setCourtMode] = useState<(typeof courtOptions)[number]>("all");
  const [equipmentValue, setEquipmentValue] = useState("all");
  const handleAgeGroup = (value: string) => setAgeGroupId(value);
  const handleCategory = (value: string) => setCategory(value);
  const handleIntensity = (value: string) => setIntensity(value as typeof intensity);
  const handleDuration = (value: string) => setDuration(value as DurationFilter);
  const handlePlayers = (value: string) => setPlayers(value as PlayerFilter);
  const handleCourtMode = (value: string) => setCourtMode(value as typeof courtMode);
  const handleEquipment = (value: string) => setEquipmentValue(value);

  const filteredDrills = useMemo(() => {
    return drills.filter((drill) => {
      const ageMatches = ageGroupId === "all" || drill.ageGroups.includes(ageGroupId as AgeGroup["id"]);
      const categoryMatches = category === "all" || drill.category === category;
      const intensityMatches = intensity === "all" || drill.intensity === intensity;
      const durationMatches = matchesDuration(drill.durationMin, duration);
      const playerMatches = matchesPlayers(drill, players);
      const courtMatches = courtMode === "all" || drill.courtMode === courtMode;
      const equipmentMatches =
        equipmentValue === "all" || drill.equipment.includes(equipmentValue);

      return (
        ageMatches &&
        categoryMatches &&
        intensityMatches &&
        durationMatches &&
        playerMatches &&
        courtMatches &&
        equipmentMatches
      );
    });
  }, [ageGroupId, category, courtMode, drills, duration, equipmentValue, intensity, players]);

  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
          <label className="space-y-2 text-sm font-semibold text-zinc-200">
            Age group
            <select
              value={ageGroupId}
              onChange={(event) => handleAgeGroup(event.currentTarget.value)}
              onInput={(event) => handleAgeGroup(event.currentTarget.value)}
              className="w-full rounded-md border border-white/10 bg-ink px-3 py-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              <option value="all">All ages</option>
              {ageGroups.map((ageGroup) => (
                <option key={ageGroup.id} value={ageGroup.id}>
                  {ageGroup.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm font-semibold text-zinc-200">
            Skill category
            <select
              value={category}
              onChange={(event) => handleCategory(event.currentTarget.value)}
              onInput={(event) => handleCategory(event.currentTarget.value)}
              className="w-full rounded-md border border-white/10 bg-ink px-3 py-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              <option value="all">All categories</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm font-semibold text-zinc-200">
            Intensity
            <select
              value={intensity}
              onChange={(event) => handleIntensity(event.currentTarget.value)}
              onInput={(event) => handleIntensity(event.currentTarget.value)}
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
              onChange={(event) => handleDuration(event.currentTarget.value)}
              onInput={(event) => handleDuration(event.currentTarget.value)}
              className="w-full rounded-md border border-white/10 bg-ink px-3 py-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              <option value="all">Any duration</option>
              <option value="short">10 min or less</option>
              <option value="standard">11-14 min</option>
              <option value="extended">15+ min</option>
            </select>
          </label>

          <label className="space-y-2 text-sm font-semibold text-zinc-200">
            Players needed
            <select
              value={players}
              onChange={(event) => handlePlayers(event.currentTarget.value)}
              onInput={(event) => handlePlayers(event.currentTarget.value)}
              className="w-full rounded-md border border-white/10 bg-ink px-3 py-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              <option value="all">Any group</option>
              <option value="small">1-4 players</option>
              <option value="medium">5-8 players</option>
              <option value="large">9+ players</option>
            </select>
          </label>

          <label className="space-y-2 text-sm font-semibold text-zinc-200">
            Court
            <select
              value={courtMode}
              onChange={(event) => handleCourtMode(event.currentTarget.value)}
              onInput={(event) => handleCourtMode(event.currentTarget.value)}
              className="w-full rounded-md border border-white/10 bg-ink px-3 py-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              {courtOptions.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? "Half or full" : `${item} court`}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm font-semibold text-zinc-200">
            Equipment
            <select
              value={equipmentValue}
              onChange={(event) => handleEquipment(event.currentTarget.value)}
              onInput={(event) => handleEquipment(event.currentTarget.value)}
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
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-zinc-300" aria-live="polite">
            Showing <span className="font-bold text-white">{filteredDrills.length}</span> of{" "}
            {drills.length} drills
          </p>
          <button
            type="button"
            onClick={() => {
              setAgeGroupId("all");
              setCategory("all");
              setIntensity("all");
              setDuration("all");
              setPlayers("all");
              setCourtMode("all");
              setEquipmentValue("all");
            }}
            className="rounded-md border border-white/10 px-3 py-2 text-sm font-semibold text-zinc-100 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
          >
            Reset filters
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Quick age filters">
          <button
            type="button"
            aria-pressed={ageGroupId === "all"}
            onClick={() => setAgeGroupId("all")}
            className={`rounded-md border px-3 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 ${
              ageGroupId === "all"
                ? "border-orange-300 bg-orange-400/20 text-orange-50"
                : "border-white/10 text-zinc-200 hover:bg-white/10"
            }`}
          >
            All ages
          </button>
          {ageGroups.map((ageGroup) => (
            <button
              key={ageGroup.id}
              type="button"
              aria-label={`Filter ${ageGroup.label}`}
              aria-pressed={ageGroupId === ageGroup.id}
              onClick={() => setAgeGroupId(ageGroup.id)}
              className={`rounded-md border px-3 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 ${
                ageGroupId === ageGroup.id
                  ? "border-orange-300 bg-orange-400/20 text-orange-50"
                  : "border-white/10 text-zinc-200 hover:bg-white/10"
              }`}
            >
              {ageGroup.label}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredDrills.map((drill) => (
          <DrillCard key={drill.id} drill={drill} />
        ))}
      </section>
    </div>
  );
}
