import { FaLayerGroup } from "react-icons/fa";
import { MapScale } from "./MapScale";

export function MapToolbar({
  zoom,
  setZoom,
  showOverlayManager,
  setShowOverlayManager,
}: {
  zoom: number;
  setZoom: (z: number) => void;
  showOverlayManager: boolean;
  setShowOverlayManager: (v: boolean) => void;
}) {
  return (
    <div className="absolute right-8 bottom-8 flex flex-col items-center gap-4 z-[101]">
      <MapScale
        scale={zoom}
        minScale={1}
        maxScale={10}
        onScaleChange={setZoom}
        onZoomIn={() => setZoom(Math.min(zoom * 1.5, 16))}
        onZoomOut={() => setZoom(Math.max(zoom / 1.5, 1))}
      />
      <button
        onClick={() => setShowOverlayManager(!showOverlayManager)}
        className="bg-blue-600 text-white w-16 h-16 flex items-center justify-center shadow-lg cursor-pointer p-0 rounded-full border-none"
        aria-label={
          showOverlayManager
            ? "Close Overlays Panel"
            : "Open Overlays Panel"
        }
        title={
          showOverlayManager
            ? "Close Overlays Panel"
            : "Open Overlays Panel"
        }
      >
        <FaLayerGroup size={32} color="#fff" />
      </button>
    </div>
  );
}