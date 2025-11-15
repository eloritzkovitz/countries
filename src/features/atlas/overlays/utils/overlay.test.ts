import { mockOverlays, mockTimelineOverlay } from "@test-utils/mockOverlays";
import { isTimelineOverlay } from "./overlay";

describe("overlay utils", () => {
  it("isTimelineOverlay returns true for TimelineOverlay", () => {
    expect(isTimelineOverlay(mockTimelineOverlay)).toBe(true);
  });

  it("isTimelineOverlay returns false for non-TimelineOverlay", () => {
    expect(isTimelineOverlay(mockOverlays[0])).toBe(false);
  });
});
