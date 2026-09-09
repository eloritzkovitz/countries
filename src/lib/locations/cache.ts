import type { Location } from "./types";

const locationCache = new Map<number, Location>();

/**
 * Retrieves a cached location by its ID.
 * @param id - The ID of the location to retrieve from the cache.
 * @returns The cached Location object if found, otherwise undefined.
 */
export function getCachedLocation(id: number): Location | undefined {
  return locationCache.get(id);
}

/**
 * Retrieves cached locations by their IDs.
 * @param ids - The IDs of the locations to retrieve from the cache.
 * @returns An array of cached Location objects corresponding to the provided IDs. Only locations that are found in the cache will be returned.
 */
export function getCachedLocations(ids: number[]): Location[] {
  return ids
    .map((id) => locationCache.get(id))
    .filter((location): location is Location => location !== undefined);
}

/**
 * Caches an array of locations.
 * @param locations - The array of Location objects to cache.
 */
export function cacheLocations(locations: Location[]): void {
  for (const location of locations) {
    locationCache.set(location.id, location);
  }
}
