import { mockTrips } from "@test-utils/mockTrips";
import {
  getYearsFromTrips,
  computeVisitedCountriesFromTrips,
  getVisitedCountriesForYear,
  getVisitedCountriesUpToYear,
} from "./visits";

describe("visits utils", () => {
  describe("getYearsFromTrips", () => {
    it("returns unique sorted years from trips", () => {
      const years = getYearsFromTrips(mockTrips);
      expect(years).toEqual([2022, 2023, 2099]);
    });

    it("returns an empty array if no trips", () => {
      expect(getYearsFromTrips([])).toEqual([]);
    });

    it("ignores trips without a valid startDate", () => {
      const trips = [
        { ...mockTrips[0], startDate: undefined } as any,
        { ...mockTrips[1], startDate: undefined } as any,
      ];
      expect(getYearsFromTrips(trips)).toEqual([]);
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

  describe("getVisitedCountriesForYear", () => {
    it("returns all countries visited in a specific year", () => {
      const result = getVisitedCountriesForYear(mockTrips, 2023);
      expect(result).toEqual(expect.arrayContaining(["US", "FR", "DE"]));
      expect(result).not.toContain("CA");
      expect(result).not.toContain("JP");
    });

    it("returns all countries visited in a year with overlapping trips", () => {
      const result = getVisitedCountriesForYear(mockTrips, 2022);
      expect(result).toEqual(expect.arrayContaining(["CA"]));
      expect(result).not.toContain("US");
      expect(result).not.toContain("FR");
      expect(result).not.toContain("DE");
      expect(result).not.toContain("JP");
    });

    it("returns an empty array if no trips in the year", () => {
      expect(getVisitedCountriesForYear(mockTrips, 1999)).toEqual([]);
    });

    it("ignores trips with no countryCodes", () => {
      const trips = [
        { ...mockTrips[0], countryCodes: [] } as any,
        { ...mockTrips[1], countryCodes: undefined } as any,
      ];
      expect(getVisitedCountriesForYear(trips, 2023)).toEqual([]);
    });
  });

  describe("getVisitedCountriesUpToYear", () => {
    it("returns all countries visited up to and including a year (excluding future trips)", () => {
      const thisYear = new Date().getFullYear();
      const result = getVisitedCountriesUpToYear(mockTrips, thisYear);
      // Only include trips that have started as of today
      if (thisYear >= 2023) {
        expect(result).toEqual(
          expect.arrayContaining(["US", "FR", "DE", "CA"])
        );
        expect(result).not.toContain("JP"); // Future trip
      } else if (thisYear === 2022) {
        expect(result).toEqual(expect.arrayContaining(["CA"]));
        expect(result).not.toContain("US");
        expect(result).not.toContain("FR");
        expect(result).not.toContain("DE");
        expect(result).not.toContain("JP");
      } else {
        expect(result).toEqual([]);
      }
    });

    it("returns only countries visited up to a specific past year", () => {
      const result = getVisitedCountriesUpToYear(mockTrips, 2022);
      expect(result).toEqual(expect.arrayContaining(["CA"]));
      expect(result).not.toContain("US");
      expect(result).not.toContain("FR");
      expect(result).not.toContain("DE");
      expect(result).not.toContain("JP");
    });

    it("returns an empty array if no trips up to the year", () => {
      expect(getVisitedCountriesUpToYear(mockTrips, 1999)).toEqual([]);
    });

    it("ignores trips with no countryCodes or invalid startDate", () => {
      const trips = [
        { ...mockTrips[0], startDate: undefined, countryCodes: ["US"] } as any,
        { ...mockTrips[1], startDate: "2023-01-01", countryCodes: [] } as any,
      ];
      expect(getVisitedCountriesUpToYear(trips, 2023)).toEqual([]);
    });
  });
});
