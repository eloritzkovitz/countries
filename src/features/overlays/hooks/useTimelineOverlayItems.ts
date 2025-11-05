import { useMemo } from "react";
import { useVisitedCountriesSnapshot } from "@features/trips/hooks/useVisitedCountriesTimeline";
import type { TimelineOverlay } from "@types";

export function useTimelineOverlayItems(
  overlays: TimelineOverlay[],
  selectedYear: number
) {
  const snapshotCountries = useVisitedCountriesSnapshot(selectedYear);

  return useMemo(() => {
    return overlays
      .filter((o) => o.visible && o.timelineEnabled)
      .flatMap((overlay) =>
        Array.from(snapshotCountries).map((isoCode) => ({
          isoCode: String(isoCode),
          color: overlay.color,
          overlayId: overlay.id,
        }))
      );
  }, [overlays, snapshotCountries, selectedYear]);
}
