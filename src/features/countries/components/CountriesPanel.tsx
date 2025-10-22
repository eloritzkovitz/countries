import { useCallback } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import {
  ActionButton,
  Branding,
  ErrorMessage,
  LoadingSpinner,
  Panel,
  SearchInput,
  Separator,
} from "@components";
import { useCountryData } from "@contexts/CountryDataContext";
import { useOverlayContext } from "@contexts/OverlayContext";
import { useUI } from "@contexts/UIContext";
import { sortCountries } from "@features/countries";
import { useSort } from "@hooks/useSort";
import type { Country } from "@types";
import { CollapsedPanelButton } from "./CollapsedPanelButton";
import { CountryList } from "./CountryList";
import { CountrySortSelect } from "./CountrySortSelect";
import { CountryFiltersPanel } from "../filters/CountryFiltersPanel";
import { useCountryFilters } from "../hooks/useCountryFilters";
import { useCountryListNavigation } from "../hooks/useCountryListNavigation";

interface CountriesPanelProps {
  selectedIsoCode: string | null;
  hoveredIsoCode: string | null;
  onSelect: (iso: string | null) => void;
  onHover: (iso: string | null) => void;
  onCountryInfo?: (country: Country) => void;
}

export function CountriesPanel({
  selectedIsoCode,
  hoveredIsoCode,
  onSelect,
  onHover,
  onCountryInfo,
}: CountriesPanelProps) {
  // Context data state
  const { countries, allRegions, allSubregions, loading, error } =
    useCountryData();
  const { overlays, overlaySelections, setOverlaySelections } =
    useOverlayContext();
  const {
    uiVisible,
    showCountries,
    setShowCountries,
    showFilters,
    toggleFilters,
    closePanel,
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
  } = useCountryFilters({
    countries,
    overlays,
    overlaySelections,
  });

  // Sort state
  const {
    sortBy,
    setSortBy,
    sortedItems: sortedCountries,
  } = useSort(filteredCountries, sortCountries, "name-asc");  

  // Keyboard navigation within country list
  useCountryListNavigation({
    filteredCountries,
    selectedIsoCode,
    hoveredIsoCode,
    onSelect,
    onHover,
    onCountryInfo,
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
        title={<Branding title="Countries" />}
        show={uiVisible && showCountries}
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
              onClick={() => setShowCountries(false)}
              ariaLabel="Hide countries panel"
              title="Hide"
              icon={<FaTimes />}
            />
          </>
        }
      >
        {/* Search input and sort button */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 flex items-stretch">
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
        <div className="text-s text-left text-gray-500 font-semibold mb-2">
          Showing {sortedCountries.length} countries
        </div>

        {/* Country list */}
        <Separator />
        <CountryList
          countries={sortedCountries}
          selectedIsoCode={selectedIsoCode}
          hoveredIsoCode={hoveredIsoCode}
          onSelect={onSelect}
          onHover={onHover}
          onCountryInfo={handleCountryInfo}
        />
        <Separator />
      </Panel>

      {/* Collapsed action button */}
      {uiVisible && (
        <CollapsedPanelButton
          onClick={() => setShowCountries(true)}
          visible={!showCountries}
        />
      )}

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
          onHide={closePanel}
        />
      )}
    </div>
  );
}
