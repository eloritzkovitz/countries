import { useEffect, useState } from "react";
import { useMarkers } from "@contexts/MarkersContext";

export function useMarkerCreation() {
  const [isAddingMarker, setIsAddingMarker] = useState(false);
  const { openAddMarker } = useMarkers();

  // Start the process of adding a marker
  const startAddingMarker = () => setIsAddingMarker(true);

  // Map click handler for adding marker
  const handleMapClickForMarker = (coords: [number, number]) => {
    if (!isAddingMarker) return;
    openAddMarker(coords);
    setIsAddingMarker(false);
  };

  // Cancel marker creation
  const cancelMarkerCreation = () => setIsAddingMarker(false);

  // Listen for Escape key to cancel marker creation
  useEffect(() => {
    if (!isAddingMarker) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cancelMarkerCreation();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAddingMarker]);

  return {
    isAddingMarker,
    startAddingMarker,
    handleMapClickForMarker,
    cancelMarkerCreation,
  };
}
