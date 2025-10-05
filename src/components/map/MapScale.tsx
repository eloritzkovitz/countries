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
    <div className="flex flex-col items-center select-none">
      <button
        onClick={onZoomIn}
        className="bg-blue-600 text-white rounded-lg w-8 h-8 flex items-center justify-center text-2xl shadow-lg cursor-pointer hover:bg-blue-700 transition-colors mb-2"
        aria-label="Zoom in"
        title="Zoom in"
      >
        +
      </button>
      <div className="h-40 px-2 flex items-center">
        <Slider
          vertical
          min={minScale}
          max={maxScale}
          step={0.1}
          value={scale}
          onChange={(value) =>
            onScaleChange(Array.isArray(value) ? value[0] : value)
          }
          styles={{
            track: { backgroundColor: "#2563eb", width: 8 },
            handle: {
              borderColor: "#2563eb",
              height: 24,
              width: 24,
              marginLeft: -8,
              backgroundColor: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            },
            rail: { backgroundColor: "#dbeafe", width: 8 },
          }}
        />
      </div>
      <button
        onClick={onZoomOut}
        className="bg-blue-600 text-white rounded-lg w-8 h-8 flex items-center justify-center text-2xl shadow-lg cursor-pointer hover:bg-blue-700 transition-colors mt-2"
        aria-label="Zoom out"
        title="Zoom out"
      >
        −
      </button>
    </div>
  );
}
