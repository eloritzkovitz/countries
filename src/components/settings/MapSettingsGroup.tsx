import React from "react";
import { FaGlobe } from "react-icons/fa";
import { CollapsibleHeader } from "../common/CollapsibleHeader";
import { FilterSelect } from "../common/FilterSelect";
import {
  MAP_PROJECTION_OPTIONS,
  MAP_STROKE_COLOR_OPTIONS,
} from "../../config/constants";
import { useMapUI } from "../../context/MapUIContext";

export function MapSettingsGroup() {
  const [showMapSettings, setShowMapSettings] = React.useState(true);
  const {
    projection,
    setProjection,    
    borderColor,
    setBorderColor,
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
          <FilterSelect
            label="Map Projection"
            value={projection}
            onChange={setProjection}
            options={MAP_PROJECTION_OPTIONS}
          />
          <FilterSelect
            label="Border Color"
            value={borderColor}
            onChange={setBorderColor}
            options={MAP_STROKE_COLOR_OPTIONS}
          />          
        </div>
      )}
    </>
  );
}
