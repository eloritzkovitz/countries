import type {
  Country,
  SovereigntyType,
  FilterConfig,
  FilterKey,
  FilterOption,
  Overlay,
} from "@types";
import { normalizeString } from "@utils/stringUtils";

/**
 * Maps an array of strings to FilterOption objects.
 * @param options Array of string options
 * @returns Array of FilterOption objects
 */
export function mapOptions(options: string[]): FilterOption[] {
  return options.map((r) => ({ value: r, label: r }));
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
