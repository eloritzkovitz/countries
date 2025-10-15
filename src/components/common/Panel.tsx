import type { ReactNode } from "react";
import { PanelHeader } from "./PanelHeader";
import { DEFAULT_PANEL_WIDTH } from "../../config/constants";
import { useKeyHandler } from "../../hooks/useKeyHandler";
import { Separator } from "./Separator";

type PanelProps = {
  title: ReactNode;
  children: ReactNode;
  show?: boolean;
  width?: number | string;
  onHide?: () => void;
  headerActions?: ReactNode;
  showSeparator?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export function Panel({
  title,
  children,
  show = true,
  width = DEFAULT_PANEL_WIDTH,  
  onHide,
  headerActions,
  showSeparator = true,
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
        {showSeparator && <Separator className="mt-4 my-4" />}
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-8">{children}</div>
    </div>
  );
}
