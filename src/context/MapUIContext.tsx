import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { DEFAULT_MAP_STROKE_COLOR, DEFAULT_MAP_PROJECTION } from "../config/constants";

type MapUIContextType = {
  projection: string;
  setProjection: (v: string) => void;
  borderColor: string;
  setBorderColor: (v: string) => void;  
};

const MapUIContext = createContext<MapUIContextType | undefined>(undefined);

export function MapUIProvider({ children }: { children: ReactNode }) {  
  // Projection state with localStorage persistence
  const [projection, setProjectionState] = useState<string>(() => {
    return localStorage.getItem("projection") || DEFAULT_MAP_PROJECTION;
  });

  // Persist projection in localStorage
  useEffect(() => {
    localStorage.setItem("projection", projection);
  }, [projection]);
  const setProjection = (v: string) => setProjectionState(v);

  // Border color state
  const [borderColor, setBorderColorState] = useState<string>(DEFAULT_MAP_STROKE_COLOR);
  const setBorderColor = (v: string) => setBorderColorState(v); 

  return (
    <MapUIContext.Provider
      value={{
        projection,
        setProjection,
        borderColor,
        setBorderColor,        
      }}
    >
      {children}
    </MapUIContext.Provider>
  );
}

// Custom hook for easy context access
export function useMapUI() {
  const context = useContext(MapUIContext);
  if (!context) {
    throw new Error("useMapUI must be used within a MapUIProvider");
  }
  return context;
}