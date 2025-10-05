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
  editingOverlay: Overlay | null;
  isEditModalOpen: boolean;
  isNewOverlay: boolean;
  openAddOverlay: () => void;
  openEditOverlay: (overlay: Overlay) => void;
  saveOverlay: () => void;
  closeOverlayModal: () => void;
  setEditingOverlay: React.Dispatch<React.SetStateAction<Overlay | null>>;
};

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const [overlays, setOverlays] = useState<Overlay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [editingOverlay, setEditingOverlay] = useState<Overlay | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isNewOverlay, setIsNewOverlay] = useState(false);

  // Load overlays from localStorage or fetch from files
  useEffect(() => {
    const saved = localStorage.getItem("overlays");
    if (saved) {
      setOverlays(JSON.parse(saved));
      setLoading(false);
      return;
    }
    const overlaysConfigUrl =
      import.meta.env.VITE_OVERLAYS_CONFIG_URL || "/data/overlays.json";
    const userDataUrl =
      import.meta.env.VITE_USER_DATA_URL || "/data/userData.json";

    Promise.all([
      fetch(overlaysConfigUrl).then((res) => {
        if (!res.ok) throw new Error("Failed to load overlays config");
        return res.json();
      }),
      fetch(userDataUrl).then((res) => {
        if (!res.ok) throw new Error("Failed to load user data");
        return res.json();
      }),
    ])
      .then(([overlaysConfig, userData]) => {
        setOverlays(
          overlaysConfig.map((cfg: { dataKey: string | number }) => ({
            ...cfg,
            countries: userData[cfg.dataKey] || [],
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Persist overlays to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("overlays", JSON.stringify(overlays));
    }
  }, [overlays, loading]);

  // Add overlay
  function addOverlay(overlay: Overlay) {
    setOverlays((prev) => addOverlayUtil(prev, overlay));
  }

  // Edit overlay
  function editOverlay(overlay: Overlay) {
    setOverlays((prev) => editOverlayUtil(prev, overlay));
  }

  // Remove overlay
  function removeOverlay(id: string) {
    setOverlays((prev) => removeOverlayUtil(prev, id));
  }

  // Toggle visibility
  function toggleOverlayVisibility(id: string) {
    setOverlays((prev) =>
      updateOverlayVisibility(prev, id, !prev.find((o) => o.id === id)?.visible)
    );
  }

  // Modal handlers
  function openAddOverlay() {
    setEditingOverlay({
      id: `overlay-${Date.now()}`,
      name: "",
      color: "#2563eb",
      countries: [],
      visible: true,
      tooltip: "",
    });
    setIsNewOverlay(true);
    setEditModalOpen(true);
  }

  // Open edit modal with selected overlay
  function openEditOverlay(overlay: Overlay) {
    setEditingOverlay({ ...overlay });
    setIsNewOverlay(false);
    setEditModalOpen(true);
  }

  // Save overlay (add or edit)
  function saveOverlay() {
    if (!editingOverlay) return;
    if (isNewOverlay) {
      addOverlay(editingOverlay);
    } else {
      editOverlay(editingOverlay);
    }
    closeOverlayModal();
  }

  // Close modal and reset state
  function closeOverlayModal() {
    setEditModalOpen(false);
    setEditingOverlay(null);
    setIsNewOverlay(false);
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
        editingOverlay,
        isEditModalOpen,
        isNewOverlay,
        openAddOverlay,
        openEditOverlay,
        saveOverlay,
        closeOverlayModal,
        setEditingOverlay,
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