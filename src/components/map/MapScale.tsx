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
      className="bg-gray-100 bg-opacity-95 rounded-xl shadow-md px-5 py-3 text-blue-700 border-2 border-blue-600 select-none min-w-[240px] flex items-center gap-3"
    >
      {/* Zoom out button */}
      <button
        onClick={onZoomOut}
        className="bg-white border-2 border-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-xl text-blue-700 cursor-pointer mr-2"
        aria-label="Zoom out"
      >
        −
      </button>
      {/* Scale bar with ticks */}
      <div className="relative" style={{ width: barWidth, height: 24 }}>
        {/* Bar */}
        <div
          className="absolute top-3 left-0 h-1 w-full bg-blue-100 rounded border border-blue-600"
          style={{ width: barWidth }}
        />
        {/* Ticks */}
        {Array.from({ length: steps + 1 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-600 rounded"
            style={{
              left: i * stepWidth - 1,
              top: 1,
              width: 2,
              height: 12,
              zIndex: 1,
            }}
          />
        ))}
        {/* Draggable knob */}
        <div
          onMouseDown={onMouseDown}
          className="absolute flex items-center justify-center rounded-full border-2 border-blue-600 bg-white shadow cursor-grab transition"
          style={{
            left: Math.max(0, Math.min(barWidth - knobRadius * 2, knobCenterX - knobRadius)),
            top: 0,
            width: knobRadius * 2,
            height: knobRadius * 2,
            zIndex: 2,
          }}
          title="Drag to change scale"
        >
          <div className="w-[10px] h-[10px] rounded-full bg-blue-600" />
        </div>
      </div>
      {/* Zoom in button */}
      <button
        onClick={onZoomIn}
        className="bg-white border-2 border-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-xl text-blue-700 cursor-pointer ml-2"
        aria-label="Zoom in"
      >
        +
      </button>
    </div>
  );
}