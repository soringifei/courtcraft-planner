import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";
import { AgeGroupDrillLibrary } from "@/components/AgeGroupDrillLibrary";
import { AgeGroupPracticeTimeline } from "@/components/AgeGroupPracticeTimeline";
import { BasketballCourtSvg } from "@/components/court/BasketballCourtSvg";
import { IntensityBadge } from "@/components/IntensityBadge";
import { SafetyNotice } from "@/components/SafetyNotice";
import {
  ageGroupTrainingProfileById,
  coreAgeGroupIds,
} from "@/src/data/basketball/age-group-training";
import { drillById, drillEquipment, drills } from "@/src/data/basketball/drills";
import { presetPracticePlanById } from "@/src/data/basketball/practice-plans";
import {
  categoryBreakdownOrder,
  trainingCategories,
  trainingCategoryById,
} from "@/src/data/basketball/training-categories";
import type { AgeGroupId, Drill, TrainingCategoryId } from "@/src/data/basketball/types";

type AgeGroupPageProps = {
  params: Promise<{ ageGroupId: string }>;
};

const strengthSections: Array<{
  title: string;
  description: string;
  categoryId?: TrainingCategoryId;
  match: (drill: Drill) => boolean;
}> = [
  {
    title: "Movement preparation drills",
    description: "Warm-up activities that prepare posture, balance, coordination, and stopping quality.",
    categoryId: "movement_prep",
    match: (drill) => drill.categoryTags?.includes("movement_prep") ?? false,
  },
  {
    title: "Strength drills",
    description: "Age-appropriate body control, single-leg work, trunk stiffness, and strength games.",
    categoryId: "strength_conditioning",
    match: (drill) => drill.categoryTags?.includes("strength_conditioning") ?? false,
  },
  {
    title: "Speed / agility drills",
    description: "Acceleration, deceleration, lateral movement, closeout mechanics, and reactions.",
    match: (drill) =>
      drill.physicalQualities?.some((quality) =>
        ["acceleration", "deceleration", "lateral_speed", "reactive_agility"].includes(quality),
      ) ?? false,
  },
  {
    title: "Multiplanar speed drills",
    description: "Sprint, shuffle, backpedal, hip-turn, closeout, contain, and recover patterns.",
    categoryId: "multiplanar_speed",
    match: (drill) => drill.categoryTags?.includes("multiplanar_speed") ?? false,
  },
  {
    title: "Conditioning drills",
    description: "Basketball-specific repeat-effort blocks with enough rest to protect skill quality.",
    categoryId: "conditioning",
    match: (drill) => drill.categoryTags?.includes("conditioning") ?? false,
  },
  {
    title: "Recovery / cooldown drills",
    description: "Low-intensity review, breathing, balance, trunk control, and movement quality resets.",
    categoryId: "recovery",
    match: (drill) => drill.categoryTags?.includes("recovery") ?? false,
  },
];

const ageSpecificStrengthRules: Record<Exclude<AgeGroupId, "u16">, string[]> = {
  u8: [
    "Coordination games, balance, skipping, crawling, low-level landing mechanics, and reaction games.",
    "No intense conditioning, heavy strength, or advanced plyometrics.",
  ],
  u11: [
    "Coordination, basic acceleration, deceleration, lateral movement, bodyweight strength games, and low-volume reactions.",
    "No heavy strength and no excessive conditioning.",
  ],
  u14: [
    "Structured warm-up, acceleration/deceleration, lateral speed, landing mechanics, single-leg strength, core stiffness, and low-volume plyometrics.",
    "Use small-sided conditioning only when movement quality is stable.",
  ],
  hs_elite: [
    "Acceleration, deceleration, lateral speed, crossover run, hip turns, closeout mechanics, reactive agility, single-leg strength, and core stiffness.",
    "Use conditioning finishers that preserve basketball skill quality.",
  ],
};

export function generateStaticParams() {
  return coreAgeGroupIds.map((ageGroupId) => ({ ageGroupId }));
}

export async function generateMetadata({ params }: AgeGroupPageProps) {
  const { ageGroupId } = await params;
  const profile = ageGroupTrainingProfileById[ageGroupId as AgeGroupId];

  return {
    title: profile ? `${profile.title} Training Plan | CourtCraft Planner` : "Age Group | CourtCraft Planner",
  };
}

function sectionHeader(label: string, title: string, description?: string) {
  return (
    <header className="max-w-3xl">
      <p className="text-sm font-bold uppercase text-orange-200">{label}</p>
      <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-base leading-7 text-zinc-300">{description}</p> : null}
    </header>
  );
}

function drillLink(drill: Drill) {
  return (
    <Link
      key={drill.id}
      href={`/drills/${drill.id}`}
      className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-zinc-100 transition hover:border-orange-300/50 hover:text-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
    >
      {drill.title}
    </Link>
  );
}

export default async function AgeGroupTrainingPage({ params }: AgeGroupPageProps) {
  const { ageGroupId } = await params;
  const profile = ageGroupTrainingProfileById[ageGroupId as AgeGroupId];

  if (!profile) {
    notFound();
  }

  const groupDrills = drills.filter((drill) => drill.ageGroups.includes(profile.ageGroupId));
  const strengthDrills = groupDrills.filter((drill) => drill.trainingDomain === "strength_conditioning");
  const recommendedPlan = presetPracticePlanById[profile.recommendedPlanId];
  const intensivePlan = presetPracticePlanById[profile.intensivePlanId];
  const isElite = profile.ageGroupId === "hs_elite";

  if (!recommendedPlan || !intensivePlan) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-lg border border-white/10 bg-panel p-5 shadow-trainer lg:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <Link href="/age-groups" className="text-sm font-semibold text-orange-200 hover:text-white">
              Back to age groups
            </Link>
            <p className="mt-6 text-sm font-bold uppercase text-zinc-400">{profile.ageRange}</p>
            <h1 className="mt-2 text-4xl font-black text-white sm:text-6xl">{profile.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">{profile.mainGoal}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-md bg-white/[0.04] p-4">
                <p className="text-xs uppercase text-zinc-400">Recommended duration</p>
                <p className="mt-1 text-xl font-black text-white">
                  {profile.recommendedDurationMin}-{profile.recommendedDurationMax}m
                </p>
              </div>
              <div className="rounded-md bg-white/[0.04] p-4">
                <p className="text-xs uppercase text-zinc-400">Intensity guidance</p>
                <p className="mt-1 text-sm font-semibold leading-6 text-white">
                  {isElite ? "High allowed with managed rest" : "Low to medium before high load"}
                </p>
              </div>
              <div className="rounded-md bg-white/[0.04] p-4">
                <p className="text-xs uppercase text-zinc-400">Available drills</p>
                <p className="mt-1 text-xl font-black text-white">{groupDrills.length}</p>
              </div>
            </div>
          </div>

          <aside className="rounded-lg border border-orange-300/20 bg-orange-400/10 p-5">
            <div className="flex items-center gap-2 text-orange-100">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              <p className="text-sm font-black uppercase">Safety / load note</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-orange-50">{profile.loadGuidance}</p>
            {!isElite ? (
              <p className="mt-4 rounded-md border border-amber-300/30 bg-amber-400/10 p-3 text-sm font-semibold leading-6 text-amber-50">
                120-minute work is a camp/intensive format, not the default weekly practice structure.
              </p>
            ) : null}
          </aside>
        </div>
      </section>

      <section className="space-y-5">
        {sectionHeader("Development priorities", "What this age group should train first")}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {profile.developmentPriorities.map((priority) => (
            <article key={priority.title} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <h3 className="text-base font-black text-white">{priority.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-300">{priority.description}</p>
            </article>
          ))}
          <article className="rounded-lg border border-amber-300/20 bg-amber-400/10 p-5">
            <h3 className="flex items-center gap-2 text-base font-black text-amber-50">
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
              What to avoid
            </h3>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-amber-50">
              {profile.avoid.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-200" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <p className="text-xs font-bold uppercase text-zinc-400">Recommended plan</p>
          <p className="mt-2 text-2xl font-black text-white">{recommendedPlan.durationMin} minutes</p>
          <p className="mt-2 text-sm leading-6 text-zinc-300">{recommendedPlan.goal}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <p className="text-xs font-bold uppercase text-zinc-400">120-minute option</p>
          <p className="mt-2 text-2xl font-black text-white">{intensivePlan.durationMin} minutes</p>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            {isElite
              ? "Advanced 120-minute training session."
              : "Camp / intensive format - not the default weekly practice structure."}
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <p className="text-xs font-bold uppercase text-zinc-400">S&amp;C integration</p>
          <p className="mt-2 text-2xl font-black text-white">{strengthDrills.length} drills</p>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            Movement prep, speed, strength, conditioning, recovery, and basketball transfer are shown on this page.
          </p>
        </div>
      </section>

      <section className="space-y-5">
        {sectionHeader("Recommended practice plan", `${profile.title} session structure`)}
        <AgeGroupPracticeTimeline plan={recommendedPlan} />
      </section>

      <section className="space-y-5">
        {sectionHeader(
          "2-hour practice / camp format",
          isElite
            ? "Advanced 120-minute training session."
            : "Camp / intensive format - not the default weekly practice structure.",
          isElite
            ? "High school and elite groups can normally handle 120 minutes when work-rest quality is managed."
            : "For this age, 120 minutes should use games, breaks, teaching pauses, and age-appropriate movement work rather than nonstop hard drill volume.",
        )}
        {intensivePlan.warning ? <SafetyNotice>{intensivePlan.warning}</SafetyNotice> : null}
        <AgeGroupPracticeTimeline plan={intensivePlan} />
      </section>

      <section className="space-y-5">
        {sectionHeader(
          "Category breakdown",
          "Where each training category fits for this age group",
          "Counts and examples are filtered to this age group so a coach can see the full training menu without browsing the whole app.",
        )}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categoryBreakdownOrder.map((categoryId) => {
            const category = trainingCategoryById[categoryId];
            const matchingDrills = groupDrills.filter((drill) => drill.categoryTags?.includes(categoryId));

            return (
              <article key={categoryId} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-black text-white">{category.label}</h3>
                  <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs font-bold text-zinc-200">
                    {matchingDrills.length}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-300">{category.description}</p>
                <p className="mt-3 text-xs font-bold uppercase text-zinc-400">Placement</p>
                <p className="mt-1 text-sm leading-6 text-zinc-300">
                  {category.recommendedPlacement.map((item) => item.replaceAll("_", " ")).join(", ")}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {matchingDrills.slice(0, 3).map(drillLink)}
                  {matchingDrills.length === 0 ? (
                    <span className="text-sm text-zinc-500">No age-specific drills yet.</span>
                  ) : null}
                </div>
                <Link
                  href={`/categories?ageGroupId=${profile.ageGroupId}&category=${categoryId}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
                >
                  View filtered category
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="space-y-5">
        {sectionHeader(
          "Strength & Conditioning",
          "Integrated physical development for this age group",
          ageSpecificStrengthRules[profile.ageGroupId as Exclude<AgeGroupId, "u16">].join(" "),
        )}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {strengthSections.map((section) => {
            const sectionDrills = strengthDrills.filter(section.match);

            return (
              <article key={section.title} className="rounded-lg border border-orange-300/20 bg-orange-400/10 p-5">
                <h3 className="text-lg font-black text-orange-50">{section.title}</h3>
                <p className="mt-3 text-sm leading-6 text-orange-50/90">{section.description}</p>
                <div className="mt-4 space-y-3">
                  {sectionDrills.slice(0, 4).map((drill) => (
                    <div key={drill.id} className="rounded-md border border-orange-300/20 bg-black/20 p-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/drills/${drill.id}`}
                          className="font-bold text-white hover:text-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
                        >
                          {drill.title}
                        </Link>
                        <IntensityBadge intensity={drill.intensity} />
                      </div>
                      <p className="mt-2 text-xs leading-5 text-orange-50/90">{drill.basketballTransfer}</p>
                    </div>
                  ))}
                  {sectionDrills.length === 0 ? (
                    <p className="text-sm text-orange-50/70">Use basketball skill blocks instead; no dedicated drill is seeded for this bucket.</p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="space-y-5">
        {sectionHeader(
          "Multiplanar Speed",
          "Basketball speed is more than sprinting straight",
          profile.multiplanarSpeedFocus.explanation,
        )}
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <h3 className="text-lg font-black text-white">Movement patterns trained</h3>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {profile.multiplanarSpeedFocus.movementPatterns.map((pattern) => (
                <span
                  key={pattern}
                  className="rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm font-semibold text-zinc-200"
                >
                  {pattern}
                </span>
              ))}
            </div>
            <h3 className="mt-6 text-lg font-black text-white">Basketball transfer</h3>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-300">
              {profile.multiplanarSpeedFocus.basketballTransfer.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {profile.multiplanarSpeedFocus.recommendedDrillIds.map((drillId) => {
              const drill = drillById[drillId];
              if (!drill) return null;

              return (
                <article key={drill.id} className="overflow-hidden rounded-lg border border-white/10 bg-panel">
                  <div className="p-3">
                    <BasketballCourtSvg diagram={drill.diagram} label={`${drill.title} preview`} compact />
                  </div>
                  <div className="p-4 pt-1">
                    <h3 className="text-base font-black text-white">{drill.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">{drill.objective}</p>
                    <Link
                      href={`/drills/${drill.id}`}
                      className="mt-3 inline-flex text-sm font-bold text-orange-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
                    >
                      View drill
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="space-y-5">
        {sectionHeader(
          "Drill library",
          `${profile.title} basketball + S&C drills`,
          "Use card view on the court or table view when planning the session order.",
        )}
        <AgeGroupDrillLibrary drills={groupDrills} categories={trainingCategories} equipment={drillEquipment} />
      </section>

      <section>
        <SafetyNotice>{profile.loadGuidance}</SafetyNotice>
      </section>
    </main>
  );
}
