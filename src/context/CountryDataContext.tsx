import { createContext, useContext, useEffect, useState } from "react";
import { getAllRegions, getAllSubregions } from "../utils/countryFilters";

type CountryDataContextType = {
  countries: any[];
  currencies: Record<string, string>;
  allRegions: string[];
  allSubregions: string[];  
  loading: boolean;
};

export const CountryDataContext = createContext<CountryDataContextType>({
  countries: [],
  currencies: {},
  allRegions: [],
  allSubregions: [],  
  loading: true,
});

// Custom hook for easy context access
export function useCountryData() {
  return useContext(CountryDataContext);
}

// Provider component to wrap the app and provide country data context
export function CountryDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [countries, setCountries] = useState<any[]>([]);
  const [currencies, setCurrencies] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [allRegions, setAllRegions] = useState<string[]>([]);
  const [allSubregions, setAllSubregions] = useState<string[]>([]);  

  // Dynamically import country data to optimize initial load time
  useEffect(() => {
    let mounted = true;
    const countryDataUrl =
      import.meta.env.VITE_COUNTRY_DATA_URL || "/data/countries.json";
    const currencyDataUrl =
      import.meta.env.VITE_CURRENCY_DATA_URL || "/data/currencies.json";

    Promise.all([
      fetch(countryDataUrl).then((res) => res.json()),
      fetch(currencyDataUrl).then((res) => res.json()),
    ]).then(([countryData, currencyData]) => {
      if (mounted) {
        setCountries(countryData);
        setAllRegions(getAllRegions(countryData));
        setAllSubregions(getAllSubregions(countryData));
        setCurrencies(currencyData);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <CountryDataContext.Provider
      value={{ countries, currencies, allRegions, allSubregions, loading }}
    >
      {children}
    </CountryDataContext.Provider>
  );
}
