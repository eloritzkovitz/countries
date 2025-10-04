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
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        zIndex: 40,
      }}
    >
      {/* Filters panel slides in from the right, sits to the left of country list */}
      <div
        style={{
          position: "relative",
          width: filtersPanelOpen ? PANEL_WIDTH : 0,
          height: "100vh",
          background: "#fff",
          boxShadow: filtersPanelOpen ? "0 2px 12px rgba(0,0,0,0.07)" : "none",
          transition: "width 0.3s cubic-bezier(.4,0,.2,1)",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {filtersPanelOpen && (
          <CountryFiltersPanel
            allRegions={allRegions}
            allSubregions={allSubregions}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            selectedSubregion={selectedSubregion}
            setSelectedSubregion={setSelectedSubregion}
            overlays={overlays}
            overlaySelections={overlaySelections}
            setOverlaySelections={setOverlaySelections}
            onHide={() => setFiltersPanelOpen(false)}
          />
        )}
      </div>
      {/* Country sidebar panel on the right */}
      <div
        style={{
          width: PANEL_WIDTH,
          height: "100vh",
          background: "#fff",
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
          display: "flex",
          flexDirection: "column",
          zIndex: 40,
        }}
      >
        {/* Inner container for padding and header */}
        <div style={{ padding: "2rem 1rem 0 1rem", flexShrink: 0 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2
              style={{ textAlign: "center", margin: 0, marginBottom: "1rem" }}
            >
              Country List
            </h2>
          </div>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <input
              type="text"
              placeholder="Search countries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                padding: "0.5rem",
                borderRadius: 6,
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
            {/* Filters button toggles filters panel */}
            <button
              onClick={() => setFiltersPanelOpen((open) => !open)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                border: "none",
                background: "#0078d4",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                zIndex: 101,
              }}
              aria-label={filtersPanelOpen ? "Hide Filters" : "Show Filters"}
              type="button"
            >
              <FaFilter />
              Filters
            </button>
          </div>
          <div
            style={{
              margin: "0.5rem 0 1rem 0",
              fontWeight: "bold",
              textAlign: "center",
              flexShrink: 0,
            }}
          >
            Showing {filteredCountries.length} countries from {countries.length}
          </div>
        </div>
        {/* Country list */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            padding: "0 1rem 2rem 1rem",
          }}
        >
          <CountryList
            countries={filteredCountries}
            selectedIsoCode={selectedIsoCode}
            hoveredIsoCode={hoveredIsoCode}
            onSelect={onSelect}
            onHover={onHover}
            onCountryInfo={handleCountryInfo}
          />
          {/* Country details modal */}
          {modalCountry && (
            <CountryDetailsModal
              country={modalCountry}
              onClose={() => setModalCountry(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}