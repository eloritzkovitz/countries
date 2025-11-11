import { useOverlayContext } from "@contexts/OverlayContext";

export function useVisitedCountries() {
  const { overlays } = useOverlayContext();
  const visitedOverlay = overlays.find((o) => o.id === "visited-countries");
  const visitedCountryCodes = visitedOverlay?.countries ?? [];

  // Check if a country is visited
  function isCountryVisited(isoCode: string) {
    return visitedCountryCodes.includes(isoCode);
  }

  return {
    visitedCountryCodes,
    isCountryVisited,
  };
}
