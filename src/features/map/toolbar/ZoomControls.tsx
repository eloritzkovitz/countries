import { FaPlus, FaMinus, FaCrosshairs } from "react-icons/fa";
import { useRef } from "react";
import { DEFAULT_MAP_SETTINGS } from "@config/constants";
import { useKeyHandler } from "@hooks/useKeyHandler";
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
          DEFAULT_MAP_SETTINGS.minZoom,
          Math.min(prev + step, DEFAULT_MAP_SETTINGS.maxZoom)
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

  // Zoom in
  useKeyHandler(
    () => setZoom(Math.min(zoom + 1, DEFAULT_MAP_SETTINGS.maxZoom)),
    ["+", "="],
    true
  );

  // Zoom out
  useKeyHandler(
    () => setZoom(Math.max(zoom - 1, DEFAULT_MAP_SETTINGS.minZoom)),
    ["-"],
    true
  );

  // Reset zoom
  useKeyHandler(
    () => setZoom(DEFAULT_MAP_SETTINGS.minZoom),
    ["0"],
    true
  );

  return (
    <div className="flex flex-col items-center space-y-0.5">
      <ZoomButton
        onClick={() =>
          setZoom(Math.min(zoom + 1, DEFAULT_MAP_SETTINGS.maxZoom))
        }
        onContinuousStart={() => startContinuousZoom("in")}
        onContinuousStop={() => stopContinuousZoom("in")}
        ariaLabel="Zoom in"
        title="Zoom in"
        className="toolbar-btn toolbar-btn-action"
        icon={<FaPlus />}
      />
      <ZoomButton
        onClick={() =>
          setZoom(Math.max(zoom - 1, DEFAULT_MAP_SETTINGS.minZoom))
        }
        onContinuousStart={() => startContinuousZoom("out")}
        onContinuousStop={() => stopContinuousZoom("out")}
        ariaLabel="Zoom out"
        title="Zoom out"
        className="toolbar-btn toolbar-btn-action"
        icon={<FaMinus />}
      />
      <ZoomButton
        onClick={() => setZoom(DEFAULT_MAP_SETTINGS.minZoom)}
        ariaLabel="Reset zoom"
        title="Reset zoom"
        className="toolbar-btn toolbar-btn-action"
        icon={<FaCrosshairs />}
      />
    </div>
  );
}
