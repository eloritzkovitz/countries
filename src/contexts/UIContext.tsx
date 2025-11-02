import { createContext, useContext, useState, type ReactNode } from "react";
import { useKeyHandler } from "@hooks/useKeyHandler";

type UIContextType = {
  uiVisible: boolean;
  setUiVisible: (v: boolean | ((prev: boolean) => boolean)) => void;
  showMenu: boolean;
  setShowMenu: (v: boolean) => void;
  showCountries: boolean;  
  toggleCountries: () => void;
  showFilters: boolean;
  toggleFilters: () => void;
  showMarkers: boolean;
  toggleMarkers: () => void;
  showOverlays: boolean;
  toggleOverlays: () => void;
  showExport: boolean;
  toggleExport: () => void;
  showSettings: boolean;
  toggleSettings: () => void;
  closePanel: () => void;
  showShortcuts: boolean;
  openShortcuts: () => void;
  closeShortcuts: () => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [uiVisible, setUiVisible] = useState(true);

  // State for which panel is open; null means no panel is open
  const [showMenu, setShowMenu] = useState(false);
  const [openPanel, setOpenPanel] = useState<
    "countries" | "filters" | "markers" | "overlays" | "export" | "settings" | null
  >(null);

  // Shortcuts modal state
  const [showShortcuts, setShowShortcuts] = useState(false);
  const openShortcuts = () => setShowShortcuts(true);
  const closeShortcuts = () => setShowShortcuts(false);

  // Derived states for individual panels
  const showCountries = openPanel === "countries";
  const showFilters = openPanel === "filters";
  const showMarkers = openPanel === "markers";
  const showOverlays = openPanel === "overlays";
  const showExport = openPanel === "export";
  const showSettings = openPanel === "settings";

  const toggleUiVisible = () => setUiVisible((prev) => !prev);
  const toggleCountries = () =>
    setOpenPanel((prev) => (prev === "countries" ? null : "countries"));
  const toggleFilters = () =>
    setOpenPanel((prev) => (prev === "filters" ? null : "filters"));
  const toggleMarkers = () =>
    setOpenPanel((prev) => (prev === "markers" ? null : "markers"));
  const toggleOverlays = () =>
    setOpenPanel((prev) => (prev === "overlays" ? null : "overlays"));
  const toggleExport = () =>
    setOpenPanel((prev) => (prev === "export" ? null : "export"));
  const toggleSettings = () =>
    setOpenPanel((prev) => (prev === "settings" ? null : "settings"));
  const closePanel = () => setOpenPanel(null);

  // Toggle UI visibility with "U"
  useKeyHandler(toggleUiVisible, ["u", "U"], true);  

  // Toggle Filters panel with "F"
  useKeyHandler(toggleFilters, ["f", "F"], true);

  // Toggle Markers panel with "M"
  useKeyHandler(toggleMarkers, ["m", "M"], true);

  // Toggle Overlays panel with "O"
  useKeyHandler(toggleOverlays, ["o", "O"], true);

  // Toggle Export panel with "E"
  useKeyHandler(toggleExport, ["e", "E"], true);

  // Toggle Settings panel with "S"
  useKeyHandler(toggleSettings, ["s", "S"], true);

  // Open shortcut modal with "?"
  useKeyHandler(
    (e) => {
      e.preventDefault();
      openShortcuts();
    },
    ["?"],
    true
  );

  return (
    <UIContext.Provider
      value={{
        uiVisible,
        setUiVisible,
        showMenu,
        setShowMenu,
        showCountries,
        toggleCountries,
        showFilters,
        toggleFilters,
        showMarkers,
        toggleMarkers,
        showOverlays,
        toggleOverlays,
        showExport,
        toggleExport,
        showSettings,
        toggleSettings,
        closePanel,
        showShortcuts,
        openShortcuts,
        closeShortcuts,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

// Custom hook for easy context access
export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}
