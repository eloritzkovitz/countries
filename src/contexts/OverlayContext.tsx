import { createContext, useContext, useEffect, useState } from "react";
import { useTrips } from "@contexts/TripsContext";
import {
  editOverlay as editOverlayUtil,
  removeOverlay as removeOverlayUtil,
  persistOverlays,
  updateOverlayVisibility,
} from "@features/overlays";
import { computeVisitedCountriesFromTrips } from "@features/trips";
import type { AnyOverlay, TimelineOverlay } from "@types";
import { appDb } from "@utils/db";

export type OverlayContextType = {
  overlays: AnyOverlay[];
  setOverlays: React.Dispatch<React.SetStateAction<AnyOverlay[]>>;
  overlaySelections: Record<string, string>;
  setOverlaySelections: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  addOverlay: (overlay: AnyOverlay) => void;
  editOverlay: (overlay: AnyOverlay) => void;
  removeOverlay: (id: string) => void;
  reorderOverlays: (newOrder: AnyOverlay[]) => void;
  toggleOverlayVisibility: (id: string) => void;
  loading: boolean;
  error: string | null;
  editingOverlay: AnyOverlay | null;
  isEditModalOpen: boolean;
  openAddOverlay: () => void;
  openEditOverlay: (overlay: AnyOverlay) => void;
  saveOverlay: () => void;
  closeOverlayModal: () => void;
  setEditingOverlay: React.Dispatch<React.SetStateAction<AnyOverlay | null>>;
};

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  // Overlay state
  const [overlays, setOverlays] = useState<AnyOverlay[]>([]);
  const [overlaySelections, setOverlaySelections] = useState<
    Record<string, string>
  >({});

  // Trips context for syncing visited countries overlay
  const { trips } = useTrips();

  // Loading and error state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [editingOverlay, setEditingOverlay] = useState<AnyOverlay | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  // Load overlays from IndexedDB on mount
  useEffect(() => {
    let mounted = true;
    const loadOverlays = async () => {
      setLoading(true);
      try {
        let dbOverlays = await appDb.overlays.toArray();
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

  // Sync visited countries overlay with trips
  useEffect(() => {
    if (!loading && overlays.length > 0) {
      const visitedOverlayId = "visited-countries";
      const visitedCountries = computeVisitedCountriesFromTrips(trips);

      const prevCountries =
        overlays.find((o) => o.id === visitedOverlayId)?.countries || [];
      const hasChanged =
        prevCountries.length !== visitedCountries.length ||
        prevCountries.some((c, i) => visitedCountries[i] !== c);

      if (hasChanged) {
        const updated = overlays.map((overlay) =>
          overlay.id === visitedOverlayId
            ? { ...overlay, countries: visitedCountries }
            : overlay
        );
        setOverlays(updated);
        persistOverlays(updated); // Persist all overlays
      }
    }
  }, [trips, loading, overlays]);

  // Persist overlays on change
  useEffect(() => {
    if (!loading && overlays.length > 0) {
      persistOverlays(overlays);
    }
  }, [overlays, loading]);

  // Add overlay
  function addOverlay(overlay: AnyOverlay) {
    setOverlays((prev) => [
      { ...overlay, order: 0 },
      ...prev.map((o) => ({ ...o, order: (o.order ?? 0) + 1 })),
    ]);
  }

  // Edit overlay
  function editOverlay(overlay: AnyOverlay) {
    setOverlays((prev) => editOverlayUtil(prev, overlay));
  }

  // Remove overlay
  function removeOverlay(id: string) {
    setOverlays((prev) => removeOverlayUtil(prev, id));
  }

  // Reorder overlays
  function reorderOverlays(newOrder: AnyOverlay[]) {
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
  function openEditOverlay(overlay: AnyOverlay) {
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
