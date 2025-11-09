import {
  getCountryIsoCode,
  getCountryByIsoCode,
  createCountryLookup,
  getFlagUrl,
  getCountriesWithOwnFlag,
  getRandomCountry,
  getLanguagesDisplay,
  getSovereigntyInfoForTerritory,
  getVisitedCountries,
} from "./countryData";

// Mock constants
vi.mock("@constants", () => ({
  EXCLUDED_ISO_CODES: ["XX"],
  SOVEREIGN_FLAG_MAP: { YY: "US" },
}));
vi.mock("@features/countries/constants/sovereignties", () => ({
  SOVEREIGN_DEPENDENCIES: {
    US: {
      name: "United States",
      dependencies: [{ isoCode: "GU" }],
      regions: [{ isoCode: "PR" }],
      disputes: [{ isoCode: "VI" }],
    },
  },
}));

describe("countryData utils", () => {
  describe("getCountryIsoCode", () => {
    it("extracts ISO code from ISO_A2", () => {
      expect(getCountryIsoCode({ ISO_A2: "us" })).toBe("US");
    });
    it("extracts ISO code from ISO3166-1-Alpha-2", () => {
      expect(getCountryIsoCode({ "ISO3166-1-Alpha-2": "fr" })).toBe("FR");
    });
    it("returns undefined if not found", () => {
      expect(getCountryIsoCode({})).toBeUndefined();
    });
  });

  describe("getCountryByIsoCode", () => {
    const countries = [{ isoCode: "US", name: "United States" }];
    it("finds country by ISO code", () => {
      expect(getCountryByIsoCode("US", { countries })).toEqual(countries[0]);
    });
    it("returns null if not found", () => {
      expect(getCountryByIsoCode("FR", { countries })).toBeNull();
    });
    it("returns null for invalid input", () => {
      expect(getCountryByIsoCode("", null as any)).toBeNull();
    });
  });

  describe("createCountryLookup", () => {
    it("creates a lookup map by isoCode", () => {
      const countries = [{ isoCode: "US", name: "United States" }];
      const lookup = createCountryLookup(countries);
      expect(lookup["us"]).toEqual(countries[0]);
    });
  });

  describe("getFlagUrl", () => {
    it("returns flagcdn url by default", () => {
      expect(getFlagUrl("us")).toBe("https://flagcdn.com/32x24/us.png");
    });
    it("returns flagsapi url", () => {
      expect(getFlagUrl("us", "64x48", "flagsapi", "shiny")).toBe(
        "https://flagsapi.com/US/shiny/64.png"
      );
    });
    it("returns empty string for invalid iso", () => {
      expect(getFlagUrl("")).toBe("");
    });
    it("uses SOVEREIGN_FLAG_MAP for borrowed flags", () => {
      expect(getFlagUrl("yy")).toBe("https://flagcdn.com/32x24/us.png");
    });
  });

  describe("getCountriesWithOwnFlag", () => {
    it("filters out excluded iso codes", () => {
      const countries = [
        { isoCode: "US", flag: true },
        { isoCode: "XX", flag: true },
        { isoCode: "FR", flag: false },
      ];
      const result = getCountriesWithOwnFlag(countries as any);
      expect(result).toEqual([{ isoCode: "US", flag: true }]);
    });
  });

  describe("getRandomCountry", () => {
    it("returns a country from the list", () => {
      const countries = [{ isoCode: "US" }, { isoCode: "FR" }];
      const result = getRandomCountry(countries as any);
      expect(countries).toContainEqual(result);
    });
  });

  describe("getLanguagesDisplay", () => {
    it("returns comma-separated string", () => {
      expect(getLanguagesDisplay(["English", "French"])).toBe(
        "English, French"
      );
    });
    it("returns 'None' for empty or undefined", () => {
      expect(getLanguagesDisplay([])).toBe("None");
      expect(getLanguagesDisplay(undefined)).toBe("None");
    });
  });

  describe("getSovereigntyInfoForTerritory", () => {
    it("returns dependency info", () => {
      expect(getSovereigntyInfoForTerritory("GU")).toEqual({
        type: "Dependency",
        sovereign: { name: "United States", isoCode: "US" },
      });
    });
    it("returns region info", () => {
      expect(getSovereigntyInfoForTerritory("PR")).toEqual({
        type: "Overseas Region",
        sovereign: { name: "United States", isoCode: "US" },
      });
    });
    it("returns dispute info", () => {
      expect(getSovereigntyInfoForTerritory("VI")).toEqual({
        type: "Disputed",
        sovereign: { name: "United States", isoCode: "US" },
      });
    });
    it("returns Sovereign for unknown", () => {
      expect(getSovereigntyInfoForTerritory("US")).toEqual({
        type: "Sovereign",
      });
    });
    it("returns undefined type for empty input", () => {
      expect(getSovereigntyInfoForTerritory("")).toEqual({ type: undefined });
    });
  });

  describe("getVisitedCountries", () => {
    const countries = [
      { isoCode: "US", name: "United States" },
      { isoCode: "FR", name: "France" },
      { isoCode: "DE", name: "Germany" },
    ];

    it("returns only countries whose isoCode is in the visited overlay", () => {
      const overlays = [
        { id: "visited-countries", countries: ["US", "DE"] },
        { id: "other-overlay", countries: ["FR"] },
      ];
      const result = getVisitedCountries(countries as any, overlays as any);
      expect(result).toEqual([
        { isoCode: "US", name: "United States" },
        { isoCode: "DE", name: "Germany" },
      ]);
    });

    it("returns an empty array if no visited overlay is present", () => {
      const overlays = [{ id: "other-overlay", countries: ["FR"] }];
      const result = getVisitedCountries(countries as any, overlays as any);
      expect(result).toEqual([]);
    });

    it("returns an empty array if visited overlay has no countries", () => {
      const overlays = [{ id: "visited-countries", countries: [] }];
      const result = getVisitedCountries(countries as any, overlays as any);
      expect(result).toEqual([]);
    });

    it("returns an empty array if overlays is empty", () => {
      const overlays: any[] = [];
      const result = getVisitedCountries(countries as any, overlays);
      expect(result).toEqual([]);
    });

    it("returns an empty array if countries is empty", () => {
      const overlays = [{ id: "visited-countries", countries: ["US"] }];
      const result = getVisitedCountries([], overlays as any);
      expect(result).toEqual([]);
    });
  });
});
