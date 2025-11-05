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
  | "Overseas Region"
  | "Unrecognized"
  | "Disputed"
  | "Unknown";

// Sovereignty group definition
export type SovereigntyGroup = {
  name: string;
  countries?: { name: string; isoCode: string }[];
  dependencies?: { name: string; isoCode: string }[];
  regions?: { name: string; isoCode: string }[];
  territories?: { name: string; isoCode: string }[];
  disputes?: { name: string; isoCode: string; }[];
};
