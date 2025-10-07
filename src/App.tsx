import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CountryDataProvider } from "./context/CountryDataContext";
import { OverlayProvider } from "./context/OverlayContext";
import { ThemeProvider } from "./context/ThemeContext";
import HomePage from "./pages/HomePage";
import FlagGuessGamePage from "./pages/FlagGuessGamePage";
import CountryMapPage from "./pages/CountryMapPage";

function App() {
  return (
    <ThemeProvider>
      <CountryDataProvider>
        <OverlayProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/game" element={<FlagGuessGamePage />} />
              <Route path="/map" element={<CountryMapPage />} />
            </Routes>
          </BrowserRouter>
        </OverlayProvider>
      </CountryDataProvider>
    </ThemeProvider>
  );
}

export default App;