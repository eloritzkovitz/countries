import { useMemo } from "react";
import { getOverlayItems } from "@features/overlays";
import {
  useVisitedCountriesTimeline,
  useVisitedCountriesSnapshot,
} from "@features/trips/hooks/useVisitedCountriesTimeline";
import type { Overlay, TimelineOverlay } from "@types";

export function useOverlayItems(
  overlays: (Overlay | TimelineOverlay)[],
  selectedYear?: number
) {
  const visitedByYear = useVisitedCountriesTimeline();
  const snapshotCountries = useVisitedCountriesSnapshot(
    selectedYear ?? new Date().getFullYear()
  );

  // Type guard to check if an overlay is a TimelineOverlay
  function isTimelineOverlay(
    overlay: Overlay | TimelineOverlay
  ): overlay is TimelineOverlay {
    return (overlay as TimelineOverlay).timelineEnabled === true;
  }

  return useMemo(() => {
    let totalVisited: Set<string> = new Set();

    const overlayItems = overlays
      .filter((o) => o.visible)
      .flatMap((overlay) => {
        // For timeline overlays, determine countries based on year selection
        if (isTimelineOverlay(overlay)) {
          let countries: Set<string> = new Set();
          if (selectedYear) {
            countries = overlay.timelineSnapshot
              ? snapshotCountries
              : visitedByYear[selectedYear] || new Set();
          }
          countries.forEach((iso) => totalVisited.add(iso));
          return Array.from(countries).map((isoCode) => ({
            isoCode: String(isoCode),
            color: overlay.color,
            overlayId: overlay.id,
          }));
        }
        // For regular overlays
        return getOverlayItems(overlay).map((item) => ({
          isoCode: item.isoCode,
          color: item.color ?? overlay.color,
          overlayId: overlay.id,
        }));
      });

    return { overlayItems, totalVisited };
  }, [overlays, visitedByYear, snapshotCountries, selectedYear]);
}
