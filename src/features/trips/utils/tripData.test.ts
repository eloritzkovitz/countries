import { mockTrips } from "@test-utils/mockTrips";
import {
  getCountryNames,
  getUsedCountryCodes,
  getUsedYears,
  computeVisitedCountriesFromTrips,
} from "./tripData";

const mockCountries = [
  { isoCode: "US", name: "United States" },
  { isoCode: "CA", name: "Canada" },
  { isoCode: "FR", name: "France" },
  { isoCode: "DE", name: "Germany" },
  { isoCode: "JP", name: "Japan" },
];

describe("tripData utils", () => {
  describe("getCountryNames", () => {
    it("returns comma-separated country names for a trip", () => {
      const names = getCountryNames(mockTrips[1], mockCountries);
      expect(names).toBe("France, Germany");
    });

    it("returns empty string for unknown codes", () => {
      const trip = { ...mockTrips[0], countryCodes: ["ZZ"] };
      expect(getCountryNames(trip, mockCountries)).toBe("");
    });

    it("handles mixed known and unknown codes", () => {
      const trip = { ...mockTrips[0], countryCodes: ["US", "ZZ"] };
      expect(getCountryNames(trip, mockCountries)).toBe("United States, ");
    });
  });

  describe("getUsedCountryCodes", () => {
    it("returns a set of all used country codes", () => {
      const codes = getUsedCountryCodes(mockTrips);
      expect(codes).toBeInstanceOf(Set);
      expect(Array.from(codes)).toEqual(
        expect.arrayContaining(["US", "CA", "FR", "DE", "JP"])
      );
    });

    it("returns empty set for empty trips", () => {
      expect(getUsedCountryCodes([])).toEqual(new Set());
    });
  });

  describe("getUsedYears", () => {
    it("returns all years with trips, sorted descending", () => {
      const years = getUsedYears(mockTrips);
      expect(years).toEqual([...years].sort((a, b) => b - a));
      // Should include 2022, 2023, 2099 from mockTrips
      expect(years).toEqual(expect.arrayContaining([2022, 2023, 2099]));
    });

    it("returns empty array for empty trips", () => {
      expect(getUsedYears([])).toEqual([]);
    });
  });

  describe("computeVisitedCountriesFromTrips", () => {
    it("returns unique visited country codes for past and current trips", () => {
      const visited = computeVisitedCountriesFromTrips(mockTrips);
      // Should not include JP (future trip in mockTrips)
      expect(visited).toEqual(expect.arrayContaining(["US", "CA", "FR", "DE"]));
      expect(visited).not.toContain("JP");
    });

    it("returns empty array for empty trips", () => {
      expect(computeVisitedCountriesFromTrips([])).toEqual([]);
    });
  });
});
