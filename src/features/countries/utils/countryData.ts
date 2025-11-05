/**
 * Utility functions for handling country data.
 */

import { EXCLUDED_ISO_CODES, SOVEREIGN_FLAG_MAP } from "@constants";
import { SOVEREIGN_DEPENDENCIES } from "@features/countries";
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

/** Finds a country by its ISO code from the provided country data.
 * @param code - The ISO code of the country to find.
 * @param countryData - An object containing an array of countries.
 * @returns The country object if found, otherwise null.
 */
export function getCountryByIsoCode(
  code: string,
  countryData: { countries: any[] }
): any | null {
  if (!code || !countryData?.countries) return null;
  return (
    countryData.countries.find(
      (c) => c.isoCode?.toLowerCase() === code.toLowerCase()
    ) || null
  );
}

/**
 * Creates a lookup map of countries by their ISO codes.
 * @param countries - Array of country objects.
 * @returns A record mapping ISO codes to country objects.
 */
export function createCountryLookup(countries: any[]): Record<string, any> {
  return Object.fromEntries(
    countries.map((c) => [c.isoCode?.toLowerCase(), c])
  );
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
 * Gets a formatted string of languages.
 * @param languages - An array of language names.
 * @returns A comma-separated string of languages or "None" if empty.
 */
export function getLanguagesDisplay(languages?: string[]) {
  if (!languages || languages.length === 0) return "None";
  return languages.join(", ");
}

// Precompute lookup maps
const dependencyMap: Record<
  string,
  { type: SovereigntyType; sovereign: { name: string; isoCode: string } }
> = {};
const regionMap: Record<
  string,
  { type: SovereigntyType; sovereign: { name: string; isoCode: string } }
> = {};
const disputeMap: Record<
  string,
  { type: SovereigntyType; sovereign: { name: string; isoCode: string } }
> = {};

for (const [sovereignIso, sovereignObj] of Object.entries(
  SOVEREIGN_DEPENDENCIES
)) {
  sovereignObj.dependencies?.forEach((dep) => {
    dependencyMap[dep.isoCode] = {
      type: "Dependency",
      sovereign: { name: sovereignObj.name, isoCode: sovereignIso },
    };
  });
  sovereignObj.regions?.forEach((region) => {
    regionMap[region.isoCode] = {
      type: "Overseas Region",
      sovereign: { name: sovereignObj.name, isoCode: sovereignIso },
    };
  });
  sovereignObj.disputes?.forEach((dep) => {
    disputeMap[dep.isoCode] = {
      type: "Disputed",
      sovereign: { name: sovereignObj.name, isoCode: sovereignIso },
    };
  });
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
  if (dependencyMap[territoryIsoCode]) return dependencyMap[territoryIsoCode];
  if (regionMap[territoryIsoCode]) return regionMap[territoryIsoCode];
  if (disputeMap[territoryIsoCode]) return disputeMap[territoryIsoCode];
  return { type: "Sovereign" };
}
