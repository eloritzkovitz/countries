import { useMemo, useState } from "react";
import { useSettings } from "@contexts/SettingsContext";
import { getCountryByIsoCode } from "@features/countries";
import {
  getCountryDropdownOptions,
  getYearDropdownOptions,
  getCategoryDropdownOptions,
  getStatusDropdownOptions,
  getTagDropdownOptions,
} from "@features/trips/utils/dropdownOptions";
import {
  getCountryNames,
  getUsedCountryCodes,
  getUsedYears,
} from "@features/trips/utils/tripData";
import { filterTrips } from "@features/trips/utils/tripFilters";
import {
  isAbroadTrip,
  isCompletedTrip,
  isLocalTrip,
  isUpcomingTrip,
} from "@features/trips/utils/trips";
import type { Trip, TripCategory, TripFilterState } from "@types";

// Default trip filters
const defaultTripFilterState: TripFilterState = {
  name: "",
  country: [],
  year: [],
  categories: [],
  status: "",
  tags: [],
  local: true,
  abroad: true,
  completed: true,
  upcoming: true,
};

export function useTripFilters(
  trips?: Trip[],
  countryData?: any,
  initialFilters?: Partial<TripFilterState>,
  globalSearch?: string
) {
  const settings = useSettings();
  const homeCountry = settings.settings.homeCountry;

  // Unified filter state
  const [filters, setFilters] = useState<TripFilterState>({
    ...defaultTripFilterState,
    ...initialFilters,
  });

  // Update a single filter
  function updateFilter<K extends keyof TripFilterState>(
    key: K,
    value: TripFilterState[K]
  ) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  // Reset all filters to default
  function resetFilters() {
    setFilters(defaultTripFilterState);
  }

  // Filtered trips with toggles and global search
  const filteredTrips = useMemo(() => {
    let result = trips ?? [];

    // Apply toggle filters (local, abroad, completed, upcoming)
    result = result.filter((trip) => {
      // Location toggles
      const locationMatch =
        (filters.local && isLocalTrip(trip, homeCountry)) ||
        (filters.abroad && isAbroadTrip(trip, homeCountry));

      // Status toggles
      const statusMatch =
        (filters.completed && isCompletedTrip(trip)) ||
        (filters.upcoming && isUpcomingTrip(trip));

      // Must match one from each group
      return locationMatch && statusMatch;
    });

    // Apply column filters
    result = filterTrips(result, filters);

    // Apply global search if provided
    if (globalSearch && globalSearch.trim() !== "") {
      const search = globalSearch.toLowerCase();
      result = result.filter((trip) => {
        const countriesArr = countryData?.countries ?? [];
        const countryNamesRaw = getCountryNames(trip, countriesArr);
        const countryNames = (
          Array.isArray(countryNamesRaw) ? countryNamesRaw : [countryNamesRaw]
        ).map((name) => name.toLowerCase());
        return (
          trip.name?.toLowerCase().includes(search) ||
          trip.countryCodes?.some((c) => c.toLowerCase().includes(search)) ||
          countryNames.some((name) => name.includes(search)) ||
          (trip.tags ?? []).some((tag) => tag.toLowerCase().includes(search)) ||
          (trip.categories ?? []).some((cat) =>
            cat.toLowerCase().includes(search)
          )
        );
      });
    }
    return result;
  }, [trips, filters, globalSearch, countryData?.countries]);

  // Country options
  const usedCountryCodes = getUsedCountryCodes(trips ?? []);
  const rawCountryOptions = getCountryDropdownOptions(
    countryData?.countries ?? [],
    usedCountryCodes
  );
  const countryOptions = rawCountryOptions.map((opt) => {
    const country = getCountryByIsoCode(opt.value, countryData);
    return opt.value
      ? {
          ...opt,
          country,
        }
      : opt;
  });

  // Year options
  const usedYears = getUsedYears(trips ?? []);
  const yearOptions = getYearDropdownOptions(usedYears);

  // Category options
  let categoryOptions;
  if (!trips || trips.length === 0) {
    // For modal: show all categories
    categoryOptions = getCategoryDropdownOptions(null);
  } else {
    // For table filters: show only used categories
    const usedCategories = Array.from(
      new Set(trips.flatMap((trip) => trip.categories ?? []))
    ) as TripCategory[];
    categoryOptions = getCategoryDropdownOptions(null).filter((opt) =>
      usedCategories.includes(opt.value)
    );
  }

  // Status and Tag options
  const statusOptions = getStatusDropdownOptions(trips ?? []);
  const tagOptions = getTagDropdownOptions(trips ?? []);

  return {
    filters,
    setFilters,
    updateFilter,
    resetFilters,
    filteredTrips,
    countryOptions,
    yearOptions,
    categoryOptions,
    statusOptions,
    tagOptions,
  };
}
