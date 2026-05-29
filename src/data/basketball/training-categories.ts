import type { PracticePlacement, TrainingCategoryId, TrainingDomain } from "./types";

export type TrainingCategory = {
  id: TrainingCategoryId;
  label: string;
  description: string;
  recommendedPlacement: PracticePlacement[];
  domain: TrainingDomain;
};

export const trainingCategories: TrainingCategory[] = [
  {
    id: "ball_handling",
    label: "Ball Handling",
    description: "Control, change of pace, weak-hand confidence, and pressure handling.",
    recommendedPlacement: ["skill_block", "decision_block"],
    domain: "basketball",
  },
  {
    id: "passing",
    label: "Passing",
    description: "Passing windows, timing, spacing connections, and receiver readiness.",
    recommendedPlacement: ["skill_block", "team_block"],
    domain: "basketball",
  },
  {
    id: "shooting",
    label: "Shooting",
    description: "Form, footwork, movement catches, relocation, and volume standards.",
    recommendedPlacement: ["shooting_block", "skill_block"],
    domain: "basketball",
  },
  {
    id: "finishing",
    label: "Finishing",
    description: "Footwork, body control, weak-hand finishes, contact, and rim reads.",
    recommendedPlacement: ["finishing_block", "decision_block"],
    domain: "basketball",
  },
  {
    id: "defense",
    label: "Defense",
    description: "Stance, closeouts, contain angles, rotations, rebounding contact, and conversion.",
    recommendedPlacement: ["skill_block", "team_block"],
    domain: "basketball",
  },
  {
    id: "rebounding",
    label: "Rebounding",
    description: "Hit-find-get habits, pursuit angles, and defensive possession finishes.",
    recommendedPlacement: ["skill_block", "team_block"],
    domain: "basketball",
  },
  {
    id: "decision_making",
    label: "Decision Making",
    description: "Advantage reads, constraints, closeout choices, late-clock reads, and transfer games.",
    recommendedPlacement: ["decision_block", "skill_block"],
    domain: "basketball",
  },
  {
    id: "team_concepts",
    label: "Team Concepts",
    description: "Spacing, shell habits, transition lanes, actions, rotations, and coverage language.",
    recommendedPlacement: ["team_block"],
    domain: "basketball",
  },
  {
    id: "small_sided_games",
    label: "Small-Sided Games",
    description: "1v1 to 4v4 games that force decisions while keeping reps realistic.",
    recommendedPlacement: ["decision_block", "team_block"],
    domain: "hybrid",
  },
  {
    id: "movement_prep",
    label: "Movement Preparation",
    description: "Warm-up movement, coordination, mobility, stops, starts, and landing readiness.",
    recommendedPlacement: ["movement_prep"],
    domain: "strength_conditioning",
  },
  {
    id: "strength_conditioning",
    label: "Strength & Conditioning",
    description: "Age-appropriate strength, trunk control, body control, and force production.",
    recommendedPlacement: ["speed_agility_block", "conditioning_finisher"],
    domain: "strength_conditioning",
  },
  {
    id: "multiplanar_speed",
    label: "Multiplanar Speed",
    description: "Basketball speed across sprint, shuffle, backpedal, hip-turn, closeout, and recovery patterns.",
    recommendedPlacement: ["movement_prep", "speed_agility_block"],
    domain: "strength_conditioning",
  },
  {
    id: "conditioning",
    label: "Conditioning",
    description: "Basketball-specific repeat-effort work with enough rest to protect skill quality.",
    recommendedPlacement: ["conditioning_finisher"],
    domain: "strength_conditioning",
  },
  {
    id: "recovery",
    label: "Recovery",
    description: "Cooldown, breathing, mobility resets, and low-intensity review work.",
    recommendedPlacement: ["cooldown"],
    domain: "strength_conditioning",
  },
];

export const trainingCategoryById = Object.fromEntries(
  trainingCategories.map((category) => [category.id, category]),
) as Record<TrainingCategoryId, TrainingCategory>;

export const categoryBreakdownOrder = trainingCategories.map((category) => category.id);
