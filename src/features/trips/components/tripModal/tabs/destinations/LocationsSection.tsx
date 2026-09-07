import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "@components";
import { ICONS } from "@constants/icons";
import { CountryWithFlag } from "@features/countries";
import type { TripLocation } from "../../../../types";

interface LocationsSectionProps {
  locations: TripLocation[];
  onEdit: () => void;
  onRemove: (locationId: number) => void;
}

/** Renders the selected locations section for a trip. */
export function LocationsSection({
  locations,
  onEdit,
  onRemove,
}: LocationsSectionProps) {
  const { t } = useTranslation("trips");

  const groupedLocations = useMemo(() => {
    const countries = new Map<
      string,
      {
        name: string;
        locationsByAdmin1: Map<string, TripLocation[]>;
        locationsWithoutAdmin1: TripLocation[];
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

  return (
    <div className="flex-1 min-h-0 overflow-auto">
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold">{t("modal.destinations.locations.title")}</span>

        <button
          type="button"
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-input-hover text-sm font-medium"
          onClick={onEdit}
          aria-label={
            locations.length > 0
              ? t("modal.editLocations")
              : t("modal.selectLocations")
          }
        >
          <ICONS.edit className="me-1" />

          {locations.length > 0
            ? t("modal.actions.edit")
            : t("modal.actions.add")}
        </button>
      </div>

      {locations.length === 0 ? (
        <p className="text-sm text-muted">{t("modal.destinations.locations.noLocations")}</p>
      ) : (
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
                        <SectionHeader
                          title={admin1Locations[0].admin1?.name}
                        />

                        <div className="ms-3 flex flex-col gap-1">
                          {[...admin1Locations]
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((location) => (
                              <div
                                key={location.id}
                                className="flex items-center justify-between px-3 py-2 rounded bg-input"
                              >
                                <span>{location.name}</span>

                                <button
                                  type="button"
                                  onClick={() => onRemove(location.id)}
                                  className="p-1 rounded hover:bg-input-hover"
                                  aria-label={t("modal.actions.remove")}
                                >
                                  <ICONS.close />
                                </button>
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
                        className="flex items-center justify-between px-3 py-2 rounded bg-input"
                      >
                        <span>{location.name}</span>

                        <button
                          type="button"
                          onClick={() => onRemove(location.id)}
                          className="p-1 rounded hover:bg-input-hover"
                          aria-label={t("modal.actions.remove")}
                        >
                          <ICONS.close />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
