import { useEffect, useState } from "react";
import { LocationsSection } from "./LocationsSection";
import type { Trip, TripLocation } from "../../../../types";
import { resolveBackendUrl } from "@lib/api-client/env";
import type { Country } from "@features/countries/types";
import { CountriesSection } from "./CountriesSection";

interface TripDestinationsTabProps {
  trip: Trip;
  selectedCountries: Array<Country | null>;
  onEditCountries: () => void;
  onEditLocations: () => void;
  onChange: (trip: Trip) => void;
}

interface LocationsResponse {
  locations: TripLocation[];
}

/** Renders the destinations tab for a trip. */
export function TripDestinationsTab({
  trip,
  selectedCountries,
  onEditCountries,
  onEditLocations,
  onChange,
}: TripDestinationsTabProps) {
  const [locations, setLocations] = useState<TripLocation[]>([]);

  useEffect(() => {
    const locationIds = trip.locationIds ?? [];

    if (locationIds.length === 0) {
      setLocations([]);
      return;
    }

    const controller = new AbortController();

    const fetchLocations = async () => {
      try {
        const backendUrl = resolveBackendUrl({
          envVar: "VITE_API_URL",
        });

        if (!backendUrl) {
          throw new Error("Backend URL is not configured");
        }

        const params = new URLSearchParams({
          ids: locationIds.join(","),
        });

        const response = await fetch(
          `${backendUrl}/api/locations?${params.toString()}`,
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`Location fetch failed: ${response.status}`);
        }

        const data = (await response.json()) as LocationsResponse;

        setLocations(data.locations);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Failed to fetch locations:", error);
          setLocations([]);
        }
      }
    };

    void fetchLocations();

    return () => controller.abort();
  }, [trip.locationIds]);

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
        onEdit={onEditLocations}
        onRemove={(locationId) => {
          onChange({
            ...trip,
            locationIds: (trip.locationIds ?? []).filter(
              (id) => id !== locationId,
            ),
          });
          setLocations((current) =>
            current.filter((location) => location.id !== locationId),
          );
        }}
      />      
    </div>
  );
}
