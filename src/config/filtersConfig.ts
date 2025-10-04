import type { FilterConfig } from "../types/filters";
import type { Overlay } from "../types/overlay";

export const filtersConfig: FilterConfig[] = [
  {
    key: "region",
    label: "Continent/Region",
    type: "select",
    getOptions: (allRegions: string[]) => [
      { value: "", label: "All" },
      ...allRegions.map((r) => ({ value: r, label: r })),
    ],
    getValue: (props) => props.selectedRegion,
    setValue: (props, val) => props.setSelectedRegion(val),
  },
  {
    key: "subregion",
    label: "Subregion",
    type: "select",
    getOptions: (subregionOptions: string[]) => [
      { value: "", label: "All" },
      ...subregionOptions.map((r) => ({ value: r, label: r })),
    ],
    getValue: (props) => props.selectedSubregion,
    setValue: (props, val) => props.setSelectedSubregion(val),
  },
  {
    key: "overlay",
    label: (overlay: Overlay) => `${overlay.name} (${overlay.countries.length})`,
    type: "select",
    getOptions: () => [
      { value: "all", label: "All" },
      { value: "only", label: "Include only" },
      { value: "exclude", label: "Exclude" },
    ],
    getValue: (props, overlay: Overlay) => props.overlaySelections[overlay.id] || "all",
    setValue: (props, val, overlay: Overlay) =>
      props.setOverlaySelections((sel: Record<string, string>) => ({
        ...sel,
        [overlay.id]: val,
      })),
  },
];