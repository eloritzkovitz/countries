import React from "react";
import * as Flags from "country-flag-icons/react/3x2";
import { SOVEREIGN_FLAG_MAP } from "../../constants/sovereignty";
import type { Flag } from "../../types/flag";
import { getFlagUrl } from "../../utils/countryData";

interface CountryFlagProps {
  flag: Flag;
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
};

export function CountryFlag({ flag, alt, style, className }: CountryFlagProps) {
  // Convert flag.size (string | undefined) to number, default to 32
  const size = Number(flag.size);
  // For SVG, use a 4:3 aspect ratio (e.g., 32x24)
  const validSize = Number.isFinite(size) && size > 0 ? size : 32;
  const width = validSize;
  const height = Math.round(validSize * 0.75);

  if (flag.source === "svg") {
    const mappedIso =
      SOVEREIGN_FLAG_MAP?.[flag.isoCode.toUpperCase()] ||
      flag.isoCode.toUpperCase();
    const FlagSvg = Flags[mappedIso as keyof typeof Flags];
    if (FlagSvg) {
      return (
        <FlagSvg
          title={alt || `${flag.isoCode} flag`}
          style={{ width, height, borderRadius: 4, ...style }}
          className={className}
        />
      );
    }
    // Fallback: white flag
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
        className={className}
        title={alt || `${flag.isoCode} flag`}
      />
    );
  }

  // Default: use URL-based flag
  return (
    <img
      src={getFlagUrl(flag.isoCode, flag.source, flag.style, flag.size)}
      alt={alt || `${flag.isoCode} flag`}
      width={width}
      height={height}
      className={`${className ?? ""}`}
      style={style}
      loading="lazy"
      decoding="async"
    />
  );
}
