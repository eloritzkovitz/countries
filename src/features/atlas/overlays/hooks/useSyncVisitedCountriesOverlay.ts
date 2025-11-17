import { useEffect } from "react";
import { computeVisitedCountriesFromTrips } from "@features/visits";
import { overlaysService } from "@services/overlaysService";
import { useCountryColors } from "@features/settings/hooks/useCountryColors";
import type { AnyOverlay, Trip } from "@types";

export function useSyncVisitedCountriesOverlay(
  trips: Trip[],
  overlays: AnyOverlay[],
  setOverlays: React.Dispatch<React.SetStateAction<AnyOverlay[]>>,
  loading: boolean
) {
  // Get the current visited color from the selected palette
  const { VISITED_COUNTRY_COLOR } = useCountryColors();

  useEffect(() => {
    if (!loading && overlays.length > 0) {
      const visitedOverlayId = "visited-countries";
      const visitedCountries = computeVisitedCountriesFromTrips(trips);

      const prevOverlay = overlays.find((o) => o.id === visitedOverlayId);
      const prevCountries = prevOverlay?.countries || [];
      const hasChanged =
        prevCountries.length !== visitedCountries.length ||
        prevCountries.some((c, i) => visitedCountries[i] !== c);

      // Also check if the color has changed
      const colorChanged = prevOverlay?.color !== VISITED_COUNTRY_COLOR;

      // Update overlay if countries or color have changed
      if (hasChanged || colorChanged) {
        const updated = overlays.map((overlay) =>
          overlay.id === visitedOverlayId
            ? {
                ...overlay,
                countries: visitedCountries,
                color: VISITED_COUNTRY_COLOR,
              }
            : overlay
        );
        setOverlays(updated);
        overlaysService.save(updated);
      }
    }
  }, [trips, loading, overlays, setOverlays, VISITED_COUNTRY_COLOR]);
}
