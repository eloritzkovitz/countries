import { useState } from "react";
import { FaFilter, FaMoon, FaSun, FaTimes, FaBars } from "react-icons/fa";
import { CountryDetailsModal } from "./CountryDetailsModal";
import { CountryFiltersPanel } from "./CountryFiltersPanel";
import { CountryList } from "./CountryList";
import { ActionButton } from "../common/ActionButton";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
import { Panel } from "../common/Panel";
import { SearchInput } from "../common/SearchInput";
import { useCountryData } from "../../context/CountryDataContext";
import { useOverlayContext } from "../../context/OverlayContext";
import { useTheme } from "../../context/ThemeContext";
import type { Country } from "../../types/country";
import {
  filterCountries,
  getFilteredIsoCodes,
} from "../../utils/countryFilters";

export function CountrySidebarPanel({
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
  const { theme, toggleTheme } = useTheme();
  const [filtersPanelOpen, setFiltersPanelOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedSubregion, setSelectedSubregion] = useState<string>("");
  const [selectedSovereignty, setSelectedSovereignty] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

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
    setSelectedCountry(country);
    if (onCountryInfo) onCountryInfo(country);
  };

  // Hide filters panel when sidebar is closed
  const handleHideSidebar = () => {
    setSidebarOpen(false);
    setFiltersPanelOpen(false);
  };

  // Show loading or error states
  if (loading) return <LoadingSpinner message="Loading countries..." />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="fixed top-0 left-0 h-screen flex flex-row z-40">
      {/* Sidebar open/close logic */}
      {sidebarOpen ? (
        <Panel
          title="Country List"
          show={sidebarOpen}
          headerActions={
            <>
              <ActionButton
                onClick={() => setFiltersPanelOpen((open) => !open)}
                ariaLabel={filtersPanelOpen ? "Hide Filters" : "Show Filters"}
                title="Filters"
                className="ml-2"
                icon={<FaFilter />}
              />
              <ActionButton
                onClick={toggleTheme}
                ariaLabel="Toggle theme"
                title="Toggle theme"
                className="ml-2"
                icon={theme === "dark" ? <FaSun /> : <FaMoon />}
              />
              <ActionButton
                onClick={handleHideSidebar}
                ariaLabel="Hide sidebar"
                title="Hide sidebar"
                className="ml-2"
                icon={<FaTimes />}
              />
            </>
          }
        >
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search countries..."
            className="flex-1"
          />
          <div className="my-2 font-bold text-center flex-shrink-0">
            Showing {filteredCountries.length} countries from {countries.length}
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

          {/* Country details modal */}
          {selectedCountry && (
            <CountryDetailsModal
              country={selectedCountry}
              isOpen={!!selectedCountry}
              onClose={() => setSelectedCountry(null)}
            />
          )}
        </Panel>
      ) : (
        <ActionButton
          onClick={() => setSidebarOpen(true)}
          ariaLabel="Show sidebar"
          title="Show sidebar"
          colorClass="bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:active:bg-gray-600"
          className="absolute left-4 top-4 w-12 h-12 flex items-center justify-center shadow-lg p-0 rounded-full border-none"
          icon={<FaBars size={24} />}
        />
      )}

      {/* Filters panel */}
      {sidebarOpen && filtersPanelOpen && (
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
