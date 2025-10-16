import { useCallback, useEffect, useMemo, useRef } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import { CollapsedPanelButton } from "./CollapsedPanelButton";
import { CountryList } from "./CountryList";
import { ActionButton } from "../common/ActionButton";
import { Branding } from "../common/Branding";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
import { Panel } from "../common/Panel";
import { SearchInput } from "../common/SearchInput";
import { Separator } from "../common/Separator";
import { CountryFiltersPanel } from "../filters/CountryFiltersPanel";
import { useCountryData } from "../../context/CountryDataContext";
import { useOverlayContext } from "../../context/OverlayContext";
import { useUI } from "../../context/UIContext";
import { useCountryFilters } from "../../hooks/useCountryFilters";
import type { Country } from "../../types/country";

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

  // Search input ref
  const searchRef = useRef<HTMLInputElement | null>(null);

  // Close panels when UI is hidden, focus search when opened
  useEffect(() => {
    if (!uiVisible) closePanel();
    if (uiVisible && showCountries) {
      setTimeout(() => searchRef.current?.focus(), 120);
    }
  }, [uiVisible, showCountries]);

  // Handle country info action
  const handleCountryInfo = useCallback(
    (country: Country) => {
      if (onCountryInfo) onCountryInfo(country);
    },
    [onCountryInfo]
  );  

  // Hide panel handler
  const hidePanel = useCallback(() => {
    closePanel();
  }, [closePanel]);

  // Header action buttons
  const headerActions = useMemo(
    () => (
      <>
        <ActionButton
          onClick={toggleFilters}
          ariaLabel={showFilters ? "Hide Filters" : "Show Filters"}
          title="Filters"
          icon={<FaFilter />}
        />
        <ActionButton
          onClick={hidePanel}
          ariaLabel="Hide countries panel"
          title="Hide"
          icon={<FaTimes />}
        />
      </>
    ),
    [showFilters, toggleFilters, hidePanel]
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
        headerActions={headerActions}
      >
        {/* Search input and count */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search countries..."
            className="flex-1"
          />
          <div className="my-2 font-bold text-center flex-shrink-0">
            Showing {filteredCountries.length} countries from {countries.length}
          </div>
          <Separator />
        </div>

        {/* Country list */}
        <CountryList
          countries={filteredCountries}
          selectedIsoCode={selectedIsoCode}
          hoveredIsoCode={hoveredIsoCode}
          onSelect={onSelect}
          onHover={onHover}
          onCountryInfo={handleCountryInfo}
        />
      </Panel>

      {/* Collapsed action button */}
      {uiVisible && !showCountries && (
        <CollapsedPanelButton onClick={() => setShowCountries(true)} />
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
