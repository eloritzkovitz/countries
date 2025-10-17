import { useMemo, useState } from "react";
import { useDebounced } from "@hooks";
import type { Country, Overlay } from "@types";
import { filterCountries, getFilteredIsoCodes } from "../utils/countryFilters";

type OverlaySelections = Record<string, string>;

interface UseCountryFiltersProps {
  countries: Country[];
  overlays: Overlay[];
  overlaySelections: OverlaySelections;
}

export function useCountryFilters({
  countries,
  overlays,
  overlaySelections,
}: UseCountryFiltersProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedSubregion, setSelectedSubregion] = useState<string>("");
  const [selectedSovereignty, setSelectedSovereignty] = useState<string>("");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounced(search, 250);

  // Memoize filtered iso codes and countries
  const filteredIsoCodes = useMemo(
    () => getFilteredIsoCodes(countries, overlays, overlaySelections),
    [countries, overlays, overlaySelections]
  );

  // Filtering countries based on current filters and search
  const filteredCountries = useMemo(
    () =>
      filterCountries(countries, {
        search: debouncedSearch,
        selectedRegion,
        selectedSubregion,
        selectedSovereignty,
        overlayCountries: filteredIsoCodes,
      }),
    [
      countries,
      debouncedSearch,
      selectedRegion,
      selectedSubregion,
      selectedSovereignty,
      filteredIsoCodes,
    ]
  );

  return {
    selectedRegion,
    setSelectedRegion,
    selectedSubregion,
    setSelectedSubregion,
    selectedSovereignty,
    setSelectedSovereignty,
    search,
    setSearch,
    debouncedSearch,
    filteredIsoCodes,
    filteredCountries,
  };
}