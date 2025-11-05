import { useEffect, useState } from "react";
import { useMarkers } from "@contexts/MarkersContext";

export function useMarkerCreation() {
  const [isAddingMarker, setIsAddingMarker] = useState(false);
  const [markerCoords, setMarkerCoords] = useState<[number, number] | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);
  const { addMarker } = useMarkers();

  const startAddingMarker = () => setIsAddingMarker(true);

  // Map click handler for adding marker
  const handleMapClickForMarker = (coords: [number, number]) => {
    if (!isAddingMarker) return;
    setMarkerCoords(coords);
    setModalOpen(true);
  };

  // Create marker handler
  const handleCreateMarker = (
    name: string,
    color?: string,
    description?: string
  ) => {
    if (!markerCoords) return;
    addMarker({
      id: Date.now().toString(),
      name,
      latitude: markerCoords[0],
      longitude: markerCoords[1],
      color,
      description,
      visible: true,
    });
    setModalOpen(false);
    setMarkerCoords(null);
    setIsAddingMarker(false);
  };

  // Cancel marker creation
  const cancelMarkerCreation = () => {
    setModalOpen(false);
    setMarkerCoords(null);
    setIsAddingMarker(false);
  };

  // Listen for Escape key to cancel marker creation
  useEffect(() => {
    if (!isAddingMarker && !modalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cancelMarkerCreation();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAddingMarker, modalOpen]);

  return {
    isAddingMarker,
    modalOpen,
    markerCoords,
    startAddingMarker,
    handleMapClickForMarker,
    handleCreateMarker,
    cancelMarkerCreation,
  };
}
