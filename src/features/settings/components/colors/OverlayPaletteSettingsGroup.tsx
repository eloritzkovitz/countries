import React from "react";
import { FaBrush } from "react-icons/fa6";
import { CollapsibleHeader, DropdownSelectInput } from "@components";
import { COLOR_PALETTES } from "@constants/colors";
import { useSettings } from "@contexts/SettingsContext";
import type { OverlayModeKey } from "@types";

// Overlay modes you want to support
const OVERLAY_MODES: { key: OverlayModeKey; label: string }[] = [
  { key: "standard", label: "Standard" },
  { key: "cumulative", label: "Timeline (Cumulative)" },
  { key: "yearly", label: "Timeline (Yearly)" },  
];

// Example: use your settings context/hook
function useOverlayPaletteSettings() {
  const { settings, updateSettings } = useSettings();

  const overlayPalettes = settings.overlayPalettes ?? {
    standard: COLOR_PALETTES[0].name,    
    cumulative: COLOR_PALETTES[0].name,
    yearly: COLOR_PALETTES[0].name,
  };

  const setPalette = (mode: OverlayModeKey, paletteName: string) => {
    updateSettings({
      overlayPalettes: {
        ...overlayPalettes,
        [mode]: paletteName,
      },
    });
  };

  return { overlayPalettes, setPalette };
}

// Helper to render a row of color dots for a palette
function PaletteDots({ colors }: { colors: string[] }) {
  return (
    <span style={{ display: "inline-flex", gap: 3, marginRight: 8 }}>
      {colors.map((color, i) => (
        <span
          key={i}
          style={{
            width: 14,
            height: 14,
            background: color,
            borderRadius: "50%",
            border: "none",
            display: "inline-block",
          }}
        />
      ))}
    </span>
  );
}

export function OverlayPaletteSettingsGroup() {
  const [expanded, setExpanded] = React.useState(true);
  const { overlayPalettes, setPalette } = useOverlayPaletteSettings();

  // Prepare options for DropdownSelectInput
  const paletteOptions = COLOR_PALETTES.map((palette) => ({
    label: (
      <span style={{ display: "flex", alignItems: "center" }}>
        <PaletteDots colors={palette.colors} />
        <span>{palette.name}</span>
      </span>
    ),
    value: palette.name,
  }));

  return (
    <>
      <CollapsibleHeader
        icon={<FaBrush />}
        label="Overlay Color Palettes"
        expanded={expanded}
        onToggle={() => setExpanded((v) => !v)}
      />
      {expanded && (
        <div className="mb-4">
          {OVERLAY_MODES.map((mode) => (
            <div key={mode.key} className="mb-4">
              <label className="font-medium block mb-1">
                {mode.label}
              </label>
              <DropdownSelectInput
                options={paletteOptions}
                value={overlayPalettes[mode.key]}
                onChange={(val: string | string[]) =>
                  setPalette(mode.key, Array.isArray(val) ? val[0] : val)
                }
                className="min-w-[180px] select-input bg-gray-100"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
