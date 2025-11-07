import { mockCountries } from "@test-utils/mockCountries";
import {
  mapOptions,
  getAllRegions,
  getAllSubregions,
  getSubregionsForRegion,
  getAllSovereigntyTypes,
  sortCountries,
} from "./countryList";
import type { Country, SovereigntyType } from "@types";

describe("countryList utils", () => {
  const countries = mockCountries;

  it("mapOptions maps strings to FilterOption objects", () => {
    expect(mapOptions(["foo", "bar"])).toEqual([
      { value: "foo", label: "Foo" },
      { value: "bar", label: "Bar" },
    ]);
  });

  describe("getAllRegions", () => {
    it("returns unique, sorted regions", () => {
      expect(getAllRegions(countries)).toEqual(["Americas", "Europe"]);
    });
    it("skips undefined regions", () => {
      const testCountries = [
        { region: "Europe" },
        { region: undefined },
        { region: "Americas" },
        {},
      ] as Partial<Country>[];
      expect(getAllRegions(testCountries as Country[])).toEqual([
        "Americas",
        "Europe",
      ]);
    });
  });

  describe("getAllSubregions", () => {
    it("returns unique, sorted subregions", () => {
      expect(getAllSubregions(countries)).toEqual([
        "Caribbean",
        "Western Europe",
      ]);
    });
    it("skips undefined subregions", () => {
      const testCountries = [
        { subregion: "Caribbean" },
        { subregion: undefined },
        {},
      ] as Partial<Country>[];
      expect(getAllSubregions(testCountries as Country[])).toEqual([
        "Caribbean",
      ]);
    });
  });

  describe("getSubregionsForRegion", () => {
    it("returns subregions for a region", () => {
      expect(getSubregionsForRegion(countries, "Europe")).toEqual([
        "Western Europe",
      ]);
      expect(getSubregionsForRegion(countries, "Americas")).toEqual([
        "Caribbean",
      ]);
    });
    it("skips undefined subregions", () => {
      const testCountries = [
        { region: "Europe", subregion: "Western Europe" },
        { region: "Europe", subregion: undefined },
        { region: "Americas", subregion: "Caribbean" },
      ] as Partial<Country>[];
      expect(
        getSubregionsForRegion(testCountries as Country[], "Europe")
      ).toEqual(["Western Europe"]);
    });
  });

  describe("getAllSovereigntyTypes", () => {
    it("returns unique, sorted sovereignty types", () => {
      expect(getAllSovereigntyTypes(countries)).toEqual([
        "Dependency",
        "Sovereign",
      ]);
    });
    it("skips undefined sovereigntyType", () => {
      const testCountries = [
        { sovereigntyType: "Sovereign" as SovereigntyType },
        { sovereigntyType: undefined },
        {},
      ] as Partial<Country>[];
      expect(getAllSovereigntyTypes(testCountries as Country[])).toEqual([
        "Sovereign",
      ]);
    });
  });

  describe("sortCountries", () => {
    it("sorts by name ascending", () => {
      const sorted = sortCountries(countries, "name-asc");
      expect(sorted.map((c) => c.name)).toEqual([
        "France",
        "Germany",
        "Guadeloupe",
      ]);
    });

    it("sorts by name descending", () => {
      const sorted = sortCountries(countries, "name-desc");
      expect(sorted.map((c) => c.name)).toEqual([
        "Guadeloupe",
        "Germany",
        "France",
      ]);
    });

    it("sorts by iso ascending", () => {
      const sorted = sortCountries(countries, "iso-asc");
      expect(sorted.map((c) => c.isoCode)).toEqual(["DE", "FR", "GP"]);
    });

    it("sorts by iso descending", () => {
      const sorted = sortCountries(countries, "iso-desc");
      expect(sorted.map((c) => c.isoCode)).toEqual(["GP", "FR", "DE"]);
    });

    it("calls the default case in sortCountries (return 0)", () => {
      const arr: Country[] = [
        {
          name: "A",
          isoCode: "A",
          region: "X",
          subregion: "Y",
          sovereigntyType: "Sovereign" as SovereigntyType,
          flag: "a",
          callingCode: "+1",
          iso3Code: "AAA",
        },
        {
          name: "B",
          isoCode: "B",
          region: "X",
          subregion: "Y",
          sovereigntyType: "Sovereign" as SovereigntyType,
          flag: "b",
          callingCode: "+2",
          iso3Code: "BBB",
        },
      ];
      // @ts-expect-error purposely passing an invalid sortBy
      const result = sortCountries(arr, "not-a-sort");
      expect(result).toEqual(arr);
    });

    it("sorts subregions alphabetically for a region (covers localeCompare)", () => {
      const testCountries = [
        { region: "Europe", subregion: "Zulu" },
        { region: "Europe", subregion: "Alpha" },
        { region: "Europe", subregion: "Mike" },
        { region: "Americas", subregion: "Caribbean" },
      ] as Partial<Country>[];
      expect(
        getSubregionsForRegion(testCountries as Country[], "Europe")
      ).toEqual(["Alpha", "Mike", "Zulu"]);
    });
  });
});
