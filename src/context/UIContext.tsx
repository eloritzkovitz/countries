import { createContext, useContext, useState, type ReactNode } from "react";
import { useKeyHandler } from "../hooks/useKeyHandler";

type UIContextType = {
  uiVisible: boolean;
  setUiVisible: (v: boolean | ((prev: boolean) => boolean)) => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [uiVisible, setUiVisible] = useState(true);

  // Toggle UI visibility with Shift+U
  useKeyHandler(
    () => setUiVisible((prev) => !prev),
    ["u", "U"],
    true,
    { shift: true }
  );

  return (
    <UIContext.Provider value={{ uiVisible, setUiVisible }}>
      {children}
    </UIContext.Provider>
  );
}

// Custom hook for easy context access
export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}