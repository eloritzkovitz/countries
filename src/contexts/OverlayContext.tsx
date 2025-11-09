import { createContext, useContext, useEffect, useState } from "react";
import { useTrips } from "@contexts/TripsContext";
import {
  editOverlay as editOverlayUtil,
  removeOverlay as removeOverlayUtil,
  updateOverlayVisibility,
} from "@features/overlays";
import { computeVisitedCountriesFromTrips } from "@features/trips";
import { overlaysService } from "@services/overlaysService";
import type { AnyOverlay } from "@types";

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

  // Load overlays from service on mount
  useEffect(() => {
    let mounted = true;
    overlaysService
      .load()
      .then((dbOverlays) => {
        if (mounted) {
          setOverlays(dbOverlays);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
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
        overlaysService.save(updated); // Persist all overlays
      }
    }
  }, [trips, loading, overlays]);

  // Persist overlays on change
  useEffect(() => {
    if (!loading && overlays.length > 0) {
      overlaysService.save(overlays);
    }
  }, [overlays, loading]);

  // Add overlay
  async function addOverlay(overlay: AnyOverlay) {
    const newOverlays = [
      { ...overlay, order: 0 },
      ...overlays.map((o) => ({ ...o, order: (o.order ?? 0) + 1 })),
    ];
    setOverlays(newOverlays);
    await overlaysService.add(overlay);
  }

  // Edit overlay
  async function editOverlay(overlay: AnyOverlay) {
    const newOverlays = editOverlayUtil(overlays, overlay);
    setOverlays(newOverlays);
    await overlaysService.edit(overlay);
  }

  // Remove overlay
  async function removeOverlay(id: string) {
    const newOverlays = removeOverlayUtil(overlays, id);
    setOverlays(newOverlays);
    await overlaysService.remove(id);
  }

  // Reorder overlays
  async function reorderOverlays(newOrder: AnyOverlay[]) {
    const ordered = newOrder.map((overlay, idx) => ({
      ...overlay,
      order: idx,
    }));
    setOverlays(ordered);
    await overlaysService.save(ordered);
  }

  // Toggle visibility
  async function toggleOverlayVisibility(id: string) {
    const newOverlays = updateOverlayVisibility(
      overlays,
      id,
      !overlays.find((o) => o.id === id)?.visible
    );
    setOverlays(newOverlays);
    await overlaysService.save(newOverlays);
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
