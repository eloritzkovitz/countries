import { FaLayerGroup, FaDownload } from "react-icons/fa";
import { MapScale } from "./MapScale";
import { ActionButton } from "../common/ActionButton";
import { DEFAULT_MAP_MAX_ZOOM, DEFAULT_MAP_MIN_ZOOM } from "../../config/constants";

export function MapToolbar({
  zoom,
  setZoom,
  showOverlayManager,
  setShowOverlayManager,
  onExportSVG,
}: {
  zoom: number;
  setZoom: (z: number) => void;
  showOverlayManager: boolean;
  setShowOverlayManager: (v: boolean) => void;
  onExportSVG: () => void;
}) {
  return (
    <div className="absolute right-8 bottom-8 flex flex-row items-end gap-4 z-[101]">
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
      <ActionButton
        onClick={onExportSVG}
        ariaLabel="Export SVG"
        title="Export SVG"
        colorClass="bg-blue-800 text-white hover:bg-blue-900 active:bg-blue-800 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:active:bg-gray-600"
        className="w-16 h-16 flex items-center justify-center shadow-lg p-0 rounded-full border-none"
        icon={<FaDownload size={32} />}
      />      
      <MapScale
        scale={zoom}
        minScale={DEFAULT_MAP_MIN_ZOOM}
        maxScale={DEFAULT_MAP_MAX_ZOOM}
        onScaleChange={setZoom}
        onZoomIn={() => setZoom(Math.min(zoom + 1, DEFAULT_MAP_MAX_ZOOM))}
        onZoomOut={() => setZoom(Math.max(zoom - 1, DEFAULT_MAP_MIN_ZOOM))}
      />      
    </div>
  );
}