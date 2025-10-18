import { FaMapPin } from "react-icons/fa";

interface MarkerProps {
  x: number;
  y: number;
  color?: string;
  name: string;
}

export function Marker({ x, y, color, name }: MarkerProps) {
  return (
    <g transform={`translate(${x},${y})`}>
      <FaMapPin
        size={24}
        color={color || "#e53e3e"}
        style={{ filter: "drop-shadow(0 1px 2px #fff)" }}
      />
      <title>{name}</title>
    </g>
  );
}