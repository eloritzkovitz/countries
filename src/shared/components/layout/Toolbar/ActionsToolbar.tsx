import type { ReactNode } from "react";
import "./Toolbar.css"

interface ActionsToolbarProps {
  children?: ReactNode;
  className?: string;
};

export function ActionsToolbar({
  children,
  className = "",
}: ActionsToolbarProps) {
  return <div className={`toolbar-actions-row ${className}`}>{children}</div>;
}
