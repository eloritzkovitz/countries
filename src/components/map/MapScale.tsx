import React, { useState } from "react";

type MapScaleProps = {
  scale: number;
  minScale?: number;
  maxScale?: number;
  onScaleChange: (scale: number) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
};

export function MapScale({
  scale,
  minScale = 1,
  maxScale = 10,
  onScaleChange,
  onZoomIn,
  onZoomOut,
}: MapScaleProps) {
  const barWidth = 160;
  const knobRadius = 12;
  const steps = maxScale - minScale;
  const stepWidth = barWidth / steps;

  // Clamp scale to valid range
  const clampedScale = Math.max(minScale, Math.min(maxScale, scale));
  // Calculate knob position (centered on tick)
  const knobCenterX = (clampedScale - minScale) * stepWidth;

  const [dragging, setDragging] = useState(false);

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    e.preventDefault();
    e.stopPropagation();
  };

  const onMouseMove = (e: MouseEvent) => {
    if (dragging) {
      const rect = (document.getElementById("map-scale-bar") as HTMLDivElement)?.getBoundingClientRect();
      if (!rect) return;
      let x = e.clientX - rect.left;
      x = Math.max(0, Math.min(barWidth, x));
      // Snap to nearest tick
      const nearestStep = Math.round(x / stepWidth);
      const newScale = minScale + nearestStep;
      onScaleChange(Math.max(minScale, Math.min(maxScale, newScale)));
    }
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  React.useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    } else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    // eslint-disable-next-line
  }, [dragging]);

  return (
    <div
      id="map-scale-bar"
      style={{
        position: "absolute",
        left: 100,
        bottom: 25,
        zIndex: 20,
        background: "rgba(245,247,250,0.97)",
        borderRadius: 12,
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        padding: "0.7rem 1.2rem",
        color: "#0078d4",
        border: "1.5px solid #0078d4",
        userSelect: "none",
        minWidth: barWidth + 80,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      {/* Zoom out button */}
      <button
        onClick={onZoomOut}
        style={{
          background: "#fff",
          border: "1.5px solid #0078d4",
          borderRadius: "50%",
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          color: "#0078d4",
          cursor: "pointer",
          marginRight: 8,
        }}
        aria-label="Zoom out"
      >
        −
      </button>
      {/* Scale bar with ticks */}
      <div style={{ position: "relative", width: barWidth, height: 24 }}>
        {/* Bar */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 0,
            width: barWidth,
            height: 4,
            background: "#e6f0fa",
            borderRadius: 2,
            border: "1px solid #0078d4",
          }}
        />
        {/* Ticks */}
        {Array.from({ length: steps + 1 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: i * stepWidth - 1,
              top: 6,
              width: 2,
              height: 12,
              background: "#0078d4",
              borderRadius: 1,
              zIndex: 1,
            }}
          />
        ))}
        {/* Draggable knob */}
        <div
          onMouseDown={onMouseDown}
          style={{
            position: "absolute",
            left: Math.max(0, Math.min(barWidth - knobRadius * 2, knobCenterX - knobRadius)),
            top: 0,
            width: knobRadius * 2,
            height: knobRadius * 2,
            background: "#fff",
            border: "2px solid #0078d4",
            borderRadius: "50%",
            boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
            cursor: "grab",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            transition: "background 0.15s, border 0.15s",
          }}
          title="Drag to change scale"
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#0078d4",
            }}
          />
        </div>
      </div>
      {/* Zoom in button */}
      <button
        onClick={onZoomIn}
        style={{
          background: "#fff",
          border: "1.5px solid #0078d4",
          borderRadius: "50%",
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          color: "#0078d4",
          cursor: "pointer",
          marginLeft: 8,
        }}
        aria-label="Zoom in"
      >
        +
      </button>
    </div>
  );
}