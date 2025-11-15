import 'fake-indexeddb/auto';
import { AppDB } from "./db";

describe("AppDB", () => {
  let testDb: AppDB;

  beforeEach(() => {
    testDb = new AppDB("TestDB");
  });

  afterEach(async () => {
    await testDb.delete();
  });

  it("can add and retrieve a trip", async () => {
    await testDb.trips.add({ id: "t1", name: "Test Trip" } as any);
    const trips = await testDb.trips.toArray();
    expect(trips.length).toBe(1);
    expect(trips[0].name).toBe("Test Trip");
  });
});
