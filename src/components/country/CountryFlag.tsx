import React from "react";
import type { FlagSize } from "../types/flag";
import { getFlagUrl } from "../utils/countryData";

type FlagImageProps = {
  isoCode: string;
  size?: FlagSize;
  alt?: string;
  style?: React.CSSProperties;
};

export function CountryFlag({
  isoCode,
  size = "32x24",
  alt,
  style,
}: FlagImageProps) {
  if (!isoCode) return null;
  const [width, height] = size.split("x").map(Number);
  return (
    <img
      src={getFlagUrl(isoCode, size)}
      alt={alt || `${isoCode} flag`}
      style={{
        width,
        height,
        objectFit: "cover",        
        ...style,
      }}
    />
  );
}