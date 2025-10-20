import React from "react";
import type { Flag } from "@types";
import { getFlagUrl } from "@features/countries/utils/countryData";
import * as Flags from "country-flag-icons/react/3x2";

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
    const FlagSvg = Flags[flag.isoCode.toUpperCase() as keyof typeof Flags];
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