import { useMemo } from "react";
import { MAP_STYLE_CONFIG } from "@constants";
import { useHomeCountry } from "@features/settings";
import { getVisitColor } from "@features/atlas/ui/legend/constants/colors";
import { useVisitedCountriesTimeline } from "@features/visits";
import type { TimelineOverlay, VisitColorMode } from "@types";

export function useTimelineOverlayItems(
  overlays: TimelineOverlay[],
  selectedYear: number,
  colorMode: VisitColorMode
) {
  const {
    getVisitedCountriesUpToYear,
    getVisitedCountriesForYear,
    getUpcomingCountries,
  } = useVisitedCountriesTimeline();
  const { homeCountry } = useHomeCountry();
  const snapshotCountries = getVisitedCountriesUpToYear(selectedYear);
  const snapshotCountriesPrev = getVisitedCountriesUpToYear(selectedYear - 1);
  const newThisYear = getVisitedCountriesForYear(selectedYear);
  const nextUpcomingYearByCountry = getUpcomingCountries();

  // Collect all country codes from overlays
  const allCountryCodes = Array.from(
    new Set([
      ...overlays
        .filter((o) => o.visible && o.timelineEnabled)
        .flatMap((o) => o.countries || []),
      ...Object.keys(nextUpcomingYearByCountry),
    ])
  );

  return useMemo(() => {
    return overlays
      .filter((o) => o.visible && o.timelineEnabled)
      .flatMap((overlay) =>
        allCountryCodes.map((isoCode) => {
          const count = snapshotCountries[isoCode] || 0;
          const countPrev = snapshotCountriesPrev[isoCode] || 0;
          const isHome = homeCountry === isoCode;

          // Determine if the country is new or a revisit this year
          const isNewThisYear = newThisYear.includes(isoCode);
          const isRevisitThisYear = isNewThisYear && countPrev > 0;

          // Determine if the country is upcoming
          const isUpcoming =
            nextUpcomingYearByCountry[isoCode] === selectedYear;
          const isUpcomingVisit = isUpcoming && count === 0;
          const isUpcomingRevisit = isUpcoming && count > 0;

          return {
            isoCode: String(isoCode),
            color: getVisitColor(
              count,
              isHome,
              MAP_STYLE_CONFIG.default.fill,
              colorMode,
              isNewThisYear,
              isRevisitThisYear,
              isUpcomingVisit,
              isUpcomingRevisit
            ),
            overlayId: overlay.id,
            count,
          };
        })
      );
  }, [
    overlays,
    snapshotCountries,
    newThisYear,
    selectedYear,
    colorMode,
    homeCountry,
    nextUpcomingYearByCountry,
  ]);
}
