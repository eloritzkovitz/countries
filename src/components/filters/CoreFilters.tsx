import { FaShapes } from "react-icons/fa";
import { CollapsibleHeader } from "../common/CollapsibleHeader";
import { FilterSelect } from "../common/FilterSelect";
import type { FilterConfig } from "../../types/filters";

type CoreFiltersProps = {
  expanded: boolean;
  onToggle: () => void;
  coreFiltersConfig: FilterConfig[];
  selectedRegion: string;
  handleRegionChange: (region: string) => void;
  selectedSubregion: string;
  setSelectedSubregion: (subregion: string) => void;
  selectedSovereignty: string;
  setSelectedSovereignty: (type: string) => void;
  allRegions: string[];
  subregionOptions: string[];
  sovereigntyOptions: string[];
};

export function CoreFilters({
  expanded,
  onToggle,
  coreFiltersConfig,
  selectedRegion,
  handleRegionChange,
  selectedSubregion,
  setSelectedSubregion,
  selectedSovereignty,
  setSelectedSovereignty,
  allRegions,
  subregionOptions,
  sovereigntyOptions,
}: CoreFiltersProps) {
  return (
    <>
      <CollapsibleHeader
        icon={<FaShapes style={{ marginRight: 6 }} />}
        label="Core Filters"
        expanded={expanded}
        onToggle={onToggle}
      />
      {expanded &&
        coreFiltersConfig.map((filter) => {
          let value, setValue, options;
          if (filter.key === "region") {
            value = selectedRegion;
            setValue = handleRegionChange;
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
              label={
                typeof filter.label === "function"
                  ? filter.label(value)
                  : filter.label
              }
              value={value ?? ""}
              onChange={setValue}
              options={options ?? []}
            />
          ) : null;
        })}
    </>
  );
}
