"use client";

import { useMemo, useState } from "react";
import { ageGroups } from "@/src/data/basketball/age-groups";
import { generatePracticePlan } from "@/src/data/basketball/practice-plans";
import type {
  AgeGroupId,
  PracticeFocus,
  PracticeIntensity,
} from "@/src/data/basketball/types";
import { PracticeTimeline } from "./PracticeTimeline";
import { SafetyNotice } from "./SafetyNotice";

const durationOptions = ["recommended", "60", "75", "90", "120"] as const;

const focusOptions: Array<{ value: PracticeFocus; label: string }> = [
  { value: "ball_handling", label: "Ball-handling" },
  { value: "finishing", label: "Finishing" },
  { value: "shooting", label: "Shooting" },
  { value: "defense", label: "Defense" },
  { value: "team_concepts", label: "Team concepts" },
  { value: "all_around", label: "All-around" },
];

const intensityOptions: Array<{ value: PracticeIntensity; label: string }> = [
  { value: "light", label: "Light" },
  { value: "standard", label: "Standard" },
  { value: "high", label: "High" },
];

export function PracticePlanner() {
  const [ageGroupId, setAgeGroupId] = useState<AgeGroupId>("u14");
  const [durationChoice, setDurationChoice] = useState<(typeof durationOptions)[number]>("recommended");
  const [focus, setFocus] = useState<PracticeFocus>("all_around");
  const [intensity, setIntensity] = useState<PracticeIntensity>("standard");
  const handleAgeGroup = (value: string) => setAgeGroupId(value as AgeGroupId);
  const handleDuration = (value: string) =>
    setDurationChoice(value as (typeof durationOptions)[number]);
  const handleFocus = (value: string) => setFocus(value as PracticeFocus);
  const handleIntensity = (value: string) => setIntensity(value as PracticeIntensity);

  const selectedAgeGroup = ageGroups.find((ageGroup) => ageGroup.id === ageGroupId) ?? ageGroups[0];
  const durationMin =
    durationChoice === "recommended" ? selectedAgeGroup.defaultDurationMin : Number(durationChoice);

  const plan = useMemo(
    () => generatePracticePlan({ ageGroupId, durationMin, focus, intensity }),
    [ageGroupId, durationMin, focus, intensity],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
      <section className="h-fit rounded-lg border border-white/10 bg-panel p-5 shadow-trainer">
        <h2 className="text-xl font-black text-white">Practice inputs</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-300">
          Choose the group, session length, training focus, and load target. The timeline will total
          exactly the selected duration.
        </p>

        <div className="mt-6 space-y-5">
          <label className="block space-y-2 text-sm font-semibold text-zinc-200">
            Age group
            <select
              value={ageGroupId}
              onChange={(event) => handleAgeGroup(event.currentTarget.value)}
              onInput={(event) => handleAgeGroup(event.currentTarget.value)}
              className="w-full rounded-md border border-white/10 bg-ink px-3 py-3 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              {ageGroups.map((ageGroup) => (
                <option key={ageGroup.id} value={ageGroup.id}>
                  {ageGroup.label}
                </option>
              ))}
            </select>
          </label>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-zinc-200">Age shortcut</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Planner age shortcuts">
              {ageGroups.map((ageGroup) => (
                <button
                  key={ageGroup.id}
                  type="button"
                  aria-label={`Use ${ageGroup.label}`}
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
          </div>

          <label className="block space-y-2 text-sm font-semibold text-zinc-200">
            Duration
            <select
              value={durationChoice}
              onChange={(event) => handleDuration(event.currentTarget.value)}
              onInput={(event) => handleDuration(event.currentTarget.value)}
              className="w-full rounded-md border border-white/10 bg-ink px-3 py-3 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              {durationOptions.map((option) => (
                <option key={option} value={option}>
                  {option === "recommended"
                    ? `Recommended (${selectedAgeGroup.defaultDurationMin} min)`
                    : `${option} minutes`}
                </option>
              ))}
            </select>
          </label>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-zinc-200">Duration shortcut</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Planner duration shortcuts">
              {durationOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-label={
                    option === "recommended" ? "Use recommended duration" : `Use ${option} minutes`
                  }
                  aria-pressed={durationChoice === option}
                  onClick={() => setDurationChoice(option)}
                  className={`rounded-md border px-3 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 ${
                    durationChoice === option
                      ? "border-orange-300 bg-orange-400/20 text-orange-50"
                      : "border-white/10 text-zinc-200 hover:bg-white/10"
                  }`}
                >
                  {option === "recommended" ? "Recommended" : `${option}m`}
                </button>
              ))}
            </div>
          </div>

          <label className="block space-y-2 text-sm font-semibold text-zinc-200">
            Focus
            <select
              value={focus}
              onChange={(event) => handleFocus(event.currentTarget.value)}
              onInput={(event) => handleFocus(event.currentTarget.value)}
              className="w-full rounded-md border border-white/10 bg-ink px-3 py-3 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              {focusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-2 text-sm font-semibold text-zinc-200">
            Intensity
            <select
              value={intensity}
              onChange={(event) => handleIntensity(event.currentTarget.value)}
              onInput={(event) => handleIntensity(event.currentTarget.value)}
              className="w-full rounded-md border border-white/10 bg-ink px-3 py-3 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              {intensityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs font-bold uppercase text-zinc-400">Recommended range</p>
          <p className="mt-1 text-lg font-black text-white">{selectedAgeGroup.recommendedDuration}</p>
          <p className="mt-2 text-sm leading-6 text-zinc-300">{selectedAgeGroup.focus.join(", ")}</p>
        </div>
      </section>

      <section className="space-y-5">
        {plan.planWarning ? <SafetyNotice>{plan.planWarning}</SafetyNotice> : null}
        <PracticeTimeline segments={plan.segments} />
      </section>
    </div>
  );
}
