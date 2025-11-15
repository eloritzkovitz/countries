import { vi } from "vitest";
import { MockImage } from "./mockImage";
import { MockSvgElement } from "./mockSvgElement";

export function setupDomMocks() {
  vi.stubGlobal("URL", {
    createObjectURL: vi.fn(() => "blob:url"),
    revokeObjectURL: vi.fn(),
  });
  vi.stubGlobal(
    "XMLSerializer",
    class {
      serializeToString() {
        return "<svg></svg>";
      }
    }
  );
  vi.stubGlobal(
    "Blob",
    class {
      constructor() {}
    }
  );
  vi.stubGlobal("Image", MockImage);
  vi.stubGlobal("document", {
    createElement: vi.fn((tag: string) => {
      if (tag === "a") {
        return {
          href: "",
          download: "",
          click: () => {},
          style: {},
          setAttribute: vi.fn(),
        };
      }
      if (tag === "canvas") {
        return {
          width: 0,
          height: 0,
          getContext: vi.fn(() => ({
            imageSmoothingEnabled: false,
            clearRect: vi.fn(),
            drawImage: vi.fn(),
          })),
          toBlob: vi.fn((cb: (blob: any) => void) => cb({})),
        };
      }
      return {};
    }),
    createElementNS: vi.fn(
      (_ns: string, tag: string) => new MockSvgElement(tag)
    ),
    body: {
      appendChild: vi.fn(),
      removeChild: vi.fn(),
    },
    defaultView: {
      getComputedStyle: vi.fn(() => ({
        getPropertyValue: vi.fn(() => ""),
      })),
    },
  });
}
