/**
 * Returns all unique regions from the countries list, excluding undefined values.
 * @param countries - Array of country objects with optional region property.
 * @returns Sorted array of unique region strings.
 */
export function getAllRegions(countries: { region?: string }[]) {
  return Array.from(
    new Set(countries.map((c) => c.region).filter((r): r is string => !!r))
  ).sort((a, b) => a.localeCompare(b));
}

/**
 * Returns all unique subregions from the countries list, excluding undefined values.
 * @param countries - Array of country objects with optional subregion property.
 * @returns Sorted array of unique subregion strings.
 */
export function getAllSubregions(countries: { subregion?: string }[]) {
  return Array.from(
    new Set(countries.map((c) => c.subregion).filter((r): r is string => !!r))
  ).sort((a, b) => a.localeCompare(b));
}

/**
 * Returns all unique subregions for a given region from the countries list.
 * @param countries - Array of country objects with region and subregion properties.
 * @param selectedRegion - The region to filter subregions by.
 * @returns Sorted array of unique subregion strings for the selected region.
 */
export function getSubregionsForRegion(
  countries: { region?: string; subregion?: string }[],
  selectedRegion: string
) {
  return Array.from(
    new Set(
      countries
        .filter((c) => c.region === selectedRegion)
        .map((c) => c.subregion)
        .filter((r): r is string => !!r)
    )
  ).sort((a, b) => a.localeCompare(b));
}

/**
 * Filters countries based on search, region, subregion, visited, and souvenirs criteria.
 * @param countries - Array of country objects.
 * @param params - Filtering parameters.
 * @param params.search - Search string for country name.
 * @param params.selectedRegion - Selected region filter.
 * @param params.selectedSubregion - Selected subregion filter.
 * @param params.visitedCountries - Array of visited country ISO codes.
 * @param params.souvenirCountries - Array of country ISO codes with souvenirs.
 * @param params.visitedFilter - Visited filter type.
 * @param params.souvenirsFilter - Souvenirs filter type.
 * @returns Sorted array of filtered country objects.
 */
export function filterCountries(
  countries: any[],
  {
    search,
    selectedRegion,
    selectedSubregion,
    overlayCountries,
  }: {
    search: string;
    selectedRegion: string;
    selectedSubregion: string;
    overlayCountries: string[];
  }
) {
  return countries
    .filter((country) => {
      const matchesSearch = country.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesRegion = selectedRegion
        ? country.region === selectedRegion
        : true;
      const matchesSubregion = selectedSubregion
        ? country.subregion === selectedSubregion
        : true;

      // If overlayCountries is set, only include countries in overlays
      const matchesOverlay =
        !overlayCountries.length || overlayCountries.includes(country.isoCode);

      return (
        matchesSearch && matchesRegion && matchesSubregion && matchesOverlay
      );
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}
