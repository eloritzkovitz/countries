/**
 * Utility functions for trips.
 */

import type { Trip } from "@types";

/**
 * Generates a CSS class string for a trip row based on its index and whether it's upcoming.
 * @param trip - The trip object.
 * @param tripIdx - The index of the trip in the list.
 * @returns A string containing the CSS class names.
 */
export function getTripRowClass(trip: Trip, tripIdx: number): string {
  const base = tripIdx % 2 === 0 ? "trips-row-even" : "trips-row-odd";
  return [base, isUpcomingTrip(trip) ? "trips-row-upcoming" : ""].join(" ");
}

/**
 * Determines if a trip is upcoming based on its start date.
 * @param trip - The trip object to evaluate.
 * @returns True if the trip is upcoming, false otherwise.
 */
export function isUpcomingTrip(trip: Trip): boolean {
  return !!trip.startDate && new Date(trip.startDate) > new Date();
}

/**
 * Gets the country names for a given trip based on its country codes.
 * @param trip - The trip object containing country codes.
 * @param countries - An array of country objects with isoCode and name.
 * @returns a string of country names separated by commas.
 */
export function getCountryNames(
  trip: Trip,
  countries: { isoCode: string; name: string }[]
): string {
  return trip.countryCodes
    .map((code) => {
      const country = countries.find(
        (c) => c.isoCode?.toLowerCase() === code.toLowerCase()
      );
      return country?.name || "";
    })
    .join(", ");
}

/**
 * Gets all country codes that have trips associated with them.
 * @param trips - An array of trips
 * @returns a set of country codes.
 */
export function getUsedCountryCodes(trips: Trip[]): Set<string> {
  return new Set(trips.flatMap((trip) => trip.countryCodes));
}

/**
 * Gets all years that have trips associated with them.
 * @param trips - An array of trips
 * @returns an array of years.
 */
export function getUsedYears(trips: Trip[]): number[] {
  return Array.from(
    new Set(
      trips
        .map((trip) => trip.startDate && new Date(trip.startDate).getFullYear())
        .filter((y): y is number => typeof y === "number")
    )
  ).sort((a, b) => b - a);
}