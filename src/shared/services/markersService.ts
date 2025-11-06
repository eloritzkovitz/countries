import { appDb } from "@utils/db";
import type { Marker } from "@types";

export const markersService = {
  // Load all markers from IndexedDB
  async load(): Promise<Marker[]> {
    return await appDb.markers.toArray();
  },

  // Save markers to IndexedDB
  async save(markers: Marker[]) {
    await appDb.markers.clear();
    if (markers.length > 0) {
      await appDb.markers.bulkAdd(markers);
    }
  },

  // Add a new marker
  async add(marker: Marker) {
    await appDb.markers.add(marker);
  },

  // Edit marker by id
  async edit(marker: Marker) {
    await appDb.markers.put(marker);
  },

  // Remove marker by id
  async remove(id: string) {
    await appDb.markers.delete(id);
  },
};
