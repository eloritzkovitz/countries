import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CountryDataProvider } from "@contexts/CountryDataContext";
import { MapUIProvider } from "@contexts/MapUIContext";
import { MarkersProvider } from "@contexts/MarkersContext";
import { OverlayProvider } from "@contexts/OverlayContext";
import { ThemeProvider } from "@contexts/ThemeContext";
import { UIProvider } from "@contexts/UIContext";
import HomePage from "./pages/HomePage";
import FlagGuessGamePage from "./pages/FlagGuessGamePage";
import CountryMapPage from "./pages/CountryMapPage";

function App() {
  return (
    <ThemeProvider>
      <CountryDataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<FlagGuessGamePage />} />
            <Route
              path="/map"
              element={
                <UIProvider>
                  <OverlayProvider>
                    <MapUIProvider>
                      <MarkersProvider>
                        <CountryMapPage />
                      </MarkersProvider>
                    </MapUIProvider>
                  </OverlayProvider>
                </UIProvider>
              }
            />
          </Routes>
        </BrowserRouter>
      </CountryDataProvider>
    </ThemeProvider>
  );
}

export default App;
