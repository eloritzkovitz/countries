import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Settings } from "@types";
import { settingsService } from "@services/settingsService";

const defaultOverlayPalettes = {
  standard: "Classic",
  yearly: "Classic",
  cumulative: "Classic",
};

const SettingsContext = createContext<{
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => Promise<void>;
  loading: boolean;
}>({
  settings: { id: "main", homeCountry: "", theme: "light", overlayPalettes: defaultOverlayPalettes },
  updateSettings: async () => {},
  loading: false,
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>({
    id: "main",
    homeCountry: "",
    theme: "light",
    overlayPalettes: defaultOverlayPalettes,
  });
  const [loading, setLoading] = useState(true);

  // Load settings from IndexedDB on mount
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      const s = await settingsService.load();
      if (mounted) {
        setSettings(s);
        setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  // Apply theme class to document
  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      settings.theme === "dark"
    );
  }, [settings.theme]);

  // Update settings in IndexedDB
  const updateSettings = async (updates: Partial<Settings>) => {
    const newSettings = { ...settings, ...updates, id: "main" };
    await settingsService.save(newSettings);
    setSettings(newSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}

// Custom hook to use the SettingsContext
export const useSettings = () => useContext(SettingsContext);
