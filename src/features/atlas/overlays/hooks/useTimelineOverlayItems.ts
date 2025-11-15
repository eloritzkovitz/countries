import { useMemo } from "react";
import { MAP_STYLE_CONFIG } from "@constants";
import { useHomeCountry } from "@features/settings";
import { getVisitColor } from "@features/atlas/ui/constants/colors";
import { useVisitedCountriesTimeline } from "@features/visits";
import type { TimelineOverlay } from "@types";

export function useTimelineOverlayItems(
  overlays: TimelineOverlay[],
  selectedYear: number
) {
  const { getVisitedCountriesUpToYear } = useVisitedCountriesTimeline();
  const { homeCountry } = useHomeCountry();
  const snapshotCountries = getVisitedCountriesUpToYear(selectedYear);

  // Collect all country codes from overlays
  const allCountryCodes = Array.from(
    new Set(
      overlays
        .filter((o) => o.visible && o.timelineEnabled)
        .flatMap((o) => o.countries || [])
    )
  );

  return useMemo(() => {
    return overlays
      .filter((o) => o.visible && o.timelineEnabled)
      .flatMap((overlay) =>
        allCountryCodes.map((isoCode) => {
          const count = snapshotCountries[isoCode] || 0;
          const isHome = homeCountry === isoCode;
          return {
            isoCode: String(isoCode),
            color: getVisitColor(count, isHome, MAP_STYLE_CONFIG.default.fill),
            overlayId: overlay.id,
            count,
          };
        })
      );
  }, [overlays, snapshotCountries, selectedYear]);
}
