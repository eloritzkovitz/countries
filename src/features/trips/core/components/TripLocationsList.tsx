import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ActionButton, LoadingSpinner, SectionHeader } from "@components";
import { ICONS } from "@constants/icons";
import { CountryWithFlag } from "@features/countries";
import type { Location } from "@lib/locations";

interface TripLocationsListProps {
  locations: Location[];
  loading?: boolean;
  onRemove?: (locationId: number) => void;
}

export function TripLocationsList({
  locations,
  loading = false,
  onRemove,
}: TripLocationsListProps) {
  const { t } = useTranslation("trips");

  const groupedLocations = useMemo(() => {
    const countries = new Map<
      string,
      {
        name: string;
        locationsByAdmin1: Map<string, Location[]>;
        locationsWithoutAdmin1: Location[];
      }
    >();

    for (const location of locations) {
      let country = countries.get(location.countryCode);

      if (!country) {
        country = {
          name: location.countryName,
          locationsByAdmin1: new Map(),
          locationsWithoutAdmin1: [],
        };

        countries.set(location.countryCode, country);
      }

      if (location.admin1) {
        const admin1Key = location.admin1.code;

        if (!country.locationsByAdmin1.has(admin1Key)) {
          country.locationsByAdmin1.set(admin1Key, []);
        }

        country.locationsByAdmin1.get(admin1Key)!.push(location);
      } else {
        country.locationsWithoutAdmin1.push(location);
      }
    }

    return countries;
  }, [locations]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (locations.length === 0) {
    return (
      <p className="text-sm text-muted">
        {t("editor.destinations.locations.none")}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {[...groupedLocations.entries()]
        .sort(([, a], [, b]) => a.name.localeCompare(b.name))
        .map(([countryCode, country]) => (
          <div key={countryCode}>
            <CountryWithFlag
              country={{
                isoCode: countryCode,
                name: country.name,
              }}
            />

            <div className="ms-4">
              {[...country.locationsByAdmin1.entries()]
                .sort(([, a], [, b]) =>
                  (a[0].admin1?.name ?? "").localeCompare(
                    b[0].admin1?.name ?? "",
                  ),
                )
                .map(([admin1Code, admin1Locations]) => (
                  <div key={admin1Code}>
                    <SectionHeader title={admin1Locations[0].admin1?.name} />

                    <div className="ms-3 flex flex-col gap-1">
                      {[...admin1Locations]
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((location) => (
                          <div
                            key={location.id}
                            className="flex items-center justify-between rounded bg-input px-3 py-2"
                          >
                            <span>{location.name}</span>

                            {onRemove && (
                              <ActionButton
                                icon={<ICONS.close />}
                                variant="custom"
                                className="p-1"
                                ariaLabel={t("editor.actions.remove")}
                                onClick={() => onRemove(location.id)}
                              />
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}

              {[...country.locationsWithoutAdmin1]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((location) => (
                  <div
                    key={location.id}
                    className="ms-3 flex items-center justify-between rounded bg-input px-3 py-2"
                  >
                    <span>{location.name}</span>

                    {onRemove && (
                      <ActionButton
                        icon={<ICONS.close />}
                        variant="custom"
                        className="p-1"
                        ariaLabel={t("editor.actions.remove")}
                        onClick={() => onRemove(location.id)}
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}
