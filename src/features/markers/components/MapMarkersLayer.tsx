import { useMarkers } from "@contexts/MarkersContext";
import { getProjection } from "@features/map/utils/mapUtils";
import { Marker } from "./Marker";

interface MapMarkersLayerProps {
  projectionType: string;
  width: number;
  height: number;
  scaleDivisor: number;
}

export function MapMarkersLayer({
  projectionType,
  width,
  height,
  scaleDivisor,
}: MapMarkersLayerProps) {
  const { markers } = useMarkers();

  const proj = getProjection(projectionType, width, height, scaleDivisor);

  return (
    <>
      {markers.map((marker) => {
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
          />
        );
      })}
    </>
  );
}
