import { useMarkers } from "@contexts/MarkersContext";

export function useMarkerSelection() {
  const {
    selectedMarker,
    detailsModalOpen,
    detailsModalPosition,
    showMarkerDetails,
    closeMarkerDetails,
  } = useMarkers();

  return {
    selectedMarker,
    detailsModalOpen,
    detailsModalPosition,
    showMarkerDetails,
    closeMarkerDetails,
  };
}
