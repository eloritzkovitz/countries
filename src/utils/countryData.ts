import type { Country } from "../types/country";
import type { FlagSize } from "../types/flag";

/**
 * Extracts the ISO country code from various possible property names.
 * @param properties - The properties object from a geographical feature.
 * @returns The ISO country code in uppercase, or undefined if not found.
 */
export function getCountryIsoCode(properties: any): string | undefined {
  return (
    properties.ISO_A2?.toUpperCase?.() ||
    properties["ISO3166-1-Alpha-2"]?.toUpperCase?.()
  );
}

// List of country codes that do not have their own flags
const excludedDependencies = [
  "BV", // Bouvet Island
  "HM", // Heard Island and McDonald Islands
  "MF", // Saint Martin
  "SJ", // Svalbard and Jan Mayen
  "UM", // United States Minor Outlying Islands
];

/**
 * Returns countries whose flag matches their own ISO code and is not empty.
 * If you add a flagIsoCode property for borrowed flags, this will skip those.
 */
export function getCountriesWithOwnFlag(countries: Country[]): Country[] {
  return countries.filter(
    (country) => country.flag && !excludedDependencies.includes(country.isoCode)
  );
}

/**
 * Gets a random country from the provided list.
 * @param countries - Array of country objects.
 * @returns A random country object from the array.
 */
export function getRandomCountry(countries: Country[]) {
  return countries[Math.floor(Math.random() * countries.length)];
}

/**
 * Converts an array of countries into options suitable for a select input.
 * @param countries - Array of country objects.
 * @returns An array of objects with `value` and `label` properties.
 */
export function getCountryOptions(countries: Country[]) {
  return countries.map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));
}

/**
 * Gets the URL of a country's flag based on its ISO code.
 * @param isoCode - The ISO code of the country.
 * @param size - The size of the flag image.
 * @returns The URL of the country's flag image.
 */
export function getFlagUrl(isoCode: string, size: FlagSize = "32x24") {
  if (!isoCode) return "";
  return `https://flagcdn.com/${size}/${isoCode.toLowerCase()}.png`;
}

/**
 * Gets a formatted string of languages.
 * @param languages - An array of language names.
 * @returns A comma-separated string of languages or "None" if empty.
 */
export function getLanguagesDisplay(languages?: string[]) {
  if (!languages || languages.length === 0) return "None";
  return languages.join(", ");
}
