import Slider from "rc-slider";
import "rc-slider/assets/index.css";

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
  return (
    <div className="flex items-center select-none">
      <button
        onClick={onZoomOut}
        className="bg-blue-600 text-white rounded-lg w-8 h-8 flex items-center justify-center text-2xl shadow-lg cursor-pointer hover:bg-blue-700 transition-colors"
        aria-label="Zoom out"
        title="Zoom out"
      >
        −
      </button>
      <div className="w-40 px-2">
        <Slider
          min={minScale}
          max={maxScale}
          step={0.1}
          value={scale}
          onChange={(value) =>
            onScaleChange(Array.isArray(value) ? value[0] : value)
          }
          styles={{
            track: { backgroundColor: "#2563eb", height: 8 },
            handle: {
              borderColor: "#2563eb",
              height: 24,
              width: 24,
              marginTop: -8,
              backgroundColor: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            },
            rail: { backgroundColor: "#dbeafe", height: 8 },
          }}
        />
      </div>
      <button
        onClick={onZoomIn}
        className="bg-blue-600 text-white rounded-lg w-8 h-8 flex items-center justify-center text-2xl shadow-lg cursor-pointer hover:bg-blue-700 transition-colors"
        aria-label="Zoom in"
        title="Zoom in"
      >
        +
      </button>
    </div>
  );
}
