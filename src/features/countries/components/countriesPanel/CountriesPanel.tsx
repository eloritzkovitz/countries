import { useCallback } from "react";
import { FaFilter, FaGlobe, FaXmark } from "react-icons/fa6";
import {
  ActionButton,
  ErrorMessage,
  LoadingSpinner,
  Panel,
  SearchInput,
  Separator,
} from "@components";
import { useCountryData } from "@contexts/CountryDataContext";
import { useOverlayContext } from "@contexts/OverlayContext";
import { useUI } from "@contexts/UIContext";
import { useCountryFilters } from "@features/countries/hooks/useCountryFilters";
import { sortCountries } from "@features/countries/utils/countryList";
import { useListNavigation } from "@hooks/useListNavigation";
import { useSort } from "@hooks/useSort";
import type { Country } from "@types";
import { CountriesToolbar } from "./CountriesToolbar";
import { CountryList } from "./CountryList";
import { CountrySortSelect } from "./CountrySortSelect";
import { CountryFiltersPanel } from "../countryFilters/CountryFiltersPanel";

interface CountriesPanelProps {
  selectedIsoCode: string | null;
  hoveredIsoCode: string | null;
  modalCountry: Country | null;
  onSelect: (iso: string | null) => void;
  onHover: (iso: string | null) => void;
  onCountryInfo?: (country: Country) => void;
}

export function CountriesPanel({
  selectedIsoCode,
  hoveredIsoCode,
  modalCountry,
  onSelect,
  onHover,
  onCountryInfo,
}: CountriesPanelProps) {
  // Context data state
  const { countries, allRegions, allSubregions, loading, error } =
    useCountryData();
  const { overlays, overlaySelections, setOverlaySelections } =
    useOverlayContext();
  const visitedOverlayId = "visited-countries";

  const {
    uiVisible,
    showCountries,
    toggleCountries,
    showFilters,
    toggleFilters,
  } = useUI();

  // Filter state
  const {
    selectedRegion,
    setSelectedRegion,
    selectedSubregion,
    setSelectedSubregion,
    selectedSovereignty,
    setSelectedSovereignty,
    search,
    setSearch,
    filteredCountries,
    allCount,
    visitedCount,    
  } = useCountryFilters({
    countries,
    overlays,
    overlaySelections,
  });

  // Quick toggles state
  const isVisitedOnly = overlaySelections[visitedOverlayId] === "only";  

  // Sort state
  const {
    sortBy,
    setSortBy,
    sortedItems: sortedCountries,
  } = useSort(filteredCountries, sortCountries, "name-asc");

  // Keyboard navigation within country list
  useListNavigation({
    items: sortedCountries,
    getKey: (c) => c.isoCode,
    selectedKey: selectedIsoCode,
    hoveredKey: hoveredIsoCode,
    onSelect,
    onHover,
    onItemInfo: onCountryInfo,
    enabled: uiVisible && showCountries,
  });

  // Handle country info action
  const handleCountryInfo = useCallback(
    (country: Country) => {
      if (onCountryInfo) onCountryInfo(country);
    },
    [onCountryInfo]
  );

  // Show loading or error states
  if (loading) return <LoadingSpinner message="Loading countries..." />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="fixed top-0 left-0 h-screen z-40 group relative">
      <Panel
        title={
          <>
            <FaGlobe />
            Countries
          </>
        }
        show={uiVisible && showCountries}
        onHide={toggleCountries}
        escEnabled={!modalCountry}
        showSeparator={false}
        headerActions={
          <>
            <ActionButton
              onClick={toggleFilters}
              ariaLabel={showFilters ? "Hide Filters" : "Show Filters"}
              title="Filters"
              icon={<FaFilter />}
            />
            <ActionButton
              onClick={toggleCountries}
              ariaLabel="Hide countries panel"
              title="Hide"
              icon={<FaXmark />}
            />
          </>
        }
      >
        <div className="flex flex-col h-full">
          {/* Search and sort bar */}
          <div className="flex gap-2 items-stretch pb-0">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search countries..."
              className="flex-1 h-10"
            />
            <CountrySortSelect
              value={sortBy}
              onChange={(v) => setSortBy(v as any)}
            />
          </div>

          {/* Showing count */}
          <div className="text-s text-left text-gray-500 font-semibold mb-2 mt-2 px-2">
            Showing {sortedCountries.length} countries
          </div>

          <Separator className="mx-2" />

          {/* Country list */}
          <div className="flex-1 min-h-0 overflow-y-auto -mx-4">
            <CountryList
              countries={sortedCountries}
              selectedIsoCode={selectedIsoCode}
              hoveredIsoCode={hoveredIsoCode}
              onSelect={onSelect}
              onHover={onHover}
              onCountryInfo={handleCountryInfo}
            />
          </div>

          <Separator className="mx-2" />

          {/* Toolbar */}
          <CountriesToolbar
            isVisitedOnly={isVisitedOnly}
            setOverlaySelections={setOverlaySelections}
            visitedOverlayId={visitedOverlayId}
            allCount={allCount}
            visitedCount={visitedCount}
          />
        </div>
      </Panel>

      {/* Filters panel */}
      {showCountries && showFilters && (
        <CountryFiltersPanel
          show={showFilters}
          allRegions={allRegions}
          allSubregions={allSubregions}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          selectedSubregion={selectedSubregion}
          setSelectedSubregion={setSelectedSubregion}
          selectedSovereignty={selectedSovereignty}
          setSelectedSovereignty={setSelectedSovereignty}
          overlays={overlays}
          overlaySelections={overlaySelections}
          setOverlaySelections={setOverlaySelections}
          onHide={toggleFilters}
        />
      )}
    </div>
  );
}
