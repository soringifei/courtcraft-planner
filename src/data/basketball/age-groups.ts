import type { AgeGroup } from "./types";

export const ageGroups: AgeGroup[] = [
  {
    id: "u8",
    label: "U8",
    ages: "Ages 7-8",
    focus: [
      "fun",
      "coordination",
      "basic movement",
      "basic ball control",
      "layup foundations",
    ],
    recommendedDuration: "30-60 min",
    recommendedMin: 30,
    recommendedMax: 60,
    defaultDurationMin: 45,
    intensiveNote:
      "120 minutes is a camp format only. Use breaks, games, coordination blocks, and low-pressure teaching.",
  },
  {
    id: "u11",
    label: "U11",
    ages: "Ages 9-11",
    focus: [
      "ball control",
      "footwork",
      "passing",
      "finishing",
      "form shooting",
      "basic 1v1",
    ],
    recommendedDuration: "45-75 min",
    recommendedMin: 45,
    recommendedMax: 75,
    defaultDurationMin: 60,
    intensiveNote:
      "120 minutes should be treated as camp/intensive work with healthy rest and game-based learning.",
  },
  {
    id: "u14",
    label: "U14",
    ages: "Ages 12-14",
    focus: [
      "decision-making",
      "finishing through constraints",
      "shooting off movement",
      "team spacing",
      "defensive habits",
    ],
    recommendedDuration: "60-90 min",
    recommendedMin: 60,
    recommendedMax: 90,
    defaultDurationMin: 75,
    intensiveNote:
      "120 minutes is allowed only with planned breaks, teaching segments, and controlled high-intensity volume.",
  },
  {
    id: "u16",
    label: "U16",
    ages: "Ages 15-16",
    focus: [
      "advanced footwork",
      "advantage reads",
      "shooting off movement",
      "finishing through pressure",
      "defensive rotations",
      "transition habits",
    ],
    recommendedDuration: "75-105 min",
    recommendedMin: 75,
    recommendedMax: 105,
    defaultDurationMin: 90,
    intensiveNote:
      "120 minutes is an intensive format for U16 unless the group is already conditioned for elite workload.",
  },
  {
    id: "hs_elite",
    label: "High School / Elite",
    ages: "Grades 9-12 / ages 15-18",
    focus: [
      "advanced reads",
      "pressure decisions",
      "shooting volume",
      "advantage creation",
      "defensive rotations",
      "conditioning",
    ],
    recommendedDuration: "90-120 min",
    recommendedMin: 90,
    recommendedMax: 120,
    defaultDurationMin: 105,
  },
];

export const ageGroupById = Object.fromEntries(
  ageGroups.map((ageGroup) => [ageGroup.id, ageGroup]),
) as Record<AgeGroup["id"], AgeGroup>;
