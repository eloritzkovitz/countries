import { useEffect, useState } from "react";
import { DEFAULT_MAP_SETTINGS } from "@config/constants";
import { getCountryCenterAndZoom } from "../utils/mapUtils";

export function useMapView(
  initialZoom = DEFAULT_MAP_SETTINGS.minZoom,
  initialCenter: [number, number] = [0, 0]
) {
  const [zoom, setZoom] = useState(initialZoom);
  const [center, setCenter] = useState<[number, number]>(initialCenter);

  // Snap to center at zoom 1
  useEffect(() => {
    if (zoom === 1 && (center[0] !== 0 || center[1] !== 0)) {
      setCenter([0, 0]);
    }
  }, [zoom, center]);

  // Center map on a specific country by its ISO code
  const centerOnCountry = (geoData: any, isoCode: string) => {
    const result = getCountryCenterAndZoom(geoData, isoCode);
    if (result) {
      setCenter(result.center);
      setZoom(result.zoom);
    }
  };

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

  return { zoom, setZoom, center, setCenter, handleMoveEnd, centerOnCountry };
}
