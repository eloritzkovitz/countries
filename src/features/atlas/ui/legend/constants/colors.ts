// Visit & timeline color scale
export const HOME_COUNTRY_COLOR = "#ecb365";
export const VISIT_COLORS = [
  "#abdfff",
  "#5ccdff",
  "#0091e4",
  "#0048a7",
  "#00224f",
];

// Determine color based on visit count and if it's the home country
export function getVisitColor(
  count: number,
  isHome: boolean,
  defaultFill: string
) {
  if (isHome) return HOME_COUNTRY_COLOR;
  if (count === 0) return defaultFill;
  if (count === 1) return VISIT_COLORS[0];
  if (count === 2) return VISIT_COLORS[1];
  if (count === 3) return VISIT_COLORS[2];
  return VISIT_COLORS[3];
}
