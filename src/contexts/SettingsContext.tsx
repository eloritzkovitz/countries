import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { appDb } from "../utils/db";
import type { Settings } from "@types";

const SettingsContext = createContext<{
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => Promise<void>;
  loading: boolean;
}>({
  settings: { id: "main", homeCountry: "", theme: "light" },
  updateSettings: async () => {},
  loading: false,
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>({
    id: "main",
    homeCountry: "",
    theme: "light",
  });
  const [loading, setLoading] = useState(true);

  // Load settings from IndexedDB on mount
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      const s = await appDb.settings.get("main");
      if (mounted) {
        setSettings(s || { id: "main", theme: "light" });
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
    await appDb.settings.put(newSettings);
    setSettings(newSettings);
  };  

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}

// Custom hook to use theme
export function useTheme() {
  const { settings, updateSettings } = useSettings();
  const setTheme = (theme: "light" | "dark") => updateSettings({ theme });
  const toggleTheme = () =>
    setTheme(settings.theme === "dark" ? "light" : "dark");
  return { theme: settings.theme, setTheme, toggleTheme };
}

// Custom hook to use the SettingsContext
export const useSettings = () => useContext(SettingsContext);
