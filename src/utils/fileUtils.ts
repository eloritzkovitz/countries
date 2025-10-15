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

/**
 * Exports an SVG element as a downloadable PNG file.
 * Improves quality by using a higher pixel ratio and removes <rect> backgrounds.
 * @param svgElement The SVG element to export
 * @param filename The filename for the download (default: "map.png")
 * @param scale Optional scale factor for higher resolution (default: 2)
 */
export function exportSvgAsPng(
  svgElement: SVGSVGElement,
  filename = "map.png",
  scale = 8
) {
  if (!svgElement) return;

  const serializer = new XMLSerializer();
  let svgString = serializer.serializeToString(svgElement);

  // Remove <rect> backgrounds if present
  svgString = svgString.replace(/<rect[^>]*>/g, "");

  // Calculate scaled dimensions
  const width = (svgElement.width.baseVal.value || 1200) * scale;
  const height = (svgElement.height.baseVal.value || 800) * scale;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  const img = new Image();
  const svgBlob = new Blob([svgString], {
    type: "image/svg+xml;charset=utf-8",
  });
  const url = URL.createObjectURL(svgBlob);

  img.onload = function () {
    // Draw at full resolution
    ctx?.drawImage(img, 0, 0, width, height);
    URL.revokeObjectURL(url);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      "image/png",
      1 // best quality
    );
  };

  img.src = url;
}
