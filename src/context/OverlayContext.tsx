import { createContext, useContext, useEffect, useState } from "react";
import type { Overlay } from "../types/overlay";
import {
  addOverlay as addOverlayUtil,
  editOverlay as editOverlayUtil,
  removeOverlay as removeOverlayUtil,
  updateOverlayVisibility,
} from "../utils/overlayUtils";

type OverlayContextType = {
  overlays: Overlay[];
  setOverlays: React.Dispatch<React.SetStateAction<Overlay[]>>;
  addOverlay: (overlay: Overlay) => void;
  editOverlay: (overlay: Overlay) => void;
  removeOverlay: (id: string) => void;
  toggleOverlayVisibility: (id: string) => void;
  loading: boolean;
  error: string | null;
};

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const [overlays, setOverlays] = useState<Overlay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dynamically import travel data to initialize overlays
  useEffect(() => {
    const overlaysConfigUrl =
      import.meta.env.VITE_OVERLAYS_CONFIG_URL || "/data/overlays.json";
    const travelDataUrl =
      import.meta.env.VITE_TRAVEL_DATA_URL || "/data/travelData.json";

    Promise.all([
      fetch(overlaysConfigUrl).then((res) => {
        if (!res.ok) throw new Error("Failed to load overlays config");
        return res.json();
      }),
      fetch(travelDataUrl).then((res) => {
        if (!res.ok) throw new Error("Failed to load travel data");
        return res.json();
      }),
    ])
      .then(([overlaysConfig, travelData]) => {
        setOverlays(
          overlaysConfig.map((cfg: { dataKey: string | number }) => ({
            ...cfg,
            countries: travelData[cfg.dataKey] || [],
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Add, edit, remove overlay functions
  function addOverlay(overlay: Overlay) {
    setOverlays((prev) => addOverlayUtil(prev, overlay));
  }

  function editOverlay(overlay: Overlay) {
    setOverlays((prev) => editOverlayUtil(prev, overlay));
  }

  function removeOverlay(id: string) {
    setOverlays((prev) => removeOverlayUtil(prev, id));
  }

  // Toggle overlay visibility
  function toggleOverlayVisibility(id: string) {
    setOverlays((prev) =>
      updateOverlayVisibility(prev, id, !prev.find((o) => o.id === id)?.visible)
    );
  }

  return (
    <OverlayContext.Provider
      value={{
        overlays,
        setOverlays,
        addOverlay,
        editOverlay,
        removeOverlay,
        toggleOverlayVisibility,
        loading,
        error,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
}

// Custom hook for consuming the OverlayContext
export function useOverlayContext() {
  const ctx = useContext(OverlayContext);
  if (!ctx)
    throw new Error("useOverlayContext must be used within OverlayProvider");
  return ctx;
}
