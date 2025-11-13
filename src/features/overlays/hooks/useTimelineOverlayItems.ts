import { useMemo } from "react";
import { useVisitedCountriesTimeline } from "@features/visits";
import type { TimelineOverlay } from "@types";

export function useTimelineOverlayItems(
  overlays: TimelineOverlay[],
  selectedYear: number
) {  
  const { getVisitedCountriesUpToYear } = useVisitedCountriesTimeline();
  const snapshotCountries = getVisitedCountriesUpToYear(selectedYear);

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
