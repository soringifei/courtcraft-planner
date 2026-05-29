import { ageGroupById } from "@/src/data/basketball/age-groups";
import type { AgeGroupId } from "@/src/data/basketball/types";

type AgeGroupBadgeProps = {
  ageGroupId: AgeGroupId;
};

export function AgeGroupBadge({ ageGroupId }: AgeGroupBadgeProps) {
  const ageGroup = ageGroupById[ageGroupId];

  return (
    <span className="inline-flex items-center rounded-full border border-limecourt/30 bg-limecourt/10 px-2.5 py-1 text-xs font-semibold text-lime-100">
      {ageGroup.label}
    </span>
  );
}
