import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ageGroupTrainingProfiles } from "@/src/data/basketball/age-group-training";
import { drills } from "@/src/data/basketball/drills";
import { trainingCategories } from "@/src/data/basketball/training-categories";
import type { AgeGroupId, TrainingCategoryId } from "@/src/data/basketball/types";

type CategoriesPageProps = {
  searchParams: Promise<{ ageGroupId?: string; category?: string }>;
};

export const metadata = {
  title: "Categories | CourtCraft Planner",
};

export default async function CategoriesPage({ searchParams }: CategoriesPageProps) {
  const params = await searchParams;
  const ageGroupId = params.ageGroupId as AgeGroupId | undefined;
  const selectedCategory = params.category as TrainingCategoryId | undefined;
  const ageProfile = ageGroupTrainingProfiles.find((profile) => profile.ageGroupId === ageGroupId);
  const categoryList = selectedCategory
    ? trainingCategories.filter((category) => category.id === selectedCategory)
    : trainingCategories;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 max-w-3xl">
        <p className="text-sm font-bold uppercase text-orange-200">Training categories</p>
        <h1 className="mt-3 text-3xl font-black text-white sm:text-5xl">
          Category library by age group.
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-300">
          Browse how skill, team, S&amp;C, speed, conditioning, and recovery categories fit into
          complete practice structure.
        </p>
      </header>

      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/categories"
          className="rounded-md border border-white/10 px-3 py-2 text-sm font-semibold text-zinc-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
        >
          All age groups
        </Link>
        {ageGroupTrainingProfiles.map((profile) => (
          <Link
            key={profile.ageGroupId}
            href={`/categories?ageGroupId=${profile.ageGroupId}`}
            className={`rounded-md border px-3 py-2 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 ${
              ageProfile?.ageGroupId === profile.ageGroupId
                ? "border-orange-300 bg-orange-400/20 text-orange-50"
                : "border-white/10 text-zinc-200 hover:bg-white/10"
            }`}
          >
            {profile.title}
          </Link>
        ))}
      </div>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {categoryList.map((category) => {
          const categoryDrills = drills.filter((drill) => {
            const ageMatches = !ageProfile || drill.ageGroups.includes(ageProfile.ageGroupId);
            return ageMatches && drill.categoryTags?.includes(category.id);
          });

          return (
            <article key={category.id} className="rounded-lg border border-white/10 bg-panel p-5 shadow-trainer">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase text-zinc-400">
                    {category.domain.replaceAll("_", " ")}
                  </p>
                  <h2 className="mt-2 text-xl font-black text-white">{category.label}</h2>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-bold text-zinc-200">
                  {categoryDrills.length}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-300">{category.description}</p>
              <p className="mt-4 text-xs font-bold uppercase text-zinc-400">Practice placement</p>
              <p className="mt-1 text-sm leading-6 text-zinc-300">
                {category.recommendedPlacement.map((item) => item.replaceAll("_", " ")).join(", ")}
              </p>
              <div className="mt-4 space-y-2">
                {categoryDrills.slice(0, 4).map((drill) => (
                  <Link
                    key={drill.id}
                    href={`/drills/${drill.id}`}
                    className="block rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-zinc-100 hover:border-orange-300/50 hover:text-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
                  >
                    {drill.title}
                  </Link>
                ))}
              </div>
              {ageProfile ? (
                <Link
                  href={`/age-groups/${ageProfile.ageGroupId}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-orange-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
                >
                  Back to {ageProfile.title} plan
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ) : null}
            </article>
          );
        })}
      </section>
    </main>
  );
}
