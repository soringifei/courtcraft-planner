import { notFound } from "next/navigation";
import { DrillDetail } from "@/components/DrillDetail";
import { drillById, drills } from "@/src/data/basketball/drills";

type DrillPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return drills.map((drill) => ({ id: drill.id }));
}

export async function generateMetadata({ params }: DrillPageProps) {
  const { id } = await params;
  const drill = drillById[id];

  return {
    title: drill ? `${drill.title} | CourtCraft Planner` : "Drill | CourtCraft Planner",
  };
}

export default async function DrillPage({ params }: DrillPageProps) {
  const { id } = await params;
  const drill = drillById[id];

  if (!drill) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <DrillDetail drill={drill} />
    </main>
  );
}
