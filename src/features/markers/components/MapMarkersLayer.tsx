import { useMarkers } from "@contexts/MarkersContext";
import { getProjection } from "@features/map/utils/mapUtils";
import { Marker } from "./Marker";
import type { Marker as MarkerType } from "@types";

interface MapMarkersLayerProps {
  projectionType: string;
  width: number;
  height: number;
  scaleDivisor: number;
  zoom?: number;
  onMarkerDetails?: (marker: MarkerType) => void;
}

export function MapMarkersLayer({
  projectionType,
  width,
  height,
  scaleDivisor,
  zoom = 1,
  onMarkerDetails,
}: MapMarkersLayerProps & { zoom?: number }) {
  const { markers } = useMarkers();
  const proj = getProjection(projectionType, width, height, scaleDivisor);

  return (
    <>
      {markers.filter(marker => marker.visible !== false).map((marker) => {
        const point = proj ? proj([marker.longitude, marker.latitude]) : null;
        if (!point) return null;
        const [x, y] = point;
        return (
          <Marker
            key={marker.id}
            x={x}
            y={y}
            color={marker.color}
            name={marker.name}
            zoom={zoom}
            onClick={() => onMarkerDetails?.(marker)}
          />
        );
      })}
    </>
  );
}
