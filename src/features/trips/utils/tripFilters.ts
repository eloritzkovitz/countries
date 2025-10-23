/**
 * Utilities for filtering and sorting trips.
 */

import type { SortKey, Trip, TripFilters } from "@types";
import { getCountryNames } from "./trips";

/**
 * Sorts trips based on a given key and order.
 * @param trips - An array of trips to sort. 
 * @param sortKey - The key to sort by.
 * @param sortAsc - Whether to sort in ascending order.
 * @param countries - An array of country objects with isoCode and name.
 * @returns - The sorted array of trips.
 */
export function sortTrips(trips: Trip[], sortKey: SortKey, sortAsc: boolean, countries: { isoCode: string; name: string }[]): Trip[] {
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
      case "notes":
        aValue = a.notes || "";
        bValue = b.notes || "";
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
    if (
      filters.name &&
      !trip.name.toLowerCase().includes(filters.name.toLowerCase())
    ) {
      return false;
    }
    if (filters.country && !trip.countryCodes.includes(filters.country)) {
      return false;
    }
    if (
      filters.year &&
      (!trip.startDate ||
        new Date(trip.startDate).getFullYear().toString() !== filters.year)
    ) {
      return false;
    }
    return true;
  });
}
