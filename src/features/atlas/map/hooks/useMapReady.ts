import { useState, useCallback } from "react";

export function useMapReady(delay = 150) {
  const [mapReady, setMapReady] = useState(false);

  // Callback to set map as ready after a delay
  const handleMapReady = useCallback(() => {
    setTimeout(() => setMapReady(true), delay);
  }, [delay]);
  
  return { mapReady, handleMapReady };
}
