import { useTheme } from "../context/ThemeContext";

// Color constants for map elements
export const MAP_FILL_COLORS = {
  default: "#b5bfca",
  hovered: "#0078d4",
  selected: "#005fa3",
};

/**
 * Get the stroke color for map elements based on the current theme.
 * @returns The stroke color for map elements based on the current theme.
 */
export function useMapStrokeColor() {
  const { theme } = useTheme();
  return theme === "dark" ? "#222" : "#fff";
}

/**
 * Get the style for a geography element based on its state.
 * @param isHovered - Whether the element is hovered.
 * @param isSelected - Whether the element is selected.
 * @param strokeColor - The stroke color for the element.
 * @returns The style for the geography element.
 */
export function getGeographyStyle({
  isHovered,
  isSelected,
  strokeColor,
  fillColor,
}: {
  isHovered?: boolean;
  isSelected?: boolean;
  strokeColor: string;
  fillColor?: string;
}) {
  const fill =
    fillColor ??
    (isHovered
      ? MAP_FILL_COLORS.hovered
      : isSelected
      ? MAP_FILL_COLORS.selected
      : MAP_FILL_COLORS.default);

  return {
    default: {
      fill,
      stroke: strokeColor,
      strokeWidth: 0.25,
      outline: "none",
      cursor: "pointer",
    },
    hover: {
      fill,
      stroke: strokeColor,
      strokeWidth: 0.25,
      outline: "none",
      cursor: "pointer",
    },
    pressed: {
      fill,
      stroke: strokeColor,
      strokeWidth: 0.25,
      outline: "none",
      cursor: "pointer",
    },
  };
}