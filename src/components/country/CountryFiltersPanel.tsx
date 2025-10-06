import { FaTimes, FaUndo } from "react-icons/fa";
import { ActionButton } from "../common/ActionButton";
import { FilterSelect } from "../common/FilterSelect";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
import { filtersConfig } from "../../config/filtersConfig";
import { useCountryData } from "../../context/CountryDataContext";
import { useKeyHandler } from "../../hooks/useKeyHandler";
import type { Overlay } from "../../types/overlay";
import {
  getSubregionsForRegion,
  getAllSovereigntyTypes,
} from "../../utils/countryFilters";
import { Panel } from "../common/Panel";

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

  // Dynamic subregion options based on selected region
  const subregionOptions =
    selectedRegion && selectedRegion !== ""
      ? getSubregionsForRegion(countries, selectedRegion)
      : allSubregions;

  // All sovereignty types from country data
  const sovereigntyOptions = getAllSovereigntyTypes(countries);

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

  // Close panel on Escape key press
  useKeyHandler(() => onHide(), ["Escape"]);

  // Show loading or error states
  if (loading) return <LoadingSpinner message="Loading filters..." />;
  if (error) return <ErrorMessage error={error} />;

  return (
   <Panel
      title="Filters"
      width={400}
      show={show}
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
    >
      {/* Render region and subregion filters from config */}
      {filtersConfig
        .filter((f) => f.key !== "overlay")
        .map((filter) => {
          let value, setValue, options;
          if (filter.key === "region") {
            value = selectedRegion;
            setValue = setSelectedRegion;
            options = filter.getOptions(allRegions);
          } else if (filter.key === "subregion") {
            value = selectedSubregion;
            setValue = setSelectedSubregion;
            options = filter.getOptions(subregionOptions);
          } else if (filter.key === "sovereignty") {
            value = selectedSovereignty;
            setValue = setSelectedSovereignty;
            options = filter.getOptions(sovereigntyOptions);
          }
          return setValue ? (
            <FilterSelect
              key={filter.key}
              label={filter.label}
              value={value ?? ""}
              onChange={setValue}
              options={options ?? []}
            />
          ) : null;
        })}
      {/* Render overlay filters from config */}
      {overlays.map((overlay) => {
        const overlayFilter = filtersConfig.find((f) => f.key === "overlay");
        if (!overlayFilter) return null;
        return (
          <FilterSelect
            key={overlay.id}
            label={overlayFilter.label(overlay)}
            value={overlayFilter.getValue({ overlaySelections }, overlay)}
            onChange={(val) =>
              overlayFilter.setValue({ setOverlaySelections }, val, overlay)
            }
            options={overlayFilter.getOptions()}
          />
        );
      })}
    </Panel>
  );
}
