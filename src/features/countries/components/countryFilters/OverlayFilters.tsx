import React from "react";
import { FaLayerGroup } from "react-icons/fa";
import { CollapsibleHeader, SelectInput } from "@components";
import { overlayFilterConfig } from "@features/countries/config/filtersConfig";
import type { Overlay } from "@types";

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
          <SelectInput
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
                String(val),
                overlay
              )
            }
            options={overlayFilterConfig.getOptions()}
          />
        ))}
    </>
  );
}
