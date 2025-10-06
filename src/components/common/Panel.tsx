import type { ReactNode } from "react";
import { PanelHeader } from "./PanelHeader";
import { useKeyHandler } from "../../hooks/useKeyHandler";

type PanelProps = {
  title: ReactNode;
  children: ReactNode;
  width?: number | string;
  show?: boolean;
  onHide?: () => void;
  headerActions?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function Panel({
  title,
  children,
  width = 400,
  show = true,
  onHide,
  headerActions,
  className = "",
  style = {},
}: PanelProps) {
  
  // Handle 'Escape' key to close the panel
  useKeyHandler(() => {
    if (show && onHide) {
      onHide();
    }
  }, ["Escape"]);

  // Don't render the panel if 'show' is false
  if (!show) return null;

  return (
    <div
      className={`h-screen bg-white shadow-lg flex flex-col ${className}`}
      style={{ width, minWidth: width, ...style, zIndex: 40 }}
    >
      <div className="px-4 pt-8 pb-0 flex-shrink-0">
        <PanelHeader title={title}>{headerActions}</PanelHeader>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-8">{children}</div>
    </div>
  );
}
