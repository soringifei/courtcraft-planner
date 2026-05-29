import type { AgeGroupId, AgeGroupTrainingProfile } from "./types";

export const coreAgeGroupIds: AgeGroupId[] = ["u8", "u11", "u14", "hs_elite"];

export const ageGroupTrainingProfiles: AgeGroupTrainingProfile[] = [
  {
    ageGroupId: "u8",
    title: "U8",
    ageRange: "Ages 7-8",
    recommendedDurationMin: 45,
    recommendedDurationMax: 60,
    intensiveDurationMin: 120,
    mainGoal:
      "Make basketball feel fun while building coordination, basic ball control, balance, and simple scoring foundations.",
    developmentPriorities: [
      {
        title: "Skill development priority",
        description: "Dribble, stop, pass, and finish from close range with playful constraints and very short lines.",
      },
      {
        title: "Movement priority",
        description: "Coordination, balance, skipping, crawling, simple reactions, and low-level landing control.",
      },
      {
        title: "Decision-making priority",
        description: "Recognize a coach cue, find open space, and choose between dribble, pass, or finish in simple games.",
      },
      {
        title: "Team concept priority",
        description: "Pass and follow, share space, listen to resets, and rotate safely in small groups.",
      },
      {
        title: "Strength & conditioning priority",
        description: "Use movement games only: no intense conditioning, heavy strength, or advanced plyometrics.",
      },
    ],
    avoid: [
      "Long lines where players wait more than they move.",
      "Fatigue-based punishment or hard conditioning.",
      "High-volume jumping, collisions, or contact finishing.",
      "Complex plays that hide the basic movement and ball-control goal.",
    ],
    loadGuidance:
      "Keep this playful. Avoid long lines, fatigue-based punishment, and high-volume jumping.",
    recommendedPlanId: "u8-recommended-60",
    intensivePlanId: "u8-camp-120",
    featuredCategoryIds: [
      "ball_handling",
      "passing",
      "shooting",
      "finishing",
      "decision_making",
      "small_sided_games",
      "movement_prep",
      "multiplanar_speed",
      "recovery",
    ],
    featuredStrengthConditioningCategoryIds: [
      "movement_prep",
      "strength_conditioning",
      "multiplanar_speed",
      "recovery",
    ],
    multiplanarSpeedFocus: {
      explanation:
        "U8 multiplanar speed is not formal speed training. It is playful body control: mirror games, freeze tag, cone reactions, and balance stops that help children move safely in every direction.",
      movementPatterns: [
        "sprint to stop",
        "sprint to shuffle",
        "shuffle to recover",
        "reaction to change of direction",
      ],
      recommendedDrillIds: [
        "u8-mirror-tag-coordination",
        "u8-color-cone-reaction",
        "u8-balance-stop-islands",
        "defensive-stance-freeze-tag",
      ],
      basketballTransfer: [
        "Stops under control after a dribble cue.",
        "Defensive stance games without contact.",
        "Safer reactions to loose balls and coach signals.",
      ],
    },
  },
  {
    ageGroupId: "u11",
    title: "U11",
    ageRange: "Ages 9-11",
    recommendedDurationMin: 60,
    recommendedDurationMax: 75,
    intensiveDurationMin: 120,
    mainGoal:
      "Build reliable footwork, ball control, passing windows, form shooting, layup variety, and basic 1v1 decisions.",
    developmentPriorities: [
      {
        title: "Skill development priority",
        description: "Use stations for ball handling, passing, shooting feet, weak-hand finishing, and basic pressure.",
      },
      {
        title: "Movement priority",
        description: "Teach acceleration, deceleration, lateral movement, balance, and bodyweight control before hard cutting.",
      },
      {
        title: "Decision-making priority",
        description: "Use 1v1 and 2v1 constraints so players learn when to finish, pass, or reset.",
      },
      {
        title: "Team concept priority",
        description: "Introduce shell language, closeout-to-contain habits, and basic spacing without overloading plays.",
      },
      {
        title: "Strength & conditioning priority",
        description: "Use bodyweight strength games, coordination, short reactions, and basic speed mechanics.",
      },
    ],
    avoid: [
      "Heavy strength or maximal jumping.",
      "Excessive conditioning that makes skill mechanics worse.",
      "High-speed cutting before players can stop safely.",
      "Too many team rules before players understand spacing and containment.",
    ],
    loadGuidance:
      "Use short competitive blocks. Teach stopping and body control before high-speed cutting.",
    recommendedPlanId: "u11-recommended-75",
    intensivePlanId: "u11-camp-120",
    featuredCategoryIds: [
      "ball_handling",
      "passing",
      "shooting",
      "finishing",
      "defense",
      "rebounding",
      "decision_making",
      "team_concepts",
      "small_sided_games",
      "movement_prep",
      "strength_conditioning",
      "multiplanar_speed",
      "recovery",
    ],
    featuredStrengthConditioningCategoryIds: [
      "movement_prep",
      "strength_conditioning",
      "multiplanar_speed",
      "conditioning",
      "recovery",
    ],
    multiplanarSpeedFocus: {
      explanation:
        "U11 players can start linking speed to control: shuffle-sprint games, first-step races, stop-land-balance drills, and mirror reactions.",
      movementPatterns: [
        "sprint to stop",
        "sprint to shuffle",
        "closeout to contain",
        "shuffle to recover",
        "reaction to change of direction",
      ],
      recommendedDrillIds: [
        "u11-first-step-races",
        "u11-stop-land-balance",
        "u11-lateral-line-shuffle",
        "u11-partner-reaction-mirror",
      ],
      basketballTransfer: [
        "First step out of triple-threat or catch.",
        "Safer stops before a pass, shot, or pivot.",
        "Basic defensive slides and closeout containment.",
      ],
    },
  },
  {
    ageGroupId: "u14",
    title: "U14",
    ageRange: "Ages 12-14",
    recommendedDurationMin: 75,
    recommendedDurationMax: 90,
    intensiveDurationMin: 120,
    mainGoal:
      "Develop decision-making, constrained finishing, movement shooting, spacing, defensive habits, and controlled athletic development.",
    developmentPriorities: [
      {
        title: "Skill development priority",
        description: "Train change of pace, finishing constraints, shooting off movement, and advantage decisions.",
      },
      {
        title: "Movement priority",
        description: "Use structured warm-ups, acceleration, deceleration, lateral speed, and landing mechanics.",
      },
      {
        title: "Decision-making priority",
        description: "Use closeout reads, 3v2 advantage, and small-sided games that force real choices.",
      },
      {
        title: "Team concept priority",
        description: "Teach spacing, shell defense, transition lanes, and simple action walkthroughs.",
      },
      {
        title: "Strength & conditioning priority",
        description: "Add single-leg strength, core stiffness, low-volume plyometrics, and small-sided conditioning.",
      },
    ],
    avoid: [
      "Stacking contact finishing, transition, and conditioning without recovery.",
      "High-impact plyometric volume before landing mechanics are consistent.",
      "Complex tactical installs that do not connect to the day's skill.",
      "Fatigue that turns closeouts, cuts, and landings into poor reps.",
    ],
    loadGuidance:
      "Introduce deceleration and landing mechanics carefully. Do not stack too many high-impact drills.",
    recommendedPlanId: "u14-recommended-90",
    intensivePlanId: "u14-intensive-120",
    featuredCategoryIds: [
      "ball_handling",
      "passing",
      "shooting",
      "finishing",
      "defense",
      "rebounding",
      "decision_making",
      "team_concepts",
      "small_sided_games",
      "movement_prep",
      "strength_conditioning",
      "multiplanar_speed",
      "conditioning",
      "recovery",
    ],
    featuredStrengthConditioningCategoryIds: [
      "movement_prep",
      "strength_conditioning",
      "multiplanar_speed",
      "conditioning",
      "recovery",
    ],
    multiplanarSpeedFocus: {
      explanation:
        "U14 multiplanar speed should connect acceleration, deceleration, lateral speed, hip turns, and closeouts to the same reads players face in games.",
      movementPatterns: [
        "sprint to stop",
        "sprint to shuffle",
        "backpedal to hip turn",
        "hip turn to sprint",
        "crossover run to closeout",
        "closeout to contain",
        "shuffle to recover",
      ],
      recommendedDrillIds: [
        "u14-sprint-to-stick",
        "u14-crossover-run-closeout",
        "u14-hip-turn-reaction",
        "u14-small-sided-conditioning",
      ],
      basketballTransfer: [
        "Closeout, cut, and recover sequences.",
        "Transition stops and defensive conversion.",
        "Safer finishing and contest landings.",
      ],
    },
  },
  {
    ageGroupId: "hs_elite",
    title: "High School / Elite",
    ageRange: "Grades 9-12 / ages 15-18",
    recommendedDurationMin: 90,
    recommendedDurationMax: 120,
    intensiveDurationMin: 120,
    mainGoal:
      "Train advanced reads, pressure decisions, shooting volume, advantage creation, defensive rotations, S&C, and conditioning.",
    developmentPriorities: [
      {
        title: "Skill development priority",
        description: "Use pro-level training structure for shooting volume, ball-screen reads, late-clock play, and advantage creation.",
      },
      {
        title: "Movement priority",
        description: "Train acceleration, deceleration, lateral speed, crossover run, hip turns, closeouts, and recoveries.",
      },
      {
        title: "Decision-making priority",
        description: "Force reads under pressure: reject, snake, shake, rotate, convert, and solve late-clock constraints.",
      },
      {
        title: "Team concept priority",
        description: "Connect X-outs, transition conversion, weak-side movement, and 4v4 advantage constraints.",
      },
      {
        title: "Strength & conditioning priority",
        description: "Use single-leg strength, core stiffness, basketball-specific multiplanar speed, and conditioning finishers.",
      },
    ],
    avoid: [
      "Letting fatigue lower shot, closeout, or landing quality.",
      "Conditioning that is disconnected from basketball actions.",
      "Maximal high-speed work without full recovery.",
      "Overloading contact and deceleration on the same day without planning.",
    ],
    loadGuidance:
      "High-intensity blocks are appropriate, but manage work-rest and avoid poor-quality reps under fatigue.",
    recommendedPlanId: "hs-elite-recommended-120",
    intensivePlanId: "hs-elite-recommended-120",
    featuredCategoryIds: [
      "ball_handling",
      "passing",
      "shooting",
      "finishing",
      "defense",
      "rebounding",
      "decision_making",
      "team_concepts",
      "small_sided_games",
      "movement_prep",
      "strength_conditioning",
      "multiplanar_speed",
      "conditioning",
      "recovery",
    ],
    featuredStrengthConditioningCategoryIds: [
      "movement_prep",
      "strength_conditioning",
      "multiplanar_speed",
      "conditioning",
      "recovery",
    ],
    multiplanarSpeedFocus: {
      explanation:
        "High School / Elite multiplanar speed is basketball-specific: sprint, shuffle, backpedal, hip turn, closeout, contain, recover, and repeat under decision pressure.",
      movementPatterns: [
        "sprint to stop",
        "sprint to shuffle",
        "backpedal to hip turn",
        "hip turn to sprint",
        "crossover run to closeout",
        "closeout to contain",
        "shuffle to recover",
        "reaction to change of direction",
      ],
      recommendedDrillIds: [
        "hs-sprint-shuffle-backpedal-box",
        "hs-360-cone-reaction",
        "hs-closeout-cut-recover-chain",
        "hs-reactive-x-out-footwork",
        "transition-conversion-defense",
        "x-out-defensive-rotation",
      ],
      basketballTransfer: [
        "Conversion defense and scramble rotations.",
        "Closeout-cut-recover chains against drive-and-kick.",
        "Late-clock containment and repeated high-quality efforts.",
      ],
    },
  },
];

export const ageGroupTrainingProfileById = Object.fromEntries(
  ageGroupTrainingProfiles.map((profile) => [profile.ageGroupId, profile]),
) as Partial<Record<AgeGroupId, AgeGroupTrainingProfile>>;
