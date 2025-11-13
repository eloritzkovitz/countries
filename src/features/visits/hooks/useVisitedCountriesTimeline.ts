import { useTrips } from "@contexts/TripsContext";
import { useSettings } from "@contexts/SettingsContext";
import {
  getVisitedCountriesForYear,
  getVisitedCountriesUpToYear,
} from "../utils/visits";

export function useVisitedCountriesTimeline() {
  const { trips } = useTrips();
  const { settings } = useSettings();
  const homeCountry = settings?.homeCountry;

  return {
    getVisitedCountriesForYear: (year: number) =>
      getVisitedCountriesForYear(trips, year, homeCountry),
    getVisitedCountriesUpToYear: (year: number) =>
      getVisitedCountriesUpToYear(trips, year, homeCountry),
  };
}
