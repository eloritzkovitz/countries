import type { UIContextType } from "@contexts/UIContext";
import { vi } from "vitest";

export const mockUIContext: UIContextType = {
  uiVisible: true,
  setUiVisible: vi.fn(),
  showMenu: false,
  setShowMenu: vi.fn(),
  showCountries: false,
  toggleCountries: vi.fn(),
  showFilters: false,
  toggleFilters: vi.fn(),
  showMarkers: false,
  toggleMarkers: vi.fn(),
  showOverlays: false,
  toggleOverlays: vi.fn(),
  showExport: false,
  toggleExport: vi.fn(),
  showSettings: false,
  toggleSettings: vi.fn(),
  closePanel: vi.fn(),
  showShortcuts: false,
  openShortcuts: vi.fn(),
  closeShortcuts: vi.fn(),
  timelineMode: false,
  setTimelineMode: vi.fn(),
};