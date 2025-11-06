import type { Settings } from "@types";
import { appDb } from "@utils/db";

const DEFAULT_SETTINGS: Settings = {
  id: "main",
  homeCountry: "",
  theme: "light",
};

export const settingsService = {
  // Load settings from IndexedDB
  async load(): Promise<Settings> {
    return (await appDb.settings.get("main")) || DEFAULT_SETTINGS;
  },

  // Save or update settings
  async save(settings: Settings) {
    await appDb.settings.put(settings);
  },
};
