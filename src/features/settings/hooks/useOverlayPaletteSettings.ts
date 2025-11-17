import { useSettings } from "@contexts/SettingsContext";
import { COLOR_PALETTES } from "@constants/colors";
import type { OverlayModeKey } from "@types";

export function useOverlayPaletteSettings() {
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
