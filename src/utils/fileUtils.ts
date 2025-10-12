/**
 * Exports an SVG element as a downloadable SVG file.
 * Removes <rect> backgrounds by default.
 * @param svgElement The SVG element to export
 * @param filename The filename for the download (default: "map.svg")
 */
export function exportSvg(svgElement: SVGSVGElement, filename = "map.svg") {
  if (!svgElement) return;

  const serializer = new XMLSerializer();
  let svgString = serializer.serializeToString(svgElement);

  // Remove <rect> backgrounds if present
  svgString = svgString.replace(/<rect[^>]*>/g, "");

  const blob = new Blob([svgString], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}