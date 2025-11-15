import type { Country, SovereigntyType } from "@types";

export const mockCountries: Country[] = [
  {
    name: "France",
    isoCode: "FR",
    region: "Europe",
    subregion: "Western Europe",
    sovereigntyType: "Sovereign" as SovereigntyType,
    flag: "fr",
    callingCode: "+33",
    iso3Code: "FRA",
  },
  {
    name: "Guadeloupe",
    isoCode: "GP",
    region: "Americas",
    subregion: "Caribbean",
    sovereigntyType: "Dependency" as SovereigntyType,
    flag: "gp",
    callingCode: "+590",
    iso3Code: "GLP",
  },
  {
    name: "Germany",
    isoCode: "DE",
    region: "Europe",
    subregion: "Western Europe",
    sovereigntyType: "Sovereign" as SovereigntyType,
    flag: "de",
    callingCode: "+49",
    iso3Code: "DEU",
  },
];
