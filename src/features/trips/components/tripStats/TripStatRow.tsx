import type { ReactNode } from "react";

interface TripStatRowProps {
  icon: ReactNode;
  label: ReactNode;
  value: ReactNode;
  align?: "left" | "center" | "right";
}

export function TripStatRow({
  icon,
  label,
  value,
  align = "right",
}: TripStatRowProps) {
  return (
    <tr>
      <td className="font-semibold flex items-center gap-2">
        {icon}
        {label}
      </td>
      <td className={`font-bold text-${align}`}>{value}</td>
    </tr>
  );
}
