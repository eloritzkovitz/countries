import type { ReactNode } from "react";
import { PanelHeader } from "./PanelHeader";
import { DEFAULT_PANEL_WIDTH } from "@config/constants";
import { useKeyHandler } from "@hooks/useKeyHandler";
import "./Panel.css";
import { useUI } from "@contexts/UIContext";
import React from "react";

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
  // UI state
  const { uiVisible } = useUI();

  // Handle Escape key to close the panel
  useKeyHandler(() => {
    if (show && onHide) {
      onHide();
    }
  }, ["Escape"]);  

  // Close the panel when uiVisible becomes false
  React.useEffect(() => {
    if (!uiVisible && show && onHide) {
      onHide();
    }
  }, [uiVisible, show, onHide]);

  return (
    <div
      role="complementary"
      aria-hidden={!show}
      tabIndex={-1}
      className={`panel ${show ? "panel-show" : "panel-hide"} ${className}`}
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
      <PanelHeader title={title} showSeparator={showSeparator}>
        {headerActions}
      </PanelHeader>
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
