import { DEFAULT_MAP_SETTINGS } from "@config/constants";
import { getGeoCoordsFromMouseEvent } from "@features/map";

type UseMapEventHandlerProps = {
  projection: string | null;
  dimensions: { width: number; height: number };
  zoom: number;
  center: [number, number];
  isAddingMarker: boolean | undefined;
  setSelectedCoords: (coords: [number, number]) => void;
  onMapClickForMarker?: (coords: [number, number]) => void;
};

export function useMapEventHandler({
  projection,
  dimensions,
  zoom,
  center,
  isAddingMarker,
  setSelectedCoords,
  onMapClickForMarker,
}: UseMapEventHandlerProps) {
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
      if (isAddingMarker && onMapClickForMarker && event.type === "click") {
        onMapClickForMarker([coords[1], coords[0]]);
      }
    }
  };
}
