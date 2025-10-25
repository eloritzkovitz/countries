import { CountryCell } from "../components/CountryCell";
import type { Option } from "@types";

export function mapCountryOptionsWithFlags(
  options: Option[],
  countryData: any
) {
  return options.map((opt) =>
    opt.value
      ? {
          ...opt,
          label: (
            <span className="flex items-center gap-2">
              <CountryCell code={opt.value} countryData={countryData} />
            </span>
          ),
        }
      : opt
  );
}
