import { useEffect, useState } from "react";
import { DEFAULT_MAP_SETTINGS } from "../config/constants";

export function useGeoData() {
  const [geoData, setGeoData] = useState<any | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(DEFAULT_MAP_SETTINGS.geoUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load map data");
        return res.json();
      })
      .then((data) => {
        setGeoData(data);
        setLoading(false);
      })
      .catch((err) => {
        setGeoError(err.message);
        setLoading(false);
      });
  }, []);

  return { geoData, geoError, loading };
}