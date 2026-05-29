import type { CourtDiagram, Drill } from "./types";

type Players = CourtDiagram["players"];
type Lines = CourtDiagram["lines"];
type Cones = NonNullable<CourtDiagram["cones"]>;
type Spots = NonNullable<CourtDiagram["spots"]>;
type Zones = NonNullable<CourtDiagram["zones"]>;

const halfDiagram = (
  players: Players,
  lines: Lines,
  extras: { cones?: Cones; spots?: Spots; zones?: Zones } = {},
): CourtDiagram => ({
  mode: "half",
  players,
  lines,
  ...extras,
});

const fullDiagram = (
  players: Players,
  lines: Lines,
  extras: { cones?: Cones; spots?: Spots; zones?: Zones } = {},
): CourtDiagram => ({
  mode: "full",
  players,
  lines,
  ...extras,
});

export const drills = [
  {
    id: "red-light-green-light-dribble",
    title: "Red Light Green Light Dribble",
    category: "ball_handling",
    ageGroups: ["u8"],
    durationMin: 8,
    intensity: "low",
    playersMin: 4,
    playersMax: 16,
    equipment: ["basketballs", "cones"],
    courtMode: "half",
    objective:
      "Build stop-start control, eyes-up dribbling, and balance without rushing young players.",
    setup: [
      "Each player starts on the baseline with a ball.",
      "Set a finish line at half court or the far free throw line.",
      "Coach stands where every player can see the green, yellow, and red calls.",
    ],
    execution: [
      "On green, players dribble forward with control.",
      "On yellow, they slow down and keep the ball below the waist.",
      "On red, they jump stop, freeze, and show a strong athletic stance.",
      "If a player loses control, they reset two steps back and continue.",
    ],
    coachingCues: [
      "Push the ball forward on green but keep it close enough to stop.",
      "Eyes scan the coach, not the floor.",
      "Freeze with knees bent, chest tall, and off hand ready.",
    ],
    commonMistakes: [
      "Players sprint ahead of the ball; cue shorter pushes and earlier brakes.",
      "Players stop with narrow feet; reset them into a jump stop base.",
      "Players stare down; ask them to call out the coach signal.",
    ],
    regression: "Use no defense and shorten the lane to 20 feet.",
    progression:
      "Add a retreat dribble on red before the next green call.",
    scoring:
      "Players earn one point for each clean freeze with no travel or ball pickup.",
    safetyNote:
      "Keep lanes wide so young players do not collide while watching the coach.",
    diagram: halfDiagram(
      [
        { id: "p1", label: "1", role: "offense", x: 25, y: 88 },
        { id: "p2", label: "2", role: "offense", x: 50, y: 88 },
        { id: "p3", label: "3", role: "offense", x: 75, y: 88 },
        { id: "c", label: "C", role: "coach", x: 50, y: 40 },
      ],
      [
        {
          id: "d1",
          type: "dribble",
          from: { x: 25, y: 86 },
          to: { x: 25, y: 48 },
          label: "green",
        },
        {
          id: "d2",
          type: "dribble",
          from: { x: 50, y: 86 },
          to: { x: 50, y: 48 },
          label: "yellow",
        },
        {
          id: "d3",
          type: "dribble",
          from: { x: 75, y: 86 },
          to: { x: 75, y: 48 },
          label: "red",
        },
      ],
      {
        cones: [
          { id: "finish-left", x: 10, y: 45, label: "finish" },
          { id: "finish-right", x: 90, y: 45 },
        ],
      },
    ),
  },
  {
    id: "cone-island-ball-control",
    title: "Cone Island Ball Control",
    category: "ball_handling",
    ageGroups: ["u8"],
    durationMin: 8,
    intensity: "low",
    playersMin: 4,
    playersMax: 14,
    equipment: ["basketballs", "cones"],
    courtMode: "half",
    objective:
      "Teach young players to change direction around space while protecting the ball.",
    setup: [
      "Scatter cones as islands inside the half court.",
      "Each player has one ball and begins at a different cone.",
      "Designate one sideline as the reset area for players who need help.",
    ],
    execution: [
      "Players dribble from island to island without touching cones.",
      "At each island they perform a low pound, crossover, or turn.",
      "Coach calls the next island color or number.",
      "Players finish by dribbling to the rim for a controlled layup attempt.",
    ],
    coachingCues: [
      "Slow before the cone, change direction, then re-accelerate.",
      "Keep the outside hand between the ball and traffic.",
      "Make the move small enough to control.",
    ],
    commonMistakes: [
      "Players loop too wide; move the cone closer and cue a tight shoulder turn.",
      "Players slap the ball; cue finger pads and quiet control.",
      "Players crash into islands; reduce the number of active players.",
    ],
    regression: "Use walking speed and only right-hand or left-hand dribbles.",
    progression:
      "Add a defender shadow who cannot steal but can occupy space.",
    scoring:
      "One point for each clean island change plus two points for a made layup.",
    safetyNote:
      "Limit traffic density and stop play quickly when multiple players chase the same cone.",
    diagram: halfDiagram(
      [
        { id: "p1", label: "1", role: "offense", x: 22, y: 72 },
        { id: "p2", label: "2", role: "offense", x: 58, y: 78 },
        { id: "p3", label: "3", role: "offense", x: 76, y: 48 },
      ],
      [
        {
          id: "d1",
          type: "dribble",
          from: { x: 22, y: 72 },
          to: { x: 45, y: 55 },
          label: "island",
        },
        {
          id: "d2",
          type: "dribble",
          from: { x: 58, y: 78 },
          to: { x: 72, y: 62 },
        },
        {
          id: "shot",
          type: "shot",
          from: { x: 72, y: 62 },
          to: { x: 50, y: 10 },
          label: "finish",
        },
      ],
      {
        cones: [
          { id: "a", x: 25, y: 72, label: "A" },
          { id: "b", x: 45, y: 55, label: "B" },
          { id: "c", x: 72, y: 62, label: "C" },
          { id: "d", x: 36, y: 36, label: "D" },
        ],
      },
    ),
  },
  {
    id: "partner-mirror-movement",
    title: "Partner Mirror Movement",
    category: "movement",
    ageGroups: ["u8"],
    durationMin: 6,
    intensity: "low",
    playersMin: 2,
    playersMax: 16,
    equipment: ["cones"],
    courtMode: "half",
    objective:
      "Develop balance, coordination, and defensive movement through a simple mirror game.",
    setup: [
      "Pair players facing each other across a short lane.",
      "Use cones to create a five-yard movement box.",
      "One player is the leader and one is the mirror.",
    ],
    execution: [
      "Leader slides, backpedals, or shuffles inside the box.",
      "Mirror matches the movement while staying in a low stance.",
      "Switch roles every 20 to 30 seconds.",
      "Finish each rep with both players calling out their best balance cue.",
    ],
    coachingCues: [
      "Move the feet before reaching with the hands.",
      "Stay low enough to change direction without crossing feet.",
      "Keep the head still and the chest facing the partner.",
    ],
    commonMistakes: [
      "Players hop instead of sliding; slow the leader down.",
      "Players cross feet; restart with a narrower box.",
      "Players lean forward; cue chest tall and knees bent.",
    ],
    regression: "Use coach-directed movements so both players know the pattern.",
    progression: "Add a ball to the leader and make the mirror contain the drive.",
    scoring:
      "Mirror earns a point for staying balanced until the switch call.",
    safetyNote:
      "Keep boxes separated so pairs do not backpedal into each other.",
    diagram: halfDiagram(
      [
        { id: "leader", label: "L", role: "offense", x: 42, y: 62 },
        { id: "mirror", label: "M", role: "defense", x: 58, y: 62 },
      ],
      [
        {
          id: "slide1",
          type: "defensive_slide",
          from: { x: 42, y: 62 },
          to: { x: 30, y: 62 },
          label: "mirror",
        },
        {
          id: "slide2",
          type: "defensive_slide",
          from: { x: 58, y: 62 },
          to: { x: 70, y: 62 },
        },
      ],
      {
        zones: [
          { id: "box", label: "mirror box", x: 25, y: 52, width: 50, height: 22 },
        ],
      },
    ),
  },
  {
    id: "treasure-chest-dribbling-game",
    title: "Treasure Chest Dribbling Game",
    category: "ball_handling",
    ageGroups: ["u8"],
    durationMin: 10,
    intensity: "medium",
    playersMin: 6,
    playersMax: 18,
    equipment: ["basketballs", "cones", "pinnies"],
    courtMode: "half",
    objective:
      "Combine ball control, spatial awareness, and fun competition for young players.",
    setup: [
      "Place cones or pinnies in a treasure zone near the free throw line.",
      "Split players into two or three teams on the baseline.",
      "Every player has a ball and must dribble while collecting treasure.",
    ],
    execution: [
      "On the whistle, one player from each team dribbles to the treasure zone.",
      "They pick up one item, keep the dribble alive if possible, and return home.",
      "The next teammate goes when the item is placed in the team chest.",
      "Play short rounds and rotate starting teams.",
    ],
    coachingCues: [
      "Control first, speed second.",
      "Use the body to protect the ball while bending for treasure.",
      "Stop with two feet before handing off to the next teammate.",
    ],
    commonMistakes: [
      "Players carry items with both hands and abandon the ball; allow a pickup only inside the zone.",
      "Players run into traffic; widen team lanes.",
      "Players bend at the waist; cue knees bent and eyes forward.",
    ],
    regression: "Remove the live dribble requirement inside the treasure zone.",
    progression:
      "Add a coach defender who shadows the return lane without stealing.",
    scoring:
      "Team with the most treasure after two minutes wins; bonus point for no collisions.",
    safetyNote:
      "Use soft items and short rounds to avoid fatigue-based collisions.",
    diagram: halfDiagram(
      [
        { id: "a1", label: "A", role: "offense", x: 25, y: 88 },
        { id: "b1", label: "B", role: "offense", x: 50, y: 88 },
        { id: "c1", label: "C", role: "offense", x: 75, y: 88 },
      ],
      [
        {
          id: "a-run",
          type: "dribble",
          from: { x: 25, y: 86 },
          to: { x: 43, y: 50 },
          label: "collect",
        },
        {
          id: "b-run",
          type: "dribble",
          from: { x: 50, y: 86 },
          to: { x: 50, y: 50 },
        },
        {
          id: "c-run",
          type: "dribble",
          from: { x: 75, y: 86 },
          to: { x: 57, y: 50 },
        },
      ],
      {
        zones: [
          { id: "treasure", label: "treasure", x: 39, y: 44, width: 22, height: 13 },
        ],
        cones: [
          { id: "team-a", x: 25, y: 92, label: "A" },
          { id: "team-b", x: 50, y: 92, label: "B" },
          { id: "team-c", x: 75, y: 92, label: "C" },
        ],
      },
    ),
  },
  {
    id: "jump-stop-balance-race",
    title: "Jump Stop Balance Race",
    category: "movement",
    ageGroups: ["u8"],
    durationMin: 7,
    intensity: "low",
    playersMin: 4,
    playersMax: 14,
    equipment: ["basketballs", "cones"],
    courtMode: "half",
    objective:
      "Teach controlled jump stops, pivot balance, and clean starts before players move fast.",
    setup: [
      "Create two or three straight lanes from baseline to free throw line.",
      "Place a cone at the stop point and a second cone for the pivot gate.",
      "Players line up with a ball at the baseline.",
    ],
    execution: [
      "Player dribbles to the stop cone and lands on two feet.",
      "They hold balance for one count, pivot through the gate, and dribble back.",
      "Next teammate starts after a clean hand tag.",
      "Coach repeats reps until every player shows a stable stop.",
    ],
    coachingCues: [
      "Land quietly with feet outside the hips.",
      "Ball to chin or protected pocket after the stop.",
      "Pivot on the front of the foot without lifting the pivot foot.",
    ],
    commonMistakes: [
      "Players hop forward after landing; cue shorter final dribble.",
      "Players spin on the heel; demonstrate toe-ball pivot.",
      "Players race before controlling the stop; score only clean stops.",
    ],
    regression: "Remove the dribble and use toss-catch into a jump stop.",
    progression: "Add a coach call for front pivot or reverse pivot.",
    scoring:
      "Team scores only when the stop, pivot, and return are all clean.",
    safetyNote:
      "Keep lanes straight and require a clear hand tag before the next player starts.",
    diagram: halfDiagram(
      [
        { id: "p1", label: "1", role: "offense", x: 35, y: 88 },
        { id: "p2", label: "2", role: "offense", x: 65, y: 88 },
      ],
      [
        {
          id: "lane1",
          type: "dribble",
          from: { x: 35, y: 86 },
          to: { x: 35, y: 55 },
          label: "jump stop",
        },
        {
          id: "pivot1",
          type: "rotation",
          from: { x: 35, y: 55 },
          to: { x: 45, y: 55 },
          label: "pivot",
        },
        {
          id: "lane2",
          type: "dribble",
          from: { x: 65, y: 86 },
          to: { x: 65, y: 55 },
        },
      ],
      {
        cones: [
          { id: "s1", x: 35, y: 55, label: "stop" },
          { id: "s2", x: 65, y: 55, label: "stop" },
          { id: "g1", x: 45, y: 55, label: "gate" },
          { id: "g2", x: 75, y: 55, label: "gate" },
        ],
      },
    ),
  },
  {
    id: "form-shooting-close-finish",
    title: "Form Shooting Close Finish",
    category: "shooting",
    ageGroups: ["u8"],
    durationMin: 8,
    intensity: "low",
    playersMin: 2,
    playersMax: 8,
    equipment: ["basketballs"],
    courtMode: "half",
    objective:
      "Build close-range shooting touch with balanced feet and a soft release.",
    setup: [
      "Players start three to six feet from the rim.",
      "One rebounder or coach returns the ball to the shooter.",
      "Use both sides of the basket so lines stay short.",
    ],
    execution: [
      "Shooter starts with knees bent, guide hand quiet, and eyes on target.",
      "They shoot softly and hold the follow-through until the ball lands.",
      "After five makes or eight attempts, rotate shooter and rebounder.",
      "Finish with a simple close finish off one controlled dribble.",
    ],
    coachingCues: [
      "Feet under shoulders and toes toward the rim.",
      "Elbow under the ball, finish high, fingers down.",
      "Shoot up before shooting forward.",
    ],
    commonMistakes: [
      "Players push from the chest; move them closer and cue one-hand form.",
      "Guide hand twists the ball; have them freeze the guide hand.",
      "Players fade away; require a balanced landing.",
    ],
    regression: "Use one-hand shooting from directly in front of the rim.",
    progression: "Add catch-square-shoot footwork from each block.",
    scoring:
      "Count makes with a held follow-through; reset the streak if balance is lost.",
    safetyNote:
      "Keep rebounding players outside the landing space of the shooter.",
    diagram: halfDiagram(
      [
        { id: "s", label: "S", role: "offense", x: 45, y: 22 },
        { id: "r", label: "R", role: "neutral", x: 58, y: 18 },
      ],
      [
        {
          id: "shot",
          type: "shot",
          from: { x: 45, y: 22 },
          to: { x: 50, y: 9 },
          label: "soft finish",
        },
        {
          id: "rebound",
          type: "rebound",
          from: { x: 58, y: 18 },
          to: { x: 45, y: 22 },
          label: "return",
        },
      ],
      {
        spots: [
          { id: "front", x: 50, y: 24, label: "front" },
          { id: "left", x: 42, y: 20, label: "L" },
          { id: "right", x: 58, y: 20, label: "R" },
        ],
      },
    ),
  },
  {
    id: "mikan-intro-without-speed",
    title: "Mikan Intro Without Speed",
    category: "finishing",
    ageGroups: ["u8"],
    durationMin: 8,
    intensity: "low",
    playersMin: 2,
    playersMax: 8,
    equipment: ["basketballs"],
    courtMode: "half",
    objective:
      "Introduce right-left finishing footwork near the rim without turning it into a speed test.",
    setup: [
      "Players work under the basket in pairs.",
      "One player finishes while the partner rebounds and returns the ball.",
      "Start on the right side, then alternate sides.",
    ],
    execution: [
      "Player steps with the outside foot and finishes with the outside hand.",
      "They rebound or receive the ball and move to the opposite side.",
      "Coach pauses after each rep if footwork or hand choice is wrong.",
      "Rotate after six controlled finishes.",
    ],
    coachingCues: [
      "Right side, right hand; left side, left hand.",
      "Knee and ball rise together.",
      "Use the square softly instead of throwing the ball.",
    ],
    commonMistakes: [
      "Players use the inside hand; rehearse without a ball first.",
      "Players rush under the rim; slow the rhythm to step-lift-finish.",
      "Players drift behind the backboard; set a spot outside the rim line.",
    ],
    regression: "Use stationary one-side layups before alternating.",
    progression: "Add one power dribble before each finish.",
    scoring:
      "Score one point for correct foot-hand pattern and one point for a make.",
    safetyNote:
      "Limit the drill to one active finisher per side to avoid under-rim contact.",
    diagram: halfDiagram(
      [
        { id: "p", label: "1", role: "offense", x: 42, y: 15 },
        { id: "r", label: "R", role: "neutral", x: 58, y: 16 },
      ],
      [
        {
          id: "right",
          type: "shot",
          from: { x: 42, y: 15 },
          to: { x: 50, y: 9 },
          label: "right",
        },
        {
          id: "left",
          type: "cut",
          from: { x: 50, y: 9 },
          to: { x: 58, y: 16 },
          label: "alternate",
        },
      ],
      {
        spots: [
          { id: "rspot", x: 42, y: 15, label: "R hand" },
          { id: "lspot", x: 58, y: 16, label: "L hand" },
        ],
      },
    ),
  },
  {
    id: "pass-and-follow",
    title: "Pass And Follow",
    category: "passing",
    ageGroups: ["u8"],
    durationMin: 8,
    intensity: "low",
    playersMin: 4,
    playersMax: 12,
    equipment: ["basketballs", "cones"],
    courtMode: "half",
    objective:
      "Teach pass accuracy, moving after a pass, and spacing in a simple pattern.",
    setup: [
      "Create three cone stations in a triangle.",
      "Put at least one player at each station and one ball at the first station.",
      "Players pass clockwise and follow their pass to the next line.",
    ],
    execution: [
      "Passer calls the receiver's name and steps to the target.",
      "Receiver shows hands, catches, pivots, and passes to the next station.",
      "Passer follows the pass and fills the receiver's old spot.",
      "Reverse direction after one clean minute.",
    ],
    coachingCues: [
      "Thumbs finish down on chest passes.",
      "Show a target before the ball is passed.",
      "Pass, then move with eyes up.",
    ],
    commonMistakes: [
      "Players pass and stand; call out follow immediately after release.",
      "Receivers hide their hands; require ten fingers to the ball.",
      "Passes float; move stations closer and cue step-through passing.",
    ],
    regression: "Use shorter station distance and stationary receivers.",
    progression: "Add a layup after every third pass.",
    scoring:
      "Team scores for consecutive clean catches without a dropped ball.",
    safetyNote:
      "Keep one ball in the triangle until the group can pass and move safely.",
    diagram: halfDiagram(
      [
        { id: "a", label: "A", role: "offense", x: 30, y: 72 },
        { id: "b", label: "B", role: "offense", x: 70, y: 72 },
        { id: "c", label: "C", role: "offense", x: 50, y: 42 },
      ],
      [
        {
          id: "ab",
          type: "pass",
          from: { x: 30, y: 72 },
          to: { x: 70, y: 72 },
          label: "pass",
        },
        {
          id: "follow",
          type: "cut",
          from: { x: 30, y: 72 },
          to: { x: 70, y: 72 },
          label: "follow",
        },
        {
          id: "bc",
          type: "pass",
          from: { x: 70, y: 72 },
          to: { x: 50, y: 42 },
        },
      ],
      {
        cones: [
          { id: "ca", x: 30, y: 72 },
          { id: "cb", x: 70, y: 72 },
          { id: "cc", x: 50, y: 42 },
        ],
      },
    ),
  },
  {
    id: "defensive-stance-freeze-tag",
    title: "Defensive Stance Freeze Tag",
    category: "defense",
    ageGroups: ["u8"],
    durationMin: 8,
    intensity: "medium",
    playersMin: 6,
    playersMax: 18,
    equipment: ["cones"],
    courtMode: "half",
    objective:
      "Make defensive stance and change of direction playful while controlling workload.",
    setup: [
      "Mark a safe half-court area with cones.",
      "Choose two taggers who must move in a defensive slide.",
      "Other players move without balls and freeze in stance when tagged.",
    ],
    execution: [
      "Taggers slide to tag players below the shoulders.",
      "Tagged players freeze in a low defensive stance.",
      "A teammate can unfreeze them with a high-five and stance call.",
      "Rotate taggers every 45 seconds.",
    ],
    coachingCues: [
      "Short slides beat big lunges.",
      "Hands active but no pushing.",
      "Freeze with hips low and feet outside shoulders.",
    ],
    commonMistakes: [
      "Taggers run upright; stop and reset them into slide-only movement.",
      "Players tag too hard; require light shoulder-level touches only.",
      "Frozen players stand up; count only freezes held in stance.",
    ],
    regression: "Use one tagger and a smaller movement area.",
    progression: "Add a coach call that changes the direction of every player.",
    scoring:
      "Taggers score for legal slide tags; runners score for clean unfreezes.",
    safetyNote:
      "Use brief rounds and clear no-contact rules beyond light tags.",
    diagram: halfDiagram(
      [
        { id: "t1", label: "T", role: "defense", x: 35, y: 56 },
        { id: "t2", label: "T", role: "defense", x: 65, y: 56 },
        { id: "r1", label: "1", role: "neutral", x: 22, y: 78 },
        { id: "r2", label: "2", role: "neutral", x: 75, y: 72 },
      ],
      [
        {
          id: "tag1",
          type: "defensive_slide",
          from: { x: 35, y: 56 },
          to: { x: 22, y: 78 },
          label: "slide tag",
        },
        {
          id: "tag2",
          type: "defensive_slide",
          from: { x: 65, y: 56 },
          to: { x: 75, y: 72 },
        },
      ],
      {
        zones: [
          { id: "tag-box", label: "tag area", x: 15, y: 43, width: 70, height: 42 },
        ],
      },
    ),
  },
  {
    id: "numbers-layup-game",
    title: "Numbers Layup Game",
    category: "finishing",
    ageGroups: ["u8"],
    durationMin: 10,
    intensity: "medium",
    playersMin: 6,
    playersMax: 16,
    equipment: ["basketballs"],
    courtMode: "half",
    objective:
      "Connect listening, quick starts, and controlled layup finishes in a competitive game.",
    setup: [
      "Split players into two teams on opposite wings.",
      "Assign each player a number mirrored on both teams.",
      "Coach holds one ball near the top of the key.",
    ],
    execution: [
      "Coach calls a number and rolls or passes the ball into play.",
      "The two called players race to secure the ball.",
      "The player who wins the ball attacks the rim for a layup.",
      "The other player gives light chase pressure without body contact.",
    ],
    coachingCues: [
      "First touch controls the ball before speed.",
      "Angle to the basket, do not run under the rim.",
      "Use the correct hand on the correct side.",
    ],
    commonMistakes: [
      "Players dive into contact; enforce no body bumps.",
      "Players overrun the ball; use a softer roll and shorter start.",
      "Players finish from behind the rim; place a takeoff spot.",
    ],
    regression: "Remove the defender and let each called player finish separately.",
    progression: "Call two numbers for a 2v2 advantage read.",
    scoring:
      "One point for securing the ball cleanly and two points for a made layup.",
    safetyNote:
      "Keep chase contact light and stop any loose-ball pileups immediately.",
    diagram: halfDiagram(
      [
        { id: "a3", label: "3", role: "offense", x: 25, y: 62 },
        { id: "b3", label: "3", role: "defense", x: 75, y: 62 },
        { id: "coach", label: "C", role: "coach", x: 50, y: 52 },
      ],
      [
        {
          id: "roll",
          type: "pass",
          from: { x: 50, y: 52 },
          to: { x: 50, y: 35 },
          label: "loose ball",
        },
        {
          id: "attack",
          type: "dribble",
          from: { x: 50, y: 35 },
          to: { x: 50, y: 10 },
          label: "layup",
        },
      ],
      {
        spots: [{ id: "takeoff", x: 44, y: 18, label: "takeoff" }],
      },
    ),
  },
  {
    id: "zig-zag-change-of-direction",
    title: "Zig-Zag Change of Direction",
    category: "ball_handling",
    ageGroups: ["u11", "u14"],
    durationMin: 12,
    intensity: "medium",
    playersMin: 3,
    playersMax: 12,
    equipment: ["basketballs", "cones"],
    courtMode: "half",
    objective:
      "Train controlled changes of direction with eyes up and a useful push out of each move.",
    setup: [
      "Place five cones in a zig-zag from baseline to wing.",
      "Players line up with a ball at the first cone.",
      "Coach names the move for each round: crossover, between, behind, or retreat.",
    ],
    execution: [
      "Player attacks the outside shoulder of each cone.",
      "They change direction at the cone and push out for two hard dribbles.",
      "After the last cone, they finish with a layup or short pull-up.",
      "Next player starts when the first player clears the second cone.",
    ],
    coachingCues: [
      "Sell the shoulder before changing direction.",
      "Low hips make the move faster and safer.",
      "Push the ball to space after the move.",
    ],
    commonMistakes: [
      "Players dribble around cones without changing pace; require a clear slow-fast rhythm.",
      "Moves happen too far from the cone; cue attack the cone's outside hip.",
      "Eyes drop; call out fingers shown by the coach.",
    ],
    regression: "Use only crossover changes at walking speed.",
    progression: "Add a live defender after the final cone for a 1v1 finish.",
    scoring:
      "One point per clean change plus two points for a make at the end.",
    safetyNote:
      "Stagger starts so players do not collide near the final finish.",
    diagram: halfDiagram(
      [
        { id: "p", label: "1", role: "offense", x: 20, y: 88 },
        { id: "c", label: "C", role: "coach", x: 82, y: 46 },
      ],
      [
        {
          id: "zig",
          type: "dribble",
          from: { x: 20, y: 88 },
          to: { x: 68, y: 24 },
          label: "change pace",
        },
        {
          id: "finish",
          type: "shot",
          from: { x: 68, y: 24 },
          to: { x: 50, y: 9 },
        },
      ],
      {
        cones: [
          { id: "z1", x: 30, y: 76 },
          { id: "z2", x: 52, y: 66 },
          { id: "z3", x: 35, y: 54 },
          { id: "z4", x: 60, y: 42 },
          { id: "z5", x: 68, y: 28 },
        ],
      },
    ),
  },
  {
    id: "pound-cross-retreat-series",
    title: "Pound-Cross-Retreat Series",
    category: "ball_handling",
    ageGroups: ["u11", "u14"],
    durationMin: 10,
    intensity: "medium",
    playersMin: 2,
    playersMax: 14,
    equipment: ["basketballs", "cones"],
    courtMode: "half",
    objective:
      "Build a pressure handle sequence that combines power, separation, and re-attack.",
    setup: [
      "Players spread along the sideline with a ball.",
      "Each player has a cone two strides in front as the pressure marker.",
      "Coach demonstrates the rhythm: pound, cross, retreat, attack.",
    ],
    execution: [
      "Player pounds the ball twice with the outside hand.",
      "They cross low, retreat two dribbles, then re-attack past the cone.",
      "Repeat on the opposite hand after each rep.",
      "Finish with a controlled stop or layup depending on space.",
    ],
    coachingCues: [
      "Retreat to create space, not to relax.",
      "Cross below the knees and move the feet with the ball.",
      "Re-attack the defender's top foot.",
    ],
    commonMistakes: [
      "Players retreat upright; cue hips down and shoulders over knees.",
      "Players cross in place; require a lateral step with the cross.",
      "Players rush the rhythm; clap the four-part cadence.",
    ],
    regression: "Remove the crossover and teach pound-retreat-attack first.",
    progression: "Add a guided defender who shades one side.",
    scoring:
      "Players earn a point when the sequence creates a clear shoulder advantage past the cone.",
    safetyNote:
      "Space players across the court so retreat dribbles do not enter another lane.",
    diagram: halfDiagram(
      [
        { id: "p", label: "1", role: "offense", x: 35, y: 72 },
        { id: "d", label: "D", role: "defense", x: 45, y: 58 },
      ],
      [
        {
          id: "attack",
          type: "dribble",
          from: { x: 35, y: 72 },
          to: { x: 45, y: 58 },
          label: "pound-cross",
        },
        {
          id: "retreat",
          type: "dribble",
          from: { x: 45, y: 58 },
          to: { x: 32, y: 70 },
          label: "retreat",
        },
        {
          id: "re-attack",
          type: "dribble",
          from: { x: 32, y: 70 },
          to: { x: 58, y: 36 },
          label: "attack",
        },
      ],
      {
        cones: [{ id: "pressure", x: 45, y: 58, label: "pressure" }],
      },
    ),
  },
  {
    id: "partner-passing-windows",
    title: "Partner Passing Windows",
    category: "passing",
    ageGroups: ["u11"],
    durationMin: 10,
    intensity: "low",
    playersMin: 4,
    playersMax: 16,
    equipment: ["basketballs", "cones"],
    courtMode: "half",
    objective:
      "Improve passing accuracy through moving targets and simple defender windows.",
    setup: [
      "Partners face each other ten to fifteen feet apart.",
      "Place two cones between them as a passing window.",
      "A coach or third player can slide between windows as passive pressure.",
    ],
    execution: [
      "Passer steps and delivers a chest, bounce, or push pass through the window.",
      "Receiver moves one step left or right, shows target hands, and catches on balance.",
      "After five clean passes, move the window or change pass type.",
      "Add a finish after the final catch in each set.",
    ],
    coachingCues: [
      "Pass to the receiver's outside hand when pressure is inside.",
      "Catch with feet ready to pass, shoot, or drive.",
      "Use bounce passes when the window is low.",
    ],
    commonMistakes: [
      "Passers aim at the defender; cue the open shoulder target.",
      "Receivers wait flat-footed; require a small relocation before the catch.",
      "Passes arrive late; shorten the distance and emphasize quick pickup.",
    ],
    regression: "Widen the cone window and remove movement.",
    progression: "Add a live deflector who can steal only inside the cone gate.",
    scoring:
      "Pairs try to complete ten window passes before one deflection.",
    safetyNote:
      "Use soft deflections only and keep extra balls outside the passing lane.",
    diagram: halfDiagram(
      [
        { id: "p1", label: "1", role: "offense", x: 28, y: 62 },
        { id: "p2", label: "2", role: "offense", x: 72, y: 62 },
        { id: "d", label: "D", role: "defense", x: 50, y: 62 },
      ],
      [
        {
          id: "pass",
          type: "pass",
          from: { x: 28, y: 62 },
          to: { x: 72, y: 62 },
          label: "window",
        },
        {
          id: "slide",
          type: "defensive_slide",
          from: { x: 50, y: 54 },
          to: { x: 50, y: 70 },
          label: "shade",
        },
      ],
      {
        cones: [
          { id: "w1", x: 47, y: 56 },
          { id: "w2", x: 47, y: 68 },
          { id: "w3", x: 53, y: 56 },
          { id: "w4", x: 53, y: 68 },
        ],
      },
    ),
  },
  {
    id: "catch-square-shoot",
    title: "Catch-Square-Shoot",
    category: "shooting",
    ageGroups: ["u11", "u14"],
    durationMin: 12,
    intensity: "medium",
    playersMin: 3,
    playersMax: 12,
    equipment: ["basketballs"],
    courtMode: "half",
    objective:
      "Teach players to arrive balanced on the catch and shoot with repeatable footwork.",
    setup: [
      "Use one passer at the wing, one shooter at the slot, and one rebounder.",
      "Mark three catch spots inside the player's comfortable range.",
      "Rotate shooter, passer, and rebounder after each set.",
    ],
    execution: [
      "Shooter starts one step away from the spot and moves into the catch.",
      "Passer delivers the ball to the shooting pocket.",
      "Shooter squares hips and shoulders, shoots, and holds the finish.",
      "Rebounder outlets quickly so the next rep starts on rhythm.",
    ],
    coachingCues: [
      "Feet arrive before the ball lands in the pocket.",
      "Catch with knees loaded, not locked.",
      "Show the same follow-through on makes and misses.",
    ],
    commonMistakes: [
      "Shooter drifts on the catch; mark a landing spot.",
      "Pass arrives low; require passer to hit the pocket.",
      "Shot gets rushed; reduce competition until balance holds.",
    ],
    regression: "Move spots closer and allow a pause after the catch.",
    progression: "Add a closeout defender arriving after the pass.",
    scoring:
      "Score three-point sets: one for footwork, one for pocket catch, one for make.",
    safetyNote:
      "Keep the defender's closeout controlled and outside the shooter's landing zone.",
    diagram: halfDiagram(
      [
        { id: "passer", label: "P", role: "offense", x: 22, y: 48 },
        { id: "shooter", label: "S", role: "offense", x: 52, y: 42 },
        { id: "r", label: "R", role: "neutral", x: 58, y: 18 },
      ],
      [
        {
          id: "pass",
          type: "pass",
          from: { x: 22, y: 48 },
          to: { x: 52, y: 42 },
          label: "pocket",
        },
        {
          id: "shot",
          type: "shot",
          from: { x: 52, y: 42 },
          to: { x: 50, y: 9 },
          label: "square",
        },
      ],
      {
        spots: [
          { id: "slot", x: 52, y: 42, label: "slot" },
          { id: "wing", x: 28, y: 45, label: "wing" },
          { id: "corner", x: 20, y: 25, label: "corner" },
        ],
      },
    ),
  },
  {
    id: "one-two-step-form-shooting",
    title: "1-2 Step Form Shooting",
    category: "shooting",
    ageGroups: ["u11"],
    durationMin: 10,
    intensity: "low",
    playersMin: 2,
    playersMax: 10,
    equipment: ["basketballs"],
    courtMode: "half",
    objective:
      "Build shooting footwork by linking an inside-outside 1-2 step to a stable release.",
    setup: [
      "Put shooters at short corner, wing, and slot within form range.",
      "Each shooter has a rebounder or rotates after each make.",
      "Coach names the inside foot for each spot.",
    ],
    execution: [
      "Shooter steps with the inside foot, then outside foot, and catches loaded.",
      "They shoot without drifting and freeze the follow-through.",
      "After five makes, rotate to a new spot.",
      "Players say inside-out loud until the rhythm becomes automatic.",
    ],
    coachingCues: [
      "Step one finds the rim; step two loads the shot.",
      "Do not let the ball dip below the waist.",
      "Land where you jumped.",
    ],
    commonMistakes: [
      "Players hop instead of 1-2; slow the footwork without the ball.",
      "Players turn sideways; cue hips to rim before release.",
      "Players rush from range; move closer until mechanics hold.",
    ],
    regression: "Use self-toss catches from three feet.",
    progression: "Add a drift step or relocation before the 1-2 catch.",
    scoring:
      "Player must make three shots at a spot before moving, but only balanced shots count.",
    safetyNote:
      "Use short-range volume to protect shoulders and keep mechanics clean.",
    diagram: halfDiagram(
      [
        { id: "s", label: "S", role: "offense", x: 34, y: 38 },
        { id: "p", label: "P", role: "offense", x: 52, y: 52 },
      ],
      [
        {
          id: "step",
          type: "cut",
          from: { x: 30, y: 42 },
          to: { x: 34, y: 38 },
          label: "1-2",
        },
        {
          id: "pass",
          type: "pass",
          from: { x: 52, y: 52 },
          to: { x: 34, y: 38 },
        },
        {
          id: "shot",
          type: "shot",
          from: { x: 34, y: 38 },
          to: { x: 50, y: 9 },
        },
      ],
      {
        spots: [
          { id: "one", x: 34, y: 38, label: "1-2" },
          { id: "two", x: 50, y: 36, label: "slot" },
          { id: "three", x: 66, y: 38, label: "wing" },
        ],
      },
    ),
  },
  {
    id: "weak-hand-layup-ladder",
    title: "Weak-Hand Layup Ladder",
    category: "finishing",
    ageGroups: ["u11", "u14"],
    durationMin: 12,
    intensity: "medium",
    playersMin: 3,
    playersMax: 12,
    equipment: ["basketballs", "cones"],
    courtMode: "half",
    objective:
      "Increase weak-hand confidence through progressive finishes from controlled starts.",
    setup: [
      "Place three cones on the weak-hand side: block, short wing, and slot.",
      "Players start at the first cone with a ball.",
      "A rebounder returns makes and misses quickly.",
    ],
    execution: [
      "Player finishes from cone one using correct weak-hand footwork.",
      "After two clean makes, they move one cone farther out.",
      "If the footwork breaks, they return to the previous cone.",
      "Complete both left-hand and right-hand weak-side versions when needed.",
    ],
    coachingCues: [
      "Outside knee drives up with the weak hand.",
      "Eyes to the top corner of the square.",
      "Control the last dribble before takeoff.",
    ],
    commonMistakes: [
      "Players switch to strong hand; make hand choice part of the score.",
      "Players take off too far; add a takeoff cone.",
      "Players throw the ball hard; cue soft high finish.",
    ],
    regression: "Start from one step with no dribble.",
    progression: "Add a trailing defender or pad at the final cone.",
    scoring:
      "Players climb the ladder with two clean makes per spot; fastest clean climb wins.",
    safetyNote:
      "Keep the rebounding area clear before the next finisher starts.",
    diagram: halfDiagram(
      [
        { id: "p", label: "1", role: "offense", x: 70, y: 54 },
        { id: "r", label: "R", role: "neutral", x: 55, y: 16 },
      ],
      [
        {
          id: "drive",
          type: "dribble",
          from: { x: 70, y: 54 },
          to: { x: 58, y: 18 },
          label: "weak hand",
        },
        {
          id: "finish",
          type: "shot",
          from: { x: 58, y: 18 },
          to: { x: 50, y: 9 },
        },
      ],
      {
        cones: [
          { id: "block", x: 58, y: 20, label: "1" },
          { id: "wing", x: 70, y: 40, label: "2" },
          { id: "slot", x: 70, y: 54, label: "3" },
        ],
      },
    ),
  },
  {
    id: "closeout-to-contain",
    title: "Closeout To Contain",
    category: "defense",
    ageGroups: ["u11", "u14"],
    durationMin: 12,
    intensity: "medium",
    playersMin: 3,
    playersMax: 12,
    equipment: ["basketballs"],
    courtMode: "half",
    objective:
      "Teach defenders to close space under control and keep the ball in front.",
    setup: [
      "Offensive player starts on the wing with a ball.",
      "Defender starts in the paint or help position.",
      "Coach stands at the top and triggers the closeout with a pass or call.",
    ],
    execution: [
      "Defender sprints halfway, chops feet, and finishes with high hands.",
      "Offense attacks after the defender arrives.",
      "Defender contains for three dribbles without reaching.",
      "Rotate offense, defense, and passer after each rep.",
    ],
    coachingCues: [
      "Sprint to close space, chop to control it.",
      "Top foot takes away the middle.",
      "Chest stays between ball and rim.",
    ],
    commonMistakes: [
      "Defender flies past the shooter; start chopping one stride earlier.",
      "Defender reaches; score only chest containment.",
      "Offense waits too long; require attack on catch.",
    ],
    regression: "Make offense jab only without live dribble.",
    progression: "Allow offense to shoot, drive, or pass to a corner teammate.",
    scoring:
      "Defense earns a stop by forcing a pickup, contested miss, or sideline drive.",
    safetyNote:
      "No undercut closeouts; defenders must stop outside the shooter's landing space.",
    diagram: halfDiagram(
      [
        { id: "o", label: "O", role: "offense", x: 22, y: 38 },
        { id: "d", label: "D", role: "defense", x: 48, y: 24 },
        { id: "c", label: "C", role: "coach", x: 50, y: 58 },
      ],
      [
        {
          id: "pass",
          type: "pass",
          from: { x: 50, y: 58 },
          to: { x: 22, y: 38 },
        },
        {
          id: "close",
          type: "defensive_slide",
          from: { x: 48, y: 24 },
          to: { x: 26, y: 38 },
          label: "chop",
        },
        {
          id: "drive",
          type: "dribble",
          from: { x: 22, y: 38 },
          to: { x: 38, y: 18 },
          label: "contain",
        },
      ],
    ),
  },
  {
    id: "two-v-one-advantage-read",
    title: "2v1 Advantage Read",
    category: "decision_making",
    ageGroups: ["u11", "u14"],
    durationMin: 12,
    intensity: "medium",
    playersMin: 3,
    playersMax: 12,
    equipment: ["basketballs"],
    courtMode: "half",
    objective:
      "Teach the ball handler to score when the defender commits late and pass when help stops the ball.",
    setup: [
      "Two offensive players start at the slots.",
      "One defender starts inside the lane.",
      "Coach or passer initiates with a pass to either slot.",
    ],
    execution: [
      "Ball handler attacks the lane with eyes on the defender.",
      "If the defender stays back, the ball handler finishes.",
      "If the defender commits, the ball handler passes to the teammate.",
      "Play until a shot, turnover, or defensive rebound.",
    ],
    coachingCues: [
      "Attack the defender's body before deciding.",
      "Pass late enough to force commitment, early enough for a clean catch.",
      "Off-ball player stays in a passing window.",
    ],
    commonMistakes: [
      "Ball handler decides before reading; freeze and ask what the defender did.",
      "Off-ball player drifts behind the defender; relocate to vision.",
      "Passes are floated; cue a quick push pass.",
    ],
    regression: "Make the defender choose a cone before the attack starts.",
    progression: "Add a second trailing defender for a 2v2 recovery read.",
    scoring:
      "Offense gets two points for a correct read and one bonus point for a make.",
    safetyNote:
      "Keep the defender vertical at the rim and avoid late body contact.",
    diagram: halfDiagram(
      [
        { id: "o1", label: "1", role: "offense", x: 38, y: 58 },
        { id: "o2", label: "2", role: "offense", x: 68, y: 48 },
        { id: "d", label: "D", role: "defense", x: 50, y: 24 },
      ],
      [
        {
          id: "drive",
          type: "dribble",
          from: { x: 38, y: 58 },
          to: { x: 48, y: 22 },
          label: "force help",
        },
        {
          id: "kick",
          type: "pass",
          from: { x: 48, y: 22 },
          to: { x: 68, y: 48 },
          label: "if help",
        },
        {
          id: "finish",
          type: "shot",
          from: { x: 48, y: 22 },
          to: { x: 50, y: 9 },
        },
      ],
    ),
  },
  {
    id: "shell-defense-intro-3v3",
    title: "Shell Defense Intro 3v3",
    category: "team_concepts",
    ageGroups: ["u11"],
    durationMin: 14,
    intensity: "medium",
    playersMin: 6,
    playersMax: 12,
    equipment: ["basketballs"],
    courtMode: "half",
    objective:
      "Introduce ball, gap, and help positioning with simple 3v3 spacing.",
    setup: [
      "Place three offensive players on both wings and the top.",
      "Match three defenders in stance.",
      "Start with no dribble so players can learn movement first.",
    ],
    execution: [
      "Offense passes around the perimeter.",
      "On each pass, defenders jump to ball, gap, or help position.",
      "Coach pauses to correct spacing and stance.",
      "After clean rotations, allow one live dribble to score.",
    ],
    coachingCues: [
      "On-ball pressures without reaching.",
      "One pass away is in the gap with hand in lane.",
      "Two passes away sees ball and player.",
    ],
    commonMistakes: [
      "Defenders watch only their player; require pointing to ball and matchup.",
      "Help defender stands too deep; mark the help line.",
      "Closeouts happen late; cue move on the flight of the pass.",
    ],
    regression: "Walk through rotations with coach passing only.",
    progression: "Make it live after three clean passes.",
    scoring:
      "Defense scores one point for three correct rotations and two for a live stop.",
    safetyNote:
      "Start live play only after spacing is clear and closeouts are controlled.",
    diagram: halfDiagram(
      [
        { id: "o1", label: "1", role: "offense", x: 50, y: 55 },
        { id: "o2", label: "2", role: "offense", x: 22, y: 38 },
        { id: "o3", label: "3", role: "offense", x: 78, y: 38 },
        { id: "d1", label: "D1", role: "defense", x: 50, y: 49 },
        { id: "d2", label: "D2", role: "defense", x: 30, y: 38 },
        { id: "d3", label: "D3", role: "defense", x: 68, y: 38 },
      ],
      [
        {
          id: "pass",
          type: "pass",
          from: { x: 50, y: 55 },
          to: { x: 22, y: 38 },
          label: "move on flight",
        },
        {
          id: "rotate",
          type: "rotation",
          from: { x: 68, y: 38 },
          to: { x: 57, y: 31 },
          label: "help",
        },
      ],
    ),
  },
  {
    id: "rebound-hit-find-get",
    title: "Rebound Hit-Find-Get",
    category: "rebounding",
    ageGroups: ["u11", "u14"],
    durationMin: 10,
    intensity: "medium",
    playersMin: 4,
    playersMax: 12,
    equipment: ["basketballs"],
    courtMode: "half",
    objective:
      "Teach the rebounding sequence of contact, location, and pursuit.",
    setup: [
      "Pair an offensive rebounder and defender near each block.",
      "Coach shoots or tosses from the wing.",
      "Players rotate after each rebound result.",
    ],
    execution: [
      "On the shot, defender makes legal body contact first.",
      "Defender turns to find the ball without losing the offensive player.",
      "Both players pursue the rebound at its highest safe point.",
      "Outlet to coach after a secure two-hand rebound.",
    ],
    coachingCues: [
      "Hit first with hips and forearm contact, not a push.",
      "Find the ball after contact.",
      "Get it with two hands and chin it strong.",
    ],
    commonMistakes: [
      "Defender watches the shot and forgets contact; start with hit-only reps.",
      "Offense slips inside untouched; widen defender stance.",
      "Rebounder brings ball low; require chin-and-outlet before scoring.",
    ],
    regression: "Use a predictable toss that lands in the same zone.",
    progression: "Make it live 2v2 with an outlet race.",
    scoring:
      "Defender gets two points for hit-find-get and outlet; offense gets two for a clean putback.",
    safetyNote:
      "Teach legal contact and ban pushes in the back before increasing intensity.",
    diagram: halfDiagram(
      [
        { id: "o", label: "O", role: "offense", x: 42, y: 22 },
        { id: "d", label: "D", role: "defense", x: 45, y: 25 },
        { id: "c", label: "C", role: "coach", x: 22, y: 42 },
      ],
      [
        {
          id: "shot",
          type: "shot",
          from: { x: 22, y: 42 },
          to: { x: 50, y: 9 },
          label: "shot",
        },
        {
          id: "box",
          type: "rebound",
          from: { x: 45, y: 25 },
          to: { x: 42, y: 22 },
          label: "hit",
        },
        {
          id: "get",
          type: "rebound",
          from: { x: 44, y: 23 },
          to: { x: 52, y: 13 },
          label: "get",
        },
      ],
    ),
  },
  {
    id: "change-pace-attack-cones",
    title: "Change Pace Attack Cones",
    category: "ball_handling",
    ageGroups: ["u14", "u16", "hs_elite"],
    durationMin: 12,
    intensity: "medium",
    playersMin: 3,
    playersMax: 10,
    equipment: ["basketballs", "cones"],
    courtMode: "half",
    objective:
      "Train slow-to-fast rhythm so players create advantages without needing extra moves.",
    setup: [
      "Place two attack cones above the wing and one finish cone at the lane line.",
      "Players start from the slot with a ball.",
      "Coach stands near the nail to show a help cue.",
    ],
    execution: [
      "Player dribbles slowly into the first cone and drops their hips.",
      "They burst past the second cone with one hard push dribble.",
      "At the lane cone, coach shows finish or pull-up cue.",
      "Player completes the read and exits to the opposite corner.",
    ],
    coachingCues: [
      "Slow is useful only if it creates a faster next step.",
      "Eyes lift before the burst.",
      "Attack the defender's top foot, not the middle of their body.",
    ],
    commonMistakes: [
      "Players stay one speed; force a verbal slow-fast call.",
      "Players add unnecessary moves; limit them to pace and angle.",
      "Players decide too early; coach changes cue late.",
    ],
    regression: "Remove the help cue and finish only at the rim.",
    progression: "Add a live containment defender at the first cone.",
    scoring:
      "Players score for a clear speed change, correct read, and made finish.",
    safetyNote:
      "Control closeout and help cues so the driver has a safe landing lane.",
    diagram: halfDiagram(
      [
        { id: "p", label: "1", role: "offense", x: 38, y: 62 },
        { id: "c", label: "C", role: "coach", x: 50, y: 32 },
      ],
      [
        {
          id: "pace",
          type: "dribble",
          from: { x: 38, y: 62 },
          to: { x: 38, y: 38 },
          label: "slow",
        },
        {
          id: "burst",
          type: "dribble",
          from: { x: 38, y: 38 },
          to: { x: 48, y: 18 },
          label: "burst",
        },
        {
          id: "shot",
          type: "shot",
          from: { x: 48, y: 18 },
          to: { x: 50, y: 9 },
        },
      ],
      {
        cones: [
          { id: "slow", x: 38, y: 46, label: "slow" },
          { id: "burst", x: 38, y: 34, label: "burst" },
          { id: "read", x: 48, y: 21, label: "read" },
        ],
      },
    ),
  },
  {
    id: "finishing-through-contact-pads",
    title: "Finishing Through Contact Pads",
    category: "finishing",
    ageGroups: ["u14", "u16", "hs_elite"],
    durationMin: 12,
    intensity: "high",
    playersMin: 3,
    playersMax: 10,
    equipment: ["basketballs", "pads"],
    courtMode: "half",
    objective:
      "Develop strong, legal finishes through controlled contact without sacrificing footwork.",
    setup: [
      "One coach or player holds a pad near the restricted area.",
      "Offensive players start on the wing with a ball.",
      "A rebounder clears makes and misses quickly.",
    ],
    execution: [
      "Driver attacks from the wing with two or three dribbles.",
      "Pad holder gives controlled side contact before takeoff.",
      "Driver finishes off two feet or outside-inside footwork.",
      "Rotate after each rep and switch sides halfway.",
    ],
    coachingCues: [
      "Hit contact with a strong shoulder and stable core.",
      "Gather before the bump, then finish through balance.",
      "Eyes stay on the target after contact.",
    ],
    commonMistakes: [
      "Players avoid the pad; narrow the angle and cue shoulder through.",
      "Players jump off-balance; require a two-foot gather first.",
      "Pad holder swings; teach stationary controlled contact.",
    ],
    regression: "Use air finishes with no pad and a two-foot stop.",
    progression: "Add a shot blocker contest after the pad bump.",
    scoring:
      "Two points for a make through legal contact, one for a balanced miss.",
    safetyNote:
      "Pad contact must be controlled, side-on, and never into the airborne player's legs.",
    diagram: halfDiagram(
      [
        { id: "o", label: "1", role: "offense", x: 24, y: 48 },
        { id: "pad", label: "P", role: "defense", x: 43, y: 20 },
        { id: "r", label: "R", role: "neutral", x: 58, y: 16 },
      ],
      [
        {
          id: "drive",
          type: "dribble",
          from: { x: 24, y: 48 },
          to: { x: 43, y: 20 },
          label: "contact",
        },
        {
          id: "finish",
          type: "shot",
          from: { x: 43, y: 20 },
          to: { x: 50, y: 9 },
        },
      ],
    ),
  },
  {
    id: "drift-pass-drive-and-kick",
    title: "Drift Pass Drive And Kick",
    category: "passing",
    ageGroups: ["u14", "u16", "hs_elite"],
    durationMin: 12,
    intensity: "medium",
    playersMin: 4,
    playersMax: 12,
    equipment: ["basketballs"],
    courtMode: "half",
    objective:
      "Teach corner drift timing and drive-and-kick passing against help.",
    setup: [
      "Ball handler starts on the wing.",
      "Shooter starts in the strong-side corner and drifts up or down based on the drive angle.",
      "A help defender starts at the nail or low help.",
    ],
    execution: [
      "Ball handler drives baseline or middle on coach cue.",
      "Corner player drifts to keep a passing window behind help.",
      "Driver jumps stops or stride stops and passes to the drift.",
      "Shooter catches ready and shoots or drives the closeout.",
    ],
    coachingCues: [
      "Drift as the defender turns their head, not after the pass.",
      "Driver gets paint touch before the kick.",
      "Pass away from help and into the shooting pocket.",
    ],
    commonMistakes: [
      "Corner player stands still behind help; rehearse drift timing without defense.",
      "Driver leaves feet without a target; require eyes to corner first.",
      "Pass floats; cue two-hand snap or outside-hand hook pass.",
    ],
    regression: "Use a guided help defender who commits early.",
    progression: "Add a live closeout for shoot-drive-extra decisions.",
    scoring:
      "Three points for a paint touch, correct drift, and made catch-and-shoot three.",
    safetyNote:
      "Do not let drivers jump into help; use stride stops for safer passing.",
    diagram: halfDiagram(
      [
        { id: "b", label: "1", role: "offense", x: 28, y: 46 },
        { id: "s", label: "2", role: "offense", x: 16, y: 18 },
        { id: "h", label: "H", role: "defense", x: 45, y: 25 },
      ],
      [
        {
          id: "drive",
          type: "dribble",
          from: { x: 28, y: 46 },
          to: { x: 40, y: 18 },
          label: "paint touch",
        },
        {
          id: "drift",
          type: "cut",
          from: { x: 16, y: 18 },
          to: { x: 20, y: 28 },
          label: "drift",
        },
        {
          id: "kick",
          type: "pass",
          from: { x: 40, y: 18 },
          to: { x: 20, y: 28 },
          label: "kick",
        },
      ],
    ),
  },
  {
    id: "slot-cut-read",
    title: "Slot Cut Read",
    category: "decision_making",
    ageGroups: ["u14", "u16"],
    durationMin: 10,
    intensity: "medium",
    playersMin: 4,
    playersMax: 12,
    equipment: ["basketballs"],
    courtMode: "half",
    objective:
      "Teach slot players to cut, hold, or replace based on defender position.",
    setup: [
      "Put a passer on the wing, a cutter in the slot, and a defender denying or helping.",
      "Place a corner spacer to keep the lane realistic.",
      "Coach signals deny, help, or neutral before each rep.",
    ],
    execution: [
      "Slot player reads the defender's head and top foot.",
      "If denied, they back cut to the rim.",
      "If helped off, they hold or lift for the catch.",
      "If neutral, they exchange or replace to maintain spacing.",
    ],
    coachingCues: [
      "Cut behind a defender who cannot see you.",
      "Do not cut into occupied paint.",
      "Passer waits for the cutter's eyes and target hand.",
    ],
    commonMistakes: [
      "Cutter decides before reading; freeze the defender and ask what is open.",
      "Passer throws late; cue pass on the first open shoulder.",
      "Corner spacer drifts into the cut; mark their corner window.",
    ],
    regression: "Use coach as a static defender with obvious positioning.",
    progression: "Make it live 3v3 after the first read.",
    scoring:
      "Offense scores for the correct cut decision before the shot result is counted.",
    safetyNote:
      "Keep back cuts clear and ban passes to cutters behind the backboard.",
    diagram: halfDiagram(
      [
        { id: "p", label: "P", role: "offense", x: 24, y: 42 },
        { id: "cutter", label: "2", role: "offense", x: 45, y: 55 },
        { id: "d", label: "D", role: "defense", x: 42, y: 50 },
        { id: "corner", label: "3", role: "offense", x: 16, y: 18 },
      ],
      [
        {
          id: "backcut",
          type: "cut",
          from: { x: 45, y: 55 },
          to: { x: 48, y: 16 },
          label: "back cut",
        },
        {
          id: "pass",
          type: "pass",
          from: { x: 24, y: 42 },
          to: { x: 48, y: 16 },
        },
      ],
    ),
  },
  {
    id: "closeout-read-one-v-one",
    title: "Closeout Read 1v1",
    category: "decision_making",
    ageGroups: ["u14", "u16", "hs_elite"],
    durationMin: 12,
    intensity: "high",
    playersMin: 3,
    playersMax: 12,
    equipment: ["basketballs"],
    courtMode: "half",
    objective:
      "Connect offensive catch decisions to defender speed, angle, and hand position.",
    setup: [
      "Offensive player starts on the wing.",
      "Defender starts under the rim or at the nail.",
      "Coach passes to the wing and the defender closes out live.",
    ],
    execution: [
      "Offense catches with shot-ready feet.",
      "If the defender is late, offense shoots.",
      "If the defender flies by, offense drives the closeout.",
      "If the defender contains, offense uses one change of pace to create.",
    ],
    coachingCues: [
      "Read the closeout before putting the ball down.",
      "Attack the high foot when driving.",
      "Shot fake only if the defender is actually leaving the floor.",
    ],
    commonMistakes: [
      "Offense predetermines drive; require verbal read after catch.",
      "Defender closes out with no brakes; score the offense for fly-bys.",
      "Ball handler dribbles sideways; cue shoulder to rim.",
    ],
    regression: "Use a guided closeout speed: short, long, or fly-by.",
    progression: "Add a help defender and kickout option.",
    scoring:
      "Offense scores two for the right read and one bonus for an efficient make.",
    safetyNote:
      "Defender must close to the side of the shooter and avoid the landing space.",
    diagram: halfDiagram(
      [
        { id: "o", label: "O", role: "offense", x: 75, y: 42 },
        { id: "d", label: "D", role: "defense", x: 50, y: 20 },
        { id: "c", label: "C", role: "coach", x: 50, y: 58 },
      ],
      [
        {
          id: "pass",
          type: "pass",
          from: { x: 50, y: 58 },
          to: { x: 75, y: 42 },
        },
        {
          id: "close",
          type: "defensive_slide",
          from: { x: 50, y: 20 },
          to: { x: 70, y: 42 },
          label: "closeout",
        },
        {
          id: "drive",
          type: "dribble",
          from: { x: 75, y: 42 },
          to: { x: 56, y: 18 },
          label: "read",
        },
      ],
    ),
  },
  {
    id: "pick-and-roll-pocket-read-intro",
    title: "Pick-And-Roll Pocket Read Intro",
    category: "team_concepts",
    ageGroups: ["u14", "u16", "hs_elite"],
    durationMin: 14,
    intensity: "medium",
    playersMin: 5,
    playersMax: 12,
    equipment: ["basketballs"],
    courtMode: "half",
    objective:
      "Introduce the pocket pass read when the screen defender steps up to stop the ball.",
    setup: [
      "Ball handler starts at the slot and screener starts near the wing.",
      "Two defenders guard the ball and screener.",
      "A coach or spacer occupies the corner.",
    ],
    execution: [
      "Screener arrives with a stationary angle and calls screen.",
      "Ball handler uses the screen tight and reads the screen defender.",
      "If the screen defender steps up, ball handler hits the rolling screener in the pocket.",
      "Roller catches on two feet and finishes or passes to the corner.",
    ],
    coachingCues: [
      "Rub shoulders with the screener.",
      "Pocket pass goes early to space, not late to the body.",
      "Roller shows target hands between the defenders.",
    ],
    commonMistakes: [
      "Ball handler goes wide; place a cone on the screener's hip.",
      "Screener slips before contact; require a legal set screen first.",
      "Pocket pass is too low; cue a firm bounce to the roller's outside hand.",
    ],
    regression: "Use two offensive players against one guided screen defender.",
    progression: "Add weak-side tag defender and corner shake read.",
    scoring:
      "Two points for a correct pocket read and two more for a finish by the roller.",
    safetyNote:
      "Teach legal stationary screens and avoid blindside contact in intro reps.",
    diagram: halfDiagram(
      [
        { id: "bh", label: "1", role: "offense", x: 42, y: 58 },
        { id: "s", label: "5", role: "offense", x: 55, y: 50 },
        { id: "d1", label: "D1", role: "defense", x: 42, y: 52 },
        { id: "d5", label: "D5", role: "defense", x: 58, y: 46 },
      ],
      [
        {
          id: "screen",
          type: "screen",
          from: { x: 52, y: 50 },
          to: { x: 58, y: 50 },
          label: "screen",
        },
        {
          id: "use",
          type: "dribble",
          from: { x: 42, y: 58 },
          to: { x: 58, y: 38 },
          label: "use",
        },
        {
          id: "roll",
          type: "cut",
          from: { x: 55, y: 50 },
          to: { x: 50, y: 18 },
          label: "roll",
        },
        {
          id: "pocket",
          type: "pass",
          from: { x: 58, y: 38 },
          to: { x: 50, y: 18 },
          label: "pocket",
        },
      ],
    ),
  },
  {
    id: "three-v-two-continuous-advantage",
    title: "3v2 Continuous Advantage",
    category: "decision_making",
    ageGroups: ["u14", "u16", "hs_elite"],
    durationMin: 14,
    intensity: "high",
    playersMin: 7,
    playersMax: 14,
    equipment: ["basketballs"],
    courtMode: "full",
    objective:
      "Develop pace, spacing, and quick decisions in repeated transition advantages.",
    setup: [
      "Three offensive players start at half court against two defenders.",
      "Two waiting defenders stand on the baseline for the return trip.",
      "A coach starts each possession with an outlet pass.",
    ],
    execution: [
      "Offense attacks 3v2 and must shoot within six seconds.",
      "Shooter and passer sprint back on defense after the shot.",
      "The two baseline players join with the rebounder to attack the other way.",
      "Continue for four to six trips before rotating groups.",
    ],
    coachingCues: [
      "Wide lanes create the middle decision.",
      "Pass ahead before dribbling into the defender.",
      "Make the first defender commit, then move it.",
    ],
    commonMistakes: [
      "Middle player overdribbles; limit to two dribbles before a pass or finish.",
      "Wings run too narrow; require feet outside lane lines.",
      "Defenders guard space instead of threats; teach top-bottom alignment.",
    ],
    regression: "Run one-way 3v2 with no continuous return.",
    progression: "Add a trailing defender for 3v2 plus one recovery pressure.",
    scoring:
      "Offense gets two for a paint touch or open shot; defense gets three for a stop.",
    safetyNote:
      "Control trip count and build in water after high-speed transition blocks.",
    diagram: fullDiagram(
      [
        { id: "o1", label: "1", role: "offense", x: 50, y: 52 },
        { id: "o2", label: "2", role: "offense", x: 25, y: 55 },
        { id: "o3", label: "3", role: "offense", x: 75, y: 55 },
        { id: "d1", label: "D1", role: "defense", x: 45, y: 24 },
        { id: "d2", label: "D2", role: "defense", x: 55, y: 18 },
      ],
      [
        {
          id: "middle",
          type: "dribble",
          from: { x: 50, y: 52 },
          to: { x: 50, y: 22 },
          label: "attack",
        },
        {
          id: "wing",
          type: "pass",
          from: { x: 50, y: 30 },
          to: { x: 75, y: 20 },
          label: "commit-pass",
        },
        {
          id: "return",
          type: "rotation",
          from: { x: 25, y: 10 },
          to: { x: 50, y: 82 },
          label: "continuous",
        },
      ],
    ),
  },
  {
    id: "shell-defense-four-v-four-no-paint-touch",
    title: "Shell Defense 4v4 No Paint Touch",
    category: "team_concepts",
    ageGroups: ["u14", "u16", "hs_elite"],
    durationMin: 14,
    intensity: "high",
    playersMin: 8,
    playersMax: 12,
    equipment: ["basketballs"],
    courtMode: "half",
    objective:
      "Build connected help, stunt, closeout, and gap habits with a clear defensive constraint.",
    setup: [
      "Offense spaces four around the perimeter.",
      "Defense matches up and starts in shell position.",
      "Paint touches by offense end the possession unless created by a coached exception.",
    ],
    execution: [
      "Offense moves the ball and may drive after each catch.",
      "Defense must keep the ball out of the paint for 20 seconds.",
      "Help defenders stunt, recover, and communicate on every drive.",
      "Rotate groups after a stop, score, or paint-touch violation.",
    ],
    coachingCues: [
      "Shrink the floor on the catch, expand on the pass.",
      "Stunt with a purpose and recover on air time.",
      "Low man protects the rim early.",
    ],
    commonMistakes: [
      "Help arrives after the paint touch; cue move on the first dribble.",
      "Closeouts are silent; require names and ball calls.",
      "Off-ball defenders hug shooters; mark gap positions.",
    ],
    regression: "Remove live shooting and score only positioning for one minute.",
    progression: "Add skip passes and offensive cuts after every drive.",
    scoring:
      "Defense gets three points for 20 seconds without a paint touch; offense gets three for a paint touch.",
    safetyNote:
      "Control drive contact and stop reps before bodies pile under the rim.",
    diagram: halfDiagram(
      [
        { id: "o1", label: "1", role: "offense", x: 50, y: 58 },
        { id: "o2", label: "2", role: "offense", x: 22, y: 42 },
        { id: "o3", label: "3", role: "offense", x: 78, y: 42 },
        { id: "o4", label: "4", role: "offense", x: 50, y: 24 },
        { id: "d1", label: "D1", role: "defense", x: 50, y: 52 },
        { id: "d2", label: "D2", role: "defense", x: 30, y: 40 },
        { id: "d3", label: "D3", role: "defense", x: 70, y: 40 },
        { id: "d4", label: "D4", role: "defense", x: 50, y: 18 },
      ],
      [
        {
          id: "drive",
          type: "dribble",
          from: { x: 22, y: 42 },
          to: { x: 38, y: 24 },
          label: "no paint",
        },
        {
          id: "help",
          type: "rotation",
          from: { x: 70, y: 40 },
          to: { x: 56, y: 28 },
          label: "stunt",
        },
      ],
      {
        zones: [{ id: "paint", label: "paint touch denied", x: 38, y: 0, width: 24, height: 38 }],
      },
    ),
  },
  {
    id: "spain-action-walkthrough",
    title: "Spain Action Walkthrough",
    category: "team_concepts",
    ageGroups: ["u14", "u16", "hs_elite"],
    durationMin: 14,
    intensity: "low",
    playersMin: 5,
    playersMax: 12,
    equipment: ["basketballs"],
    courtMode: "half",
    objective:
      "Introduce a pro-level ball screen action with a back screen on the roller and clear spacing.",
    setup: [
      "Ball handler starts high, big sets the ball screen, and shooter starts near the free throw line.",
      "Two spacers hold corners or slots.",
      "Begin without defense so timing and spacing are clean.",
    ],
    execution: [
      "Big sets the ball screen and rolls hard.",
      "Shooter back screens the roller's defender, then pops or lifts.",
      "Ball handler reads roller, pop shooter, or weak-side spacer.",
      "Add guided defenders after the timing is stable.",
    ],
    coachingCues: [
      "Screen the defender, not the space.",
      "Roller runs through the rim line.",
      "Back screener opens to the ball after contact.",
    ],
    commonMistakes: [
      "Back screen happens too early; cue screen as the roller starts downhill.",
      "Ball handler stops the dribble; keep the defender engaged.",
      "Spacers drift into action; mark the corners.",
    ],
    regression: "Walk through at half speed with no pass decision.",
    progression: "Add live coverage reads: switch, drop, or show.",
    scoring:
      "Group scores a point for correct timing before the shot is judged.",
    safetyNote:
      "Teach screen angles and communication before defenders chase through contact.",
    diagram: halfDiagram(
      [
        { id: "bh", label: "1", role: "offense", x: 48, y: 62 },
        { id: "big", label: "5", role: "offense", x: 58, y: 54 },
        { id: "back", label: "2", role: "offense", x: 48, y: 34 },
        { id: "sp1", label: "3", role: "offense", x: 18, y: 18 },
        { id: "sp2", label: "4", role: "offense", x: 82, y: 18 },
      ],
      [
        {
          id: "balls",
          type: "screen",
          from: { x: 55, y: 54 },
          to: { x: 62, y: 54 },
          label: "ball screen",
        },
        {
          id: "use",
          type: "dribble",
          from: { x: 48, y: 62 },
          to: { x: 62, y: 40 },
        },
        {
          id: "roll",
          type: "cut",
          from: { x: 58, y: 54 },
          to: { x: 50, y: 12 },
          label: "roll",
        },
        {
          id: "backscreen",
          type: "screen",
          from: { x: 45, y: 32 },
          to: { x: 54, y: 32 },
          label: "back screen",
        },
      ],
    ),
  },
  {
    id: "transition-fill-the-lanes",
    title: "Transition Fill The Lanes",
    category: "team_concepts",
    ageGroups: ["u14", "u16"],
    durationMin: 12,
    intensity: "medium",
    playersMin: 5,
    playersMax: 15,
    equipment: ["basketballs"],
    courtMode: "full",
    objective:
      "Teach players to sprint wide, organize early offense, and create simple transition spacing.",
    setup: [
      "Five players start on the baseline with the ball in the middle.",
      "Assign rim runner, ball handler, wings, and trail.",
      "Use cones or lane markers for wide running lanes.",
    ],
    execution: [
      "On the outlet, wings sprint outside the lane lines.",
      "Rim runner runs to the front of the rim.",
      "Ball handler advances through the middle and passes ahead when open.",
      "Trail fills the slot for reversal or shot.",
    ],
    coachingCues: [
      "First three steps are a sprint to spacing.",
      "Wide runners create the middle lane.",
      "Pass ahead before the defense loads.",
    ],
    commonMistakes: [
      "Players all run to the ball; assign lanes and restart.",
      "Wings drift narrow; use sideline cone lanes.",
      "Ball handler overdribbles; count dribbles to half court.",
    ],
    regression: "Run five-on-zero at teaching speed.",
    progression: "Add three retreating defenders for 5v3 early offense.",
    scoring:
      "Team scores for lane discipline, pass ahead, and shot within eight seconds.",
    safetyNote:
      "Use controlled sprint lanes and stop if players cross paths blindly.",
    diagram: fullDiagram(
      [
        { id: "one", label: "1", role: "offense", x: 50, y: 86 },
        { id: "two", label: "2", role: "offense", x: 20, y: 88 },
        { id: "three", label: "3", role: "offense", x: 80, y: 88 },
        { id: "four", label: "4", role: "offense", x: 42, y: 90 },
        { id: "five", label: "5", role: "offense", x: 58, y: 90 },
      ],
      [
        {
          id: "ball",
          type: "dribble",
          from: { x: 50, y: 86 },
          to: { x: 50, y: 42 },
          label: "middle",
        },
        {
          id: "left",
          type: "cut",
          from: { x: 20, y: 88 },
          to: { x: 18, y: 24 },
          label: "wide",
        },
        {
          id: "right",
          type: "cut",
          from: { x: 80, y: 88 },
          to: { x: 82, y: 24 },
          label: "wide",
        },
        {
          id: "rim",
          type: "cut",
          from: { x: 58, y: 90 },
          to: { x: 50, y: 12 },
          label: "rim run",
        },
      ],
    ),
  },
  {
    id: "pro-footwork-shooting-series",
    title: "NBA-Style Footwork Shooting Series",
    category: "shooting",
    ageGroups: ["u16", "hs_elite"],
    durationMin: 16,
    intensity: "high",
    playersMin: 3,
    playersMax: 10,
    equipment: ["basketballs", "cones"],
    courtMode: "half",
    objective:
      "Train advanced trainer-standard footwork patterns: hop, 1-2, drift, and turn catches.",
    setup: [
      "Set five perimeter spots with a passer and rebounder.",
      "Shooter starts one step off each spot.",
      "Coach calls the footwork pattern before the pass.",
    ],
    execution: [
      "Shooter relocates into the named footwork.",
      "Passer delivers to the pocket as feet arrive.",
      "Shooter completes the shot and holds the landing.",
      "Move to the next spot after two clean makes or four attempts.",
    ],
    coachingCues: [
      "Footwork solves the angle before the ball arrives.",
      "Load early and shoot on the way up.",
      "Land balanced enough to defend the next possession.",
    ],
    commonMistakes: [
      "Shooter drifts sideways on turn catches; mark the landing.",
      "Pass is late; passer must throw as the shooter plants.",
      "Footwork becomes rushed; slow the relocation before increasing volume.",
    ],
    regression: "Use only hop and 1-2 from three closer spots.",
    progression: "Add a live chase defender on every other rep.",
    scoring:
      "Track makes by footwork type; miss two balance standards and repeat the spot.",
    safetyNote:
      "Manage shot volume and use full rest when adding chase defense.",
    diagram: halfDiagram(
      [
        { id: "s", label: "S", role: "offense", x: 68, y: 42 },
        { id: "p", label: "P", role: "offense", x: 50, y: 58 },
        { id: "r", label: "R", role: "neutral", x: 52, y: 14 },
      ],
      [
        {
          id: "relocate",
          type: "cut",
          from: { x: 76, y: 48 },
          to: { x: 68, y: 42 },
          label: "turn catch",
        },
        {
          id: "pass",
          type: "pass",
          from: { x: 50, y: 58 },
          to: { x: 68, y: 42 },
        },
        {
          id: "shot",
          type: "shot",
          from: { x: 68, y: 42 },
          to: { x: 50, y: 9 },
        },
      ],
      {
        spots: [
          { id: "c1", x: 18, y: 22, label: "corner" },
          { id: "w1", x: 28, y: 42, label: "wing" },
          { id: "slot", x: 50, y: 50, label: "slot" },
          { id: "w2", x: 72, y: 42, label: "wing" },
          { id: "c2", x: 82, y: 22, label: "corner" },
        ],
      },
    ),
  },
  {
    id: "relocation-shooting-off-drive",
    title: "Relocation Shooting Off Drive",
    category: "shooting",
    ageGroups: ["u14", "u16", "hs_elite"],
    durationMin: 14,
    intensity: "medium",
    playersMin: 4,
    playersMax: 12,
    equipment: ["basketballs"],
    courtMode: "half",
    objective:
      "Train shooters to move with the driver and create clean kickout windows.",
    setup: [
      "Driver starts in the slot, shooter on the wing, and defender in help.",
      "Passer or coach initiates from the top.",
      "Shooter has two relocation choices: lift or drift.",
    ],
    execution: [
      "Driver attacks the paint and reads help.",
      "Shooter relocates as the defender's head turns.",
      "Driver passes to the new window.",
      "Shooter catches, shoots, or attacks a hard closeout.",
    ],
    coachingCues: [
      "Relocate on the drive, not after the driver stops.",
      "Stay visible to the ball.",
      "Catch with the next decision already loaded.",
    ],
    commonMistakes: [
      "Shooter moves behind the defender; cue window first, distance second.",
      "Driver misses the first window; require eyes up at paint touch.",
      "Shooter stands upright; relocate with shooting feet ready.",
    ],
    regression: "Use no help defender and pre-call lift or drift.",
    progression: "Add a live closeout and require the next pass on a drive.",
    scoring:
      "Three points for paint touch, correct relocation, and made shot.",
    safetyNote:
      "Protect closeout landing space and limit continuous high-volume shooting sets.",
    diagram: halfDiagram(
      [
        { id: "dri", label: "1", role: "offense", x: 50, y: 58 },
        { id: "sho", label: "2", role: "offense", x: 24, y: 42 },
        { id: "help", label: "H", role: "defense", x: 44, y: 24 },
      ],
      [
        {
          id: "drive",
          type: "dribble",
          from: { x: 50, y: 58 },
          to: { x: 42, y: 20 },
          label: "drive",
        },
        {
          id: "lift",
          type: "cut",
          from: { x: 24, y: 42 },
          to: { x: 32, y: 50 },
          label: "lift",
        },
        {
          id: "kick",
          type: "pass",
          from: { x: 42, y: 20 },
          to: { x: 32, y: 50 },
          label: "kick",
        },
      ],
    ),
  },
  {
    id: "veer-finish-and-euro-read",
    title: "Veer Finish And Euro Read",
    category: "finishing",
    ageGroups: ["u16", "hs_elite"],
    durationMin: 14,
    intensity: "high",
    playersMin: 4,
    playersMax: 10,
    equipment: ["basketballs", "pads"],
    courtMode: "half",
    objective:
      "Train advanced finish selection when a defender rides the drive line or steps across the lane.",
    setup: [
      "Driver starts at the wing with a ball.",
      "A guided defender shades the drive from the slot.",
      "A pad or rim protector starts outside the restricted area.",
    ],
    execution: [
      "Driver attacks downhill and reads the defender's hip.",
      "If the defender trails, driver veers into legal shoulder contact and finishes.",
      "If the help steps across, driver uses a Euro step away from the body.",
      "Rotate after each rep and alternate sides.",
    ],
    coachingCues: [
      "Veer through the defender's line, not into their chest.",
      "Euro step changes lane while keeping the ball protected.",
      "Gather with strength before the decision.",
    ],
    commonMistakes: [
      "Players jump sideways into contact; require a legal path and shoulder angle.",
      "Euro step exposes the ball; cue ball tight to outside hip.",
      "Players decide before help moves; use late coach cues.",
    ],
    regression: "Teach veer and Euro separately without defense.",
    progression: "Add a shot blocker who can contest vertically.",
    scoring:
      "Two points for the correct finish read and two for a make through legal contact.",
    safetyNote:
      "Use guided contact only and stop any airborne body-to-body collisions.",
    diagram: halfDiagram(
      [
        { id: "o", label: "1", role: "offense", x: 25, y: 50 },
        { id: "trail", label: "D", role: "defense", x: 36, y: 42 },
        { id: "rim", label: "R", role: "defense", x: 50, y: 18 },
      ],
      [
        {
          id: "attack",
          type: "dribble",
          from: { x: 25, y: 50 },
          to: { x: 42, y: 22 },
          label: "veer",
        },
        {
          id: "euro",
          type: "cut",
          from: { x: 42, y: 22 },
          to: { x: 58, y: 16 },
          label: "Euro",
        },
        {
          id: "finish",
          type: "shot",
          from: { x: 58, y: 16 },
          to: { x: 50, y: 9 },
        },
      ],
    ),
  },
  {
    id: "ball-screen-snake-read",
    title: "Ball Screen Snake Read",
    category: "decision_making",
    ageGroups: ["u16", "hs_elite"],
    durationMin: 16,
    intensity: "high",
    playersMin: 5,
    playersMax: 12,
    equipment: ["basketballs"],
    courtMode: "half",
    objective:
      "Teach the ball handler to snake back across the screen defender and control the middle.",
    setup: [
      "Ball handler and screener start in high ball screen spacing.",
      "Two defenders play guided drop or trail coverage.",
      "A corner spacer holds the weak-side passing window.",
    ],
    execution: [
      "Ball handler uses the screen tight and gets the trailing defender on the back hip.",
      "They snake dribble across the lane line to keep the big behind the ball.",
      "Read pull-up, pocket pass, or corner kick based on the low defender.",
      "Play live after the snake point.",
    ],
    coachingCues: [
      "Do not snake until the defender is attached behind you.",
      "Keep the dribble alive and body between defender and ball.",
      "Change speed after crossing the screen defender's face.",
    ],
    commonMistakes: [
      "Handler snakes too early; start with the trail defender attached.",
      "Handler turns their back to the rim; cue shoulders angled, eyes up.",
      "Roller stops rolling; require rim run or short roll target.",
    ],
    regression: "Walk through against cones and a coach big.",
    progression: "Add weak-side tag and require the second read.",
    scoring:
      "Three points for correct coverage read and efficient shot or assist.",
    safetyNote:
      "Keep screens legal and avoid defenders clipping the ball handler from behind.",
    diagram: halfDiagram(
      [
        { id: "one", label: "1", role: "offense", x: 40, y: 58 },
        { id: "five", label: "5", role: "offense", x: 54, y: 50 },
        { id: "d1", label: "D1", role: "defense", x: 41, y: 53 },
        { id: "d5", label: "D5", role: "defense", x: 54, y: 34 },
        { id: "sp", label: "2", role: "offense", x: 82, y: 18 },
      ],
      [
        {
          id: "screen",
          type: "screen",
          from: { x: 51, y: 50 },
          to: { x: 58, y: 50 },
        },
        {
          id: "use",
          type: "dribble",
          from: { x: 40, y: 58 },
          to: { x: 58, y: 38 },
          label: "use",
        },
        {
          id: "snake",
          type: "dribble",
          from: { x: 58, y: 38 },
          to: { x: 44, y: 28 },
          label: "snake",
        },
        {
          id: "roll",
          type: "cut",
          from: { x: 54, y: 50 },
          to: { x: 52, y: 16 },
          label: "roll",
        },
      ],
    ),
  },
  {
    id: "reject-screen-attack",
    title: "Reject Screen Attack",
    category: "decision_making",
    ageGroups: ["u16", "hs_elite"],
    durationMin: 14,
    intensity: "high",
    playersMin: 5,
    playersMax: 12,
    equipment: ["basketballs"],
    courtMode: "half",
    objective:
      "Train the ball handler to reject a screen when the on-ball defender overplays the screen side.",
    setup: [
      "Set a side ball screen with a corner spacer and roller.",
      "On-ball defender shades hard over the screen.",
      "Screen defender starts in drop or show position.",
    ],
    execution: [
      "Ball handler sets up the defender as if using the screen.",
      "When the defender jumps screen side, handler rejects baseline or middle.",
      "Screener opens to slip, seal, or rebound.",
      "Play to a shot or paint decision.",
    ],
    coachingCues: [
      "Reject because of defender position, not because it looks creative.",
      "First reject dribble must win the shoulder.",
      "Screener reacts quickly and gets out of the handler's path.",
    ],
    commonMistakes: [
      "Handler rejects into help; require a corner spacing read.",
      "Screener keeps screening empty space; teach slip or seal.",
      "Reject move is rounded; cue sharp foot plant and direct line.",
    ],
    regression: "Use a cone defender showing obvious overplay.",
    progression: "Add a low help defender and require kickout or finish read.",
    scoring:
      "Score three for a reject that creates paint, shot, or direct assist.",
    safetyNote:
      "Make sure the screener clears the lane to avoid knee and hip contact.",
    diagram: halfDiagram(
      [
        { id: "one", label: "1", role: "offense", x: 72, y: 52 },
        { id: "five", label: "5", role: "offense", x: 60, y: 48 },
        { id: "d1", label: "D1", role: "defense", x: 68, y: 48 },
        { id: "sp", label: "2", role: "offense", x: 82, y: 18 },
      ],
      [
        {
          id: "fake",
          type: "dribble",
          from: { x: 72, y: 52 },
          to: { x: 65, y: 49 },
          label: "set up",
        },
        {
          id: "reject",
          type: "dribble",
          from: { x: 65, y: 49 },
          to: { x: 78, y: 20 },
          label: "reject",
        },
        {
          id: "screen",
          type: "screen",
          from: { x: 58, y: 48 },
          to: { x: 64, y: 48 },
        },
      ],
    ),
  },
  {
    id: "weak-side-shake-decision",
    title: "Weak-Side Shake Decision",
    category: "decision_making",
    ageGroups: ["u16", "hs_elite"],
    durationMin: 14,
    intensity: "medium",
    playersMin: 5,
    playersMax: 12,
    equipment: ["basketballs"],
    courtMode: "half",
    objective:
      "Teach the weak-side shooter to shake behind help when the low defender tags the roll.",
    setup: [
      "Run a high ball screen with a roller and weak-side corner shooter.",
      "Place a tag defender between the roller and the corner.",
      "Add a second spacer at the wing for the extra pass.",
    ],
    execution: [
      "Ball handler uses the screen and draws two defenders.",
      "Roller dives to force the low tag.",
      "Weak-side shooter shakes up as the tag leaves the corner.",
      "Ball handler hits the shake or moves it through the wing.",
    ],
    coachingCues: [
      "Shake when your defender tags, not before.",
      "Show hands in the passing window.",
      "Ball handler reads low defender's chest.",
    ],
    commonMistakes: [
      "Shooter lifts too early and brings defender into the passing lane.",
      "Handler misses the tag; pause at the snake point and identify low help.",
      "Roller short-rolls without purpose; force a hard rim run first.",
    ],
    regression: "Pre-call the tag so the shake timing is obvious.",
    progression: "Make the tag defender choose between tag, stunt, and stay home.",
    scoring:
      "Three points for a correct shake pass to a shot or extra pass advantage.",
    safetyNote:
      "Keep weak-side closeouts under control after long skip passes.",
    diagram: halfDiagram(
      [
        { id: "one", label: "1", role: "offense", x: 42, y: 58 },
        { id: "five", label: "5", role: "offense", x: 56, y: 50 },
        { id: "corner", label: "2", role: "offense", x: 84, y: 18 },
        { id: "tag", label: "T", role: "defense", x: 68, y: 22 },
      ],
      [
        {
          id: "use",
          type: "dribble",
          from: { x: 42, y: 58 },
          to: { x: 58, y: 38 },
        },
        {
          id: "roll",
          type: "cut",
          from: { x: 56, y: 50 },
          to: { x: 50, y: 14 },
          label: "roll",
        },
        {
          id: "shake",
          type: "cut",
          from: { x: 84, y: 18 },
          to: { x: 78, y: 34 },
          label: "shake",
        },
        {
          id: "skip",
          type: "pass",
          from: { x: 58, y: 38 },
          to: { x: 78, y: 34 },
          label: "skip",
        },
      ],
    ),
  },
  {
    id: "four-v-four-advantage-constraints",
    title: "4v4 Advantage Constraints",
    category: "team_concepts",
    ageGroups: ["u14", "u16", "hs_elite"],
    durationMin: 16,
    intensity: "high",
    playersMin: 8,
    playersMax: 12,
    equipment: ["basketballs"],
    courtMode: "half",
    objective:
      "Create game-speed decisions by giving offense a temporary advantage and defense a recovery goal.",
    setup: [
      "Start four offensive players spaced around the arc.",
      "One defender begins touching a cone or baseline, creating a late closeout.",
      "Coach passes to the advantage side to start.",
    ],
    execution: [
      "Offense attacks immediately before the fourth defender recovers.",
      "They must use paint touch, extra pass, or quick shot within seven seconds.",
      "Defense scrambles, communicates, and matches out.",
      "Reset after shot, turnover, or seven seconds.",
    ],
    coachingCues: [
      "Advantage dies if the ball sticks.",
      "Drive the closeout and force two defenders to guard one.",
      "Defense protects rim first, then fans out.",
    ],
    commonMistakes: [
      "Offense holds the first catch; use a two-second decision clock.",
      "Defense switches silently; require names and match calls.",
      "Weak-side spacing collapses; mark corners and slots.",
    ],
    regression: "Start 4v3 with no recovering defender.",
    progression: "Add shot-clock pressure and score only assisted makes.",
    scoring:
      "Offense gets three for a quality advantage shot; defense gets three for a stop or late-clock force.",
    safetyNote:
      "Limit consecutive high-intensity reps and build recovery into the rotation.",
    diagram: halfDiagram(
      [
        { id: "o1", label: "1", role: "offense", x: 50, y: 58 },
        { id: "o2", label: "2", role: "offense", x: 22, y: 42 },
        { id: "o3", label: "3", role: "offense", x: 78, y: 42 },
        { id: "o4", label: "4", role: "offense", x: 50, y: 22 },
        { id: "d4", label: "D4", role: "defense", x: 85, y: 72 },
      ],
      [
        {
          id: "start",
          type: "pass",
          from: { x: 50, y: 58 },
          to: { x: 78, y: 42 },
          label: "advantage",
        },
        {
          id: "drive",
          type: "dribble",
          from: { x: 78, y: 42 },
          to: { x: 60, y: 22 },
        },
        {
          id: "recover",
          type: "defensive_slide",
          from: { x: 85, y: 72 },
          to: { x: 78, y: 42 },
          label: "recover",
        },
      ],
      {
        cones: [{ id: "recover-cone", x: 85, y: 72, label: "late" }],
      },
    ),
  },
  {
    id: "x-out-defensive-rotation",
    title: "X-Out Defensive Rotation",
    category: "defense",
    ageGroups: ["u14", "u16", "hs_elite"],
    durationMin: 14,
    intensity: "high",
    playersMin: 6,
    playersMax: 12,
    equipment: ["basketballs"],
    courtMode: "half",
    objective:
      "Teach two defenders to cover corner and wing after a drive-and-kick scramble.",
    setup: [
      "Offense places shooters in the corner and wing.",
      "Two defenders start in help near the lane.",
      "Coach drives or passes to trigger the first kickout.",
    ],
    execution: [
      "Low defender takes first pass to the corner.",
      "High defender rotates down or out to the next shooter.",
      "Offense makes one extra pass to test the X-out.",
      "Play live after the second closeout.",
    ],
    coachingCues: [
      "Closest defender takes the ball, partner covers the next threat.",
      "Sprint the first two steps, chop the final steps.",
      "Communicate early: mine, X, next.",
    ],
    commonMistakes: [
      "Both defenders close to the same shooter; rehearse the X pattern.",
      "Closeouts are upright; cue sprint-chop-high hands.",
      "Second defender watches the ball; require next-threat vision.",
    ],
    regression: "Walk through with no shot or drive after the pass.",
    progression: "Let offense drive the second closeout.",
    scoring:
      "Defense earns two points for correct X-out and two for a contested stop.",
    safetyNote:
      "Control corner closeouts so shooters have a safe landing lane.",
    diagram: halfDiagram(
      [
        { id: "corner", label: "C", role: "offense", x: 18, y: 18 },
        { id: "wing", label: "W", role: "offense", x: 28, y: 42 },
        { id: "d1", label: "D1", role: "defense", x: 44, y: 20 },
        { id: "d2", label: "D2", role: "defense", x: 50, y: 34 },
        { id: "coach", label: "C", role: "coach", x: 58, y: 24 },
      ],
      [
        {
          id: "kick",
          type: "pass",
          from: { x: 58, y: 24 },
          to: { x: 18, y: 18 },
          label: "kick",
        },
        {
          id: "low",
          type: "defensive_slide",
          from: { x: 44, y: 20 },
          to: { x: 18, y: 18 },
          label: "low takes ball",
        },
        {
          id: "high",
          type: "rotation",
          from: { x: 50, y: 34 },
          to: { x: 28, y: 42 },
          label: "X-out",
        },
      ],
    ),
  },
  {
    id: "transition-conversion-defense",
    title: "Transition Conversion Defense",
    category: "defense",
    ageGroups: ["u16", "hs_elite"],
    durationMin: 16,
    intensity: "high",
    playersMin: 8,
    playersMax: 15,
    equipment: ["basketballs"],
    courtMode: "full",
    objective:
      "Train players to convert from offense to defense, stop the ball, protect the rim, and match shooters.",
    setup: [
      "Run 4v4 or 5v5 from a shot or turnover simulation.",
      "Coach designates one offensive player as delayed back pressure.",
      "Defense must communicate ball, rim, and match responsibilities.",
    ],
    execution: [
      "On a miss or coach call, offense immediately converts to defense.",
      "Nearest player stops the ball before half court.",
      "Next player protects the rim while others match threats.",
      "Play until the defense gets organized or offense scores.",
    ],
    coachingCues: [
      "Sprint back through the middle, then fan out.",
      "Ball, rim, match is the first priority order.",
      "Talk before you find your own player.",
    ],
    commonMistakes: [
      "Everyone runs to the ball; assign rim protection priority.",
      "Players jog after missed shots; score conversion effort.",
      "Defense matches too early and gives up rim; teach protect middle first.",
    ],
    regression: "Run 3v3 conversion with clear roles.",
    progression: "Add an advantage start where defense is down one player.",
    scoring:
      "Defense gets three points for stopping ball and protecting rim before first shot.",
    safetyNote:
      "Build rest between full-court reps to preserve sprint mechanics.",
    diagram: fullDiagram(
      [
        { id: "o1", label: "1", role: "offense", x: 50, y: 18 },
        { id: "o2", label: "2", role: "offense", x: 22, y: 24 },
        { id: "o3", label: "3", role: "offense", x: 78, y: 24 },
        { id: "d1", label: "D1", role: "defense", x: 50, y: 30 },
        { id: "d2", label: "D2", role: "defense", x: 38, y: 28 },
        { id: "d3", label: "D3", role: "defense", x: 62, y: 28 },
      ],
      [
        {
          id: "conversion",
          type: "defensive_slide",
          from: { x: 50, y: 30 },
          to: { x: 50, y: 72 },
          label: "ball",
        },
        {
          id: "rim",
          type: "rotation",
          from: { x: 38, y: 28 },
          to: { x: 50, y: 88 },
          label: "rim",
        },
        {
          id: "match",
          type: "rotation",
          from: { x: 62, y: 28 },
          to: { x: 78, y: 76 },
          label: "match",
        },
      ],
    ),
  },
  {
    id: "late-clock-one-v-one-two-v-two-decision-game",
    title: "Late Clock 1v1/2v2 Decision Game",
    category: "decision_making",
    ageGroups: ["u16", "hs_elite"],
    durationMin: 14,
    intensity: "high",
    playersMin: 4,
    playersMax: 12,
    equipment: ["basketballs"],
    courtMode: "half",
    objective:
      "Train efficient shot creation and pass decisions under a short clock.",
    setup: [
      "Start with a ball handler at the top and defender matched.",
      "Add a second offensive player and defender on coach command.",
      "Coach counts down from seven seconds.",
    ],
    execution: [
      "At seven seconds, player attacks in 1v1.",
      "If coach calls add, the corner teammate and defender become live.",
      "Ball handler must decide whether to create, reject help, or pass.",
      "Possession ends on shot, turnover, foul, or clock.",
    ],
    coachingCues: [
      "Win the first shoulder before the clock reaches four.",
      "Know your counter before you need it.",
      "Pass only if it creates a better shot than the one you have.",
    ],
    commonMistakes: [
      "Players dribble out the clock; enforce a paint or shot touch by four.",
      "Teammate stands hidden; require lift or drift on the drive.",
      "Defender reaches late; score vertical contests, not fouls.",
    ],
    regression: "Use a ten-second clock and 1v1 only.",
    progression: "Add a third spacer and require advantage preservation.",
    scoring:
      "Two for efficient shot, three for assist, defense gets three for no quality attempt.",
    safetyNote:
      "Limit repeated isolation reps and rotate defenders to manage contact load.",
    diagram: halfDiagram(
      [
        { id: "one", label: "1", role: "offense", x: 50, y: 62 },
        { id: "d1", label: "D1", role: "defense", x: 50, y: 54 },
        { id: "two", label: "2", role: "offense", x: 82, y: 20 },
        { id: "d2", label: "D2", role: "defense", x: 76, y: 24 },
      ],
      [
        {
          id: "attack",
          type: "dribble",
          from: { x: 50, y: 62 },
          to: { x: 56, y: 24 },
          label: "7 sec",
        },
        {
          id: "add",
          type: "cut",
          from: { x: 82, y: 20 },
          to: { x: 76, y: 36 },
          label: "add",
        },
        {
          id: "kick",
          type: "pass",
          from: { x: 56, y: 24 },
          to: { x: 76, y: 36 },
          label: "if help",
        },
      ],
    ),
  },
  {
    id: "closeout-to-boxout-chain",
    title: "Closeout To Boxout Chain",
    category: "defense",
    ageGroups: ["u14", "u16", "hs_elite"],
    durationMin: 12,
    intensity: "medium",
    playersMin: 4,
    playersMax: 12,
    equipment: ["basketballs"],
    courtMode: "half",
    objective:
      "Link the closeout, contest, contact, and rebound into one defensive habit chain.",
    setup: [
      "Shooter starts on the wing with defender in help.",
      "Coach passes to trigger the closeout.",
      "Shooter must shoot after one jab or one dribble.",
    ],
    execution: [
      "Defender closes out under control and contests without fouling.",
      "On the shot, defender pivots into contact.",
      "Defender finds the ball and rebounds or clears space.",
      "Rotate after each shot result.",
    ],
    coachingCues: [
      "The possession is not over at the contest.",
      "Hit, find, get after every shot.",
      "Contest high, rebound low and strong.",
    ],
    commonMistakes: [
      "Defender watches the shot; require immediate contact after the contest.",
      "Closeout is too wild; start from shorter distance.",
      "Shooter lands on defender; emphasize legal contest angle.",
    ],
    regression: "Use coach tosses and no live drive threat.",
    progression: "Add a second offensive rebounder crashing from the corner.",
    scoring:
      "Defense gets one point for closeout, one for contest, two for rebound.",
    safetyNote:
      "No contact under a shooter's feet; boxout begins after the landing lane is clear.",
    diagram: halfDiagram(
      [
        { id: "s", label: "S", role: "offense", x: 24, y: 42 },
        { id: "d", label: "D", role: "defense", x: 48, y: 24 },
        { id: "c", label: "C", role: "coach", x: 50, y: 58 },
      ],
      [
        {
          id: "pass",
          type: "pass",
          from: { x: 50, y: 58 },
          to: { x: 24, y: 42 },
        },
        {
          id: "close",
          type: "defensive_slide",
          from: { x: 48, y: 24 },
          to: { x: 27, y: 41 },
          label: "closeout",
        },
        {
          id: "box",
          type: "rebound",
          from: { x: 27, y: 41 },
          to: { x: 24, y: 42 },
          label: "boxout",
        },
      ],
    ),
  },
  {
    id: "five-spot-shooting-standards",
    title: "5-Spot Shooting Standards",
    category: "shooting",
    ageGroups: ["u14", "u16", "hs_elite"],
    durationMin: 15,
    intensity: "medium",
    playersMin: 2,
    playersMax: 8,
    equipment: ["basketballs"],
    courtMode: "half",
    objective:
      "Create measurable shooting accountability from five core perimeter locations.",
    setup: [
      "Use both corners, both wings, and the top spot.",
      "Shooter works with one rebounder and one passer.",
      "Set the distance based on age and strength, not ego.",
    ],
    execution: [
      "Shooter takes five shots from each spot.",
      "Only balanced, game-speed catches count toward the score.",
      "Record makes and footwork misses separately.",
      "Repeat the weakest spot at the end.",
    ],
    coachingCues: [
      "Every catch should look like it could happen in a game.",
      "Same base on corner and top shots.",
      "Miss feedback: short, long, left, right, or balance.",
    ],
    commonMistakes: [
      "Players hunt range instead of mechanics; move in until standards hold.",
      "Passer gives lazy passes; count only pocket catches.",
      "Shooter changes routine after misses; use the same preparation.",
    ],
    regression: "Use three spots and ten-foot range.",
    progression: "Add sprint-in or relocation before each catch.",
    scoring:
      "Set a standard by level: U14 12 of 25, elite 17 of 25, with balance required.",
    safetyNote:
      "Limit repeated max-range attempts and prioritize repeatable mechanics.",
    diagram: halfDiagram(
      [
        { id: "s", label: "S", role: "offense", x: 50, y: 52 },
        { id: "p", label: "P", role: "offense", x: 50, y: 68 },
        { id: "r", label: "R", role: "neutral", x: 55, y: 14 },
      ],
      [
        {
          id: "pass",
          type: "pass",
          from: { x: 50, y: 68 },
          to: { x: 50, y: 52 },
        },
        {
          id: "shot",
          type: "shot",
          from: { x: 50, y: 52 },
          to: { x: 50, y: 9 },
          label: "standard",
        },
      ],
      {
        spots: [
          { id: "c1", x: 18, y: 20, label: "1" },
          { id: "w1", x: 28, y: 42, label: "2" },
          { id: "top", x: 50, y: 52, label: "3" },
          { id: "w2", x: 72, y: 42, label: "4" },
          { id: "c2", x: 82, y: 20, label: "5" },
        ],
      },
    ),
  },
  {
    id: "two-ball-pressure-handle",
    title: "Two-Ball Pressure Handle",
    category: "ball_handling",
    ageGroups: ["u14", "u16", "hs_elite"],
    durationMin: 12,
    intensity: "medium",
    playersMin: 1,
    playersMax: 8,
    equipment: ["basketballs", "cones"],
    courtMode: "half",
    objective:
      "Challenge hand independence and posture under ball-control pressure.",
    setup: [
      "Each active player has two basketballs.",
      "Create a short lane with start and finish cones.",
      "Use a coach cue for same-time, alternating, and retreat patterns.",
    ],
    execution: [
      "Player dribbles both balls in the named rhythm.",
      "At the cone, player retreats two steps while keeping both balls alive.",
      "They re-attack and finish by passing one ball to coach and laying up the other.",
      "Rest after short sets to keep quality high.",
    ],
    coachingCues: [
      "Posture stays tall even when the dribble is low.",
      "Hands work independently; feet still create space.",
      "Recover the ball without panic when rhythm breaks.",
    ],
    commonMistakes: [
      "Players stare at both balls; use short vision calls from the coach.",
      "Dribbles get too high; move slower before adding speed.",
      "Players cross lanes; keep one active player per lane.",
    ],
    regression: "Stationary same-time and alternating dribbles only.",
    progression: "Add a coach body shade during the retreat and re-attack.",
    scoring:
      "Score a rep only if both balls stay live through retreat and re-attack.",
    safetyNote:
      "Use short work intervals because two-ball drills fatigue hands quickly.",
    diagram: halfDiagram(
      [
        { id: "p", label: "1", role: "offense", x: 38, y: 74 },
        { id: "c", label: "C", role: "coach", x: 54, y: 22 },
      ],
      [
        {
          id: "up",
          type: "dribble",
          from: { x: 38, y: 74 },
          to: { x: 38, y: 44 },
          label: "two-ball",
        },
        {
          id: "retreat",
          type: "dribble",
          from: { x: 38, y: 44 },
          to: { x: 30, y: 58 },
          label: "retreat",
        },
        {
          id: "finish",
          type: "dribble",
          from: { x: 30, y: 58 },
          to: { x: 50, y: 12 },
        },
      ],
      {
        cones: [
          { id: "start", x: 38, y: 74, label: "start" },
          { id: "turn", x: 38, y: 44, label: "retreat" },
        ],
      },
    ),
  },
  {
    id: "small-sided-games-king-of-the-court",
    title: "Small-Sided Games King Of The Court",
    category: "decision_making",
    ageGroups: ["u8", "u11", "u14", "u16", "hs_elite"],
    durationMin: 12,
    intensity: "medium",
    playersMin: 4,
    playersMax: 16,
    equipment: ["basketballs", "cones"],
    courtMode: "half",
    objective:
      "Use short competitive games to transfer skills into decisions while keeping players engaged.",
    setup: [
      "Create one or two small courts using half-court space.",
      "Play 1v1, 2v2, or 3v3 depending on age and numbers.",
      "Winners stay for a short streak limit while challengers rotate in.",
    ],
    execution: [
      "Each game starts with a check ball or coach pass.",
      "Possession is live until a score, stop, or turnover.",
      "Winner stays for no more than three consecutive wins.",
      "Coach changes constraints: weak hand, two dribbles, pass before score, or paint touch.",
    ],
    coachingCues: [
      "Win with the skill focus of the day, not just speed.",
      "Spacing makes the game easier for teammates.",
      "Defenders must contain before trying to steal.",
    ],
    commonMistakes: [
      "Players wait too long between games; use fast rotations.",
      "Older players overdribble; add a dribble limit.",
      "Young players get too physical; shrink rules to no-contact scoring.",
    ],
    regression: "Use 1v1 from a stationary start with no steals for U8.",
    progression: "Add advantage starts or shot-clock limits for elite players.",
    scoring:
      "Winner stays, but max three wins; bonus point for executing the day's teaching cue.",
    safetyNote:
      "Match players by size and skill, and keep game intervals short for younger ages.",
    diagram: halfDiagram(
      [
        { id: "o1", label: "1", role: "offense", x: 34, y: 48 },
        { id: "o2", label: "2", role: "offense", x: 66, y: 48 },
        { id: "d1", label: "D1", role: "defense", x: 38, y: 38 },
        { id: "d2", label: "D2", role: "defense", x: 62, y: 38 },
      ],
      [
        {
          id: "start",
          type: "pass",
          from: { x: 50, y: 62 },
          to: { x: 34, y: 48 },
          label: "check",
        },
        {
          id: "attack",
          type: "dribble",
          from: { x: 34, y: 48 },
          to: { x: 44, y: 20 },
          label: "2v2",
        },
      ],
      {
        zones: [
          { id: "court", label: "small-sided game", x: 18, y: 14, width: 64, height: 52 },
        ],
      },
    ),
  },
] satisfies Drill[];

export const drillById = Object.fromEntries(
  drills.map((drill) => [drill.id, drill]),
) as Record<string, Drill>;

export const drillCategories = Array.from(
  new Set(drills.map((drill) => drill.category)),
);

export const drillEquipment = Array.from(
  new Set(drills.flatMap((drill) => drill.equipment)),
).sort();
