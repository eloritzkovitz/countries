import { CountryWithFlag } from "@components";

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
    return <CountryWithFlag isoCode={country.isoCode} name={country.name} />;
  }
  if (code) return <span>{code}</span>;
  return <span className="text-gray-400 italic">No country</span>;
}
