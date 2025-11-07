import { formatDate } from "./date";

describe("formatDate", () => {
  it("returns empty string for undefined input", () => {
    expect(formatDate(undefined)).toBe("");
  });

  it("returns empty string for empty input", () => {
    expect(formatDate("")).toBe("");
  });

  it("formats a valid date string (default locale)", () => {
    // "2023-01-15" in en-GB is "15/01/2023"
    expect(formatDate("2023-01-15")).toBe("15/01/2023");
  });

  it("formats a valid date string (US locale)", () => {
    // "2023-01-15" in en-US is "1/15/2023"
    expect(formatDate("2023-01-15", "en-US")).toBe("1/15/2023");
  });

  it("handles invalid date string gracefully", () => {
    // Invalid date returns "Invalid Date" in most locales
    expect(formatDate("not-a-date")).toMatch(/Invalid/);
  });
});
