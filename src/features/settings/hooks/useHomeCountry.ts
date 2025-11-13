import { useSettings } from "@contexts/SettingsContext";

export function useHomeCountry() {
  const { settings } = useSettings();
  return settings?.homeCountry;
}
