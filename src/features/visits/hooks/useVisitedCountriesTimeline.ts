import { useTrips } from "@contexts/TripsContext";
import { useHomeCountry } from "@features/settings";
import {
  getVisitedCountriesForYear,
  getVisitedCountriesUpToYear,
} from "../utils/visits";

export function useVisitedCountriesTimeline() {
  const { trips } = useTrips();
  const { homeCountry } = useHomeCountry();

  return {
    getVisitedCountriesForYear: (year: number) =>
      getVisitedCountriesForYear(trips, year, homeCountry),
    getVisitedCountriesUpToYear: (year: number) =>
      getVisitedCountriesUpToYear(trips, year, homeCountry),
  };
}
