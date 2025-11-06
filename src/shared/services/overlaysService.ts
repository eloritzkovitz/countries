import type { AnyOverlay, TimelineOverlay } from "@types";
import { appDb } from "@utils/db";

const VISITED_OVERLAY_ID = "visited-countries";

export const overlaysService = {
  // Load all overlays from IndexedDB
  async load(): Promise<AnyOverlay[]> {
    let dbOverlays = await appDb.overlays.toArray();
    dbOverlays = dbOverlays.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    // Ensure visited overlay exists
    if (!dbOverlays.some((o) => o.id === VISITED_OVERLAY_ID)) {
      dbOverlays.unshift({
        id: VISITED_OVERLAY_ID,
        name: "Visited Countries",
        color: "#00bfff",
        countries: [],
        visible: true,
        tooltip: "Countries visited (synced with trips)",
        timelineEnabled: true,
        timelineSnapshot: true,
      } as TimelineOverlay);
    }
    return dbOverlays;
  },

  // Save overlays to IndexedDB
  async save(overlays: AnyOverlay[]) {
    await appDb.overlays.clear();
    await appDb.overlays.bulkAdd(overlays);
  },

  // Add a new overlay
  async add(overlay: AnyOverlay) {
    await appDb.overlays.add(overlay);
  },

  // Edit an existing overlay
  async edit(overlay: AnyOverlay) {
    await appDb.overlays.put(overlay);
  },

  // Remove an overlay by ID
  async remove(id: string) {
    await appDb.overlays.delete(id);
  },
};
