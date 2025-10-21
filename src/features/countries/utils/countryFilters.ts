/**
 * Utility functions for filtering countries based on various criteria.
 */

import type {
  Country,
  FilterConfig,
  FilterKey,
  FilterOption,
  Overlay,
} from "@types";
import { normalizeString } from "@utils/string";

/**
 * Filters countries based on search, region, subregion, and overlay criteria.
 * @param countries - Array of country objects with name, region, subregion, and isoCode properties.
 * @param filters - Object containing search, selectedRegion, selectedSubregion, and overlayCountries.
 * @returns Filtered and sorted array of country objects.
 */
export function filterCountries(
  countries: any[],
  {
    search,
    selectedRegion,
    selectedSubregion,
    selectedSovereignty,
    overlayCountries,
  }: {
    search: string;
    selectedRegion: string;
    selectedSubregion: string;
    selectedSovereignty: string;
    overlayCountries: string[];
  }
) {
  return countries.filter((country) => {
    const matchesSearch = normalizeString(country.name).includes(
      normalizeString(search)
    );
    const matchesRegion = selectedRegion
      ? country.region === selectedRegion
      : true;
    const matchesSubregion = selectedSubregion
      ? country.subregion === selectedSubregion
      : true;
    const matchesOverlay =
      !overlayCountries.length || overlayCountries.includes(country.isoCode);

    // Add sovereignty filter
    const matchesSovereignty =
      selectedSovereignty && selectedSovereignty !== ""
        ? selectedSovereignty === "Dependency"
          ? country.sovereigntyType === "Dependency" ||
            country.sovereigntyType === "Special Administrative Region"
          : country.sovereigntyType === selectedSovereignty
        : true;

    return (
      matchesSearch &&
      matchesRegion &&
      matchesSubregion &&
      matchesOverlay &&
      matchesSovereignty
    );
  });
}

/**
 * Filters ISO codes based on overlay selections.
 * @param countries
 * @param overlays
 * @param overlaySelections
 * @returns
 */
export function getFilteredIsoCodes(
  countries: Country[],
  overlays: Overlay[],
  overlaySelections: Record<string, string>
) {
  let filteredIsoCodes = countries.map((c) => c.isoCode);

  overlays.forEach((overlay) => {
    const selection = overlaySelections[overlay.id] || "all";
    if (selection === "only") {
      filteredIsoCodes = filteredIsoCodes.filter((iso) =>
        overlay.countries.includes(iso)
      );
    } else if (selection === "exclude") {
      filteredIsoCodes = filteredIsoCodes.filter(
        (iso) => !overlay.countries.includes(iso)
      );
    }
    // "all" does not filter
  });

  return filteredIsoCodes;
}

/** Creates a select filter configuration.
 * @param key - The key for the filter (region, subregion, sovereignty).
 * @param label - The label for the filter.
 * @param getOptions - Function to get options for the filter.
 * @param getValue - Function to get the current value of the filter.
 * @param setValue - Function to set the value of the filter.
 * @returns A FilterConfig object for the select filter.
 */
export function createSelectFilter<T extends string>(
  key: FilterKey,
  label: string,
  getOptions: (options: T[]) => FilterOption[],
  getValue: (props: any) => string,
  setValue: (props: any, val: string) => void
): FilterConfig {
  return {
    key,
    label,
    type: "select",
    getOptions,
    getValue,
    setValue,
  } as FilterConfig;
}
