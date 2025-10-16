import React from "react";
import { FaGlobe } from "react-icons/fa";
import { CollapsibleHeader } from "../common/CollapsibleHeader";
import { SelectInput } from "../common/SelectInput";
import { MAP_OPTIONS } from "../../config/constants";
import { useMapUI } from "../../context/MapUIContext";

export function MapSettingsGroup() {
  const [showMapSettings, setShowMapSettings] = React.useState(true);
  const {
    projection,
    setProjection,
    borderColor,
    setBorderColor,
    borderWidth,
    setBorderWidth,
  } = useMapUI();

  return (
    <>
      <CollapsibleHeader
        icon={<FaGlobe style={{ marginRight: 6 }} />}
        label="Map"
        expanded={showMapSettings}
        onToggle={() => setShowMapSettings((v) => !v)}
      />
      {showMapSettings && (
        <div>
          <SelectInput
            label="Map Projection"
            value={projection}
            onChange={(v) => setProjection(String(v))}
            options={MAP_OPTIONS.projection}
          />
          <SelectInput
            label="Border Color"
            value={borderColor}
            onChange={(v) => setBorderColor(String(v))}
            options={MAP_OPTIONS.strokeColor}
          />
          <SelectInput
            label="Border Width"
            value={borderWidth}
            onChange={(v) => setBorderWidth(Number(v))}
            options={MAP_OPTIONS.strokeWidth}
          />
        </div>
      )}
    </>
  );
}
