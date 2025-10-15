import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CountryDataProvider } from "./context/CountryDataContext";
import { MapUIProvider } from "./context/MapUIContext";
import { OverlayProvider } from "./context/OverlayContext";
import { ThemeProvider } from "./context/ThemeContext";
import { UIProvider } from "./context/UIContext";
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
                      <CountryMapPage />
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
