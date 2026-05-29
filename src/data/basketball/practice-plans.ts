import { ageGroupById } from "./age-groups";
import type {
  AgeGroupId,
  GeneratedPracticePlan,
  PracticeFocus,
  PracticeIntensity,
  PracticePlanSegment,
  PracticeSegmentType,
  PresetPracticePlan,
} from "./types";

export type GeneratePracticePlanArgs = {
  ageGroupId: AgeGroupId;
  durationMin: number;
  focus: PracticeFocus;
  intensity: PracticeIntensity;
};

type SegmentKey =
  | "warm"
  | "skill1"
  | "skill2"
  | "competitive"
  | "team"
  | "cooldown";

type DrillPickSet = Record<SegmentKey, string[]>;

const focusPicks: Record<AgeGroupId, Record<PracticeFocus, DrillPickSet>> = {
  u8: {
    ball_handling: {
      warm: ["partner-mirror-movement"],
      skill1: ["red-light-green-light-dribble"],
      skill2: ["cone-island-ball-control"],
      competitive: ["treasure-chest-dribbling-game", "small-sided-games-king-of-the-court"],
      team: ["pass-and-follow"],
      cooldown: ["form-shooting-close-finish"],
    },
    finishing: {
      warm: ["jump-stop-balance-race"],
      skill1: ["mikan-intro-without-speed"],
      skill2: ["form-shooting-close-finish"],
      competitive: ["numbers-layup-game"],
      team: ["pass-and-follow"],
      cooldown: ["partner-mirror-movement"],
    },
    shooting: {
      warm: ["partner-mirror-movement"],
      skill1: ["form-shooting-close-finish"],
      skill2: ["mikan-intro-without-speed"],
      competitive: ["numbers-layup-game"],
      team: ["pass-and-follow"],
      cooldown: ["red-light-green-light-dribble"],
    },
    defense: {
      warm: ["partner-mirror-movement"],
      skill1: ["defensive-stance-freeze-tag"],
      skill2: ["jump-stop-balance-race"],
      competitive: ["small-sided-games-king-of-the-court"],
      team: ["pass-and-follow"],
      cooldown: ["form-shooting-close-finish"],
    },
    team_concepts: {
      warm: ["jump-stop-balance-race"],
      skill1: ["pass-and-follow"],
      skill2: ["red-light-green-light-dribble"],
      competitive: ["treasure-chest-dribbling-game"],
      team: ["small-sided-games-king-of-the-court"],
      cooldown: ["form-shooting-close-finish"],
    },
    all_around: {
      warm: ["partner-mirror-movement"],
      skill1: ["red-light-green-light-dribble"],
      skill2: ["form-shooting-close-finish", "mikan-intro-without-speed"],
      competitive: ["treasure-chest-dribbling-game", "numbers-layup-game"],
      team: ["pass-and-follow"],
      cooldown: ["small-sided-games-king-of-the-court"],
    },
  },
  u11: {
    ball_handling: {
      warm: ["jump-stop-balance-race"],
      skill1: ["zig-zag-change-of-direction"],
      skill2: ["pound-cross-retreat-series"],
      competitive: ["two-v-one-advantage-read"],
      team: ["shell-defense-intro-3v3"],
      cooldown: ["partner-passing-windows"],
    },
    finishing: {
      warm: ["one-two-step-form-shooting"],
      skill1: ["weak-hand-layup-ladder"],
      skill2: ["two-v-one-advantage-read"],
      competitive: ["small-sided-games-king-of-the-court"],
      team: ["shell-defense-intro-3v3"],
      cooldown: ["catch-square-shoot"],
    },
    shooting: {
      warm: ["one-two-step-form-shooting"],
      skill1: ["catch-square-shoot"],
      skill2: ["partner-passing-windows"],
      competitive: ["two-v-one-advantage-read"],
      team: ["shell-defense-intro-3v3"],
      cooldown: ["form-shooting-close-finish"],
    },
    defense: {
      warm: ["partner-mirror-movement"],
      skill1: ["closeout-to-contain"],
      skill2: ["rebound-hit-find-get"],
      competitive: ["small-sided-games-king-of-the-court"],
      team: ["shell-defense-intro-3v3"],
      cooldown: ["partner-passing-windows"],
    },
    team_concepts: {
      warm: ["partner-passing-windows"],
      skill1: ["two-v-one-advantage-read"],
      skill2: ["closeout-to-contain"],
      competitive: ["small-sided-games-king-of-the-court"],
      team: ["shell-defense-intro-3v3"],
      cooldown: ["catch-square-shoot"],
    },
    all_around: {
      warm: ["jump-stop-balance-race"],
      skill1: ["zig-zag-change-of-direction", "partner-passing-windows"],
      skill2: ["catch-square-shoot", "weak-hand-layup-ladder"],
      competitive: ["two-v-one-advantage-read"],
      team: ["shell-defense-intro-3v3"],
      cooldown: ["rebound-hit-find-get"],
    },
  },
  u14: {
    ball_handling: {
      warm: ["zig-zag-change-of-direction"],
      skill1: ["change-pace-attack-cones"],
      skill2: ["two-ball-pressure-handle"],
      competitive: ["closeout-read-one-v-one"],
      team: ["three-v-two-continuous-advantage"],
      cooldown: ["five-spot-shooting-standards"],
    },
    finishing: {
      warm: ["change-pace-attack-cones"],
      skill1: ["weak-hand-layup-ladder"],
      skill2: ["finishing-through-contact-pads"],
      competitive: ["closeout-read-one-v-one"],
      team: ["transition-fill-the-lanes"],
      cooldown: ["catch-square-shoot"],
    },
    shooting: {
      warm: ["catch-square-shoot"],
      skill1: ["five-spot-shooting-standards"],
      skill2: ["drift-pass-drive-and-kick"],
      competitive: ["closeout-read-one-v-one"],
      team: ["slot-cut-read"],
      cooldown: ["one-two-step-form-shooting"],
    },
    defense: {
      warm: ["closeout-to-contain"],
      skill1: ["closeout-read-one-v-one"],
      skill2: ["rebound-hit-find-get", "closeout-to-boxout-chain"],
      competitive: ["small-sided-games-king-of-the-court"],
      team: ["shell-defense-four-v-four-no-paint-touch"],
      cooldown: ["partner-passing-windows"],
    },
    team_concepts: {
      warm: ["transition-fill-the-lanes"],
      skill1: ["slot-cut-read"],
      skill2: ["pick-and-roll-pocket-read-intro"],
      competitive: ["three-v-two-continuous-advantage"],
      team: ["spain-action-walkthrough"],
      cooldown: ["catch-square-shoot"],
    },
    all_around: {
      warm: ["change-pace-attack-cones"],
      skill1: ["drift-pass-drive-and-kick", "slot-cut-read"],
      skill2: ["finishing-through-contact-pads", "closeout-read-one-v-one"],
      competitive: ["three-v-two-continuous-advantage"],
      team: ["shell-defense-four-v-four-no-paint-touch"],
      cooldown: ["five-spot-shooting-standards"],
    },
  },
  u16: {
    ball_handling: {
      warm: ["change-pace-attack-cones"],
      skill1: ["two-ball-pressure-handle"],
      skill2: ["ball-screen-snake-read"],
      competitive: ["closeout-read-one-v-one"],
      team: ["three-v-two-continuous-advantage"],
      cooldown: ["five-spot-shooting-standards"],
    },
    finishing: {
      warm: ["change-pace-attack-cones"],
      skill1: ["finishing-through-contact-pads"],
      skill2: ["veer-finish-and-euro-read"],
      competitive: ["late-clock-one-v-one-two-v-two-decision-game"],
      team: ["transition-fill-the-lanes"],
      cooldown: ["relocation-shooting-off-drive"],
    },
    shooting: {
      warm: ["five-spot-shooting-standards"],
      skill1: ["pro-footwork-shooting-series"],
      skill2: ["relocation-shooting-off-drive"],
      competitive: ["closeout-read-one-v-one"],
      team: ["drift-pass-drive-and-kick"],
      cooldown: ["catch-square-shoot"],
    },
    defense: {
      warm: ["closeout-to-boxout-chain"],
      skill1: ["closeout-read-one-v-one"],
      skill2: ["x-out-defensive-rotation"],
      competitive: ["four-v-four-advantage-constraints"],
      team: ["shell-defense-four-v-four-no-paint-touch"],
      cooldown: ["rebound-hit-find-get"],
    },
    team_concepts: {
      warm: ["transition-fill-the-lanes"],
      skill1: ["pick-and-roll-pocket-read-intro"],
      skill2: ["weak-side-shake-decision"],
      competitive: ["three-v-two-continuous-advantage"],
      team: ["spain-action-walkthrough"],
      cooldown: ["five-spot-shooting-standards"],
    },
    all_around: {
      warm: ["change-pace-attack-cones"],
      skill1: ["pro-footwork-shooting-series", "drift-pass-drive-and-kick"],
      skill2: ["finishing-through-contact-pads", "x-out-defensive-rotation"],
      competitive: ["four-v-four-advantage-constraints"],
      team: ["spain-action-walkthrough", "transition-fill-the-lanes"],
      cooldown: ["five-spot-shooting-standards"],
    },
  },
  hs_elite: {
    ball_handling: {
      warm: ["two-ball-pressure-handle"],
      skill1: ["ball-screen-snake-read"],
      skill2: ["reject-screen-attack"],
      competitive: ["late-clock-one-v-one-two-v-two-decision-game"],
      team: ["four-v-four-advantage-constraints"],
      cooldown: ["five-spot-shooting-standards"],
    },
    finishing: {
      warm: ["change-pace-attack-cones"],
      skill1: ["veer-finish-and-euro-read"],
      skill2: ["reject-screen-attack"],
      competitive: ["late-clock-one-v-one-two-v-two-decision-game"],
      team: ["transition-conversion-defense"],
      cooldown: ["relocation-shooting-off-drive"],
    },
    shooting: {
      warm: ["five-spot-shooting-standards"],
      skill1: ["pro-footwork-shooting-series"],
      skill2: ["relocation-shooting-off-drive"],
      competitive: ["late-clock-one-v-one-two-v-two-decision-game"],
      team: ["weak-side-shake-decision"],
      cooldown: ["catch-square-shoot"],
    },
    defense: {
      warm: ["closeout-to-boxout-chain"],
      skill1: ["x-out-defensive-rotation"],
      skill2: ["transition-conversion-defense"],
      competitive: ["four-v-four-advantage-constraints"],
      team: ["shell-defense-four-v-four-no-paint-touch"],
      cooldown: ["five-spot-shooting-standards"],
    },
    team_concepts: {
      warm: ["pick-and-roll-pocket-read-intro"],
      skill1: ["ball-screen-snake-read"],
      skill2: ["weak-side-shake-decision"],
      competitive: ["four-v-four-advantage-constraints"],
      team: ["spain-action-walkthrough", "transition-conversion-defense"],
      cooldown: ["relocation-shooting-off-drive"],
    },
    all_around: {
      warm: ["two-ball-pressure-handle"],
      skill1: ["pro-footwork-shooting-series", "ball-screen-snake-read"],
      skill2: ["veer-finish-and-euro-read", "x-out-defensive-rotation"],
      competitive: ["late-clock-one-v-one-two-v-two-decision-game"],
      team: ["four-v-four-advantage-constraints", "transition-conversion-defense"],
      cooldown: ["five-spot-shooting-standards"],
    },
  },
};

const durationTemplates: Record<number, Record<PracticeSegmentType, number>> = {
  45: {
    warm_up: 7,
    skill_block_1: 10,
    water_rest: 0,
    skill_block_2: 8,
    competitive_game: 10,
    team_concept: 6,
    cooldown: 4,
  },
  60: {
    warm_up: 8,
    skill_block_1: 12,
    water_rest: 0,
    skill_block_2: 12,
    competitive_game: 12,
    team_concept: 10,
    cooldown: 6,
  },
  75: {
    warm_up: 9,
    skill_block_1: 16,
    water_rest: 0,
    skill_block_2: 15,
    competitive_game: 16,
    team_concept: 13,
    cooldown: 6,
  },
  90: {
    warm_up: 10,
    skill_block_1: 18,
    water_rest: 4,
    skill_block_2: 18,
    competitive_game: 18,
    team_concept: 16,
    cooldown: 6,
  },
  105: {
    warm_up: 12,
    skill_block_1: 20,
    water_rest: 5,
    skill_block_2: 20,
    competitive_game: 22,
    team_concept: 18,
    cooldown: 8,
  },
  120: {
    warm_up: 14,
    skill_block_1: 22,
    water_rest: 5,
    skill_block_2: 22,
    competitive_game: 25,
    team_concept: 22,
    cooldown: 10,
  },
};

const segmentTitles: Record<PracticeSegmentType, string> = {
  warm_up: "Warm-up",
  skill_block_1: "Skill block 1",
  water_rest: "Water / rest",
  skill_block_2: "Skill block 2",
  competitive_game: "Competitive game / SSG",
  team_concept: "Team concept block",
  cooldown: "Cooldown / review",
};

const segmentEmphasis: Record<PracticeSegmentType, string> = {
  warm_up: "Raise body temperature, build coordination, and preview the day's cue.",
  skill_block_1: "Teach the primary skill with clean repetitions before speed.",
  water_rest: "Hydrate, reset attention, and keep work:rest healthy.",
  skill_block_2: "Add pressure, decision timing, or a second connected skill.",
  competitive_game: "Transfer the skill into scoring, stops, and real choices.",
  team_concept: "Connect individual habits to spacing, coverage, or transition rules.",
  cooldown: "Lower intensity, review cues, and finish with controlled makes or reflection.",
};

const pickKeyBySegment: Record<PracticeSegmentType, SegmentKey | "rest"> = {
  warm_up: "warm",
  skill_block_1: "skill1",
  water_rest: "rest",
  skill_block_2: "skill2",
  competitive_game: "competitive",
  team_concept: "team",
  cooldown: "cooldown",
};

function buildSegments(
  minutesByType: Record<PracticeSegmentType, number>,
  picks: DrillPickSet,
): PracticePlanSegment[] {
  const order: PracticeSegmentType[] = [
    "warm_up",
    "skill_block_1",
    "water_rest",
    "skill_block_2",
    "competitive_game",
    "team_concept",
    "cooldown",
  ];

  return order
    .filter((type) => minutesByType[type] > 0)
    .map((type) => {
      const key = pickKeyBySegment[type];

      return {
        id: type,
        type,
        title: segmentTitles[type],
        minutes: minutesByType[type],
        drillIds: key === "rest" ? [] : picks[key],
        coachingEmphasis: segmentEmphasis[type],
      };
    });
}

function normalizeDuration(durationMin: number): number {
  if (durationTemplates[durationMin]) {
    return durationMin;
  }

  const supported = Object.keys(durationTemplates).map(Number);
  return supported.reduce((closest, current) =>
    Math.abs(current - durationMin) < Math.abs(closest - durationMin) ? current : closest,
  );
}

function getWarning(ageGroupId: AgeGroupId, durationMin: number): string | undefined {
  const ageGroup = ageGroupById[ageGroupId];

  if (ageGroupId !== "hs_elite" && durationMin === 120) {
    return "120 minutes is an intensive/camp format for this age. Keep work:rest healthy and use games, breaks, and teaching blocks.";
  }

  if (durationMin > ageGroup.recommendedMax) {
    return `${durationMin} minutes exceeds the ${ageGroup.label} recommended range of ${ageGroup.recommendedDuration}. Add rest, teaching pauses, and lower-intensity games.`;
  }

  return undefined;
}

export function generatePracticePlan({
  ageGroupId,
  durationMin,
  focus,
  intensity,
}: GeneratePracticePlanArgs): GeneratedPracticePlan {
  const normalizedDuration = normalizeDuration(durationMin);
  const picks = focusPicks[ageGroupId][focus];
  const segments = buildSegments(durationTemplates[normalizedDuration], picks);
  const total = segments.reduce((sum, segment) => sum + segment.minutes, 0);

  if (total !== normalizedDuration) {
    throw new Error(`Practice plan total ${total} does not match ${normalizedDuration}.`);
  }

  return {
    ageGroupId,
    durationMin: normalizedDuration,
    focus,
    intensity,
    planWarning: getWarning(ageGroupId, normalizedDuration),
    segments,
  };
}

export const presetPracticePlans: PresetPracticePlan[] = [
  {
    id: "u8-recommended-60",
    title: "U8 recommended plan",
    ageGroupId: "u8",
    durationMin: 60,
    isIntensive: false,
    introGoal:
      "Build joy, coordination, ball comfort, simple passing, and a controlled finish without long hard-work stretches.",
    segments: buildSegments(durationTemplates[60], focusPicks.u8.all_around),
    loadNote:
      "Keep intensity playful. Use short lines, frequent encouragement, and water whenever attention drops.",
  },
  {
    id: "u8-camp-120",
    title: "U8 2-hour camp/intensive format",
    ageGroupId: "u8",
    durationMin: 120,
    isIntensive: true,
    warning:
      "120 minutes is a camp format for U8. Use breaks, low-intensity games, coordination stations, and teaching pauses.",
    introGoal:
      "Use a camp rhythm built around games, coordination, short ball-control bursts, and rest rather than 120 minutes of hard drill work.",
    segments: buildSegments(durationTemplates[120], focusPicks.u8.all_around),
    loadNote:
      "Keep most work low to medium intensity. Add bathroom and snack breaks outside the listed water block if needed.",
  },
  {
    id: "u11-recommended-75",
    title: "U11 recommended plan",
    ageGroupId: "u11",
    durationMin: 75,
    isIntensive: false,
    introGoal:
      "Blend ball control, footwork, passing, finishing, shooting form, and simple 1v1 reads.",
    segments: buildSegments(durationTemplates[75], focusPicks.u11.all_around),
    loadNote:
      "Use stations and short competitions so repetitions stay high without turning every block into conditioning.",
  },
  {
    id: "u11-camp-120",
    title: "U11 2-hour camp/intensive format",
    ageGroupId: "u11",
    durationMin: 120,
    isIntensive: true,
    warning:
      "120 minutes is a camp/intensive format for U11. Include planned breaks and simple competitive games.",
    introGoal:
      "Extend practice through stations, game-based constraints, and teaching blocks while protecting attention and mechanics.",
    segments: buildSegments(durationTemplates[120], focusPicks.u11.all_around),
    loadNote:
      "Avoid stacking high-intensity blocks. Use water, role rotation, and teaching demos after competitive segments.",
  },
  {
    id: "u14-recommended-90",
    title: "U14 recommended plan",
    ageGroupId: "u14",
    durationMin: 90,
    isIntensive: false,
    introGoal:
      "Develop decision-making, finishing through constraints, shooting movement, defensive habits, and team spacing.",
    segments: buildSegments(durationTemplates[90], focusPicks.u14.all_around),
    loadNote:
      "Keep competitive pressure high enough to transfer, but separate the hardest blocks with water and teaching.",
  },
  {
    id: "u14-camp-120",
    title: "U14 2-hour camp/intensive format",
    ageGroupId: "u14",
    durationMin: 120,
    isIntensive: true,
    warning:
      "120 minutes is allowed for U14 only with breaks, teaching pauses, and controlled high-intensity volume.",
    introGoal:
      "Use the longer block to teach constraints, small-sided decisions, and team concepts without overloading contact or sprint volume.",
    segments: buildSegments(durationTemplates[120], focusPicks.u14.all_around),
    loadNote:
      "Separate high-intensity contact and transition work. Add extra recovery if mechanics or communication degrade.",
  },
  {
    id: "u16-recommended-90",
    title: "U16 recommended plan",
    ageGroupId: "u16",
    durationMin: 90,
    isIntensive: false,
    introGoal:
      "Bridge advanced youth development and elite structure with shooting movement, advantage reads, finishing pressure, and connected defense.",
    segments: buildSegments(durationTemplates[90], focusPicks.u16.all_around),
    loadNote:
      "Keep quality high by separating contact, transition, and high-volume shooting with water and teaching resets.",
  },
  {
    id: "u16-intensive-120",
    title: "U16 2-hour intensive format",
    ageGroupId: "u16",
    durationMin: 120,
    isIntensive: true,
    warning:
      "120 minutes is intensive for U16 unless the group is prepared for elite workload. Include hydration, teaching pauses, and controlled contact.",
    introGoal:
      "Use the longer block for advanced reads, competitive constraints, and team concepts without stacking too much high-intensity load.",
    segments: buildSegments(durationTemplates[120], focusPicks.u16.all_around),
    loadNote:
      "Avoid more than two high-intensity blocks in sequence. Reduce contact or sprint volume if mechanics drop.",
  },
  {
    id: "hs-elite-advanced-120",
    title: "High School / Elite 120-min advanced plan",
    ageGroupId: "hs_elite",
    durationMin: 120,
    isIntensive: false,
    introGoal:
      "Train advanced reads, shooting volume, advantage creation, defensive rotations, and competitive late-clock execution.",
    segments: buildSegments(durationTemplates[120], focusPicks.hs_elite.all_around),
    loadNote:
      "This is normal elite duration, but high-speed and contact blocks still require rotation and hydration.",
  },
];

export const presetPracticePlanById = Object.fromEntries(
  presetPracticePlans.map((plan) => [plan.id, plan]),
) as Record<string, PresetPracticePlan>;
