import { CountryFlag } from "@features/countries";
import type { FlagSize } from "@types";

type CountryWithFlagProps = {
  isoCode: string;
  name: string;
  size?: FlagSize;
  className?: string;
};

export function CountryWithFlag({
  isoCode,
  name,
  size = "32x24",
  className = "",
}: CountryWithFlagProps) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <CountryFlag
        flag={{
          isoCode,
          source: "svg",
          style: "flat",
          size,
        }}
      />
      <span className="ml-2">{name}</span>
    </span>
  );
}
