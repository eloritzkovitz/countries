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
}

const MarkersContext = createContext<MarkersContextType | undefined>(undefined);

export const MarkersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Load markers from IndexedDB on mount
  useEffect(() => {
    let mounted = true;
    markersService.load().then((dbMarkers) => {
      if (mounted) setMarkers(dbMarkers);
      setInitialized(true);
    });
    return () => { mounted = false; };
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

  return (
    <MarkersContext.Provider
      value={{
        markers,
        addMarker,
        editMarker,
        removeMarker,
        toggleMarkerVisibility,
        reorderMarkers,
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
