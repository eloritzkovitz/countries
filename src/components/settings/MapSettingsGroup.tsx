import React from "react";
import { FaGlobe } from "react-icons/fa";
import { CollapsibleHeader } from "../common/CollapsibleHeader";
import { SelectInput } from "../common/SelectInput";
import {
  MAP_PROJECTION_OPTIONS,
  MAP_STROKE_COLOR_OPTIONS,
  MAP_STROKE_WIDTH_OPTIONS,
} from "../../config/constants";
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
        label="Map Settings"
        expanded={showMapSettings}
        onToggle={() => setShowMapSettings((v) => !v)}
      />
      {showMapSettings && (
        <div>
          <SelectInput
            label="Map Projection"
            value={projection}
            onChange={v => setProjection(String(v))}
            options={MAP_PROJECTION_OPTIONS}
          />
          <SelectInput
            label="Border Color"
            value={borderColor}
            onChange={v => setBorderColor(String(v))}
            options={MAP_STROKE_COLOR_OPTIONS}
          />          
          <SelectInput
            label="Border Width"
            value={borderWidth}
            onChange={v => setBorderWidth(Number(v))}
            options={MAP_STROKE_WIDTH_OPTIONS}
          />
        </div>
      )}
    </>
  );
}
