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
    <ul className="list-none p-0 m-0 w-full">
      {countries.map((country) => {
        const isHighlighted = highlightIsoCode === country.isoCode;
        return (
          <li
            key={country.isoCode}
            onClick={() => onCountryInfo ? onCountryInfo(country) : onSelect(country.isoCode)}
            onMouseEnter={() => onHover(country.isoCode)}
            onMouseLeave={() => onHover(null)}
            className={`px-4 py-2 my-1 rounded cursor-pointer flex items-center gap-3 transition
              ${isHighlighted ? "bg-blue-50 font-bold" : ""}
            `}
          >
            <CountryFlag isoCode={country.isoCode} />
            <span>{country.name}</span>
          </li>
        );
      })}
    </ul>
  );
}