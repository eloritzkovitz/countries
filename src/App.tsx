import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CountryDataProvider } from "@contexts/CountryDataContext";
import { MapUIProvider } from "@contexts/MapUIContext";
import { MarkersProvider } from "@contexts/MarkersContext";
import { OverlayProvider } from "@contexts/OverlayContext";
import { SettingsProvider } from "@contexts/SettingsContext";
import { TripsProvider } from "@contexts/TripsContext";
import { UIProvider } from "@contexts/UIContext";
import HomePage from "./pages/HomePage";
import FlagGuessGamePage from "./pages/FlagGuessGamePage";
import CountryMapPage from "./pages/CountryMapPage";

function App() {
  return (
    <SettingsProvider>
      <CountryDataProvider>
        <TripsProvider>
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
        </TripsProvider>
      </CountryDataProvider>
    </SettingsProvider>
  );
}

export default App;
