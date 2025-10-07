import { FaLayerGroup } from "react-icons/fa";
import { MapScale } from "./MapScale";
import { ActionButton } from "../common/ActionButton";

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
    <div className="absolute right-8 bottom-8 flex flex-row items-end gap-8 z-[101]">
      <ActionButton
        onClick={() => setShowOverlayManager(!showOverlayManager)}
        ariaLabel={
          showOverlayManager ? "Close Overlays Panel" : "Open Overlays Panel"
        }
        title={
          showOverlayManager ? "Close Overlays Panel" : "Open Overlays Panel"
        }
        colorClass="bg-blue-800 text-white hover:bg-blue-900 active:bg-blue-800 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:active:bg-gray-600"
        className="w-16 h-16 flex items-center justify-center shadow-lg p-0 rounded-full border-none"
        icon={<FaLayerGroup size={32} />}
      />
      <MapScale
        scale={zoom}
        minScale={1}
        maxScale={10}
        onScaleChange={setZoom}
        onZoomIn={() => setZoom(Math.min(zoom * 1.5, 16))}
        onZoomOut={() => setZoom(Math.max(zoom / 1.5, 1))}
      />
    </div>
  );
}