import { useState } from "react";
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

  // Getting filtered ISO codes based on overlay selections
  const filteredIsoCodes = getFilteredIsoCodes(countries, overlays, overlaySelections);

  // Filtering countries based on current filters and search
  const filteredCountries = filterCountries(countries, {
    search: debouncedSearch,
    selectedRegion,
    selectedSubregion,
    selectedSovereignty,
    overlayCountries: filteredIsoCodes,
  });

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
