import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import { ActionButton } from "../common/ActionButton";
import { useTheme } from "../../context/ThemeContext";

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
  const { theme } = useTheme();

  // Theming for slider
  const trackColor = theme === "dark" ? "#3b82f6" : "#2563eb";
  const railColor = theme === "dark" ? "#334155" : "#dbeafe";
  const handleBg = theme === "dark" ? "#1e293b" : "#fff";
  const handleBorder = theme === "dark" ? "#3b82f6" : "#2563eb";

  return (
    <div className="flex flex-col items-center select-none">
      <ActionButton
        onClick={onZoomIn}
        ariaLabel="Zoom in"
        title="Zoom in"
        colorClass="bg-blue-800 text-white hover:bg-blue-900 dark:bg-gray-800 dark:hover:bg-gray-700"
        className="rounded-lg w-8 h-8 flex items-center justify-center text-2xl shadow-lg cursor-pointer mb-2"
        icon={<FaPlus />}
      />
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
            track: { backgroundColor: trackColor, width: 8 },
            handle: {
              borderColor: handleBorder,
              height: 24,
              width: 24,
              marginLeft: -8,
              backgroundColor: handleBg,
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            },
            rail: { backgroundColor: railColor, width: 8 },
          }}
        />
      </div>
      <ActionButton
        onClick={onZoomOut}
        ariaLabel="Zoom out"
        title="Zoom out"
        colorClass="bg-blue-800 text-white hover:bg-blue-900 dark:bg-gray-800 dark:hover:bg-gray-700"
        className="rounded-lg w-8 h-8 flex items-center justify-center text-2xl shadow-lg cursor-pointer mt-2"
        icon={<FaMinus />}
      />
    </div>
  );
}
