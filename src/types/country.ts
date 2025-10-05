// Country type definition
export type Country = {
  name: string;
  flag: string;
  flagURL?: string;
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

// Sovereignty type definitions
export type SovereigntyType = "Sovereign" | "Dependency" | "Partially Recognized" | "Unrecognized" | "Disputed" | "Unknown";
