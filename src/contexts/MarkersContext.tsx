import React, { createContext, useContext, useState } from "react";
import type { Marker } from "@types";

interface MarkersContextType {
  markers: Marker[];
  addMarker: (marker: Marker) => void;
  removeMarker: (id: string) => void;
}

const MarkersContext = createContext<MarkersContextType | undefined>(undefined);

export const MarkersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [markers, setMarkers] = useState<Marker[]>([]);

  const addMarker = (marker: Marker) => setMarkers((prev) => [...prev, marker]);
  const removeMarker = (id: string) =>
    setMarkers((prev) => prev.filter((m) => m.id !== id));

  return (
    <MarkersContext.Provider value={{ markers, addMarker, removeMarker }}>
      {children}
    </MarkersContext.Provider>
  );
};

// Custom hook for easy access to the MarkersContext
export const useMarkers = () => {
  const context = useContext(MarkersContext);
  if (!context)
    throw new Error("useMarkers must be used within a MarkersProvider");
  return context;
};
