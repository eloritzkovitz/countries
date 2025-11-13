import {
  FaChartSimple,
  FaLocationDot,
  FaPlane,
  FaGlobe,
  FaFlag,
  FaClock,
  FaRegClock,
  FaXmark,
  FaSuitcaseRolling,
} from "react-icons/fa6";
import { ActionButton, Modal, PanelHeader, SeparatorRow } from "@components";
import { useCountryData } from "@contexts/CountryDataContext";
import { CountryWithFlag } from "@features/countries";
import { useHomeCountry } from "@features/settings";
import {
  getCompletedTrips,
  getLocalTrips,
  getAbroadTrips,
} from "@features/trips/utils/trips";
import {
  getCountriesVisited,
  getMostVisitedCountries,
  getLongestTrip,
  getShortestTrip,
} from "@features/trips/utils/tripStats";
import type { Trip } from "@types";
import { TripStatRow } from "./TripStatRow";

type TripsStatsProps = {
  isOpen: boolean;
  onClose: () => void;
  trips: Trip[];
};

export function TripsStats({ isOpen, onClose, trips }: TripsStatsProps) {
  const { countries } = useCountryData();
  const homeCountry = useHomeCountry();

  // Trip counts
  const totalTrips = trips.length;
  const localTrips = getLocalTrips(trips, homeCountry);
  const abroadTrips = getAbroadTrips(trips, homeCountry);

  // Only completed trips for country stats
  const completedTrips = getCompletedTrips(trips);
  const completedAbroadTrips = getAbroadTrips(completedTrips, homeCountry);

  // Countries visited (completed only)
  const countriesVisited = getCountriesVisited(completedTrips).length;

  // Most visited country (abroad only, completed)
  const { codes: mostVisitedCountryCodes, maxCount } = getMostVisitedCountries(
    completedAbroadTrips,
    homeCountry
  );

  // Get country info for display
  const mostVisitedCountries = mostVisitedCountryCodes
    .map((code) =>
      countries.find(
        (c: any) => c.isoCode?.toLowerCase() === code.toLowerCase()
      )
    )
    .filter(Boolean);

  // Longest and shortest trips (abroad only)
  const longestTrip = getLongestTrip(abroadTrips);
  const shortestTrip = getShortestTrip(abroadTrips);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <PanelHeader
        title={
          <>
            <FaChartSimple /> Trip Statistics
          </>
        }
      >
        <ActionButton
          onClick={onClose}
          ariaLabel="Close Overlay Modal"
          title="Close"
          icon={<FaXmark />}
        />
      </PanelHeader>
      <div className="relative flex">
        {/* Main stats table */}
        <div className="w-[500px] max-h-[70vh] overflow-y-auto p-4">
          <table className="w-full mb-4 text-gray-700 border-separate [border-spacing:0.5rem]">
            <tbody>
              <TripStatRow
                icon={<FaSuitcaseRolling />}
                label="Total trips:"
                value={totalTrips}
              />
              <TripStatRow
                icon={<FaLocationDot />}
                label="Local trips:"
                value={localTrips.length}
              />
              <TripStatRow
                icon={<FaPlane />}
                label="Abroad trips:"
                value={abroadTrips.length}
              />
              <SeparatorRow />
              <TripStatRow
                icon={<FaGlobe />}
                label="Countries visited:"
                value={countriesVisited}
              />
              <TripStatRow
                icon={<FaFlag />}
                label="Most visited country:"
                value={
                  mostVisitedCountries.length > 0
                    ? mostVisitedCountries.map((country, idx) => (
                        <span
                          key={country.isoCode}
                          className="inline-flex items-center gap-1"
                        >
                          <CountryWithFlag
                            isoCode={country.isoCode}
                            name={country.name}
                            size="32x24"
                          />
                          <span>({maxCount} times)</span>
                          {idx < mostVisitedCountries.length - 1 && (
                            <span>,</span>
                          )}
                        </span>
                      ))
                    : "—"
                }
              />
              <SeparatorRow />
              <TripStatRow
                icon={<FaClock />}
                label="Longest trip:"
                value={`${longestTrip} days`}
              />
              <TripStatRow
                icon={<FaRegClock />}
                label="Shortest trip:"
                value={
                  shortestTrip !== Infinity && shortestTrip > 0
                    ? `${shortestTrip} days`
                    : "—"
                }
              />
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
}
