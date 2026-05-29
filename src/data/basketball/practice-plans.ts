import { ageGroupById } from "./age-groups";
import type {
  AgeGroupId,
  GeneratedPracticePlan,
  Intensity,
  PracticeFocus,
  PracticeIntensity,
  PracticePlan,
  PracticePlanSegment,
  PracticeSegmentType,
} from "./types";

export type GeneratePracticePlanArgs = {
  ageGroupId: AgeGroupId;
  durationMin: number;
  focus: PracticeFocus;
  intensity: PracticeIntensity;
};

type SegmentInput = Omit<PracticePlanSegment, "id"> & { id?: string };

function segment(input: SegmentInput): PracticePlanSegment {
  return {
    id:
      input.id ??
      `${input.segmentType}-${input.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    ...input,
  };
}

function plan(input: PracticePlan): PracticePlan {
  const total = input.segments.reduce((sum, item) => sum + item.durationMin, 0);

  if (total !== input.durationMin) {
    throw new Error(`${input.id} totals ${total} minutes, expected ${input.durationMin}.`);
  }

  return input;
}

const warning120 =
  "120 minutes is an intensive/camp format for this age. Keep work:rest healthy and use games, breaks, and teaching blocks.";

export const presetPracticePlans = [
  plan({
    id: "u8-recommended-60",
    title: "U8 recommended 60-minute plan",
    ageGroupId: "u8",
    durationMin: 60,
    format: "recommended",
    goal:
      "Build joy, coordination, ball comfort, simple passing, and controlled finishes through short playful blocks.",
    segments: [
      segment({
        title: "Movement prep: mirror, skip, and balance",
        segmentType: "movement_prep",
        durationMin: 8,
        drillIds: ["u8-mirror-tag-coordination", "u8-skip-and-stick"],
        coachingEmphasis: "Start with play, balance, and clean stops before the ball work becomes faster.",
        intensity: "low",
      }),
      segment({
        title: "Basketball skill block: dribble control games",
        segmentType: "skill_development",
        durationMin: 12,
        drillIds: ["red-light-green-light-dribble", "cone-island-ball-control"],
        coachingEmphasis: "Keep eyes up, protect the ball, and stop under control.",
        intensity: "low",
      }),
      segment({
        title: "Shooting and finishing: close form to rim",
        segmentType: "finishing",
        durationMin: 10,
        drillIds: ["form-shooting-close-finish", "mikan-intro-without-speed"],
        coachingEmphasis: "Use close targets, soft hands, and no speed pressure.",
        intensity: "low",
      }),
      segment({
        title: "Decision game: numbers layups",
        segmentType: "small_sided_game",
        durationMin: 12,
        drillIds: ["numbers-layup-game", "treasure-chest-dribbling-game"],
        coachingEmphasis: "Make the game fun while rewarding control, spacing, and quick listening.",
        intensity: "medium",
      }),
      segment({
        title: "Teaching block: pass, follow, and freeze",
        segmentType: "teaching",
        durationMin: 8,
        drillIds: ["pass-and-follow", "defensive-stance-freeze-tag"],
        coachingEmphasis: "Connect pass-and-move habits to simple stance language.",
        intensity: "low",
      }),
      segment({
        title: "Cooldown review: balance islands",
        segmentType: "cooldown",
        durationMin: 10,
        drillIds: ["u8-balance-stop-islands"],
        coachingEmphasis: "Finish calm, review the best cue, and keep every player successful.",
        intensity: "low",
      }),
    ],
    loadNote: "Keep this playful. Avoid long lines, fatigue-based punishment, and high-volume jumping.",
  }),
  plan({
    id: "u8-camp-120",
    title: "U8 camp / intensive 120-minute format",
    ageGroupId: "u8",
    durationMin: 120,
    format: "camp",
    warning:
      "Camp / intensive format - not the default weekly practice structure. Use breaks, games, coordination stations, and teaching pauses.",
    goal:
      "Use a camp rhythm of short games, coordination blocks, ball control, snack-level resets, and low-pressure teaching.",
    segments: [
      segment({
        title: "Playful movement prep",
        segmentType: "movement_prep",
        durationMin: 10,
        drillIds: ["u8-mirror-tag-coordination", "u8-color-cone-reaction"],
        coachingEmphasis: "Prime reaction and balance without racing.",
        intensity: "low",
      }),
      segment({
        title: "Ball-control games",
        segmentType: "skill_development",
        durationMin: 15,
        drillIds: ["red-light-green-light-dribble", "cone-island-ball-control"],
        coachingEmphasis: "Short bursts, frequent resets, and praise for controlled stops.",
        intensity: "low",
      }),
      segment({
        title: "Water and attention reset",
        segmentType: "water_break",
        durationMin: 5,
        drillIds: [],
        coachingEmphasis: "Hydrate, reset teams, and preview the next playful challenge.",
        intensity: "low",
      }),
      segment({
        title: "Close shooting and layup foundations",
        segmentType: "finishing",
        durationMin: 12,
        drillIds: ["form-shooting-close-finish", "mikan-intro-without-speed"],
        coachingEmphasis: "Keep makes close and teach soft finishes before speed.",
        intensity: "low",
      }),
      segment({
        title: "Treasure and numbers games",
        segmentType: "small_sided_game",
        durationMin: 15,
        drillIds: ["treasure-chest-dribbling-game", "numbers-layup-game"],
        coachingEmphasis: "Use scoring and teams to keep energy high without fatigue pressure.",
        intensity: "medium",
      }),
      segment({
        title: "Short teaching: passing and spacing",
        segmentType: "teaching",
        durationMin: 8,
        drillIds: ["pass-and-follow"],
        coachingEmphasis: "Teach pass, follow, and find a new space with simple language.",
        intensity: "low",
      }),
      segment({
        title: "Coordination station circuit",
        segmentType: "speed_agility",
        durationMin: 12,
        drillIds: ["u8-bear-crawl-reach-relay", "u8-low-landing-hoop-hop"],
        coachingEmphasis: "Use crawling, tiny hops, and balance holds, not conditioning.",
        intensity: "low",
      }),
      segment({
        title: "Water and role reset",
        segmentType: "water_break",
        durationMin: 5,
        drillIds: [],
        coachingEmphasis: "Hydrate, rotate partners, and lower the emotional temperature.",
        intensity: "low",
      }),
      segment({
        title: "Simple team play: pass and small-sided game",
        segmentType: "small_sided_game",
        durationMin: 15,
        drillIds: ["pass-and-follow", "small-sided-games-king-of-the-court"],
        coachingEmphasis: "Keep the court small, contacts light, and rotations fast.",
        intensity: "medium",
      }),
      segment({
        title: "Reaction game finisher",
        segmentType: "movement_prep",
        durationMin: 10,
        drillIds: ["u8-color-cone-reaction", "defensive-stance-freeze-tag"],
        coachingEmphasis: "End with laughing, listening, and balanced freezes.",
        intensity: "low",
      }),
      segment({
        title: "Cooldown and review",
        segmentType: "cooldown",
        durationMin: 13,
        drillIds: ["u8-balance-stop-islands"],
        coachingEmphasis: "Walk, breathe, ask players to name one cue, and finish with calm makes.",
        intensity: "low",
      }),
    ],
    loadNote: "No intense conditioning, heavy strength, or advanced plyometrics for U8.",
  }),
  plan({
    id: "u11-recommended-75",
    title: "U11 recommended 75-minute plan",
    ageGroupId: "u11",
    durationMin: 75,
    format: "recommended",
    goal:
      "Blend ball control, passing windows, form shooting, finishing footwork, basic 1v1 reads, and body control.",
    segments: [
      segment({
        title: "Movement prep: stop, land, react",
        segmentType: "movement_prep",
        durationMin: 10,
        drillIds: ["u11-stop-land-balance", "u11-partner-reaction-mirror"],
        coachingEmphasis: "Teach stopping and balance before faster cutting.",
        intensity: "low",
      }),
      segment({
        title: "Skill block: handle and pass",
        segmentType: "skill_development",
        durationMin: 15,
        drillIds: ["zig-zag-change-of-direction", "partner-passing-windows"],
        coachingEmphasis: "Pair ball control with receiver readiness and simple pressure.",
        intensity: "medium",
      }),
      segment({
        title: "Shooting block: square and step",
        segmentType: "shooting",
        durationMin: 12,
        drillIds: ["catch-square-shoot", "one-two-step-form-shooting"],
        coachingEmphasis: "Build feet-before-hands rhythm and clean shot preparation.",
        intensity: "medium",
      }),
      segment({
        title: "Finishing block: weak-hand ladder",
        segmentType: "finishing",
        durationMin: 10,
        drillIds: ["weak-hand-layup-ladder"],
        coachingEmphasis: "Keep pace controlled so footwork and hand use stay clean.",
        intensity: "medium",
      }),
      segment({
        title: "Decision block: 2v1 advantage",
        segmentType: "decision_making",
        durationMin: 12,
        drillIds: ["two-v-one-advantage-read"],
        coachingEmphasis: "Teach pass-or-finish decisions from a clear advantage.",
        intensity: "medium",
      }),
      segment({
        title: "Speed and agility: first step gates",
        segmentType: "speed_agility",
        durationMin: 8,
        drillIds: ["u11-first-step-races", "u11-accel-decel-gates"],
        coachingEmphasis: "Use short accelerations with complete walk-back recovery.",
        intensity: "medium",
      }),
      segment({
        title: "Cooldown: rebound and review",
        segmentType: "cooldown",
        durationMin: 8,
        drillIds: ["rebound-hit-find-get"],
        coachingEmphasis: "Lower intensity and close with one defensive possession habit.",
        intensity: "low",
      }),
    ],
    loadNote: "Use short competitive blocks. Teach stopping and body control before high-speed cutting.",
  }),
  plan({
    id: "u11-camp-120",
    title: "U11 camp / intensive 120-minute format",
    ageGroupId: "u11",
    durationMin: 120,
    format: "camp",
    warning:
      "Camp / intensive format - not the default weekly practice structure. Include planned breaks and simple competitive games.",
    goal:
      "Extend practice through skill stations, simple competitions, coordination, basic speed mechanics, and teaching resets.",
    segments: [
      segment({
        title: "Movement prep and body control",
        segmentType: "movement_prep",
        durationMin: 10,
        drillIds: ["u11-stop-land-balance", "u11-lateral-line-shuffle"],
        coachingEmphasis: "Prime deceleration, lateral stance, and balance.",
        intensity: "low",
      }),
      segment({
        title: "Ball-control station block",
        segmentType: "skill_development",
        durationMin: 16,
        drillIds: ["zig-zag-change-of-direction", "pound-cross-retreat-series"],
        coachingEmphasis: "Use stations so players get many touches with minimal lines.",
        intensity: "medium",
      }),
      segment({
        title: "Passing and shooting stations",
        segmentType: "shooting",
        durationMin: 14,
        drillIds: ["partner-passing-windows", "catch-square-shoot"],
        coachingEmphasis: "Connect pass quality to quick shot preparation.",
        intensity: "medium",
      }),
      segment({
        title: "Water and teaching reset",
        segmentType: "water_break",
        durationMin: 5,
        drillIds: [],
        coachingEmphasis: "Hydrate, regroup, and show the next finishing footwork.",
        intensity: "low",
      }),
      segment({
        title: "Finishing and weak-hand ladder",
        segmentType: "finishing",
        durationMin: 12,
        drillIds: ["weak-hand-layup-ladder", "numbers-layup-game"],
        coachingEmphasis: "Reward correct footwork before speed.",
        intensity: "medium",
      }),
      segment({
        title: "Simple competition: 2v1 and king",
        segmentType: "small_sided_game",
        durationMin: 15,
        drillIds: ["two-v-one-advantage-read", "small-sided-games-king-of-the-court"],
        coachingEmphasis: "Keep rules simple and rotate quickly.",
        intensity: "medium",
      }),
      segment({
        title: "Teaching block: shell intro language",
        segmentType: "teaching",
        durationMin: 8,
        drillIds: ["shell-defense-intro-3v3"],
        coachingEmphasis: "Teach help, ball, and gap language slowly before live pressure.",
        intensity: "low",
      }),
      segment({
        title: "Speed mechanics and strength game",
        segmentType: "speed_agility",
        durationMin: 12,
        drillIds: ["u11-first-step-races", "u11-bodyweight-strength-game"],
        coachingEmphasis: "Use low volume and score clean control, not exhaustion.",
        intensity: "medium",
      }),
      segment({
        title: "Water and role reset",
        segmentType: "water_break",
        durationMin: 5,
        drillIds: [],
        coachingEmphasis: "Hydrate and reset teams for a short final concept block.",
        intensity: "low",
      }),
      segment({
        title: "Team concept: closeout to contain",
        segmentType: "team_concept",
        durationMin: 10,
        drillIds: ["closeout-to-contain", "shell-defense-intro-3v3"],
        coachingEmphasis: "Tie individual closeouts to simple team spacing.",
        intensity: "medium",
      }),
      segment({
        title: "Cooldown review",
        segmentType: "cooldown",
        durationMin: 13,
        drillIds: ["u11-stop-land-balance"],
        coachingEmphasis: "Walk, breathe, review the best cue, and finish with controlled makes.",
        intensity: "low",
      }),
    ],
    loadNote: "No heavy strength or excessive conditioning. Use rest when mechanics fade.",
  }),
  plan({
    id: "u14-recommended-90",
    title: "U14 recommended 90-minute plan",
    ageGroupId: "u14",
    durationMin: 90,
    format: "recommended",
    goal:
      "Develop decision-making, constrained finishing, movement shooting, spacing, defensive habits, and safe speed mechanics.",
    segments: [
      segment({
        title: "Structured warm-up and sprint-to-stick",
        segmentType: "movement_prep",
        durationMin: 10,
        drillIds: ["u14-sprint-to-stick"],
        coachingEmphasis: "Use an organized warm-up and teach brakes before hard cuts.",
        intensity: "medium",
      }),
      segment({
        title: "Skill block: change pace and drive kick",
        segmentType: "skill_development",
        durationMin: 15,
        drillIds: ["change-pace-attack-cones", "drift-pass-drive-and-kick"],
        coachingEmphasis: "Connect pace to advantage creation and pass timing.",
        intensity: "medium",
      }),
      segment({
        title: "Shooting block: movement standards",
        segmentType: "shooting",
        durationMin: 15,
        drillIds: ["five-spot-shooting-standards", "drift-pass-drive-and-kick"],
        coachingEmphasis: "Demand game-speed feet with makeable volume.",
        intensity: "medium",
      }),
      segment({
        title: "Finishing through constraints",
        segmentType: "finishing",
        durationMin: 12,
        drillIds: ["finishing-through-contact-pads"],
        coachingEmphasis: "Add contact carefully and protect landing quality.",
        intensity: "medium",
      }),
      segment({
        title: "Decision game: closeout read",
        segmentType: "decision_making",
        durationMin: 14,
        drillIds: ["closeout-read-one-v-one", "three-v-two-continuous-advantage"],
        coachingEmphasis: "Turn closeouts into real shoot, drive, pass, and rotate decisions.",
        intensity: "high",
      }),
      segment({
        title: "Team concept: spacing and shell",
        segmentType: "team_concept",
        durationMin: 12,
        drillIds: ["slot-cut-read", "shell-defense-four-v-four-no-paint-touch"],
        coachingEmphasis: "Teach spacing rules and defensive no-paint habits together.",
        intensity: "medium",
      }),
      segment({
        title: "Speed and agility: closeout mechanics",
        segmentType: "speed_agility",
        durationMin: 8,
        drillIds: ["u14-crossover-run-closeout", "u14-hip-turn-reaction"],
        coachingEmphasis: "Train hip turns, crossover runs, and controlled closeouts.",
        intensity: "medium",
      }),
      segment({
        title: "Cooldown review",
        segmentType: "cooldown",
        durationMin: 4,
        drillIds: ["u14-core-stiffness-holds"],
        coachingEmphasis: "Lower intensity and reinforce the day's best transfer cue.",
        intensity: "low",
      }),
    ],
    loadNote: "Introduce deceleration and landing mechanics carefully. Do not stack too many high-impact drills.",
  }),
  plan({
    id: "u14-intensive-120",
    title: "U14 camp / intensive 120-minute format",
    ageGroupId: "u14",
    durationMin: 120,
    format: "intensive",
    warning:
      "Camp / intensive format - not the default weekly practice structure. Use planned breaks, teaching pauses, and controlled high-intensity volume.",
    goal:
      "Use the longer block for skill development, small-sided games, deceleration, lateral speed, and team concepts.",
    segments: [
      segment({
        title: "Structured warm-up",
        segmentType: "movement_prep",
        durationMin: 12,
        drillIds: ["u14-sprint-to-stick", "u14-core-stiffness-holds"],
        coachingEmphasis: "Prepare hips, trunk, and stopping mechanics before speed.",
        intensity: "medium",
      }),
      segment({
        title: "Lateral and multiplanar speed",
        segmentType: "speed_agility",
        durationMin: 10,
        drillIds: ["u14-crossover-run-closeout", "u14-hip-turn-reaction"],
        coachingEmphasis: "Keep volume low and each rep sharp.",
        intensity: "medium",
      }),
      segment({
        title: "Skill development: pace and handle",
        segmentType: "skill_development",
        durationMin: 16,
        drillIds: ["change-pace-attack-cones", "two-ball-pressure-handle"],
        coachingEmphasis: "Add pressure only after control and pace changes are clean.",
        intensity: "medium",
      }),
      segment({
        title: "Shooting movement and relocation",
        segmentType: "shooting",
        durationMin: 16,
        drillIds: ["five-spot-shooting-standards", "drift-pass-drive-and-kick"],
        coachingEmphasis: "Use game spots, spacing language, and make standards.",
        intensity: "medium",
      }),
      segment({
        title: "Finishing under constraints",
        segmentType: "finishing",
        durationMin: 14,
        drillIds: ["finishing-through-contact-pads", "weak-hand-layup-ladder"],
        coachingEmphasis: "Control contact volume and demand balanced landings.",
        intensity: "medium",
      }),
      segment({
        title: "Water and teaching reset",
        segmentType: "water_break",
        durationMin: 5,
        drillIds: [],
        coachingEmphasis: "Hydrate, reset matchups, and preview advantage spacing.",
        intensity: "low",
      }),
      segment({
        title: "Decision-making SSG",
        segmentType: "small_sided_game",
        durationMin: 16,
        drillIds: ["closeout-read-one-v-one", "three-v-two-continuous-advantage"],
        coachingEmphasis: "Reward early reads and punish late spacing with a reset.",
        intensity: "high",
      }),
      segment({
        title: "Team concept: shell and transition lanes",
        segmentType: "team_concept",
        durationMin: 14,
        drillIds: ["shell-defense-four-v-four-no-paint-touch", "transition-fill-the-lanes"],
        coachingEmphasis: "Connect half-court habits to transition organization.",
        intensity: "medium",
      }),
      segment({
        title: "Small-sided conditioning",
        segmentType: "conditioning",
        durationMin: 8,
        drillIds: ["u14-small-sided-conditioning"],
        coachingEmphasis: "Condition through decisions with short work windows.",
        intensity: "high",
      }),
      segment({
        title: "Water reset",
        segmentType: "water_break",
        durationMin: 5,
        drillIds: [],
        coachingEmphasis: "Hydrate and bring heart rate down before review.",
        intensity: "low",
      }),
      segment({
        title: "Cooldown review",
        segmentType: "cooldown",
        durationMin: 4,
        drillIds: ["u14-core-stiffness-holds"],
        coachingEmphasis: "End with breathing, trunk control, and one tactical cue.",
        intensity: "low",
      }),
    ],
    loadNote: "Separate high-intensity contact, sprint, and transition work. Reduce volume if mechanics degrade.",
  }),
  plan({
    id: "hs-elite-recommended-120",
    title: "High School / Elite advanced 120-minute session",
    ageGroupId: "hs_elite",
    durationMin: 120,
    format: "elite",
    goal:
      "Train advanced reads, shooting volume, advantage creation, defensive rotations, multiplanar speed, and conditioning.",
    segments: [
      segment({
        title: "Movement prep and activation",
        segmentType: "movement_prep",
        durationMin: 10,
        drillIds: ["hs-single-leg-strength-power", "u14-core-stiffness-holds"],
        coachingEmphasis: "Prepare single-leg control, trunk stiffness, and landing quality.",
        intensity: "medium",
      }),
      segment({
        title: "Multiplanar speed block",
        segmentType: "speed_agility",
        durationMin: 12,
        drillIds: ["hs-sprint-shuffle-backpedal-box", "hs-360-cone-reaction"],
        coachingEmphasis: "Train sprint, shuffle, backpedal, hip turn, closeout, and recover patterns.",
        intensity: "high",
      }),
      segment({
        title: "Skill volume: footwork and reads",
        segmentType: "skill_development",
        durationMin: 18,
        drillIds: ["pro-footwork-shooting-series", "ball-screen-snake-read"],
        coachingEmphasis: "Keep footwork precise while adding read speed.",
        intensity: "medium",
      }),
      segment({
        title: "Shooting volume and relocation",
        segmentType: "shooting",
        durationMin: 18,
        drillIds: ["relocation-shooting-off-drive", "five-spot-shooting-standards"],
        coachingEmphasis: "Track makes, footwork quality, and relocation timing.",
        intensity: "medium",
      }),
      segment({
        title: "Finishing reads",
        segmentType: "finishing",
        durationMin: 14,
        drillIds: ["veer-finish-and-euro-read", "reject-screen-attack"],
        coachingEmphasis: "Read help position before selecting veer, euro, or reject finish.",
        intensity: "high",
      }),
      segment({
        title: "Decision game: late clock and advantage",
        segmentType: "decision_making",
        durationMin: 14,
        drillIds: ["late-clock-one-v-one-two-v-two-decision-game", "four-v-four-advantage-constraints"],
        coachingEmphasis: "Force fast decisions under scoring pressure.",
        intensity: "high",
      }),
      segment({
        title: "Team concept: weak-side and X-out",
        segmentType: "team_concept",
        durationMin: 14,
        drillIds: ["weak-side-shake-decision", "x-out-defensive-rotation"],
        coachingEmphasis: "Tie offensive shake decisions to defensive rotation quality.",
        intensity: "high",
      }),
      segment({
        title: "Conditioning finisher",
        segmentType: "conditioning",
        durationMin: 12,
        drillIds: ["transition-conversion-defense", "hs-repeat-effort-conditioning-finisher"],
        coachingEmphasis: "Condition with basketball actions and stop before reps become sloppy.",
        intensity: "high",
      }),
      segment({
        title: "Cooldown and review",
        segmentType: "cooldown",
        durationMin: 8,
        drillIds: ["u14-core-stiffness-holds"],
        coachingEmphasis: "Review the strongest transfer cue and downshift after high-intensity work.",
        intensity: "low",
      }),
    ],
    loadNote: "High-intensity blocks are appropriate, but manage work-rest and avoid poor-quality reps under fatigue.",
  }),
] satisfies PracticePlan[];

export const presetPracticePlanById = Object.fromEntries(
  presetPracticePlans.map((item) => [item.id, item]),
) as Record<string, PracticePlan>;

const focusDrills: Record<Exclude<AgeGroupId, "u16">, Record<PracticeFocus, string[]>> = {
  u8: {
    ball_handling: ["red-light-green-light-dribble", "cone-island-ball-control"],
    finishing: ["form-shooting-close-finish", "numbers-layup-game"],
    shooting: ["form-shooting-close-finish", "mikan-intro-without-speed"],
    defense: ["defensive-stance-freeze-tag", "u8-mirror-tag-coordination"],
    team_concepts: ["pass-and-follow", "small-sided-games-king-of-the-court"],
    all_around: ["red-light-green-light-dribble", "form-shooting-close-finish"],
  },
  u11: {
    ball_handling: ["zig-zag-change-of-direction", "pound-cross-retreat-series"],
    finishing: ["weak-hand-layup-ladder", "two-v-one-advantage-read"],
    shooting: ["catch-square-shoot", "one-two-step-form-shooting"],
    defense: ["closeout-to-contain", "rebound-hit-find-get"],
    team_concepts: ["shell-defense-intro-3v3", "two-v-one-advantage-read"],
    all_around: ["zig-zag-change-of-direction", "catch-square-shoot"],
  },
  u14: {
    ball_handling: ["change-pace-attack-cones", "two-ball-pressure-handle"],
    finishing: ["finishing-through-contact-pads", "closeout-read-one-v-one"],
    shooting: ["five-spot-shooting-standards", "drift-pass-drive-and-kick"],
    defense: ["closeout-read-one-v-one", "shell-defense-four-v-four-no-paint-touch"],
    team_concepts: ["slot-cut-read", "spain-action-walkthrough"],
    all_around: ["change-pace-attack-cones", "three-v-two-continuous-advantage"],
  },
  hs_elite: {
    ball_handling: ["ball-screen-snake-read", "reject-screen-attack"],
    finishing: ["veer-finish-and-euro-read", "reject-screen-attack"],
    shooting: ["pro-footwork-shooting-series", "relocation-shooting-off-drive"],
    defense: ["x-out-defensive-rotation", "transition-conversion-defense"],
    team_concepts: ["weak-side-shake-decision", "four-v-four-advantage-constraints"],
    all_around: ["pro-footwork-shooting-series", "late-clock-one-v-one-two-v-two-decision-game"],
  },
};

const supportByAge: Record<Exclude<AgeGroupId, "u16">, string[]> = {
  u8: ["u8-color-cone-reaction", "pass-and-follow", "small-sided-games-king-of-the-court"],
  u11: ["u11-first-step-races", "partner-passing-windows", "two-v-one-advantage-read"],
  u14: ["u14-crossover-run-closeout", "closeout-read-one-v-one", "shell-defense-four-v-four-no-paint-touch"],
  hs_elite: ["hs-sprint-shuffle-backpedal-box", "four-v-four-advantage-constraints", "hs-repeat-effort-conditioning-finisher"],
};

const generatedTemplates: Record<number, Array<Omit<SegmentInput, "drillIds" | "coachingEmphasis">>> = {
  45: [
    { title: "Movement prep", segmentType: "movement_prep", durationMin: 7, intensity: "low" },
    { title: "Skill development", segmentType: "skill_development", durationMin: 10, intensity: "medium" },
    { title: "Shooting or finishing", segmentType: "finishing", durationMin: 8, intensity: "medium" },
    { title: "Competitive game / SSG", segmentType: "small_sided_game", durationMin: 10, intensity: "medium" },
    { title: "Team teaching", segmentType: "teaching", durationMin: 6, intensity: "low" },
    { title: "Cooldown / review", segmentType: "cooldown", durationMin: 4, intensity: "low" },
  ],
  60: [
    { title: "Movement prep", segmentType: "movement_prep", durationMin: 8, intensity: "low" },
    { title: "Skill development", segmentType: "skill_development", durationMin: 13, intensity: "medium" },
    { title: "Shooting or finishing", segmentType: "shooting", durationMin: 12, intensity: "medium" },
    { title: "Decision game / SSG", segmentType: "small_sided_game", durationMin: 13, intensity: "medium" },
    { title: "Team concept", segmentType: "team_concept", durationMin: 8, intensity: "medium" },
    { title: "Cooldown / review", segmentType: "cooldown", durationMin: 6, intensity: "low" },
  ],
  75: [
    { title: "Movement prep", segmentType: "movement_prep", durationMin: 9, intensity: "low" },
    { title: "Skill development", segmentType: "skill_development", durationMin: 16, intensity: "medium" },
    { title: "Shooting or finishing", segmentType: "shooting", durationMin: 14, intensity: "medium" },
    { title: "Decision game / SSG", segmentType: "small_sided_game", durationMin: 16, intensity: "medium" },
    { title: "Speed or team concept", segmentType: "speed_agility", durationMin: 12, intensity: "medium" },
    { title: "Cooldown / review", segmentType: "cooldown", durationMin: 8, intensity: "low" },
  ],
  90: [
    { title: "Movement prep", segmentType: "movement_prep", durationMin: 10, intensity: "medium" },
    { title: "Skill development", segmentType: "skill_development", durationMin: 18, intensity: "medium" },
    { title: "Shooting or finishing", segmentType: "shooting", durationMin: 16, intensity: "medium" },
    { title: "Water break", segmentType: "water_break", durationMin: 4, intensity: "low" },
    { title: "Decision game / SSG", segmentType: "small_sided_game", durationMin: 18, intensity: "high" },
    { title: "Team concept", segmentType: "team_concept", durationMin: 16, intensity: "medium" },
    { title: "Cooldown / review", segmentType: "cooldown", durationMin: 8, intensity: "low" },
  ],
  120: [
    { title: "Movement prep", segmentType: "movement_prep", durationMin: 12, intensity: "medium" },
    { title: "Skill development", segmentType: "skill_development", durationMin: 20, intensity: "medium" },
    { title: "Shooting or finishing", segmentType: "shooting", durationMin: 18, intensity: "medium" },
    { title: "Water break", segmentType: "water_break", durationMin: 5, intensity: "low" },
    { title: "Decision game / SSG", segmentType: "small_sided_game", durationMin: 22, intensity: "high" },
    { title: "Team concept", segmentType: "team_concept", durationMin: 18, intensity: "medium" },
    { title: "Speed or conditioning", segmentType: "speed_agility", durationMin: 15, intensity: "medium" },
    { title: "Cooldown / review", segmentType: "cooldown", durationMin: 10, intensity: "low" },
  ],
};

function normalizeDuration(durationMin: number): number {
  if (generatedTemplates[durationMin]) return durationMin;

  return Object.keys(generatedTemplates)
    .map(Number)
    .reduce((closest, current) =>
      Math.abs(current - durationMin) < Math.abs(closest - durationMin) ? current : closest,
    );
}

function normalizeAge(ageGroupId: AgeGroupId): Exclude<AgeGroupId, "u16"> {
  if (ageGroupId === "u16") return "hs_elite";
  return ageGroupId;
}

function generatedSegmentDrills(
  ageGroupId: Exclude<AgeGroupId, "u16">,
  focus: PracticeFocus,
  segmentType: PracticeSegmentType,
): string[] {
  if (segmentType === "water_break") return [];
  if (segmentType === "movement_prep") return supportByAge[ageGroupId].slice(0, 1);
  if (segmentType === "speed_agility" || segmentType === "conditioning") {
    return supportByAge[ageGroupId].slice(0, 2);
  }
  if (segmentType === "cooldown") return supportByAge[ageGroupId].slice(-1);
  if (segmentType === "team_concept") return supportByAge[ageGroupId].slice(1);
  return focusDrills[ageGroupId][focus];
}

function planWarning(ageGroupId: AgeGroupId, durationMin: number): string | undefined {
  const ageGroup = ageGroupById[ageGroupId];

  if (ageGroupId !== "hs_elite" && durationMin === 120) return warning120;
  if (ageGroup && durationMin > ageGroup.recommendedMax) {
    return `${durationMin} minutes exceeds the ${ageGroup.label} recommended range of ${ageGroup.recommendedDuration}. Add water, teaching pauses, lower-intensity games, and recovery.`;
  }

  return undefined;
}

function intensityFor(input: Intensity, selected: PracticeIntensity): Intensity {
  if (selected === "light" && input === "high") return "medium";
  if (selected === "light" && input === "medium") return "low";
  if (selected === "high" && input === "low") return "medium";
  return input;
}

export function generatePracticePlan({
  ageGroupId,
  durationMin,
  focus,
  intensity,
}: GeneratePracticePlanArgs): GeneratedPracticePlan {
  const normalizedAge = normalizeAge(ageGroupId);
  const normalizedDuration = normalizeDuration(durationMin);
  const segments = generatedTemplates[normalizedDuration].map((template) =>
    segment({
      ...template,
      drillIds: generatedSegmentDrills(normalizedAge, focus, template.segmentType),
      coachingEmphasis:
        template.segmentType === "water_break"
          ? "Hydrate, reset roles, and protect work:rest quality."
          : "Use age-appropriate drills first, coach the main cue, and stop the block if quality drops.",
      intensity: intensityFor(template.intensity, intensity),
    }),
  );

  return plan({
    id: `${ageGroupId}-${focus}-${normalizedDuration}-${intensity}`,
    title: `${ageGroupById[ageGroupId]?.label ?? "Practice"} generated plan`,
    ageGroupId,
    durationMin: normalizedDuration,
    format: "recommended",
    goal: `Generated ${focus.replaceAll("_", " ")} practice with exact ${normalizedDuration}-minute total.`,
    warning: planWarning(ageGroupId, normalizedDuration),
    planWarning: planWarning(ageGroupId, normalizedDuration),
    segments,
    loadNote:
      ageGroupId === "hs_elite"
        ? "Manage high-intensity volume and preserve game-speed quality."
        : "Keep work:rest age-appropriate and use teaching resets before fatigue changes movement quality.",
    focus,
    selectedIntensity: intensity,
  } as GeneratedPracticePlan) as GeneratedPracticePlan;
}
