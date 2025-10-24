import type { ReactNode } from "react";

type ToolbarProps = {
  children?: ReactNode;
  className?: string;
};

export function TripsToolbar({ children, className = "" }: ToolbarProps) {
  return (
    <div
      className={`w-full px-8 flex items-center justify-between h-16 bg-gray-500 ${className}`}
    >
      {children}
    </div>
  );
}
