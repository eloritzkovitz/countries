import { fetchLocationsByIds, fetchSearchLocations } from "./client";
import { getCachedLocations, cacheLocations } from "./cache";
import type { Location } from "./types";

/**
 * Retrieves locations by their IDs, utilizing a cache to minimize network requests.
 * @param locationIds - An array of location IDs to retrieve.
 * @param signal - An optional AbortSignal to cancel the request if needed.
 * @returns A promise that resolves to an array of Location objects corresponding to the provided IDs. Locations found in the cache will be returned immediately, while missing locations will be fetched from the server and then cached for future use.
 */
export async function getLocationsByIds(
  locationIds: number[],
  signal?: AbortSignal,
): Promise<Location[]> {
  const cached = getCachedLocations(locationIds);

  const cachedIds = new Set(cached.map((location) => location.id));

  const missingIds = locationIds.filter((id) => !cachedIds.has(id));

  if (missingIds.length > 0) {
    const fetched = await fetchLocationsByIds(missingIds, signal);

    cacheLocations(fetched);
    cached.push(...fetched);
  }

  const locationsById = new Map(
    cached.map((location) => [location.id, location]),
  );

  return locationIds
    .map((id) => locationsById.get(id))
    .filter((location): location is Location => location !== undefined);
}

/**
 * Searches for locations through the backend API.
 * @param query - The search query string.
 * @param countryCode - The country code to filter the search results.
 * @param language - The language to use for the search results.
 * @param signal - An optional AbortSignal to cancel the request if needed.
 * @returns A promise that resolves to an array of Location objects matching the search criteria. The results will be cached for future use.
 */
export async function searchLocations(
  query: string,
  countryCode: string,
  language: string,
  signal?: AbortSignal,
): Promise<Location[]> {
  const locations = await fetchSearchLocations(
    query,
    countryCode,
    language,
    signal,
  );

  cacheLocations(locations);

  return locations;
}
