import { useSettings } from "@contexts/SettingsContext";
import { COLOR_PALETTES } from "@constants/colors";
import { getVisitColorRolesFromPalette } from "@features/visits";
import type { VisitColorMode, VisitColorRoles } from "@types";

export function useVisitColorRoles(mode: VisitColorMode): VisitColorRoles {
  const { settings } = useSettings();
  const paletteName =
    settings.overlayPalettes?.[mode] || COLOR_PALETTES[0].name;
  const palette =
    COLOR_PALETTES.find((p) => p.name === paletteName) || COLOR_PALETTES[0];
  return getVisitColorRolesFromPalette(palette);
}
