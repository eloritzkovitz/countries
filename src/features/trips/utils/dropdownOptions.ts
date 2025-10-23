/**
 * Utility functions for generating dropdown options for trips filtering.
 */

import type { Country } from "@types";

/**
 * Gets country dropdown options for filtering.
 * @param countries - List of all countries.
 * @param usedCountryCodes - Set of country codes that have trips.
 * @returns An array of dropdown options with plain text labels.
 */
export function getCountryDropdownOptions(
  countries: Country[],
  usedCountryCodes: Set<string>
) {
  return [
    { value: "", label: "All Countries" },
    ...countries
      .filter((c) => usedCountryCodes.has(c.isoCode))
      .map((c) => ({
        value: c.isoCode,
        label: c.name,
      })),
  ];
}

/**
 * Gets year dropdown options for filtering.
 * @param usedYears - Array of years that have trips.
 * @returns An array of dropdown options.
 */
export function getYearDropdownOptions(usedYears: number[]) {
  return [
    { value: "", label: "All Years" },
    ...usedYears.map((y) => ({ value: y.toString(), label: y.toString() })),
  ];
}
