import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {  
  MAP_OPTIONS,
  MAP_STYLE_CONFIG, 
} from "../config/constants";

type MapUIContextType = {
  projection: string;
  setProjection: (v: string) => void;
  borderColor: string;
  setBorderColor: (v: string) => void;
  borderWidth: number;
  setBorderWidth: (v: number) => void;
};

const MapUIContext = createContext<MapUIContextType | undefined>(undefined);

export function MapUIProvider({ children }: { children: ReactNode }) {
  // Projection state with localStorage persistence
  const [projection, setProjectionState] = useState<string>(() => {
    return localStorage.getItem("projection") || MAP_OPTIONS.projection[0].value;
  });

  // Persist projection in localStorage
  useEffect(() => {
    localStorage.setItem("projection", projection);
  }, [projection]);
  const setProjection = (v: string) => setProjectionState(v);

  // Border color state
  const [borderColor, setBorderColorState] = useState<string>(
    MAP_STYLE_CONFIG.default.stroke
  );
  const setBorderColor = (v: string) => setBorderColorState(v);

  // Border width state
  const [borderWidth, setBorderWidthState] = useState<number>(
    MAP_STYLE_CONFIG.default.strokeWidth
  );
  const setBorderWidth = (v: number) => setBorderWidthState(v);

  return (
    <MapUIContext.Provider
      value={{
        projection,
        setProjection,
        borderColor,
        setBorderColor,
        borderWidth,
        setBorderWidth,
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
