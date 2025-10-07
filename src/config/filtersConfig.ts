import type { SovereigntyType } from "../types/country";
import type { FilterConfig, FilterOption } from "../types/filters";
import type { Overlay } from "../types/overlay";

const SOVEREIGNTY_ORDER: SovereigntyType[] = [
  "Sovereign",
  "Dependency",
  "Partially Recognized",
  "Disputed",
];

const allOption: FilterOption = { value: "", label: "All" };

function mapOptions(options: string[]): FilterOption[] {
  return options.map((r) => ({ value: r, label: r }));
}

export const filtersConfig: FilterConfig[] = [
  {
    key: "region",
    label: "Continent/Region",
    type: "select",
    getOptions: (allRegions: string[]) => [
      allOption,
      ...mapOptions(allRegions),
    ],
    getValue: (props) => props.selectedRegion,
    setValue: (props, val) => props.setSelectedRegion(val),
  },
  {
    key: "subregion",
    label: "Subregion",
    type: "select",
    getOptions: (subregionOptions: string[]) => [
      allOption,
      ...mapOptions(subregionOptions),
    ],
    getValue: (props) => props.selectedSubregion,
    setValue: (props, val) => props.setSelectedSubregion(val),
  },
  {
    key: "sovereignty",
    label: "Sovereignty",
    type: "select",
    getOptions: (sovereigntyOptions: SovereigntyType[]) => [
      allOption,
      ...SOVEREIGNTY_ORDER.filter((type) =>
        sovereigntyOptions.includes(type)
      ).map((type) => ({
        value: type,
        label: type.charAt(0).toUpperCase() + type.slice(1),
      })),
    ],
    getValue: (props) => props.selectedSovereignty,
    setValue: (props, val) => props.setSelectedSovereignty(val),
  },
  {
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
  },
];
