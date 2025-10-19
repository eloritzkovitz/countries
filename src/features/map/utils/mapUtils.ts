import {
  geoBounds,
  geoCentroid,
  geoMercator,
  geoNaturalEarth1,
  geoEquirectangular,
} from "d3-geo";
import type { GeoProjection } from "d3-geo";

/**
 * Returns a D3 projection instance based on type and map dimensions.
 * @param projectionType - The projection name (e.g., "mercator", "naturalEarth1", "equirectangular").
 * @param width - SVG/map width.
 * @param height - SVG/map height.
 * @param scaleDivisor - Scale divisor for projection.
 * @param zoom - Zoom level (default is 1).
 * @param center - Center coordinates [longitude, latitude] (default is [0, 0]).
 * @returns A configured D3 GeoProjection instance.
 */
export function getProjection(
  projectionType: string,
  width: number,
  height: number,
  scaleDivisor: number,
  zoom: number = 1,
  center: [number, number] = [0, 0]
): GeoProjection {
  const baseScale = Math.min(width, height) / scaleDivisor;
  const scale = baseScale * zoom;

  let proj;
  switch (projectionType) {
    case "naturalEarth1":
      proj = geoNaturalEarth1();
      break;
    case "equirectangular":
      proj = geoEquirectangular();
      break;
    case "mercator":
    default:
      proj = geoMercator();
      break;
  }
  return proj
    .scale(scale)
    .center(center)
    .translate([width / 2, height / 2]);
}

/** Converts mouse event coordinates to geographical coordinates.
 * @param event - The mouse event on the SVG element.
 * @param projectionType - The projection name (e.g., "mercator", "naturalEarth1", "equirectangular").
 * @param width - SVG/map width.
 * @param height - SVG/map height.
 * @param scaleDivisor - Scale divisor for projection.
 * @param zoom - Zoom level.
 * @param center - Center coordinates [longitude, latitude].
 * @returns The [longitude, latitude] coordinates corresponding to the mouse event, or null if conversion fails.
 */
export function getGeoCoordsFromMouseEvent(
  event: React.MouseEvent<SVGSVGElement>,
  projectionType: string,
  width: number,
  height: number,
  scaleDivisor: number,
  zoom: number,
  center: [number, number]
): [number, number] | null {
  const svg = event.currentTarget;
  const rect = svg.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const proj = getProjection(
    projectionType,
    width,
    height,
    scaleDivisor,
    zoom,
    center
  );
  return proj?.invert?.([x, y]) ?? null;
}

/**
 * Gets the centroid of a GeoJSON feature.
 * @param feature - The GeoJSON feature.
 * @returns = The [longitude, latitude] coordinates of the centroid.
 */
export function getFeatureCentroid(feature: any): [number, number] {
  return geoCentroid(feature);
}

/** Get the center coordinates and appropriate zoom level for a given country ISO code.
 * @param geoData - The GeoJSON data containing country geometries.
 * @param isoCode - The ISO code of the country to center on.
 * @returns An object with center coordinates and zoom level, or null if not found.
 */
export function getCountryCenterAndZoom(
  geoData: { features: any[] },
  isoCode: any
) {
  const country = geoData.features.find(
    (feature) =>
      feature.properties["ISO3166-1-Alpha-2"] === isoCode ||
      feature.properties["ISO3166-1-Alpha-3"] === isoCode
  );
  if (!country) return null;

  const centroid = geoCentroid(country);
  const bounds = geoBounds(country);
  const [[minLng, minLat], [maxLng, maxLat]] = bounds;
  const latDiff = Math.abs(maxLat - minLat);
  const lngDiff = Math.abs(maxLng - minLng);
  const maxDiff = Math.max(latDiff, lngDiff);

  const zoom = Math.max(6, 18 - maxDiff * 40);

  return { center: centroid, zoom };
}
