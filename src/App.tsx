import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CountryDataProvider } from "./context/CountryDataContext";
import { OverlayProvider } from "./context/OverlayContext";
import HomePage from "./pages/HomePage";
import FlagGuessGamePage from "./pages/FlagGuessGamePage";
import CountryMapPage from "./pages/CountryMapPage";

function App() {
  return (
    <CountryDataProvider>
      <OverlayProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/flag-guess" element={<FlagGuessGamePage />} />
            <Route path="/country-map" element={<CountryMapPage />} />
        </Routes>
      </BrowserRouter>
      </OverlayProvider>
    </CountryDataProvider>
  );
}  

export default App;