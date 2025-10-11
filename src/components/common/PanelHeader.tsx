import type { ReactNode } from "react";

type PanelHeaderProps = {
  title: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function PanelHeader({ title, children, className }: PanelHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-4 ${className ?? ""}`}>
      <div className="flex items-center gap-2 h-8 text-lg font-bold">{title}</div>
      <div className="flex gap-2">{children}</div>
    </div>
  );
}