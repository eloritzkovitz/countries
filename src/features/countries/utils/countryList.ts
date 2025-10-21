/**
 * Utils for filtering and sorting country lists.
 */

import type { Country, FilterOption, SovereigntyType } from "@types";
import { capitalizeWords, normalizeString } from "@utils/stringUtils";

/**
 * Maps an array of strings to FilterOption objects.
 * @param options Array of string options
 * @returns Array of FilterOption objects
 */
export function mapOptions(options: string[]): FilterOption[] {
  return options.map((r) => ({ value: r, label: capitalizeWords(r) }));
}

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
 * Returns all unique sovereignty types from the countries list.
 * @param countries - Array of country objects with sovereigntyType property.
 * @returns Sorted array of unique sovereignty type strings.
 */
export function getAllSovereigntyTypes(
  countries: { sovereigntyType?: SovereigntyType }[]
): SovereigntyType[] {
  return Array.from(
    new Set(
      countries
        .map((c) => c.sovereigntyType)
        .filter((t): t is SovereigntyType => !!t)
    )
  ).sort((a, b) => a.localeCompare(b));
}

/**
 * Filters and sorts a list of countries based on search string and sort criteria.
 * @param countries - The list of countries to filter and sort.
 * @param search - The search string to filter countries by name.
 * @param sortBy - The criteria to sort the countries by.
 * @returns The filtered and sorted list of countries.
 */
export function getFilteredSortedCountries({
  countries,
  search,
  sortBy,
}: {
  countries: Country[];
  search: string;
  sortBy: "name-asc" | "name-desc" | "iso-asc" | "iso-desc";
}) {
  const normalizedSearch = normalizeString(search);

  const filtered = countries.filter((country) =>
    normalizeString(country.name).includes(normalizedSearch)
  );

  return filtered.sort((a, b) => {
    if (sortBy === "name-asc")
      return normalizeString(a.name).localeCompare(normalizeString(b.name));
    if (sortBy === "name-desc")
      return normalizeString(b.name).localeCompare(normalizeString(a.name));
    if (sortBy === "iso-asc")
      return (a.isoCode || "").localeCompare(b.isoCode || "");
    if (sortBy === "iso-desc")
      return (b.isoCode || "").localeCompare(a.isoCode || "");
    return 0;
  });
}