import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { SplashScreen } from "@components";
import { CountryDataProvider } from "@contexts/CountryDataContext";
import { MapUIProvider } from "@contexts/MapUIContext";
import { MarkersProvider } from "@contexts/MarkersContext";
import { OverlayProvider } from "@contexts/OverlayContext";
import { useSettings } from "@contexts/SettingsContext";
import { TripsProvider } from "@contexts/TripsContext";
import { UIProvider } from "@contexts/UIContext";
import GamesPage from "./pages/GamesPage";
import TripsPage from "./pages/TripsPage";

function App() {
  const { loading } = useSettings();

  // Lazy load AtlasPage
  const AtlasPage = lazy(() => import("./pages/AtlasPage"));

  // Show splash screen while loading settings
  if (loading) {
    return <SplashScreen />;
  }

  return (
    <CountryDataProvider>
      <TripsProvider>
        <UIProvider>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<SplashScreen />}>
                  <OverlayProvider>
                    <MapUIProvider>
                      <MarkersProvider>
                        <AtlasPage />
                      </MarkersProvider>
                    </MapUIProvider>
                  </OverlayProvider>
                </Suspense>
              }
            />
            <Route path="/game" element={<GamesPage />} />
            <Route path="/trips" element={<TripsPage />} />
          </Routes>
        </UIProvider>
      </TripsProvider>
    </CountryDataProvider>
  );
}

export default App;
