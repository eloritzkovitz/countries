import { FaTimes, FaUndo } from "react-icons/fa";
import { FilterSelect } from "../common/FilterSelect";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
import { filtersConfig } from "../../config/filtersConfig";
import { useCountryData } from "../../context/CountryDataContext";
import type { Overlay } from "../../types/overlay";
import {
  getSubregionsForRegion,
  getAllSovereigntyTypes,
} from "../../utils/countryFilters";

type CountryFiltersPanelProps = {
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

  const subregionOptions =
    selectedRegion && selectedRegion !== ""
      ? getSubregionsForRegion(countries, selectedRegion)
      : allSubregions;

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

  // Show loading or error states
  if (loading) return <LoadingSpinner message="Loading filters..." />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="relative w-full p-8 pt-8 pb-6 box-border">
      {/* Header with title, reset button, and close button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="mt-0 text-lg font-bold">Filters</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetFilters}
            className="py-1 px-2 rounded border-none bg-gray-200 text-gray-700 font-bold cursor-pointer flex items-center gap-2 hover:bg-gray-300 transition-colors"
            aria-label="Reset Filters"
            title="Reset Filters"
          >
            <FaUndo />
          </button>
          <button
            type="button"
            onClick={onHide}
            className="py-1 px-2 rounded border-none bg-gray-200 text-blue-600 font-bold cursor-pointer flex items-center gap-2 hover:bg-gray-300 transition-colors text-2xl"
            aria-label="Close filters panel"
            title="Close"
          >
            <FaTimes />
          </button>
        </div>
      </div>
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
    </div>
  );
}
