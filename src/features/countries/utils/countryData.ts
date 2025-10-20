import { EXCLUDED_ISO_CODES, SOVEREIGN_FLAG_MAP } from "@config";
import { SOVEREIGN_DEPENDENCIES } from "@config/sovereignties";
import type {
  Country,
  SovereigntyType,
  FlagSource,
  FlagStyle,
  FlagSize,
} from "@types";

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

/**
 * Returns countries whose flag matches their own ISO code and is not empty.
 * If you add a flagIsoCode property for borrowed flags, this will skip those.
 */
export function getCountriesWithOwnFlag(countries: Country[]): Country[] {
  return countries.filter(
    (country) => country.flag && !EXCLUDED_ISO_CODES.includes(country.isoCode)
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
 * Gets the URL of a country's flag based on its ISO code, source, style, and size.
 * @param isoCode - The ISO code of the country.
 * @param size - The size of the flag image.
 * @param source - The flag provider ("flagcdn" or "flagsapi").
 * @param style - The style of the flag ("flat" or "shiny").
 * @returns The URL of the country's flag image.
 */
export function getFlagUrl(
  isoCode: string,
  size: FlagSize = "32x24",
  source: FlagSource = "flagcdn",
  style: FlagStyle = "flat"
): string {
  if (!isoCode) return "";

  const normalizedIso = isoCode.toUpperCase();

  // Handle sovereign state flags for territories
  const flagIso = SOVEREIGN_FLAG_MAP[normalizedIso] || normalizedIso;

  switch (source) {
    case "flagsapi":
      if (!flagIso || flagIso.length !== 2) return "";
      // FlagsAPI: https://flagsapi.com/:country_code/:style/:size.png
      return `https://flagsapi.com/${flagIso}/${style}/${
        size.split("x")[0]
      }.png`;
    case "flagcdn":
    default:
      // FlagCDN: https://flagcdn.com/:size/:country_code.png
      return `https://flagcdn.com/${size}/${normalizedIso.toLowerCase()}.png`;
  }
}

/**
 * Finds the sovereign country for a terrritory's ISO code.
 * @param territoryIsoCode - The ISO code of the territory.
 * @returns The sovereign's name and ISO code, or undefined if not found.
 */
export function getSovereigntyInfoForTerritory(territoryIsoCode: string): {
  type?: SovereigntyType;
  sovereign?: { name: string; isoCode: string };
} {
  if (!territoryIsoCode) return { type: undefined };

  for (const [sovereignIso, sovereignObj] of Object.entries(
    SOVEREIGN_DEPENDENCIES
  )) {
    // Dependencies
    if (
      Array.isArray(sovereignObj.dependencies) &&
      sovereignObj.dependencies.some((dep) => dep.isoCode === territoryIsoCode)
    ) {
      return {
        type: "Dependency",
        sovereign: { name: sovereignObj.name, isoCode: sovereignIso },
      };
    }
    // Overseas Regions
    if (
      Array.isArray(sovereignObj.regions) &&
      sovereignObj.regions.some((region) => region.isoCode === territoryIsoCode)
    ) {
      return {
        type: "Overseas Region",
        sovereign: { name: sovereignObj.name, isoCode: sovereignIso },
      };
    }
    // SARs
    if (
      Array.isArray(sovereignObj.sars) &&
      sovereignObj.sars.some((sar) => sar.isoCode === territoryIsoCode)
    ) {
      return {
        type: "Special Administrative Region",
        sovereign: { name: sovereignObj.name, isoCode: sovereignIso },
      };
    }
    // Disputes
    if (
      Array.isArray(sovereignObj.disputes) &&
      sovereignObj.disputes.some((dep) => dep.isoCode === territoryIsoCode)
    ) {
      return {
        type: "Disputed",
        sovereign: { name: sovereignObj.name, isoCode: sovereignIso },
      };
    }
  } 

  return { type: "Sovereign" };
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
