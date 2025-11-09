import { useTrips } from "@contexts/TripsContext";
import { getVisitedCountriesByYear, getVisitedCountriesUpToYear } from "@features/trips/utils/trips";
import type { Trip } from "@types";

// Returns a mapping of years to visited countries based on trips
export function useVisitedCountriesTimeline() {
  const { trips } = useTrips();
  return getVisitedCountriesByYear(trips as Trip[]);
}

// Returns a snapshot of all countries visited up to a given year
export function useVisitedCountriesSnapshot(year: number) {
  const { trips } = useTrips();
  return getVisitedCountriesUpToYear(trips as Trip[], year);
}