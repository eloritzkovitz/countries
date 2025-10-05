import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { CountryDetailsModal } from "./CountryDetailsModal";
import { CountryFiltersPanel } from "./CountryFiltersPanel";
import { CountryList } from "./CountryList";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
import { useCountryData } from "../../context/CountryDataContext";
import { useOverlayContext } from "../../context/OverlayContext";
import type { Country } from "../../types/country";
import { filterCountries } from "../../utils/countryFilters";

const PANEL_WIDTH = 400;

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
  const { countries, allRegions, allSubregions, loading, error } = useCountryData();
  const { overlays } = useOverlayContext();

  // Individual overlay filter selections: { [overlayId]: "all" | "only" | "exclude" }
  const [overlaySelections, setOverlaySelections] = useState<Record<string, string>>({});

  // UI state
  const [modalCountry, setModalCountry] = useState<Country | null>(null);
  const [filtersPanelOpen, setFiltersPanelOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedSubregion, setSelectedSubregion] = useState<string>("");
  const [selectedSovereignty, setSelectedSovereignty] = useState<string>("");

  // Apply overlay filters to get filtered isoCodes
  let filteredIsoCodes = countries.map(c => c.isoCode);

  overlays.forEach(overlay => {
    const selection = overlaySelections[overlay.id] || "all";
    if (selection === "only") {
      filteredIsoCodes = filteredIsoCodes.filter(iso => overlay.countries.includes(iso));
    } else if (selection === "exclude") {
      filteredIsoCodes = filteredIsoCodes.filter(iso => !overlay.countries.includes(iso));
    }
    // "all" does not filter
  });

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
    setModalCountry(country);
    if (onCountryInfo) onCountryInfo(country);
  };

  // Show loading or error states
  if (loading) return <LoadingSpinner message="Loading countries..." />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div
      className="fixed top-0 right-0 h-screen flex flex-row z-40"
    >
      {/* Filters panel */}
      <div
        className={`relative h-screen bg-white transition-all duration-300 flex flex-col shadow-lg border-l border-gray-200 ${
          filtersPanelOpen ? "w-[400px]" : "w-0"
        }`}
        style={{ zIndex: 100, minWidth: filtersPanelOpen ? PANEL_WIDTH : 0 }}
      >
        {filtersPanelOpen && (
          <CountryFiltersPanel
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
      {/* Country sidebar panel */}
      <div
        className="h-screen bg-white shadow-lg flex flex-col border-l border-gray-200"
        style={{ width: PANEL_WIDTH, minWidth: PANEL_WIDTH, zIndex: 40 }}
      >
        {/* Inner container for padding and header */}
        <div className="px-4 pt-8 pb-0 flex-shrink-0">
          <div className="flex justify-between items-center">
            <h2 className="text-center m-0 mb-4 text-lg font-bold">Country List</h2>
          </div>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Search countries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-3 py-2 rounded border border-gray-300 text-base"
            />
            <button
              onClick={() => setFiltersPanelOpen((open) => !open)}
              className="px-4 py-2 rounded bg-blue-600 text-white font-bold flex items-center gap-2 z-101 hover:bg-blue-700 transition-colors"
              aria-label={filtersPanelOpen ? "Hide Filters" : "Show Filters"}
              type="button"
            >
              <FaFilter />
              Filters
            </button>
          </div>
          <div className="my-2 font-bold text-center flex-shrink-0">
            Showing {filteredCountries.length} countries from {countries.length}
          </div>
        </div>
        {/* Country list */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-8">
          <CountryList
            countries={filteredCountries}
            selectedIsoCode={selectedIsoCode}
            hoveredIsoCode={hoveredIsoCode}
            onSelect={onSelect}
            onHover={onHover}
            onCountryInfo={handleCountryInfo}
          />
          {modalCountry && (
            <CountryDetailsModal
              country={modalCountry}
              isOpen={!!modalCountry}
              onClose={() => setModalCountry(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}