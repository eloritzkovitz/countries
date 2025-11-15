import { markersService } from "./markersService";
import { vi } from "vitest";

// Mock the appDb import
vi.mock("@utils/db", () => {
  const markersMock = {
    toArray: vi.fn(),
    clear: vi.fn(),
    bulkAdd: vi.fn(),
    add: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  };
  return {
    appDb: { markers: markersMock },
    __markersMock: markersMock,
  };
});

// Type assertion to access __markersMock
const { __markersMock: markersMock } = (await import(
  "@utils/db"
)) as unknown as {
  __markersMock: {
    toArray: ReturnType<typeof vi.fn>;
    clear: ReturnType<typeof vi.fn>;
    bulkAdd: ReturnType<typeof vi.fn>;
    add: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
};

describe("markersService", () => {
  beforeEach(() => {
    Object.values(markersMock).forEach((fn) => fn.mockReset());
  });

  it("loads markers", async () => {
    markersMock.toArray.mockResolvedValueOnce([
      { id: "1", name: "Test Marker" },
    ]);
    const markers = await markersService.load();
    expect(markers).toEqual([{ id: "1", name: "Test Marker" }]);
  });

  it("saves markers (with markers)", async () => {
    const markers = [{ id: "1", name: "Test Marker" }];
    await markersService.save(markers as any);
    expect(markersMock.clear).toHaveBeenCalled();
    expect(markersMock.bulkAdd).toHaveBeenCalledWith(markers);
  });

  it("saves markers (empty array)", async () => {
    await markersService.save([]);
    expect(markersMock.clear).toHaveBeenCalled();
    expect(markersMock.bulkAdd).not.toHaveBeenCalled();
  });

  it("adds a marker", async () => {
    const marker = { id: "2", name: "New Marker" };
    await markersService.add(marker as any);
    expect(markersMock.add).toHaveBeenCalledWith(marker);
  });

  it("edits a marker", async () => {
    const marker = { id: "3", name: "Edit Marker" };
    await markersService.edit(marker as any);
    expect(markersMock.put).toHaveBeenCalledWith(marker);
  });

  it("removes a marker", async () => {
    await markersService.remove("4");
    expect(markersMock.delete).toHaveBeenCalledWith("4");
  });
});
