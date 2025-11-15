import { useState } from "react";
import type { Marker } from "@types";

export function useMarkerDetailsModal() {
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [detailsModalPosition, setDetailsModalPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  // Handle marker details view
  const handleMarkerDetails = (
    marker: Marker,
    position?: { top: number; left: number }
  ) => {
    setSelectedMarker(marker);
    setDetailsModalOpen(true);
    setDetailsModalPosition(position ?? null);
  };

  return {
    selectedMarker,
    setSelectedMarker,
    detailsModalOpen,
    setDetailsModalOpen,
    detailsModalPosition,
    setDetailsModalPosition,
    handleMarkerDetails,
  };
}
