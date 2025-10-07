import type { ReactNode } from "react";

type PanelHeaderProps = {
  title: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function PanelHeader({ title, children, className = "" }: PanelHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="flex gap-2">{children}</div>
    </div>
  );
}