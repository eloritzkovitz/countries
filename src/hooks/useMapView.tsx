import { useEffect, useState } from "react";

export function useMapView(
  initialZoom = 1,
  initialCenter: [number, number] = [0, 20]
) {
  const [zoom, setZoom] = useState(initialZoom);
  const [center, setCenter] = useState<[number, number]>(initialCenter);

  // Snap to center at zoom 1
  useEffect(() => {
    if (zoom === 1 && (center[0] !== 0 || center[1] !== 0)) {
      setCenter([0, 0]);
    }
  }, [zoom, center]);

  // Handler for map move end
  const handleMoveEnd = ({
    zoom: newZoom,
    coordinates,
  }: {
    zoom: number;
    coordinates: [number, number];
  }) => {
    setZoom(newZoom);
    if (newZoom === 1) {
      setCenter([0, 0]);
    } else {
      setCenter(coordinates);
    }
  };

  return { zoom, setZoom, center, setCenter, handleMoveEnd };
}
