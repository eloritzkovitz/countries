import { useTrips } from "@contexts/TripsContext";
import {
  getVisitedCountriesForYear,
  getVisitedCountriesUpToYear,
} from "../utils/visits";

export function useVisitedCountriesTimeline() {
  const { trips } = useTrips();

  return {
    getVisitedCountriesForYear: (year: number) =>
      getVisitedCountriesForYear(trips, year),
    getVisitedCountriesUpToYear: (year: number) =>
      getVisitedCountriesUpToYear(trips, year),
  };
}
