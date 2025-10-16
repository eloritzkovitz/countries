import { createContext, useContext, useState, type ReactNode } from "react";
import { useKeyHandler } from "../hooks/useKeyHandler";

type UIContextType = {
  uiVisible: boolean;
  setUiVisible: (v: boolean | ((prev: boolean) => boolean)) => void;
  showCountries: boolean;
  setShowCountries: (v: boolean) => void;
  showFilters: boolean;
  toggleFilters: () => void;
  showOverlays: boolean;
  toggleOverlays: () => void;
  showExport: boolean;
  toggleExport: () => void;
  showSettings: boolean;
  toggleSettings: () => void;
  closePanel: () => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [uiVisible, setUiVisible] = useState(true);

  // State for which panel is open; null means no panel is open
  const [showCountries, setShowCountries] = useState(true);
  const [openPanel, setOpenPanel] = useState<
    "filters" | "overlays" | "export" | "settings" | null
  >(null);

  // Derived states for individual panels
  const showFilters = openPanel === "filters";
  const showOverlays = openPanel === "overlays";
  const showExport = openPanel === "export";
  const showSettings = openPanel === "settings";

  const toggleFilters = () =>
    setOpenPanel((prev) => (prev === "filters" ? null : "filters"));
  const toggleOverlays = () =>
    setOpenPanel((prev) => (prev === "overlays" ? null : "overlays"));
  const toggleExport = () =>
    setOpenPanel((prev) => (prev === "export" ? null : "export"));
  const toggleSettings = () =>
    setOpenPanel((prev) => (prev === "settings" ? null : "settings"));
  const closePanel = () => setOpenPanel(null);

  // Toggle UI visibility with Shift+U
  useKeyHandler(() => setUiVisible((prev) => !prev), ["u", "U"], true, {
    shift: true,
  });

  return (
    <UIContext.Provider
      value={{
        uiVisible,
        setUiVisible,
        showCountries,
        setShowCountries,
        showFilters,
        toggleFilters,
        showOverlays,
        toggleOverlays,
        showExport,
        toggleExport,
        showSettings,
        toggleSettings,
        closePanel,
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
