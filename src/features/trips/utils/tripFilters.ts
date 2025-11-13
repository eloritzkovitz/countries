/**
 * Utilities for filtering and sorting trips.
 */

import { getCountryNames } from "@features/trips/utils/tripData";
import type { TripFilters, TripsSortKey } from "@features/trips/types";
import type { Trip } from "@types";

/**
 * Sorts trips based on a given key and order.
 * @param trips - An array of trips to sort.
 * @param sortKey - The key to sort by.
 * @param sortAsc - Whether to sort in ascending order.
 * @param countries - An array of country objects with isoCode and name.
 * @returns - The sorted array of trips.
 */
export function sortTrips(
  trips: Trip[],
  sortKey: TripsSortKey,
  sortAsc: boolean,
  countries: { isoCode: string; name: string }[]
): Trip[] {
  return [...trips].sort((a, b) => {
    let aValue: any, bValue: any;
    switch (sortKey) {
      case "name":
        aValue = a.name || "";
        bValue = b.name || "";
        break;
      case "countries":
        aValue = getCountryNames(a, countries);
        bValue = getCountryNames(b, countries);
        break;
      case "year":
        aValue = a.startDate ? new Date(a.startDate).getFullYear() : 0;
        bValue = b.startDate ? new Date(b.startDate).getFullYear() : 0;
        break;
      case "startDate":
        aValue = a.startDate || "";
        bValue = b.startDate || "";
        break;
      case "endDate":
        aValue = a.endDate || "";
        bValue = b.endDate || "";
        break;
      case "fullDays":
        aValue = a.fullDays || 0;
        bValue = b.fullDays || 0;
        break;
      default:
        aValue = "";
        bValue = "";
    }
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortAsc ? aValue - bValue : bValue - aValue;
    }
    return sortAsc
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });
}

/**
 * Filters trips based on the provided filters.
 * @param trips - An array of trips to filter.
 * @param filters - The filters to apply.
 * @returns - The filtered array of trips.
 */
export function filterTrips(trips: Trip[], filters: TripFilters): Trip[] {
  return trips.filter((trip) => {
    // Filter by name (case-insensitive substring match)
    if (
      filters.name &&
      !trip.name.toLowerCase().includes(filters.name.toLowerCase())
    ) {
      return false;
    }
    // Filter by country codes
    if (
      Array.isArray(filters.country) &&
      filters.country.length > 0 &&
      !filters.country.some((code) => trip.countryCodes.includes(code))
    ) {
      return false;
    }    
    // Filter by years
    if (
      filters.year.length > 0 &&
      (!trip.startDate ||
        !filters.year.includes(
          new Date(trip.startDate).getFullYear().toString()
        ))
    ) {
      return false;
    }
    // Filter by categories
    if (
      filters.categories &&
      filters.categories.length > 0 &&
      (!trip.categories ||
        !filters.categories.every((cat) => trip.categories?.includes(cat)))
    ) {
      return false;
    }
    // Filter by status
    if (filters.status && trip.status !== filters.status) {
      return false;
    }
    // Filter by tags
    if (
      filters.tags &&
      filters.tags.length > 0 &&
      (!trip.tags || !filters.tags.every((tag) => trip.tags?.includes(tag)))
    ) {
      return false;
    }
    return true;
  });
}
