import { useState } from "react";
import { useDebounce } from "@hooks/useDebounce";
import type { Country, Overlay } from "@types";
import { getVisitedCountries } from "../utils/countryData";
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
  const debouncedSearch = useDebounce(search, 250);

  // With overlays applied
  const filteredIsoCodes = getFilteredIsoCodes(countries, overlays, overlaySelections);
  const filteredCountries = filterCountries(countries, {
    search: debouncedSearch,
    selectedRegion,
    selectedSubregion,
    selectedSovereignty,
    overlayCountries: filteredIsoCodes,
  });

  // Without overlays for counts
  const filteredCountriesNoOverlay = filterCountries(countries, {
    search: debouncedSearch,
    selectedRegion,
    selectedSubregion,
    selectedSovereignty,
    overlayCountries: undefined,
  });

  // Counts
  const allCount = filteredCountriesNoOverlay.length;
  const visitedCountries = getVisitedCountries(filteredCountriesNoOverlay, overlays);
  const visitedCount = visitedCountries.length;

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
    allCount,
    visitedCount,
  };
}
