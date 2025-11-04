import { createContext, useContext, useEffect, useState } from "react";
import {
  editOverlay as editOverlayUtil,
  removeOverlay as removeOverlayUtil,
  updateOverlayVisibility,
} from "@features/overlays";
import type { AnyOverlay, Overlay, TimelineOverlay } from "@types";
import { appDb } from "@utils/db";

export type OverlayContextType = {
  overlays: AnyOverlay[];
  setOverlays: React.Dispatch<React.SetStateAction<AnyOverlay[]>>;
  overlaySelections: Record<string, string>;
  setOverlaySelections: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  addOverlay: (overlay: Overlay) => void;
  editOverlay: (overlay: Overlay) => void;
  removeOverlay: (id: string) => void;
  reorderOverlays: (newOrder: Overlay[]) => void;
  toggleOverlayVisibility: (id: string) => void;
  loading: boolean;
  error: string | null;
  editingOverlay: Overlay | null;
  isEditModalOpen: boolean;
  openAddOverlay: () => void;
  openEditOverlay: (overlay: Overlay) => void;
  saveOverlay: () => void;
  closeOverlayModal: () => void;
  setEditingOverlay: React.Dispatch<React.SetStateAction<Overlay | null>>;
};

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  // Overlay state
  const [overlays, setOverlays] = useState<AnyOverlay[]>([]);
  const [overlaySelections, setOverlaySelections] = useState<
    Record<string, string>
  >({});

  // Loading and error state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [editingOverlay, setEditingOverlay] = useState<Overlay | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  // Load overlays from IndexedDB on mount
  useEffect(() => {
    let mounted = true;
    const loadOverlays = async () => {
      setLoading(true);
      try {
        let dbOverlays = await appDb.overlays.toArray();
        // Sort overlays by order property
        dbOverlays = dbOverlays.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

        // Ensure visited countries overlay exists
        const visitedOverlayId = "visited-countries";
        if (!dbOverlays.some((o) => o.id === visitedOverlayId)) {
          dbOverlays.unshift({
            id: visitedOverlayId,
            name: "Visited Countries",
            color: "#00bfff",
            countries: [],
            visible: true,
            tooltip: "Countries visited (synced with trips)",
            timelineEnabled: true,
            timelineSnapshot: true,
          } as TimelineOverlay);
        }

        if (mounted) {
          setOverlays(dbOverlays);
          setLoading(false);
        }
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadOverlays();
    return () => {
      mounted = false;
    };
  }, []);

  // Persist overlays to IndexedDB whenever they change
  useEffect(() => {
    if (!loading) {
      appDb.overlays.clear().then(() => {
        if (overlays.length > 0) {
          appDb.overlays.bulkAdd(overlays);
        }
      });
    }
  }, [overlays, loading]);

  // Add overlay
  function addOverlay(overlay: Overlay) {
    setOverlays((prev) => [
      { ...overlay, order: 0 },
      ...prev.map((o) => ({ ...o, order: (o.order ?? 0) + 1 })),
    ]);
  }

  // Edit overlay
  function editOverlay(overlay: Overlay) {
    setOverlays((prev) => editOverlayUtil(prev, overlay));
  }

  // Remove overlay
  function removeOverlay(id: string) {
    setOverlays((prev) => removeOverlayUtil(prev, id));
  }

  // Reorder overlays
  function reorderOverlays(newOrder: Overlay[]) {
    const ordered = newOrder.map((overlay, idx) => ({
      ...overlay,
      order: idx,
    }));
    setOverlays(ordered);
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
    setEditModalOpen(true);
  }

  // Open edit modal with selected overlay
  function openEditOverlay(overlay: Overlay) {
    setEditingOverlay({ ...overlay });
    setEditModalOpen(true);
  }

  // Save overlay (add or edit)
  function saveOverlay() {
    if (!editingOverlay) return;
    const exists = overlays.some((o) => o.id === editingOverlay.id);
    if (exists) {
      editOverlay(editingOverlay);
    } else {
      addOverlay(editingOverlay);
    }
    closeOverlayModal();
  }

  // Close modal and reset state
  function closeOverlayModal() {
    setEditModalOpen(false);
    setEditingOverlay(null);
  }

  return (
    <OverlayContext.Provider
      value={{
        overlays,
        setOverlays,
        overlaySelections,
        setOverlaySelections,
        addOverlay,
        editOverlay,
        removeOverlay,
        reorderOverlays,
        toggleOverlayVisibility,
        loading,
        error,
        editingOverlay,
        isEditModalOpen,
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
