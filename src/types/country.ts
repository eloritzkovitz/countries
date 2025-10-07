// Country type definition
export type Country = {
  name: string;
  flag: string;
  callingCode: string;
  isoCode: string;
  iso3Code: string;
  region: string;
  subregion?: string;
  capital?: string;
  population?: number;
  currency?: string;
  languages?: string[];
  sovereigntyType?: SovereigntyType;
};

// Sovereignty type definition
export type SovereigntyType =
  | "Sovereign"
  | "Dependency"
  | "Partially Recognized"
  | "Unrecognized"
  | "Disputed"
  | "Unknown";

// Country data context type definition
export type CountryDataContextType = {
  countries: any[];
  currencies: Record<string, string>;
  allRegions: string[];
  allSubregions: string[];
  allSovereigntyTypes: string[];
  loading: boolean;
  error: string | null;
};
