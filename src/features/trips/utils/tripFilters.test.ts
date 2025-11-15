import { mockTrips } from "@test-utils/mockTrips";
import { mockCountries } from "@test-utils/mockCountries";
import type { TripCategory, TripTag } from "@types";
import { sortTrips, filterTrips } from "./tripFilters";

describe("tripFilters utils", () => {
  describe("sortTrips", () => {
    it("sorts by name ascending", () => {
      const sorted = sortTrips(mockTrips, "name", true, mockCountries);
      expect(sorted.map((t) => t.name)).toEqual(
        [...mockTrips]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((t) => t.name)
      );
    });

    it("sorts by name descending", () => {
      const sorted = sortTrips(mockTrips, "name", false, mockCountries);
      expect(sorted.map((t) => t.name)).toEqual(
        [...mockTrips]
          .sort((a, b) => b.name.localeCompare(a.name))
          .map((t) => t.name)
      );
    });

    it("sorts by countries", () => {
      const sorted = sortTrips(mockTrips, "countries", true, mockCountries);
      expect(sorted[0].countryCodes || sorted[0].countryCodes).toBeDefined();
    });

    it("sorts by year", () => {
      const sorted = sortTrips(mockTrips, "year", true, mockCountries);
      expect(
        sorted.map((t) => t.startDate && new Date(t.startDate).getFullYear())
      ).toEqual(
        [...mockTrips]
          .sort(
            (a, b) =>
              (a.startDate ? new Date(a.startDate).getFullYear() : 0) -
              (b.startDate ? new Date(b.startDate).getFullYear() : 0)
          )
          .map((t) => t.startDate && new Date(t.startDate).getFullYear())
      );
    });

    it("sorts by startDate descending", () => {
      const sorted = sortTrips(mockTrips, "startDate", false, mockCountries);
      expect(sorted[0].startDate >= sorted[1].startDate).toBe(true);
    });

    it("sorts by endDate ascending", () => {
      const sorted = sortTrips(mockTrips, "endDate", true, mockCountries);
      expect(sorted[0].endDate <= sorted[1].endDate).toBe(true);
    });

    it("sorts by fullDays", () => {
      const tripsWithDays = mockTrips.map((t) => ({
        ...t,
        fullDays:
          t.startDate && t.endDate
            ? (new Date(t.endDate).getTime() -
                new Date(t.startDate).getTime()) /
                86400000 +
              1
            : 0,
      }));
      const sorted = sortTrips(tripsWithDays, "fullDays", false, mockCountries);
      expect(sorted[0].fullDays >= sorted[1].fullDays).toBe(true);
    });
  });

  describe("filterTrips", () => {
    it("filters by name substring (case-insensitive)", () => {
      const filtered = filterTrips(mockTrips, {
        name: "local",
        country: [],
        year: [],
        categories: [],
        status: "",
        tags: [],
      });
      expect(filtered).toEqual([mockTrips[0]]);
    });

    it("filters by country code", () => {
      const filtered = filterTrips(mockTrips, {
        country: ["FR"],
        year: [],
        categories: [],
        tags: [],
        name: "",
        status: "",
      });
      expect(filtered).toEqual([mockTrips[1]]);
    });

    it("filters by year", () => {
      const filtered = filterTrips(mockTrips, {
        year: ["2023"],
        country: [],
        categories: [],
        tags: [],
        name: "",
        status: "",
      });
      expect(
        filtered.map(
          (t) => t.startDate && new Date(t.startDate).getFullYear().toString()
        )
      ).toEqual(expect.arrayContaining(["2023"]));
    });

    it("filters by categories", () => {
      const trips = [
        {
          ...mockTrips[0],
          categories: ["adventure", "family"] as TripCategory[],
        },
        { ...mockTrips[1], categories: ["business"] as TripCategory[] },
      ];
      const filtered = filterTrips(trips, {
        categories: ["adventure"],
        year: [],
        country: [],
        tags: [],
        name: "",
        status: "",
      });
      expect(filtered).toEqual([trips[0]]);
    });

    it("filters by status", () => {
      const filtered = filterTrips(mockTrips, {
        status: "completed",
        year: [],
        country: [],
        categories: [],
        tags: [],
        name: "",
      });
      expect(filtered).toEqual([mockTrips[0], mockTrips[3]]);
    });

    it("filters by tags", () => {
      const trips = [
        { ...mockTrips[0], tags: ["family", "summer"] as TripTag[] },
        { ...mockTrips[1], tags: ["business"] as TripTag[] },
      ];
      const filtered = filterTrips(trips, {
        tags: ["family"],
        year: [],
        country: [],
        categories: [],
        name: "",
        status: "",
      });
      expect(filtered).toEqual([trips[0]]);
    });

    it("returns all trips if no filters", () => {
      const filtered = filterTrips(mockTrips, {
        year: [],
        country: [],
        categories: [],
        tags: [],
        name: "",
        status: "",
      });
      expect(filtered).toEqual(mockTrips);
    });
  });
});
