import type { Trip } from "@types";
import { appDb } from "@utils/db";

export const tripsService = {
  // Load all trips from IndexedDB
  async load(): Promise<Trip[]> {
    return await appDb.trips.toArray();
  },

  // Add a new trip
  async add(trip: Trip) {
    await appDb.trips.add(trip);
  },

  // Update an existing trip
  async update(trip: Trip) {
    await appDb.trips.put(trip);
  },

  // Remove a trip by id
  async remove(id: string) {
    await appDb.trips.delete(id);
  },
};
