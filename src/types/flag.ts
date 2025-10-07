// Flag type definition
export type Flag = {
  isoCode: string;
  source: FlagSource;
  style: FlagStyle;
  size: FlagSize;
};

// Flag property types
export type FlagSource = "flagcdn" | "flagsapi";
export type FlagStyle = "flat" | "shiny";
export type FlagSize = "32x24" | "64x48" | "96x72" | "160x120";