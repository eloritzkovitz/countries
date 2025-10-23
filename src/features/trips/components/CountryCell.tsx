import { CountryFlag } from "@components";

export function CountryCell({
  code,
  countryData,
}: {
  code?: string;
  countryData: any;
}) {
  const country = code
    ? countryData.countries.find(
        (c: any) => c.isoCode?.toLowerCase() === code.toLowerCase()
      )
    : null;
  if (country) {
    return (
      <span className="trips-country-item">
        <CountryFlag
          flag={{
            isoCode: country.isoCode,
            source: "svg",
            style: "flat",
            size: "32x24",
          }}
        />
        <span className="trips-country-name">{country.name}</span>
      </span>
    );
  }
  if (code) return <span>{code}</span>;
  return <span className="text-gray-400 italic">No country</span>;
}
