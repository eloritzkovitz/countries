import { useEffect } from "react";
import { computeVisitedCountriesFromTrips } from "@features/trips";
import { overlaysService } from "@services/overlaysService";
import type { AnyOverlay, Trip } from "@types";

export function useSyncVisitedCountriesOverlay(
  trips: Trip[],
  overlays: AnyOverlay[],
  setOverlays: React.Dispatch<React.SetStateAction<AnyOverlay[]>>,
  loading: boolean
) {
  // Sync visited countries overlay when trips change
  useEffect(() => {
    if (!loading && overlays.length > 0) {
      const visitedOverlayId = "visited-countries";
      const visitedCountries = computeVisitedCountriesFromTrips(trips);

      const prevCountries =
        overlays.find((o) => o.id === visitedOverlayId)?.countries || [];
      const hasChanged =
        prevCountries.length !== visitedCountries.length ||
        prevCountries.some((c, i) => visitedCountries[i] !== c);

      // Update overlay if countries have changed
      if (hasChanged) {
        const updated = overlays.map((overlay) =>
          overlay.id === visitedOverlayId
            ? { ...overlay, countries: visitedCountries }
            : overlay
        );
        setOverlays(updated);
        overlaysService.save(updated);
      }
    }
  }, [trips, loading, overlays, setOverlays]);
}
