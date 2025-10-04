import { FaUndo } from "react-icons/fa";
import { FilterSelect } from "./FilterSelect";
import { filtersConfig } from "../config/filtersConfig";
import { useCountryData } from "../context/CountryDataContext";
import type { Overlay } from "../types/overlay";
import { getSubregionsForRegion } from "../utils/countryFilters";

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
}: CountryFiltersPanelProps) {
  const { countries } = useCountryData();

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

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        padding: "2rem 1.5rem 1.5rem 1.5rem",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: "1.5rem" }}>Filters</h2>
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
        style={{
          marginTop: "1.5rem",
          padding: "0.5rem 1.5rem",
          borderRadius: 6,
          border: "none",
          background: "#eee",
          color: "#333",
          fontWeight: "bold",
          cursor: "pointer",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <FaUndo />
        Reset Filters
      </button>
    </div>
  );
}