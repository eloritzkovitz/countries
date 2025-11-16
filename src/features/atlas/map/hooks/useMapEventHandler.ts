import { DEFAULT_MAP_SETTINGS } from "@constants";
import { getGeoCoordsFromMouseEvent } from "@features/atlas/map";
import { useMarkers } from "@contexts/MarkersContext";

interface UseMapEventHandlerProps {
  projection: string | null;
  dimensions: { width: number; height: number };
  zoom: number;
  center: [number, number];
  setSelectedCoords: (coords: [number, number]) => void;
};

export function useMapEventHandler({
  projection,
  dimensions,
  zoom,
  center,
  setSelectedCoords,
}: UseMapEventHandlerProps) {
  const { isAddingMarker, handleMapClickForMarker } = useMarkers();

  return (event: React.MouseEvent<SVGSVGElement>) => {
    const coords = getGeoCoordsFromMouseEvent(
      event,
      projection || DEFAULT_MAP_SETTINGS.projection,
      dimensions.width,
      dimensions.height,
      DEFAULT_MAP_SETTINGS.scaleDivisor,
      zoom,
      center
    );
    if (coords) {
      setSelectedCoords([coords[0], coords[1]]);
      if (isAddingMarker && handleMapClickForMarker && event.type === "click") {
        handleMapClickForMarker([coords[0], coords[1]]);
      }
    }
  };
}
