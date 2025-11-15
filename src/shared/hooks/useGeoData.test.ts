import { renderHook } from "@testing-library/react";
import { useGeoData } from "./useGeoData";
import { act } from "react";
import { DEFAULT_MAP_SETTINGS } from "@constants";

describe("useGeoData", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns loading initially", () => {
    (fetch as any).mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useGeoData());
    expect(result.current.loading).toBe(true);
    expect(result.current.geoData).toBeNull();
    expect(result.current.geoError).toBeNull();
  });

  it("returns geoData on success", async () => {
    const fakeData = { foo: "bar" };
    (fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(fakeData),
    });

    const { result } = renderHook(() => useGeoData());

    // Wait for useEffect to resolve
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(fetch).toHaveBeenCalledWith(DEFAULT_MAP_SETTINGS.geoUrl);
    expect(result.current.geoData).toEqual(fakeData);
    expect(result.current.loading).toBe(false);
    expect(result.current.geoError).toBeNull();
  });

  it("returns geoError on fetch failure", async () => {
    (fetch as any).mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({}),
    });

    const { result } = renderHook(() => useGeoData());

    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(result.current.geoData).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.geoError).toBe("Failed to load map data");
  });

  it("returns geoError on fetch exception", async () => {
    (fetch as any).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useGeoData());

    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(result.current.geoData).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.geoError).toBe("Network error");
  });
});
