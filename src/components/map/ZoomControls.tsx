import { FaPlus, FaMinus } from "react-icons/fa";
import { useRef } from "react";
import {
  DEFAULT_MAP_MAX_ZOOM,
  DEFAULT_MAP_MIN_ZOOM,
} from "../../config/constants";
import { ZoomButton } from "./ZoomButton";

export function ZoomControls({
  zoom,
  setZoom,
}: {
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
}) {
  const zoomInInterval = useRef<ReturnType<typeof setTimeout> | null>(null);
  const zoomOutInterval = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Start continuous zooming
  const startContinuousZoom = (direction: "in" | "out") => {
    const step = direction === "in" ? 1 : -1;
    const interval = setInterval(() => {
      setZoom((prev) =>
        Math.max(
          DEFAULT_MAP_MIN_ZOOM,
          Math.min(prev + step, DEFAULT_MAP_MAX_ZOOM)
        )
      );
    }, 100);
    if (direction === "in") zoomInInterval.current = interval;
    else zoomOutInterval.current = interval;
  };

  // Stop continuous zooming
  const stopContinuousZoom = (direction: "in" | "out") => {
    if (direction === "in" && zoomInInterval.current) {
      clearInterval(zoomInInterval.current);
      zoomInInterval.current = null;
    }
    if (direction === "out" && zoomOutInterval.current) {
      clearInterval(zoomOutInterval.current);
      zoomOutInterval.current = null;
    }
  };

  return (
    <div className="flex flex-col items-center shadow-lg">
      <ZoomButton
        onClick={() => setZoom(Math.min(zoom + 1, DEFAULT_MAP_MAX_ZOOM))}
        onContinuousStart={() => startContinuousZoom("in")}
        onContinuousStop={() => stopContinuousZoom("in")}
        ariaLabel="Zoom in"
        title="Zoom in"
        colorClass="bg-gray-300 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-700 text-blue-800 dark:text-gray-200 hover:text-blue-900 dark:hover:text-gray-100"
        className="w-10 h-10 flex items-center justify-center text-2xl cursor-pointer rounded-t-lg"
        icon={<FaPlus />}
      />
      <ZoomButton
        onClick={() => setZoom(Math.max(zoom - 1, DEFAULT_MAP_MIN_ZOOM))}
        onContinuousStart={() => startContinuousZoom("out")}
        onContinuousStop={() => stopContinuousZoom("out")}
        ariaLabel="Zoom out"
        title="Zoom out"
        colorClass="bg-gray-300 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-700 text-blue-800 dark:text-gray-200 hover:text-blue-900 dark:hover:text-gray-100"
        className="w-10 h-10 flex items-center justify-center text-2xl cursor-pointer rounded-b-lg"
        icon={<FaMinus />}
      />
    </div>
  );
}
