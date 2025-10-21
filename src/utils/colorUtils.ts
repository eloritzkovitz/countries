/**
 * Parses an RGBA color string into its component values.
 * @param rgba - The RGBA color string to parse.
 * @returns An array containing the red, green, blue, and alpha values.
 */
export function parseRgba(rgba: string): [number, number, number, number] {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)/);
  if (!match) return [255, 255, 255, 1];
  return [
    parseInt(match[1], 10),
    parseInt(match[2], 10),
    parseInt(match[3], 10),
    parseFloat(match[4]),
  ];
}

/**
 * Blends multiple RGBA colors together.
 * @param colors - An array of RGBA color strings to blend.
 * @returns The blended RGBA color as a string.
 */
export function blendColors(colors: string[]): string {
  let base = [255, 255, 255, 1];
  for (const rgba of colors) {
    const [r, g, b, a] = parseRgba(rgba);
    base[0] = Math.round(r * a + base[0] * (1 - a));
    base[1] = Math.round(g * a + base[1] * (1 - a));
    base[2] = Math.round(b * a + base[2] * (1 - a));
    base[3] = 1;
  }
  return (
    "#" +
    base
      .slice(0, 3)
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
  );
}