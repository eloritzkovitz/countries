import React from "react";
import { FaFilter, FaTimes, FaUndo } from "react-icons/fa";
import {
  ActionButton,
  ErrorMessage,
  LoadingSpinner,
  Panel,
  Separator,
} from "@components";
import { DEFAULT_PANEL_WIDTH } from "@config/constants";
import { coreFiltersConfig } from "@config/filtersConfig";
import { useCountryData } from "@contexts/CountryDataContext";
import {
  getSubregionsForRegion,
  getAllSovereigntyTypes,
} from "@features/countries";
import { useKeyHandler } from "@hooks";
import type { Overlay } from "@types";
import { CoreFilters } from "./CoreFilters";
import { OverlayFilters } from "./OverlayFilters";

type CountryFiltersPanelProps = {
  show: boolean;
  allRegions: string[];
  allSubregions: string[];
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  selectedSubregion: string;
  setSelectedSubregion: (subregion: string) => void;
  selectedSovereignty: string;
  setSelectedSovereignty: (type: string) => void;
  overlays: Overlay[];
  overlaySelections: Record<string, string>;
  setOverlaySelections: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  onHide: () => void;
};

export function CountryFiltersPanel({
  show,
  allRegions,
  allSubregions,
  selectedRegion,
  setSelectedRegion,
  selectedSubregion,
  setSelectedSubregion,
  selectedSovereignty,
  setSelectedSovereignty,
  overlays,
  overlaySelections,
  setOverlaySelections,
  onHide,
}: CountryFiltersPanelProps) {
  const { countries, loading, error } = useCountryData();

  // Collapsible state for filter groups
  const [showCoreFilters, setShowCoreFilters] = React.useState(true);
  const [showOverlayFilters, setShowOverlayFilters] = React.useState(true);

  // Dynamic subregion options based on selected region
  const subregionOptions =
    selectedRegion && selectedRegion !== ""
      ? getSubregionsForRegion(countries, selectedRegion)
      : allSubregions;

  // All sovereignty types from country data
  const sovereigntyOptions = getAllSovereigntyTypes(countries);

  // Reset subregion when region changes
  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    setSelectedSubregion("");
  };

  // Reset filters handler
  function handleResetFilters() {
    setSelectedRegion("");
    setSelectedSubregion("");
    setSelectedSovereignty("");
    setOverlaySelections(
      overlays.reduce((acc, overlay) => {
        acc[overlay.id] = "all";
        return acc;
      }, {} as Record<string, string>)
    );
  }

  // Key handler for resetting filters with "R" key
  useKeyHandler(
    (e) => {
      e.preventDefault();
      handleResetFilters();
    },
    ["r", "R"],
    show
  );

  // Show loading or error states
  if (loading) return <LoadingSpinner message="Loading filters..." />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <Panel
      title={
        <>
          <FaFilter />
          Filters
        </>
      }
      width={DEFAULT_PANEL_WIDTH}
      show={show}
      onHide={onHide}
      headerActions={
        <>
          <ActionButton
            onClick={handleResetFilters}
            ariaLabel="Reset all filters"
            title="Reset filters"
          >
            <FaUndo />
          </ActionButton>
          <ActionButton
            onClick={onHide}
            ariaLabel="Close filters panel"
            title="Close"
          >
            <FaTimes />
          </ActionButton>
        </>
      }
      style={{
        left: DEFAULT_PANEL_WIDTH,
        zIndex: 39,
      }}
    >
      {/* Core Filters Section */}
      <CoreFilters
        expanded={showCoreFilters}
        onToggle={() => setShowCoreFilters((v) => !v)}
        coreFiltersConfig={coreFiltersConfig}
        selectedRegion={selectedRegion}
        handleRegionChange={handleRegionChange}
        selectedSubregion={selectedSubregion}
        setSelectedSubregion={setSelectedSubregion}
        selectedSovereignty={selectedSovereignty}
        setSelectedSovereignty={setSelectedSovereignty}
        allRegions={allRegions}
        subregionOptions={subregionOptions}
        sovereigntyOptions={sovereigntyOptions}
      />

      <Separator className="my-4" />

      {/* Overlay Filters Section */}
      <OverlayFilters
        expanded={showOverlayFilters}
        onToggle={() => setShowOverlayFilters((v) => !v)}
        overlays={overlays}
        overlaySelections={overlaySelections}
        setOverlaySelections={setOverlaySelections}
      />
    </Panel>
  );
}
