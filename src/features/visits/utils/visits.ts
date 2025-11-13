import type { Trip } from "@types";
import { getYearNumber } from "@utils/date";

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
 * Gets all visited country codes for a specific year.
 * @param trips - Array of trips to analyze.
 * @param year - The year for which to get visited countries.
 * @returns Array of unique country codes visited in the specified year.
 */
export function getVisitedCountriesForYear(trips: Trip[], year: number) {
  const codes = new Set<string>();
  trips.forEach((trip) => {
    const start = getYearNumber(trip.startDate);
    const end = getYearNumber(trip.endDate) ?? start;
    if (
      start !== undefined &&
      end !== undefined &&
      year >= start &&
      year <= end
    ) {
      trip.countryCodes?.forEach((code) => codes.add(code));
    }
  });
  return Array.from(codes);
}

/**
 * Gets all visited country codes up to and including a specific year.
 * @param trips - Array of trips to analyze.
 * @param year - The year up to which to include trips.
 * @returns Array of unique country codes visited up to the specified year.
 */
export function getVisitedCountriesUpToYear(trips: Trip[], year: number) {
  const codes = new Set<string>();
  const now = new Date();

  trips.forEach((trip) => {
    const start = getYearNumber(trip.startDate);
    // Only include trips that have started as of today
    if (
      start !== undefined &&
      start <= year &&
      new Date(trip.startDate) <= now
    ) {
      trip.countryCodes?.forEach((code) => codes.add(code));
    }
  });
  return Array.from(codes);
}
