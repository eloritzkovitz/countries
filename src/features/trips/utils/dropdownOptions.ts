/**
 * Utility functions for generating dropdown options for trips filtering.
 */

import {
  ALL_TRIP_CATEGORIES,
  ALL_TRIP_STATUSES,
  ALL_TRIP_TAGS,
} from "@features/trips/constants/trips";
import type { Country, Trip, TripCategory, TripStatus, TripTag } from "@types";
import { capitalizeWords } from "@utils/string";

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

// Generic helper for dropdown options
export function toDropdownOptions<T extends string>(
  values: T[],
  labelFn: (val: T) => string = capitalizeWords
): { value: T; label: string }[] {
  return values.map((val) => ({
    value: val,
    label: labelFn(val),
  }));
}

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
  return countries
    .filter((c) => usedCountryCodes.has(c.isoCode))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((c) => ({
      value: c.isoCode,
      label: c.name,
    }));
}

/**
 * Gets year dropdown options for filtering.
 * @param usedYears - Array of years that have trips.
 * @returns An array of dropdown options.
 */
export function getYearDropdownOptions(usedYears: number[]) {
  return usedYears.map((y) => ({ value: y.toString(), label: y.toString() }));
}

/**
 * Gets category dropdown options for filtering.
 * @param trips - Array of trips to extract categories from.
 * @returns An array of dropdown options.
 */
export function getCategoryDropdownOptions(trips?: Trip[] | null) {
  let categories: TripCategory[];
  if (!trips || trips.length === 0) {
    categories = Array.from(ALL_TRIP_CATEGORIES);
  } else {
    const set = new Set<TripCategory>();
    trips.forEach((trip) => trip.categories?.forEach((cat) => set.add(cat)));
    categories = Array.from(set);
  }
  return toDropdownOptions<TripCategory>(categories);
}

/**
 * Gets status dropdown options for filtering.
 * @param trips - Array of trips to extract statuses from.
 * @returns An array of dropdown options.
 */
export function getStatusDropdownOptions(trips?: Trip[] | null) {
  let statuses: TripStatus[];
  if (!trips || trips.length === 0) {
    statuses = Array.from(ALL_TRIP_STATUSES);
  } else {
    const set = new Set<TripStatus>();
    trips.forEach((trip) => {
      if (trip.status) set.add(trip.status);
    });
    statuses = Array.from(ALL_TRIP_STATUSES).filter((s) => set.has(s));
  }
  return toDropdownOptions(statuses, (s) =>
    capitalizeWords(s.replace(/-/g, " "))
  );
}

/**
 * Gets tag dropdown options for filtering.
 * @param trips - Array of trips to extract tags from.
 * @returns An array of dropdown options.
 */
export function getTagDropdownOptions(trips?: Trip[] | null) {
  let tags: TripTag[];
  if (!trips || trips.length === 0) {
    tags = Array.from(ALL_TRIP_TAGS);
  } else {
    const set = new Set<TripTag>();
    trips.forEach((trip) => trip.tags?.forEach((tag) => set.add(tag)));
    tags = Array.from(set);
  }
  return toDropdownOptions(tags);
}
