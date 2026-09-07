import type { Country } from "@features/countries/types";
import { CountriesSection } from "./CountriesSection";
import { LocationsSection } from "./LocationsSection";
import { useTripLocations } from "../../../../hooks/useTripLocations";
import type { Trip } from "../../../../types";

interface TripDestinationsTabProps {
  trip: Trip;
  selectedCountries: Array<Country | null>;
  onEditCountries: () => void;
  onEditLocations: () => void;
  onChange: (trip: Trip) => void;
}

/** Renders the destinations tab for a trip. */
export function TripDestinationsTab({
  trip,
  selectedCountries,
  onEditCountries,
  onEditLocations,
  onChange,
}: TripDestinationsTabProps) {
  const { locations, loading: locationsLoading } = useTripLocations(
    trip.locationIds ?? [],
  );

  return (
    <div className="flex flex-col gap-3">
      <CountriesSection
        selectedCountries={selectedCountries
          .filter((country): country is Country => country !== null)
          .map(({ isoCode, name }) => ({
            isoCode,
            name,
          }))}
        onEdit={onEditCountries}
        onRemove={(isoCode) =>
          onChange({
            ...trip,
            countryCodes: trip.countryCodes.filter((code) => code !== isoCode),
          })
        }
      />

      <LocationsSection
        locations={locations}
        loading={locationsLoading}
        onEdit={onEditLocations}
        onRemove={(locationId) =>
          onChange({
            ...trip,
            locationIds: (trip.locationIds ?? []).filter(
              (id) => id !== locationId,
            ),
          })
        }
      />
    </div>
  );
}
