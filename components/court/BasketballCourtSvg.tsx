import type { CourtDiagram, DiagramLineType } from "@/src/data/basketball/types";

type BasketballCourtSvgProps = {
  diagram: CourtDiagram;
  label?: string;
  compact?: boolean;
};

const playerStyle: Record<CourtDiagram["players"][number]["role"], string> = {
  offense: "#f97316",
  defense: "#38bdf8",
  coach: "#facc15",
  neutral: "#e5e7eb",
};

const lineStyle: Record<
  DiagramLineType,
  { stroke: string; width: number; dash?: string; marker: boolean }
> = {
  dribble: { stroke: "#f97316", width: 1.5, dash: "4 3", marker: true },
  pass: { stroke: "#f8fafc", width: 1.3, marker: true },
  cut: { stroke: "#84cc16", width: 1.5, marker: true },
  defensive_slide: { stroke: "#38bdf8", width: 1.5, dash: "1 3", marker: true },
  screen: { stroke: "#facc15", width: 3, marker: false },
  rotation: { stroke: "#a78bfa", width: 1.6, dash: "6 3", marker: true },
  shot: { stroke: "#fb7185", width: 1.5, marker: true },
  rebound: { stroke: "#2dd4bf", width: 1.6, dash: "2 2", marker: true },
};

function actionPath(
  type: DiagramLineType,
  from: { x: number; y: number },
  to: { x: number; y: number },
): string {
  if (type === "shot") {
    const controlX = (from.x + to.x) / 2;
    const controlY = Math.min(from.y, to.y) - 14;
    return `M ${from.x} ${from.y} Q ${controlX} ${controlY} ${to.x} ${to.y}`;
  }

  if (type === "dribble" || type === "rotation") {
    const controlX = (from.x + to.x) / 2 + 7;
    const controlY = (from.y + to.y) / 2;
    return `M ${from.x} ${from.y} Q ${controlX} ${controlY} ${to.x} ${to.y}`;
  }

  return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
}

function midpoint(
  from: { x: number; y: number },
  to: { x: number; y: number },
): { x: number; y: number } {
  return { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };
}

function HalfCourtLines() {
  return (
    <g fill="none" stroke="#f7ead6" strokeWidth="0.8" opacity="0.9">
      <rect x="2" y="2" width="96" height="96" rx="1" />
      <line x1="2" y1="98" x2="98" y2="98" opacity="0.55" />
      <rect x="38" y="2" width="24" height="36" />
      <rect x="42" y="2" width="16" height="19" />
      <circle cx="50" cy="9" r="2.3" />
      <line x1="43" y1="6" x2="57" y2="6" />
      <circle cx="50" cy="38" r="12" strokeDasharray="3 2" />
      <path d="M 15 2 L 15 22 Q 50 62 85 22 L 85 2" />
    </g>
  );
}

function FullCourtLines() {
  return (
    <g fill="none" stroke="#f7ead6" strokeWidth="0.8" opacity="0.9">
      <rect x="2" y="2" width="96" height="96" rx="1" />
      <line x1="2" y1="50" x2="98" y2="50" />
      <circle cx="50" cy="50" r="10" />
      <circle cx="50" cy="9" r="2.2" />
      <circle cx="50" cy="91" r="2.2" />
      <line x1="43" y1="6" x2="57" y2="6" />
      <line x1="43" y1="94" x2="57" y2="94" />
      <rect x="38" y="2" width="24" height="28" />
      <rect x="38" y="70" width="24" height="28" />
      <circle cx="50" cy="30" r="10" strokeDasharray="3 2" />
      <circle cx="50" cy="70" r="10" strokeDasharray="3 2" />
      <path d="M 15 2 L 15 20 Q 50 50 85 20 L 85 2" />
      <path d="M 15 98 L 15 80 Q 50 50 85 80 L 85 98" />
    </g>
  );
}

export function BasketballCourtSvg({
  diagram,
  label = "Basketball drill court diagram",
  compact = false,
}: BasketballCourtSvgProps) {
  const markerId = `arrow-${diagram.mode}-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <figure className="w-full">
      <div className="overflow-hidden rounded-lg border border-white/10 bg-[#2f6f4f] shadow-trainer">
        <svg
          role="img"
          aria-label={label}
          viewBox="0 0 100 100"
          className={diagram.mode === "full" ? "aspect-[10/16] w-full" : "aspect-[4/3] w-full"}
        >
          <defs>
            <marker
              id={markerId}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="4"
              markerHeight="4"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#f8fafc" />
            </marker>
          </defs>
          <rect x="0" y="0" width="100" height="100" fill="#276346" />
          <rect x="4" y="4" width="92" height="92" fill="#b87939" opacity="0.16" />
          {diagram.mode === "half" ? <HalfCourtLines /> : <FullCourtLines />}

          {diagram.zones?.map((zone) => (
            <g key={zone.id}>
              <rect
                x={zone.x}
                y={zone.y}
                width={zone.width}
                height={zone.height}
                fill="#facc15"
                opacity="0.16"
                stroke="#facc15"
                strokeDasharray="3 2"
              />
              <text
                x={zone.x + zone.width / 2}
                y={zone.y + zone.height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff7ed"
                fontSize={compact ? 2.6 : 3.2}
                fontWeight="700"
              >
                {zone.label}
              </text>
            </g>
          ))}

          {diagram.lines.map((line) => {
            const style = lineStyle[line.type];
            const labelPoint = midpoint(line.from, line.to);

            return (
              <g key={line.id}>
                <path
                  d={actionPath(line.type, line.from, line.to)}
                  fill="none"
                  stroke={style.stroke}
                  strokeWidth={style.width}
                  strokeDasharray={style.dash}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  markerEnd={style.marker ? `url(#${markerId})` : undefined}
                />
                {line.label ? (
                  <text
                    x={labelPoint.x}
                    y={labelPoint.y - 2}
                    textAnchor="middle"
                    fill="#fff7ed"
                    fontSize={compact ? 2.4 : 3}
                    fontWeight="700"
                  >
                    {line.label}
                  </text>
                ) : null}
              </g>
            );
          })}

          {diagram.cones?.map((cone) => (
            <g key={cone.id}>
              <path
                d={`M ${cone.x} ${cone.y - 2.6} L ${cone.x - 2.4} ${cone.y + 2.3} L ${
                  cone.x + 2.4
                } ${cone.y + 2.3} Z`}
                fill="#facc15"
                stroke="#422006"
                strokeWidth="0.35"
              />
              {cone.label ? (
                <text
                  x={cone.x}
                  y={cone.y + 6}
                  textAnchor="middle"
                  fill="#fff7ed"
                  fontSize={compact ? 2.4 : 3}
                  fontWeight="700"
                >
                  {cone.label}
                </text>
              ) : null}
            </g>
          ))}

          {diagram.spots?.map((spot) => (
            <g key={spot.id}>
              <circle cx={spot.x} cy={spot.y} r="1.8" fill="#f8fafc" opacity="0.9" />
              {spot.label ? (
                <text
                  x={spot.x}
                  y={spot.y - 3}
                  textAnchor="middle"
                  fill="#fff7ed"
                  fontSize={compact ? 2.2 : 2.8}
                  fontWeight="700"
                >
                  {spot.label}
                </text>
              ) : null}
            </g>
          ))}

          {diagram.players.map((player) => (
            <g key={player.id}>
              <circle
                cx={player.x}
                cy={player.y}
                r={compact ? 3.4 : 4.2}
                fill={playerStyle[player.role]}
                stroke="#0f172a"
                strokeWidth="0.9"
              />
              <text
                x={player.x}
                y={player.y + 0.9}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#0f172a"
                fontSize={compact ? 2.6 : 3.2}
                fontWeight="900"
              >
                {player.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-300">
        {Object.entries(lineStyle).map(([type, style]) => (
          <span key={type} className="inline-flex items-center gap-1.5">
            <span
              className="h-0.5 w-5 rounded-full"
              style={{
                backgroundColor: style.stroke,
                borderTop: style.dash ? `1px dashed ${style.stroke}` : undefined,
              }}
            />
            {type.replaceAll("_", " ")}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
