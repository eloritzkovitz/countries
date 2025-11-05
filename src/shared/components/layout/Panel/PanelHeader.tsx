import type { ReactNode } from "react";
import { Separator } from "@components";

type PanelHeaderProps = {
  title: ReactNode;
  children?: ReactNode;
  className?: string;
  showSeparator?: boolean;
};

export function PanelHeader({
  title,
  children,
  className,
  showSeparator,
}: PanelHeaderProps) {
  return (
    <div>
      <div className={`panel-header ${className ?? ""}`}>
        <div className="panel-header-title">{title}</div>
        <div className="flex gap-2">{children}</div>
      </div>
      {showSeparator && <Separator className="mt-4 my-4" />}
    </div>
  );
}
