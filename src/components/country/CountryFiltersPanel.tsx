import { FaTimes, FaUndo } from "react-icons/fa";
import { FilterSelect } from "../common/FilterSelect";
import { LoadingSpinner} from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
import { filtersConfig } from "../../config/filtersConfig";
import { useCountryData } from "../../context/CountryDataContext";
import type { Overlay } from "../../types/overlay";
import { getSubregionsForRegion } from "../../utils/countryFilters";

type CountryFiltersPanelProps = {
  allRegions: string[];
  allSubregions: string[];
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  selectedSubregion: string;
  setSelectedSubregion: (subregion: string) => void;
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

  // Reset filters handler
  function handleResetFilters() {
    setSelectedRegion("");
    setSelectedSubregion("");
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
      {/* Close button */}
      <button
        type="button"
        onClick={onHide}
        className="absolute top-4 right-4 bg-none border-none text-2xl text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
        aria-label="Close filters panel"
      >
        <FaTimes />
      </button>
      <h2 className="mt-0 mb-6 text-lg font-bold">Filters</h2>
      {/* Render region and subregion filters from config */}
      {filtersConfig
        .filter(f => f.key !== "overlay")
        .map(filter => (
          <FilterSelect
            key={filter.key}
            label={filter.label}
            value={filter.getValue({
              selectedRegion,
              selectedSubregion,
            })}
            onChange={val =>
              filter.setValue(
                {
                  setSelectedRegion,
                  setSelectedSubregion,
                },
                val
              )
            }
            options={
              filter.key === "region"
                ? filter.getOptions(allRegions)
                : filter.getOptions(subregionOptions)
            }
          />
        ))}
      {/* Render overlay filters from config */}
      {overlays.map(overlay => {
        const overlayFilter = filtersConfig.find(f => f.key === "overlay");
        if (!overlayFilter) return null;
        return (
          <FilterSelect
            key={overlay.id}
            label={overlayFilter.label(overlay)}
            value={overlayFilter.getValue({ overlaySelections }, overlay)}
            onChange={val =>
              overlayFilter.setValue(
                { setOverlaySelections },
                val,
                overlay
              )
            }
            options={overlayFilter.getOptions()}
          />
        );
      })}
      {/* Reset Filters Button */}
      <button
        type="button"
        onClick={handleResetFilters}
        className="mt-6 py-2 px-6 rounded border-none bg-gray-200 text-gray-700 font-bold cursor-pointer w-full flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors"
      >
        <FaUndo />
        Reset Filters
      </button>
    </div>
  );
}