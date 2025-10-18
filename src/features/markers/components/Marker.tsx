interface MarkerProps {
  x: number;
  y: number;
  color?: string;
  name: string;
  zoom?: number;
}

export function Marker({ x, y, color, name, zoom = 1 }: MarkerProps) {
  return (
    <g
      transform={`translate(${x},${y}) scale(${1 / zoom})`}
      style={{ cursor: "pointer" }}
    >
      <path
        d="M0,-12 a8,8 0 1,1 0,16 a8,8 0 1,1 0,-16 M0,4 L0,18"
        fill={color || "#e53e3e"}
        stroke="#fff"
        strokeWidth={1.5}
      />
      <circle cy={18} r={2} fill="#fff" stroke={color || "#e53e3e"} strokeWidth={1.5} />
      <title>{name}</title>
    </g>
  );
}