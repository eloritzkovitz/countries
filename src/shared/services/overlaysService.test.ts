import { overlaysService } from "./overlaysService";
import { vi } from "vitest";

// Mock the appDb import
vi.mock("@utils/db", () => {
  const overlaysMock = {
    toArray: vi.fn(),
    clear: vi.fn(),
    bulkAdd: vi.fn(),
    add: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  };
  // Expose overlaysMock for use in tests
  return {
    appDb: { overlays: overlaysMock },
    __overlaysMock: overlaysMock,
  };
});

// Get overlaysMock from the mocked module
const { __overlaysMock: overlaysMock } = (await import(
  "@utils/db"
)) as unknown as {
  __overlaysMock: {
    toArray: ReturnType<typeof vi.fn>;
    clear: ReturnType<typeof vi.fn>;
    bulkAdd: ReturnType<typeof vi.fn>;
    add: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
};

describe("overlaysService", () => {
  beforeEach(() => {
    Object.values(overlaysMock).forEach((fn) => fn.mockReset());
  });

  it("loads overlays and adds visited overlay if missing", async () => {
    overlaysMock.toArray.mockResolvedValueOnce([]);
    const overlays = await overlaysService.load();
    expect(overlays[0].id).toBe("visited-countries");
    expect(overlays[0].name).toBe("Visited Countries");
  });

  it("loads overlays and does not add visited overlay if present", async () => {
    overlaysMock.toArray.mockResolvedValueOnce([
      { id: "visited-countries", name: "Visited Countries" },
    ]);
    const overlays = await overlaysService.load();
    expect(overlays[0].id).toBe("visited-countries");
    expect(overlays.length).toBe(1);
  });

  it("saves overlays", async () => {
    const overlays = [{ id: "foo" }];
    await overlaysService.save(overlays as any);
    expect(overlaysMock.clear).toHaveBeenCalled();
    expect(overlaysMock.bulkAdd).toHaveBeenCalledWith(overlays);
  });

  it("adds an overlay", async () => {
    const overlay = { id: "bar" };
    await overlaysService.add(overlay as any);
    expect(overlaysMock.add).toHaveBeenCalledWith(overlay);
  });

  it("edits an overlay", async () => {
    const overlay = { id: "baz" };
    await overlaysService.edit(overlay as any);
    expect(overlaysMock.put).toHaveBeenCalledWith(overlay);
  });

  it("removes an overlay", async () => {
    await overlaysService.remove("baz");
    expect(overlaysMock.delete).toHaveBeenCalledWith("baz");
  });

  it("sorts overlays by order, treating missing order as 0", async () => {
    overlaysMock.toArray.mockResolvedValueOnce([
      { id: "a", order: 2 },
      { id: "b" }, // no order property
      { id: "c", order: 1 },
    ]);
    const overlays = await overlaysService.load();
    // After sorting, order should be: visited-countries, b (order 0), c (order 1), a (order 2)
    expect(overlays.map((o) => o.id)).toEqual([
      "visited-countries",
      "b",
      "c",
      "a",
    ]);
  });
});
