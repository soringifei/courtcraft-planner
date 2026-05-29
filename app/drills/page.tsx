import { DrillFilters } from "@/components/DrillFilters";
import { ageGroups } from "@/src/data/basketball/age-groups";
import { drillCategories, drillEquipment, drills } from "@/src/data/basketball/drills";

export default function DrillsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 max-w-3xl">
        <p className="text-sm font-bold uppercase text-orange-200">Drill library</p>
        <h1 className="mt-3 text-3xl font-black text-white sm:text-5xl">
          Browse age-specific basketball drills.
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-300">
          Filter by age group, skill, intensity, duration, player count, court format, and equipment.
          Each drill includes a court diagram and trainer-standard coaching details.
        </p>
      </header>

      <DrillFilters
        drills={drills}
        ageGroups={ageGroups}
        equipment={drillEquipment}
        categories={drillCategories}
      />
    </main>
  );
}
