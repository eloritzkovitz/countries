import React from "react";
import type { Flag } from "../../types/flag";
import { getFlagUrl } from "../../features/countries/utils/countryData";

export function CountryFlag({ flag, alt, style }: { flag: Flag; alt?: string; style?: React.CSSProperties }) {
  const [width, height] = flag.size.split("x").map(Number);
  return (
    <img
      src={getFlagUrl(flag.isoCode, flag.size, flag.source, flag.style)}
      alt={alt || `${flag.isoCode} flag`}
      width={width}
      height={height}
      className="inline-block rounded"
      style={style}
    />
  );
}