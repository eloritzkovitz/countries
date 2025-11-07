import { mockCountries } from "@test-utils/mockCountries";
import {
  filterCountries,
  filterCountriesBySearch,
  getFilteredIsoCodes,
  createSelectFilter,
} from "./countryFilters";

describe("countryFilters utils", () => {
  const countries = mockCountries;

  describe("filterCountriesBySearch", () => {
    it("returns all countries if search is empty", () => {
      expect(filterCountriesBySearch(countries, "")).toEqual(countries);
    });
    it("filters by name (case-insensitive, accent-insensitive)", () => {
      expect(filterCountriesBySearch(countries, "france")).toEqual([
        countries[0],
      ]);
      expect(filterCountriesBySearch(countries, "germany")).toEqual([
        countries[2],
      ]);
      expect(filterCountriesBySearch(countries, "gua")).toEqual([countries[1]]);
    });
    it("returns empty array if no match", () => {
      expect(filterCountriesBySearch(countries, "xyz")).toEqual([]);
    });
  });

  describe("filterCountries", () => {
    it("filters by region", () => {
      expect(filterCountries(countries, { selectedRegion: "Europe" })).toEqual([
        countries[0],
        countries[2],
      ]);
    });
    it("filters by subregion", () => {
      expect(
        filterCountries(countries, { selectedSubregion: "Caribbean" })
      ).toEqual([countries[1]]);
    });
    it("filters by sovereignty", () => {
      expect(
        filterCountries(countries, { selectedSovereignty: "Dependency" })
      ).toEqual([countries[1]]);
    });
    it("filters by overlayCountries", () => {
      expect(
        filterCountries(countries, { overlayCountries: ["FR", "DE"] })
      ).toEqual([countries[0], countries[2]]);
    });
    it("filters by search and region together", () => {
      expect(
        filterCountries(countries, {
          search: "germany",
          selectedRegion: "Europe",
        })
      ).toEqual([countries[2]]);
    });
  });

  describe("getFilteredIsoCodes", () => {
    const overlays = [
      { id: "o1", countries: ["FR", "DE"] },
      { id: "o2", countries: ["GP"] },
    ];
    it("returns all iso codes if overlays are 'all'", () => {
      expect(
        getFilteredIsoCodes(countries, overlays as any, {
          o1: "all",
          o2: "all",
        })
      ).toEqual(["FR", "GP", "DE"]);
    });
    it("filters to only overlay countries if 'only'", () => {
      expect(
        getFilteredIsoCodes(countries, overlays as any, { o1: "only" })
      ).toEqual(["FR", "DE"]);
    });
    it("excludes overlay countries if 'exclude'", () => {
      expect(
        getFilteredIsoCodes(countries, overlays as any, { o2: "exclude" })
      ).toEqual(["FR", "DE"]);
    });
  });

  describe("createSelectFilter", () => {
    it("creates a select filter config", () => {
      const filter = createSelectFilter(
        "region",
        "Region",
        (opts) => opts.map((o) => ({ value: o, label: o })),
        (props) => props.value,
        (props, val) => {
          props.value = val;
        }
      );
      expect(filter.key).toBe("region");
      expect(filter.label).toBe("Region");
      expect(filter.type).toBe("select");
      // Test getOptions
      expect(filter.getOptions(["A", "B"])).toEqual([
        { value: "A", label: "A" },
        { value: "B", label: "B" },
      ]);
    });
  });
});
