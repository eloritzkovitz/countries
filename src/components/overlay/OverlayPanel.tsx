import React from "react";
import type { Overlay } from "../../types/overlay";

type OverlayPanelProps = {
  overlay: Overlay;
  children?: React.ReactNode;
};

export function OverlayPanel({ children }: OverlayPanelProps) {
  return <div className="rounded-lg mb-4 bg-gray-50 shadow-sm">{children}</div>;
}
