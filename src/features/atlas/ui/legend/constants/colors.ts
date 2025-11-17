import type { VisitColorMode } from "@types";

// Visit & timeline color scale
export const HOME_COUNTRY_COLOR = "#ecb365";

// Colors for cumulative visit counts
export const VISIT_COUNT_COLORS = [
  "#abdfff",
  "#5ccdff",
  "#0091e4",
  "#0048a7",
  "#00224f",
];

// Colors for yearly visit mode
export const NEW_VISIT_COLOR = "#8275f5";
export const REVISIT_COLOR = "#bf4e64";
export const YEARLY_VISIT_COLOR = "#e06d56";
export const UPCOMING_VISIT_COLOR = "#e8ab2c";
export const UPCOMING_REVISIT_COLOR = "#f0d769"; 

// Determine color based on visit count and if it's the home country
export function getVisitColor(
  count: number,
  isHome: boolean,
  defaultFill: string,
  mode: VisitColorMode = "cumulative",
  isNewThisYear?: boolean,
  isRevisitThisYear?: boolean,
  isUpcomingVisit?: boolean,
  isUpcomingRevisit?: boolean
) {
  if (isHome) return HOME_COUNTRY_COLOR;

  if (mode === "cumulative") {
    if (count === 0) return defaultFill;
    if (count === 1) return VISIT_COUNT_COLORS[0];
    if (count === 2) return VISIT_COUNT_COLORS[1];
    if (count === 3) return VISIT_COUNT_COLORS[2];
    return VISIT_COUNT_COLORS[3];
  }

  if (mode === "yearly") {
    if (isUpcomingRevisit) return UPCOMING_REVISIT_COLOR;
    if (isUpcomingVisit) return UPCOMING_VISIT_COLOR;
    if (isRevisitThisYear) return REVISIT_COLOR;
    if (isNewThisYear) return NEW_VISIT_COLOR;
    if (count === 0) return defaultFill;
    return YEARLY_VISIT_COLOR;
  }
}
