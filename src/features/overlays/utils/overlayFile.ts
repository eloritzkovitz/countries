/**
 * Utility functions for importing and exporting overlay files.
 */

import type { Overlay } from "@types";

/**
 * Imports overlays from a JSON file.
 * @param event The file input change event.
 * @param setOverlays The function to update the overlays state.
 * @returns void
 */
export function importOverlaysFromFile(
  event: React.ChangeEvent<HTMLInputElement>,
  setOverlays: (overlays: Overlay[]) => void
) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target?.result as string);
      if (Array.isArray(imported)) {
        setOverlays(imported);
      } else {
        alert("Invalid overlays file format.");
      }
    } catch {
      alert("Failed to import overlays. Invalid JSON.");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

/**
 * Exports overlays to a JSON file.
 * @param overlays The overlays data to export.
 * @returns void
 */
export function exportOverlaysToFile(overlays: Overlay[]) {
  if (!overlays) return;
  const pretty = JSON.stringify(overlays, null, 2);
  const blob = new Blob([pretty], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "overlays.json";
  a.click();
  URL.revokeObjectURL(url);
}