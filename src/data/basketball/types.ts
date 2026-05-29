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
  | "warm_up"
  | "skill_block_1"
  | "water_rest"
  | "skill_block_2"
  | "competitive_game"
  | "team_concept"
  | "cooldown";

export type PracticePlanSegment = {
  id: string;
  type: PracticeSegmentType;
  title: string;
  minutes: number;
  drillIds: string[];
  coachingEmphasis: string;
};

export type GeneratedPracticePlan = {
  ageGroupId: AgeGroupId;
  durationMin: number;
  focus: PracticeFocus;
  intensity: PracticeIntensity;
  planWarning?: string;
  segments: PracticePlanSegment[];
};

export type PresetPracticePlan = {
  id: string;
  title: string;
  ageGroupId: AgeGroupId;
  durationMin: number;
  isIntensive: boolean;
  warning?: string;
  introGoal: string;
  segments: PracticePlanSegment[];
  loadNote: string;
};
