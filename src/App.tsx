import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CountryDataProvider } from "@contexts/CountryDataContext";
import { MapUIProvider } from "@contexts/MapUIContext";
import { MarkersProvider } from "@contexts/MarkersContext";
import { OverlayProvider } from "@contexts/OverlayContext";
import { SettingsProvider } from "@contexts/SettingsContext";
import { TripsProvider } from "@contexts/TripsContext";
import { UIProvider } from "@contexts/UIContext";
import AtlasPage from "./pages/AtlasPage";
import GamesPage from "./pages/GamesPage";
import TripsPage from "./pages/TripsPage";

function App() {
  return (
    <SettingsProvider>
      <CountryDataProvider>
        <TripsProvider>
          <UIProvider>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    <OverlayProvider>
                      <MapUIProvider>
                        <MarkersProvider>
                          <AtlasPage />
                        </MarkersProvider>
                      </MapUIProvider>
                    </OverlayProvider>
                  }
                />
                <Route path="/game" element={<GamesPage />} />
                <Route path="/trips" element={<TripsPage />} />
              </Routes>
            </BrowserRouter>
          </UIProvider>
        </TripsProvider>
      </CountryDataProvider>
    </SettingsProvider>
  );
}

export default App;
