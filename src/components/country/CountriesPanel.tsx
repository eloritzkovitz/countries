import { useState } from "react";
import { FaFilter, FaTimes, FaBars } from "react-icons/fa";
import { CountryList } from "./CountryList";
import { ActionButton } from "../common/ActionButton";
import { Branding } from "../common/Branding";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
import { Panel } from "../common/Panel";
import { SearchInput } from "../common/SearchInput";
import { Separator } from "../common/Separator";
import { useCountryData } from "../../context/CountryDataContext";
import { useOverlayContext } from "../../context/OverlayContext";
import { CountryFiltersPanel } from "../filters/CountryFiltersPanel";
import type { Country } from "../../types/country";
import {
  filterCountries,
  getFilteredIsoCodes,
} from "../../utils/countryFilters";

export function CountriesPanel({
  selectedIsoCode,
  hoveredIsoCode,
  onSelect,
  onHover,
  onCountryInfo,
}: {
  selectedIsoCode: string | null;
  hoveredIsoCode: string | null;
  onSelect: (iso: string | null) => void;
  onHover: (iso: string | null) => void;
  onCountryInfo?: (country: Country) => void;
}) {
  const { countries, allRegions, allSubregions, loading, error } =
    useCountryData();
  const { overlays } = useOverlayContext();

  // Individual overlay filter selections: { [overlayId]: "all" | "only" | "exclude" }
  const [overlaySelections, setOverlaySelections] = useState<
    Record<string, string>
  >({});

  // UI state
  const [countriesPanelOpen, setCountriesPanelOpen] = useState(true);
  const [filtersPanelOpen, setFiltersPanelOpen] = useState(false);  
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedSubregion, setSelectedSubregion] = useState<string>("");
  const [selectedSovereignty, setSelectedSovereignty] = useState<string>("");

  // Apply overlay filters to get filtered isoCodes
  let filteredIsoCodes = getFilteredIsoCodes(
    countries,
    overlays,
    overlaySelections
  );

  // Filtering countries based on current filters and search
  const filteredCountries = filterCountries(countries, {
    search,
    selectedRegion,
    selectedSubregion,
    selectedSovereignty: selectedSovereignty,
    overlayCountries: filteredIsoCodes,
  });

  // Handler for showing modal
  const handleCountryInfo = (country: Country) => {
    if (onCountryInfo) onCountryInfo(country);
  };

  // Hide filters panel when countries panel is closed
  const handleHideCountriesPanel = () => {
    setCountriesPanelOpen(false);
    setFiltersPanelOpen(false);
  };

  // Show loading or error states
  if (loading) return <LoadingSpinner message="Loading countries..." />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="fixed top-0 left-0 h-screen flex flex-row z-40 group">
      {/* Sidebar open/close logic */}
      {countriesPanelOpen ? (
        <Panel
          title={<Branding title="Countries" />}
          show={countriesPanelOpen}
          showSeparator={false}
          headerActions={
            <>
              <ActionButton
                onClick={() => setFiltersPanelOpen((open) => !open)}
                ariaLabel={filtersPanelOpen ? "Hide Filters" : "Show Filters"}
                title="Filters"
                icon={<FaFilter />}
              />
              <ActionButton
                onClick={handleHideCountriesPanel}
                ariaLabel="Hide countries panel"
                title="Hide"
                icon={<FaTimes />}
              />
            </>
          }
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
              Showing {filteredCountries.length} countries from{" "}
              {countries.length}
            </div>
            <Separator/>
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
      ) : (
        <ActionButton
          onClick={() => setCountriesPanelOpen(true)}
          ariaLabel="Show countries panel"
          title="Show countries panel"
          colorClass="bg-blue-800 text-white hover:bg-blue-900 active:bg-blue-800 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:active:bg-gray-600"
          className="absolute left-4 top-4 w-12 h-12 flex items-center justify-center shadow-lg p-0 rounded-full border-none"
          icon={<FaBars size={24} />}
        />
      )}

      {/* Filters panel */}
      {countriesPanelOpen && filtersPanelOpen && (
        <CountryFiltersPanel
          show={filtersPanelOpen}
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
          onHide={() => setFiltersPanelOpen(false)}
        />
      )}
    </div>
  );
}
