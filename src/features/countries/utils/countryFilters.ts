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
 * Filters countries based on search, region, subregion, sovereignty, and overlay criteria.
 * @param countries - The list of countries to filter.
 * @param search - Search term to filter by country name.
 * @param selectedRegion - Selected region to filter by.
 * @param selectedSubregion - Selected subregion to filter by.
 * @param selectedSovereignty - Selected sovereignty type to filter by.
 * @param overlayCountries - List of country ISO codes to include based on overlay selection.
 * @returns Filtered list of countries.
 */
export function filterCountries(
  countries: Country[],
  {
    search,
    selectedRegion,
    selectedSubregion,
    selectedSovereignty,
    overlayCountries = [],
  }: {
    search?: string;
    selectedRegion?: string;
    selectedSubregion?: string;
    selectedSovereignty?: string;
    overlayCountries?: string[];
  }
) {
  // Filter by search first
  let filtered = filterCountriesBySearch(countries, search ?? "");

  // Apply other filters
  return filtered.filter((country) => {
    if (selectedRegion && country.region !== selectedRegion) return false;
    if (selectedSubregion && country.subregion !== selectedSubregion)
      return false;
    if (selectedSovereignty && country.sovereigntyType !== selectedSovereignty)
      return false;
    if (overlayCountries.length && !overlayCountries.includes(country.isoCode))
      return false;
    return true;
  });
}

/**
 * Filters a list of countries by search string (accent-insensitive).
 * @param countries - The list of countries to filter.
 * @param search - The search string to filter by.
 * @returns The filtered list of countries.
 */
export function filterCountriesBySearch(countries: Country[], search: string) {
  if (!search) return countries;
  const normalizedSearch = normalizeString(search);
  return countries.filter((country) =>
    normalizeString(country.name).includes(normalizedSearch)
  );
}

/**
 * Filters ISO codes based on overlay selections.
 * @param countries
 * @param overlays
 * @param overlaySelections
 * @returns Filtered list of ISO codes.
 */
export function getFilteredIsoCodes(
  countries: Country[],
  overlays: Overlay[],
  overlaySelections: Record<string, string>
) {
  const base = countries.map((c) => c.isoCode);

  return overlays.reduce((accIsoCodes, overlay) => {
    const selection = overlaySelections[overlay.id] || "all";
    if (selection === "only") {
      return accIsoCodes.filter((iso) => overlay.countries.includes(iso));
    }
    if (selection === "exclude") {
      return accIsoCodes.filter((iso) => !overlay.countries.includes(iso));
    }
    return accIsoCodes; // "all"
  }, base as string[]);
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
