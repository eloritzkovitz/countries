import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CountryDataProvider } from "@contexts/CountryDataContext";
import { MapUIProvider } from "@contexts/MapUIContext";
import { MarkersProvider } from "@contexts/MarkersContext";
import { OverlayProvider } from "@contexts/OverlayContext";
import { SettingsProvider } from "@contexts/SettingsContext";
import { TripsProvider } from "@contexts/TripsContext";
import { UIProvider } from "@contexts/UIContext";
import CountryMapPage from "./pages/CountryMapPage";
import FlagGuessGamePage from "./pages/FlagGuessGamePage";
import HomePage from "./pages/HomePage";
import TripsPage from "./pages/TripsPage";

function App() {
  return (
    <SettingsProvider>
      <CountryDataProvider>
        <TripsProvider>
          <UIProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/game" element={<FlagGuessGamePage />} />
                <Route
                  path="/map"
                  element={
                    <OverlayProvider>
                      <MapUIProvider>
                        <MarkersProvider>
                          <CountryMapPage />
                        </MarkersProvider>
                      </MapUIProvider>
                    </OverlayProvider>
                  }
                />
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
