import { CountryFlag } from "./CountryFlag";
import type { Country } from "../../types/country";

type CountryListProps = {
  countries: Country[];
  selectedIsoCode: string | null;
  hoveredIsoCode: string | null;
  onSelect: (isoCode: string | null) => void;
  onHover: (isoCode: string | null) => void;
  onCountryInfo?: (country: Country) => void;
};

export function CountryList({
  countries,
  selectedIsoCode,
  hoveredIsoCode,
  onSelect,
  onHover,
  onCountryInfo
}: CountryListProps) {
  const highlightIsoCode = hoveredIsoCode || selectedIsoCode;
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        width: "100%",
      }}
    >
      {countries.map((country) => (
        <li
          key={country.isoCode}
          onClick={() => onCountryInfo ? onCountryInfo(country) : onSelect(country.isoCode)}          
          onMouseEnter={() => onHover(country.isoCode)}
          onMouseLeave={() => onHover(null)}
          style={{
            padding: "0.5rem 1rem",
            margin: "0.2rem 0",
            borderRadius: 6,
            cursor: "pointer",
            background:
              highlightIsoCode === country.isoCode ? "#e6f0fa" : "transparent",
            fontWeight:
              highlightIsoCode === country.isoCode ? "bold" : "normal",
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
          }}
        >
          <CountryFlag isoCode={country.isoCode} />          
          <span>{country.name}</span>
        </li>
      ))}
    </ul>
  );
}