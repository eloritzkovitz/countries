import { useSettings } from "@contexts/SettingsContext";

export function useHomeCountry() {
  const { settings, updateSettings } = useSettings();
  const setHomeCountry = (country: string) =>
    updateSettings({ homeCountry: country });
  return { homeCountry: settings?.homeCountry, setHomeCountry };
}
