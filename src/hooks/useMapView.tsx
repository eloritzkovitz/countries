import { useState } from "react";

export function useMapView(initialZoom = 1, initialCenter: [number, number] = [0, 20]) {
  const [zoom, setZoom] = useState(initialZoom);
  const [center, setCenter] = useState<[number, number]>(initialCenter);

  const handleMoveEnd = ({
    zoom,
    coordinates,
  }: {
    zoom: number;
    coordinates: [number, number];
  }) => {
    setZoom(zoom);
    setCenter(coordinates);
  };

  return { zoom, setZoom, center, setCenter, handleMoveEnd };
}