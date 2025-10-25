import { useMemo, useState } from "react";
import {
  defaultTripFilters,
  filterTrips,
  getUsedCountryCodes,
  getUsedYears,
  mapCategoryOptionsWithIcons,
  mapCountryOptionsWithFlags,
} from "@features/trips";
import {
  getCountryDropdownOptions,
  getYearDropdownOptions,
  getCategoryDropdownOptions,
  getStatusDropdownOptions,
  getTagDropdownOptions,
} from "@features/trips/utils/dropdownOptions";
import type { Trip, TripFilters, TripCategory } from "@types";

export function useTripFilters(
  trips?: Trip[],
  countryData?: any,
  initialFilters?: Partial<TripFilters>
) {
  const [filters, setFilters] = useState<TripFilters>({
    ...defaultTripFilters,
    ...initialFilters,
  });

  // Update a single filter
  function updateFilter<K extends keyof TripFilters>(
    key: K,
    value: TripFilters[K]
  ) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function resetFilters() {
    setFilters(defaultTripFilters);
  }

  // Filtered trips
  const filteredTrips = useMemo(
    () => (trips ? filterTrips(trips, filters) : undefined),
    [trips, filters]
  );

  // Country options
  const usedCountryCodes = getUsedCountryCodes(trips ?? []);
  const rawCountryOptions = getCountryDropdownOptions(
    countryData?.countries ?? [],
    usedCountryCodes
  );
  const countryOptions = mapCountryOptionsWithFlags(
    rawCountryOptions,
    countryData
  );

  // Year options
  const usedYears = getUsedYears(trips ?? []);
  const yearOptions = getYearDropdownOptions(usedYears);

  // Category options
  let categoryOptions;
  if (!trips || trips.length === 0) {
    // For modal: show all categories
    categoryOptions = mapCategoryOptionsWithIcons(
      getCategoryDropdownOptions(null)
    );
  } else {
    // For table filters: show only used categories
    const usedCategories = Array.from(
      new Set(trips.flatMap((trip) => trip.categories ?? []))
    ) as TripCategory[];
    const filteredOptions = getCategoryDropdownOptions(null).filter((opt) =>
      usedCategories.includes(opt.value)
    );
    categoryOptions = mapCategoryOptionsWithIcons(filteredOptions);
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
