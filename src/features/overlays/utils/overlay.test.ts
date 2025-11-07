import { mockOverlays, mockTimelineOverlay } from "@test-utils/mockOverlays";
import {
  addOverlay,
  editOverlay,
  removeOverlay,
  updateOverlayVisibility,
  isTimelineOverlay,
} from "./overlay";

describe("overlay utils", () => {
  it("addOverlay adds a new overlay", () => {
    const overlays = [mockOverlays[0]];
    const newOverlay = mockOverlays[1];
    const result = addOverlay(overlays, newOverlay);
    expect(result).toHaveLength(2);
    expect(result[1]).toEqual(newOverlay);
  });

  it("editOverlay edits an existing overlay by id", () => {
    const overlays = [mockOverlays[0]];
    const updatedOverlay = { ...mockOverlays[0], name: "Updated" };
    const result = editOverlay(overlays, updatedOverlay);
    expect(result[0].name).toBe("Updated");
  });

  it("editOverlay does nothing if id not found", () => {
    const overlays = [mockOverlays[0]];
    const updatedOverlay = { ...mockOverlays[0], id: "notfound", name: "Nope" };
    const result = editOverlay(overlays, updatedOverlay);
    expect(result).toEqual(overlays);
  });

  it("removeOverlay removes overlay by id", () => {
    const overlays = [mockOverlays[0], mockOverlays[1]];
    const result = removeOverlay(overlays, mockOverlays[0].id);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(mockOverlays[1].id);
  });

  it("removeOverlay does nothing if id not found", () => {
    const overlays = [mockOverlays[0]];
    const result = removeOverlay(overlays, "notfound");
    expect(result).toEqual(overlays);
  });

  it("updateOverlayVisibility updates visibility by id", () => {
    const overlays = [mockOverlays[0]];
    const result = updateOverlayVisibility(overlays, mockOverlays[0].id, false);
    expect(result[0].visible).toBe(false);
  });

  it("updateOverlayVisibility does nothing if id not found", () => {
    const overlays = [mockOverlays[0]];
    const result = updateOverlayVisibility(overlays, "notfound", false);
    expect(result).toEqual(overlays);
  });

  it("isTimelineOverlay returns true for TimelineOverlay", () => {
    expect(isTimelineOverlay(mockTimelineOverlay)).toBe(true);
  });

  it("isTimelineOverlay returns false for non-TimelineOverlay", () => {
    expect(isTimelineOverlay(mockOverlays[0])).toBe(false);
  });
});
