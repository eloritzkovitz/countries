import Dexie, { type Table } from "dexie";
import type { Trip } from "../types";
import type { Marker } from "../types/marker";
import type { Overlay } from "../types/overlay";

export class AppDB extends Dexie {
  trips!: Table<Trip, string>;
  markers!: Table<Marker, string>;
  overlays!: Table<Overlay, string>;
  settings!: Table<any, string>;

  constructor() {
    super("AppDB");
    this.version(1).stores({
      trips: "id",
      markers: "id",
      overlays: "id",
      settings: 'id',      
    });
  }
}

export const appDb = new AppDB();
