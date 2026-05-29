export type AgeGroupId = "u8" | "u11" | "u14" | "u16" | "hs_elite";

export type DrillCategory =
  | "movement"
  | "ball_handling"
  | "passing"
  | "shooting"
  | "finishing"
  | "defense"
  | "rebounding"
  | "decision_making"
  | "team_concepts"
  | "conditioning";

export type TrainingCategoryId =
  | "ball_handling"
  | "passing"
  | "shooting"
  | "finishing"
  | "defense"
  | "rebounding"
  | "decision_making"
  | "team_concepts"
  | "small_sided_games"
  | "movement_prep"
  | "strength_conditioning"
  | "multiplanar_speed"
  | "conditioning"
  | "recovery";

export type TrainingDomain = "basketball" | "strength_conditioning" | "hybrid";

export type PhysicalQuality =
  | "coordination"
  | "balance"
  | "acceleration"
  | "deceleration"
  | "lateral_speed"
  | "multiplanar_speed"
  | "landing_mechanics"
  | "single_leg_strength"
  | "core_stiffness"
  | "reactive_agility"
  | "conditioning"
  | "recovery";

export type PracticePlacement =
  | "movement_prep"
  | "skill_block"
  | "shooting_block"
  | "finishing_block"
  | "decision_block"
  | "team_block"
  | "speed_agility_block"
  | "conditioning_finisher"
  | "cooldown";

export type Intensity = "low" | "medium" | "high";

export type CourtMode = "half" | "full";

export type DiagramLineType =
  | "dribble"
  | "pass"
  | "cut"
  | "defensive_slide"
  | "screen"
  | "rotation"
  | "shot"
  | "rebound";

export type CourtDiagram = {
  mode: CourtMode;
  players: Array<{
    id: string;
    label: string;
    role: "offense" | "defense" | "coach" | "neutral";
    x: number;
    y: number;
  }>;
  cones?: Array<{ id: string; x: number; y: number; label?: string }>;
  spots?: Array<{ id: string; x: number; y: number; label?: string }>;
  lines: Array<{
    id: string;
    type: DiagramLineType;
    from: { x: number; y: number };
    to: { x: number; y: number };
    label?: string;
  }>;
  zones?: Array<{
    id: string;
    label: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
};

export type Drill = {
  id: string;
  title: string;
  category: DrillCategory;
  ageGroups: AgeGroupId[];
  durationMin: number;
  intensity: Intensity;
  playersMin: number;
  playersMax?: number;
  equipment: string[];
  courtMode: CourtMode;
  objective: string;
  setup: string[];
  execution: string[];
  coachingCues: string[];
  commonMistakes: string[];
  regression: string;
  progression: string;
  scoring: string;
  safetyNote: string;
  diagram: CourtDiagram;
  categoryTags?: TrainingCategoryId[];
  trainingDomain?: TrainingDomain;
  physicalQualities?: PhysicalQuality[];
  practicePlacement?: PracticePlacement[];
  basketballTransfer?: string;
};

export type AgeGroup = {
  id: AgeGroupId;
  label: string;
  ages: string;
  focus: string[];
  recommendedDuration: string;
  recommendedMin: number;
  recommendedMax: number;
  defaultDurationMin: number;
  intensiveNote?: string;
};

export type PracticeFocus =
  | "ball_handling"
  | "finishing"
  | "shooting"
  | "defense"
  | "team_concepts"
  | "all_around";

export type PracticeIntensity = "light" | "standard" | "high";

export type PracticeSegmentType =
  | "movement_prep"
  | "speed_agility"
  | "skill_development"
  | "shooting"
  | "finishing"
  | "decision_making"
  | "team_concept"
  | "small_sided_game"
  | "conditioning"
  | "cooldown"
  | "water_break"
  | "teaching";

export type PracticePlanSegment = {
  id: string;
  title: string;
  segmentType: PracticeSegmentType;
  durationMin: number;
  drillIds: string[];
  coachingEmphasis: string;
  intensity: Intensity;
};

export type PracticePlan = {
  id: string;
  title: string;
  ageGroupId: AgeGroupId;
  durationMin: number;
  format: "recommended" | "camp" | "intensive" | "elite";
  goal: string;
  warning?: string;
  segments: PracticePlanSegment[];
  loadNote: string;
};

export type GeneratedPracticePlan = PracticePlan & {
  focus: PracticeFocus;
  selectedIntensity: PracticeIntensity;
  planWarning?: string;
};

export type PresetPracticePlan = PracticePlan;

export type AgeGroupTrainingProfile = {
  ageGroupId: AgeGroupId;
  title: string;
  ageRange: string;
  recommendedDurationMin: number;
  recommendedDurationMax: number;
  intensiveDurationMin: number;
  mainGoal: string;
  developmentPriorities: Array<{
    title: string;
    description: string;
  }>;
  avoid: string[];
  loadGuidance: string;
  recommendedPlanId: string;
  intensivePlanId: string;
  featuredCategoryIds: TrainingCategoryId[];
  featuredStrengthConditioningCategoryIds: TrainingCategoryId[];
  multiplanarSpeedFocus: {
    explanation: string;
    movementPatterns: string[];
    recommendedDrillIds: string[];
    basketballTransfer: string[];
  };
};
