// Flag type definition
export type Flag = {
  isoCode: string;
  source: FlagSource;
  style: FlagStyle;
  size?: FlagSize;
};

// Flag property types
export type FlagSource = "flagcdn" | "flagsapi" | "svg";
export type FlagStyle = "flat" | "shiny";
export type FlagSize = "16" | "24" | "32" | "48" | "64";

// Sovereignty group definition
export type SovereigntyGroup = {
  name: string;
  countries?: { name: string; isoCode: string }[];
  dependencies?: { name: string; isoCode: string }[];
  regions?: { name: string; isoCode: string }[];
  territories?: { name: string; isoCode: string }[];
  disputes?: { name: string; isoCode: string; }[];
};