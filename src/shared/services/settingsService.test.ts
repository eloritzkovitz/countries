import { settingsService } from "./settingsService";
import { vi } from "vitest";

// Mock the appDb import
vi.mock("@utils/db", () => {
  const settingsMock = {
    get: vi.fn(),
    put: vi.fn(),
  };
  return {
    appDb: { settings: settingsMock },
    __settingsMock: settingsMock,
  };
});

// Type assertion to access __settingsMock
const { __settingsMock: settingsMock } = (await import("@utils/db")) as unknown as {
  __settingsMock: {
    get: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
  };
};

describe("settingsService", () => {
  beforeEach(() => {
    Object.values(settingsMock).forEach((fn) => fn.mockReset());
  });

  it("loads settings from db if present", async () => {
    const dbSettings = { id: "main", homeCountry: "US", theme: "dark" };
    settingsMock.get.mockResolvedValueOnce(dbSettings);
    const result = await settingsService.load();
    expect(result).toEqual(dbSettings);
    expect(settingsMock.get).toHaveBeenCalledWith("main");
  });

  it("returns default settings if not in db", async () => {
    settingsMock.get.mockResolvedValueOnce(undefined);
    const result = await settingsService.load();
    expect(result).toEqual({
      id: "main",
      homeCountry: "",
      theme: "light",
    });
  });

  it("saves settings", async () => {
    const newSettings = { id: "main", homeCountry: "CA", theme: "light" };
    await settingsService.save(newSettings as any);
    expect(settingsMock.put).toHaveBeenCalledWith(newSettings);
  });
});
