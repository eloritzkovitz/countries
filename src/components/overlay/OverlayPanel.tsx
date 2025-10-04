import React from "react";
import type { Overlay } from "../../types/overlay";

type OverlayPanelProps = {
  overlay: Overlay;
  children?: React.ReactNode;
};

export function OverlayPanel({ children }: OverlayPanelProps) {
  return (
    <div
      style={{
        borderRadius: 8,
        marginBottom: "1rem",
        background: "#f5f6fa",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {children}
    </div>
  );
}
