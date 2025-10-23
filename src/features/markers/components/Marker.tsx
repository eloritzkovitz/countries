import { useTheme } from "@contexts/SettingsContext";

interface MarkerProps {
  x: number;
  y: number;
  color?: string;
  name: string;
  zoom?: number;
  onClick: (event: React.MouseEvent<SVGGElement>, x: number, y: number) => void;
}

export function Marker({ x, y, color, name, zoom = 1, onClick }: MarkerProps) {
  const { theme } = useTheme();
  const markerStrokeColor = theme === "dark" ? "#fff" : "#222";
  
  return (
    <g
      transform={`translate(${x},${y}) scale(${1 / zoom})`}
      style={{ cursor: "pointer" }}
      onClick={(event) => onClick(event, x, y)}
    >
      <g transform="translate(0,-18)">
        <path
          d="M0,-12 a8,8 0 1,1 0,16 a8,8 0 1,1 0,-16 M0,4 L0,18"
          fill={color || "#e53e3e"}
          stroke={markerStrokeColor}
          strokeWidth={1.5}
        />
        <circle cy={18} r={2} fill="#fff" stroke={color || "#e53e3e"} strokeWidth={1.5} />
      </g>
      <title>{name}</title>
    </g>
  );
}