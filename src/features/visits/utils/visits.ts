import type { Trip } from "@types";
import { getYearNumber } from "@utils/date";

/**
 * Adds a given home country to a set of country codes.
 * @param codes - Set of country codes.
 * @param homeCountry - Optional home country code to add.
 * @returns The updated set of country codes.
 */
function addHomeCountry(codes: Set<string>, homeCountry?: string) {
  if (homeCountry) codes.add(homeCountry);
  return codes;
}

/**
 * Helper to collect unique country codes from trips matching a filter.
 */
function collectCountryCodes(
  trips: Trip[],
  filter: (trip: Trip) => boolean,
  homeCountry?: string
) {
  const codes = new Set<string>();
  trips.filter(filter).forEach((trip) => {
    trip.countryCodes?.forEach((code) => codes.add(code));
  });
  addHomeCountry(codes, homeCountry);
  return Array.from(codes);
}

/**
 * Gets all years from trips.
 * @param trips - Array of trips to analyze.
 * @returns Array of unique years sorted in ascending order.
 */
export function getYearsFromTrips(trips: Trip[]) {
  const allYears = trips
    .map((trip) => trip.startDate && new Date(trip.startDate).getFullYear())
    .filter(Boolean) as number[];
  return Array.from(new Set(allYears)).sort((a, b) => a - b);
}

/**
 * Computes a list of unique visited country codes from an array of trips, including home country if provided.
 * @param trips - The array of trips.
 * @param homeCountry - Optional home country code to include.
 * @returns A list of unique visited country codes.
 */
export function computeVisitedCountriesFromTrips(
  trips: Trip[],
  homeCountry?: string
) {
  const now = new Date();
  return collectCountryCodes(
    trips,
    (trip) => {
      const start = trip.startDate ? new Date(trip.startDate) : undefined;
      return !!(start && !isNaN(start.getTime()) && start <= now);
    },
    homeCountry
  );
}

/**
 * Gets all visited country codes for a specific year, including home country if provided.
 * @param trips - Array of trips to analyze.
 * @param year - The year for which to get visited countries.
 * @param homeCountry - Optional home country code to include.
 * @returns Array of unique country codes visited in the specified year.
 */
export function getVisitedCountriesForYear(
  trips: Trip[],
  year: number,
  homeCountry?: string
) {
  return collectCountryCodes(
    trips,
    (trip) => {
      const start = getYearNumber(trip.startDate);
      const end = getYearNumber(trip.endDate) ?? start;
      return (
        start !== undefined && end !== undefined && year >= start && year <= end
      );
    },
    homeCountry
  );
}

/**
 * Gets a mapping of country codes to number of visits up to and including a specific year,
 * including home country if provided.
 * @param trips - Array of trips to analyze.
 * @param year - The year up to which to include trips.
 * @param homeCountry - Optional home country code to include.
 * @returns An object mapping country codes to visit counts.
 */
export function getVisitedCountriesUpToYear(
  trips: Trip[],
  year: number,
  homeCountry?: string
) {
  const now = new Date();
  const counts: Record<string, number> = {};
  trips.forEach((trip) => {
    const start = getYearNumber(trip.startDate);
    if (
      start !== undefined &&
      start <= year &&
      new Date(trip.startDate) <= now
    ) {
      trip.countryCodes?.forEach((code) => {
        counts[code] = (counts[code] || 0) + 1;
      });
    }
  });
  if (homeCountry) {
    counts[homeCountry] = (counts[homeCountry] || 0) + 1;
  }
  return counts;
}

/**
 * Gets a mapping of country codes to their next upcoming trip year (after today).
 * @param trips - Array of trips to analyze.
 * @returns Record of country code -> next upcoming year
 */
export function getNextUpcomingTripYearByCountry(trips: Trip[]): Record<string, number> {
  const now = new Date();
  const nextYearByCountry: Record<string, number> = {};
  for (const trip of trips) {
    const start = trip.startDate ? new Date(trip.startDate) : undefined;
    if (start && start > now) {
      const year = start.getFullYear();
      for (const code of trip.countryCodes || []) {
        if (
          !nextYearByCountry[code] ||
          year < nextYearByCountry[code]
        ) {
          nextYearByCountry[code] = year;
        }
      }
    }
  }
  return nextYearByCountry;
}
