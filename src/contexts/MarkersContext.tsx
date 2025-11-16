import React, { createContext, useContext, useState, useEffect } from "react";
import { markersService } from "@services/markersService";
import type { Marker } from "@types";

interface MarkersContextType {
  markers: Marker[];
  addMarker: (marker: Marker) => void;
  editMarker: (updated: Marker) => void;
  removeMarker: (id: string) => void;
  toggleMarkerVisibility: (id: string) => void;
  reorderMarkers: (newOrder: Marker[]) => void;
  editingMarker: Marker | null;
  setEditingMarker: React.Dispatch<React.SetStateAction<Marker | null>>;
  isEditingMarker: boolean;
  isMarkerModalOpen: boolean;
  openAddMarker: (coords?: [number, number]) => void;
  openEditMarker: (marker: Marker) => void;
  saveMarker: () => void;
  closeMarkerModal: () => void;
}

const MarkersContext = createContext<MarkersContextType | undefined>(undefined);

export const MarkersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Editing state
  const [editingMarker, setEditingMarker] = useState<Marker | null>(null);
  const [isMarkerModalOpen, setMarkerModalOpen] = useState(false);
  const isEditingMarker = !!editingMarker && markers.some((m) => m.id === editingMarker.id);

  // Load markers from IndexedDB on mount
  useEffect(() => {
    let mounted = true;
    markersService.load().then((dbMarkers) => {
      if (mounted) setMarkers(dbMarkers);
      setInitialized(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Save markers to IndexedDB whenever they change
  useEffect(() => {
    if (initialized) {
      markersService.save(markers);
    }
  }, [markers, initialized]);

  // Add a new marker
  const addMarker = async (marker: Marker) => {
    setMarkers((prev) => [...prev, marker]);
    await markersService.add(marker);
  };

  // Edit marker by id
  const editMarker = async (updated: Marker) => {
    setMarkers((prev) =>
      prev.map((marker) =>
        marker.id === updated.id ? { ...marker, ...updated } : marker
      )
    );
    await markersService.edit(updated);
  };

  // Remove marker by id
  const removeMarker = async (id: string) => {
    setMarkers((prev) => prev.filter((m) => m.id !== id));
    await markersService.remove(id);
  };

  // Toggle marker visibility by id
  const toggleMarkerVisibility = async (id: string) => {
    setMarkers((prev) =>
      prev.map((marker) =>
        marker.id === id ? { ...marker, visible: !marker.visible } : marker
      )
    );
    const updated = markers.find((m) => m.id === id);
    if (updated) {
      await markersService.edit({ ...updated, visible: !updated.visible });
    }
  };

  // Reorder markers
  const reorderMarkers = async (newOrder: Marker[]) => {
    setMarkers(newOrder);
    await markersService.save(newOrder);
  };

  // Open add marker modal
  function openAddMarker(coords?: [number, number]) {
    setEditingMarker({
      id: crypto.randomUUID(),
      name: "",
      color: "#e53e3e",
      description: "",
      longitude: coords?.[0] ?? 0,
      latitude: coords?.[1] ?? 0,
      visible: true,
    });
    setMarkerModalOpen(true);
  }

  // Open edit marker modal
  function openEditMarker(marker: Marker) {
    setEditingMarker({ ...marker });
    setMarkerModalOpen(true);
  }
  
  // Save marker (add or edit)
  function saveMarker() {
    if (!editingMarker) return;
    const exists = markers.some((m) => m.id === editingMarker.id);
    if (exists) {
      editMarker(editingMarker);
    } else {
      addMarker(editingMarker);
    }
    closeMarkerModal();
  }

  // Close edit marker modal
  function closeMarkerModal() {
    setMarkerModalOpen(false);
    setEditingMarker(null);
  }  

  return (
    <MarkersContext.Provider
      value={{
        markers,
        addMarker,
        editMarker,
        removeMarker,
        toggleMarkerVisibility,
        reorderMarkers,
        editingMarker,
        setEditingMarker,
        isEditingMarker,
        isMarkerModalOpen,
        openAddMarker,
        openEditMarker,
        saveMarker,
        closeMarkerModal,
      }}
    >
      {children}
    </MarkersContext.Provider>
  );
};

// Custom hook to use the MarkersContext
export const useMarkers = () => {
  const context = useContext(MarkersContext);
  if (!context)
    throw new Error("useMarkers must be used within a MarkersProvider");
  return context;
};
