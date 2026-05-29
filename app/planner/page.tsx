import { PracticePlanner } from "@/components/PracticePlanner";

export default function PlannerPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 max-w-3xl">
        <p className="text-sm font-bold uppercase text-orange-200">Practice builder</p>
        <h1 className="mt-3 text-3xl font-black text-white sm:text-5xl">
          Generate an exact-duration practice plan.
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-300">
          Select age, duration, focus, and intensity. Younger 120-minute plans are treated as
          intensive camp formats with rest, games, and teaching built in.
        </p>
      </header>
      <PracticePlanner />
    </main>
  );
}
