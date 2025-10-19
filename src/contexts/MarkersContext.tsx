import React, { createContext, useContext, useState, useEffect } from "react";
import type { Marker } from "@types";

const STORAGE_KEY = "countries_markers";

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

  // Load markers from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setMarkers(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse markers from localStorage:", e);
      }
    }
    setInitialized(true);
  }, []);

  // Save markers to localStorage whenever they change
  useEffect(() => {
    if (initialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(markers));
    }
  }, [markers, initialized]);

  // Add a new marker
  const addMarker = (marker: Marker) => setMarkers((prev) => [...prev, marker]);

  // Edit marker by id
  const editMarker = (updated: Marker) => {
    setMarkers((markers) =>
      markers.map((marker) =>
        marker.id === updated.id ? { ...marker, ...updated } : marker
      )
    );
  };
  
  // Remove marker by id
  const removeMarker = (id: string) =>
    setMarkers((prev) => prev.filter((m) => m.id !== id));
  
  // Toggle marker visibility by id
  const toggleMarkerVisibility = (id: string) => {
    setMarkers((markers) =>
      markers.map((marker) =>
        marker.id === id ? { ...marker, visible: !marker.visible } : marker
      )
    );
  };

  // Reorder markers
  const reorderMarkers = (newOrder: Marker[]) => setMarkers(newOrder);

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
