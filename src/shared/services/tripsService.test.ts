import { tripsService } from "./tripsService";
import { vi } from "vitest";

// Mock the appDb import
vi.mock("@utils/db", () => {
  const tripsMock = {
    toArray: vi.fn(),
    add: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  };
  return {
    appDb: { trips: tripsMock },
    __tripsMock: tripsMock,
  };
});

// Type assertion to access __tripsMock
const { __tripsMock: tripsMock } = (await import("@utils/db")) as unknown as {
  __tripsMock: {
    toArray: ReturnType<typeof vi.fn>;
    add: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
};

describe("tripsService", () => {
  beforeEach(() => {
    Object.values(tripsMock).forEach((fn) => fn.mockReset());
  });

  it("loads trips", async () => {
    tripsMock.toArray.mockResolvedValueOnce([{ id: "1", name: "Trip 1" }]);
    const trips = await tripsService.load();
    expect(trips).toEqual([{ id: "1", name: "Trip 1" }]);
  });

  it("adds a trip", async () => {
    const trip = { id: "2", name: "Trip 2" };
    await tripsService.add(trip as any);
    expect(tripsMock.add).toHaveBeenCalledWith(trip);
  });

  it("updates a trip", async () => {
    const trip = { id: "3", name: "Trip 3" };
    await tripsService.update(trip as any);
    expect(tripsMock.put).toHaveBeenCalledWith(trip);
  });

  it("removes a trip", async () => {
    await tripsService.remove("4");
    expect(tripsMock.delete).toHaveBeenCalledWith("4");
  });
});
