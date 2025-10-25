import { useState, useRef } from "react";
import type { ColumnKey } from "@features/trips";
import { DEFAULT_WIDTHS, MIN_WIDTHS } from "@features/trips";

export function useResizableColumns() {
  const [colWidths, setColWidths] = useState(DEFAULT_WIDTHS);
  const resizingCol = useRef<ColumnKey | null>(null);
  const startX = useRef(0);
  const startWidth = useRef(0);

  // Handle mouse down on resizer
  function handleResizeStart(e: React.MouseEvent, key: ColumnKey) {
    resizingCol.current = key;
    startX.current = e.clientX;
    startWidth.current = colWidths[key];

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  // Mouse move handler
  function onMouseMove(e: MouseEvent) {
    if (!resizingCol.current) return;
    const dx = e.clientX - startX.current;
    const minWidth = MIN_WIDTHS[resizingCol.current];
    const newWidth = Math.max(minWidth, startWidth.current + dx);
    setColWidths((prev) => ({
      ...prev,
      [resizingCol.current!]: newWidth,
    }));
  }

  // Mouse up handler
  function onMouseUp() {
    resizingCol.current = null;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }

  return { colWidths, handleResizeStart };
}
