import { createSelectFilter, mapOptions } from "../features/countries/utils/countryFilters";
import type { SovereigntyType } from "../types/country";
import type { FilterConfig, FilterOption } from "../types/filters";
import type { Overlay } from "../types/overlay";

// Predefined sovereignty order for consistent dropdown ordering
const SOVEREIGNTY_ORDER: SovereigntyType[] = [
  "Sovereign",
  "Dependency",
  "Overseas Region",
  "Disputed",
  "Unrecognized",  
];

// "All" option constant
const allOption: FilterOption = { value: "", label: "All" };

// Core filters configuration array
export const coreFiltersConfig: FilterConfig[] = [
  createSelectFilter(
    "region",
    "Region",
    (allRegions) => [allOption, ...mapOptions(allRegions ?? [])],
    (props) => props.selectedRegion,
    (props, val) => props.setSelectedRegion(val)
  ),
  createSelectFilter(
    "subregion",
    "Subregion",
    (subregionOptions) => [allOption, ...mapOptions(subregionOptions ?? [])],
    (props) => props.selectedSubregion,
    (props, val) => props.setSelectedSubregion(val)
  ),
  createSelectFilter(
    "sovereignty",
    "Sovereignty",
    (options) => [
      allOption,
      ...SOVEREIGNTY_ORDER.filter((type) =>
        (options as SovereigntyType[] | undefined)?.includes(type)
      ).map((type) => ({
        value: type,
        label: type.charAt(0).toUpperCase() + type.slice(1),
      })),
    ],
    (props) => props.selectedSovereignty,
    (props, val) => props.setSelectedSovereignty(val)
  ),
];

// Overlay filter configuration object
export const overlayFilterConfig: FilterConfig = {
  key: "overlay",
  label: (overlay: Overlay) =>
    `${overlay.name} (${overlay.countries.length})`,
  type: "select",
  getOptions: () => [
    { value: "all", label: "All" },
    { value: "only", label: "Include only" },
    { value: "exclude", label: "Exclude" },
  ],
  getValue: (props, overlay: Overlay) =>
    props.overlaySelections[overlay.id] || "all",
  setValue: (props, val, overlay: Overlay) =>
    props.setOverlaySelections((sel: Record<string, string>) => ({
      ...sel,
      [overlay.id]: val,
    })),
};
