import React from "react";
import * as Flags from "country-flag-icons/react/3x2";
import { SOVEREIGN_FLAG_MAP } from "@config/constants";
import { getFlagUrl } from "@features/countries/utils/countryData";
import type { Flag } from "@types";

export function CountryFlag({
  flag,
  alt,
  style,
}: {
  flag: Flag;
  alt?: string;
  style?: React.CSSProperties;
}) {
  const [width, height] = flag.size.split("x").map(Number);

  if (flag.source === "svg") {
    const mappedIso =
      SOVEREIGN_FLAG_MAP?.[flag.isoCode.toUpperCase()] || flag.isoCode.toUpperCase();
    const FlagSvg = Flags[mappedIso as keyof typeof Flags];
    if (FlagSvg) {
      return (
        <FlagSvg
          title={alt || `${flag.isoCode} flag`}
          style={{ width, height, borderRadius: 4, ...style }}
        />
      );
    }
    // fallback: white flag
    return (
      <div
        style={{
          width,
          height,
          background: "#fff",
          borderRadius: 4,
          display: "inline-block",
          ...style,
        }}
        title={alt || `${flag.isoCode} flag`}
      />
    );
  }

  // Default: use URL-based flag
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