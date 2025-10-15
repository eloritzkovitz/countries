import React from "react";
import { FaLayerGroup } from "react-icons/fa";
import { CollapsibleHeader } from "../common/CollapsibleHeader";
import { FilterSelect } from "../common/FilterSelect";
import type { Overlay } from "../../types/overlay";
import { overlayFilterConfig } from "../../config/filtersConfig";

type OverlayFiltersProps = {
  expanded: boolean;
  onToggle: () => void;
  overlays: Overlay[];
  overlaySelections: Record<string, string>;
  setOverlaySelections: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
};

export function OverlayFilters({
  expanded,
  onToggle,
  overlays,
  overlaySelections,
  setOverlaySelections,
}: OverlayFiltersProps) {
  return (
    <>
      <CollapsibleHeader
        icon={<FaLayerGroup style={{ marginRight: 6 }} />}
        label="Overlay Filters"
        expanded={expanded}
        onToggle={onToggle}
      />
      {expanded &&
        overlays.map((overlay) => (
          <FilterSelect
            key={overlay.id}
            label={
              typeof overlayFilterConfig.label === "function"
                ? overlayFilterConfig.label(overlay)
                : overlayFilterConfig.label
            }
            value={overlayFilterConfig.getValue({ overlaySelections }, overlay)}
            onChange={(val) =>
              overlayFilterConfig.setValue(
                { setOverlaySelections },
                val,
                overlay
              )
            }
            options={overlayFilterConfig.getOptions()}
          />
        ))}
    </>
  );
}
