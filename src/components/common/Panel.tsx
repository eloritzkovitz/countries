import type { ReactNode } from "react";
import { PanelHeader } from "./PanelHeader";
import { DEFAULT_PANEL_WIDTH } from "@config/constants";
import { useKeyHandler } from "@hooks/useKeyHandler";
import { Separator } from "./Separator";

type PanelProps = {
  title: ReactNode;
  children: ReactNode;
  show?: boolean;
  width?: number | string;
  style?: React.CSSProperties;
  className?: string;
  onHide?: () => void;
  headerActions?: ReactNode;
  showSeparator?: boolean;
  scrollable?: boolean;
};

export function Panel({
  title,
  children,
  show = true,
  width = DEFAULT_PANEL_WIDTH,
  style = {},
  className = "",
  onHide,
  headerActions,
  showSeparator = true,
  scrollable = true,
}: PanelProps) {
  useKeyHandler(() => {
    if (show && onHide) {
      onHide();
    }
  }, ["Escape"]);

  return (
    <div
      role="complementary"
      aria-hidden={!show}
      tabIndex={-1}
      className={`bg-white shadow-lg flex flex-col transition-all duration-300 ease-in-out focus:outline-none ${
        show
          ? "translate-x-0 opacity-100 pointer-events-auto"
          : "-translate-x-full opacity-0 pointer-events-none"
      } ${className}`}
      style={{
        width,
        minWidth: width,
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 40,
        willChange: "transform",
        ...style,
      }}
    >
      <div className="px-4 pt-8 pb-0 flex-shrink-0">
        <PanelHeader title={title}>{headerActions}</PanelHeader>
        {showSeparator && <Separator className="mt-4 my-4" />}
      </div>
      <div
        className={`flex-1 min-h-0 px-4 pb-8${
          scrollable ? " overflow-y-auto" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
