import { useMemo } from "react";
import { useTrips } from "@contexts/TripsContext";
import {
  getYearsFromTrips,
  getVisitedCountriesForYear,
  getVisitedCountriesUpToYear,
} from "../utils/visits";

export function useVisitedCountriesTimeline() {
  const { trips } = useTrips();

  // Compute all years from trips
  const years = useMemo(() => getYearsFromTrips(trips), [trips]);

  return {
    years,
    getVisitedCountriesForYear: (year: number) =>
      getVisitedCountriesForYear(trips, year),
    getVisitedCountriesUpToYear: (year: number) =>
      getVisitedCountriesUpToYear(trips, year),
  };
}
