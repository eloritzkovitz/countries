import { useMemo, useState } from "react";
import {
  defaultTripFilters,
  filterTrips,
  getCountryNames,
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
  initialFilters?: Partial<TripFilters>,
  globalSearch?: string
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

  // Filtered trips with global search
  const filteredTrips = useMemo(() => {
    let result = trips ? filterTrips(trips, filters) : [];
    
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
