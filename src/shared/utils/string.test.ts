import {
  capitalize,
  capitalizeWords,
  truncate,
  normalizeString,
  slugify,
} from "./string";

describe("string utils", () => {
  it("capitalize capitalizes the first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
    expect(capitalize("h")).toBe("H");
    expect(capitalize("")).toBe("");
  });

  it("capitalizeWords capitalizes each word", () => {
    expect(capitalizeWords("hello world")).toBe("Hello World");
    expect(capitalizeWords("foo bar baz")).toBe("Foo Bar Baz");
    expect(capitalizeWords("a")).toBe("A");
    expect(capitalizeWords("")).toBe("");
  });

  it("truncate adds ellipsis if needed", () => {
    expect(truncate("hello world", 5)).toBe("hello…");
    expect(truncate("short", 10)).toBe("short");
    expect(truncate("", 2)).toBe("");
  });

  it("normalizeString removes diacritics and lowercases", () => {
    expect(normalizeString("Élégant")).toBe("elegant");
    expect(normalizeString("Café")).toBe("cafe");
    expect(normalizeString("HELLO")).toBe("hello");
    expect(normalizeString("")).toBe("");
  });

  it("slugify creates a URL-friendly slug", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
    expect(slugify("Café au lait")).toBe("cafe-au-lait");
    expect(slugify("  Multiple   Spaces  ")).toBe("multiple-spaces");
    expect(slugify("")).toBe("");
  });
});
