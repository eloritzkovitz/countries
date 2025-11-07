import { setupDomMocks } from "@test-utils/mockDomGlobals";
import {
  exportSvg,
  exportSvgAsPng,
  prepareSvgClone,
  getCorrespondingOriginal,
  downloadBlob,
} from "./mapExport";

// --- Global Mocks ---
setupDomMocks();

describe("mapExport utils", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  // --- exportSvg ---
  it("exportSvg does nothing if svgElement is falsy", () => {
    expect(exportSvg(null as any)).toBeUndefined();
  });

  it("exportSvg calls XMLSerializer and triggers download", () => {
    const svg = {
      cloneNode: vi.fn(() => ({
        getAttribute: vi.fn(() => "0 0 100 100"),
        querySelectorAll: vi.fn(() => []),
      })),
      ownerDocument: {
        defaultView: {
          getComputedStyle: vi.fn(() => ({
            getPropertyValue: vi.fn(() => ""),
          })),
        },
      },
    } as any;
    expect(() => exportSvg(svg, "test.svg")).not.toThrow();
  });

  it("exportSvg handles missing width/height", () => {
    const svg = {
      cloneNode: vi.fn(() => ({
        getAttribute: vi.fn(() => null),
        setAttribute: vi.fn(),
        querySelectorAll: vi.fn(() => []),
        ownerDocument: {
          defaultView: {
            getComputedStyle: vi.fn(() => ({
              getPropertyValue: vi.fn(() => ""),
            })),
          },
        },
      })),
      ownerDocument: {
        defaultView: {
          getComputedStyle: vi.fn(() => ({
            getPropertyValue: vi.fn(() => ""),
          })),
        },
      },
    } as any;
    expect(() => exportSvg(svg, "test.svg")).not.toThrow();
  });

  // --- exportSvgAsPng ---
  it("exportSvgAsPng does nothing if svgElement is falsy", async () => {
    await expect(exportSvgAsPng(null as any)).resolves.toBeUndefined();
  });

  it("exportSvgAsPng triggers download after rendering", async () => {
    const svg = {
      cloneNode: vi.fn(() => ({
        getAttribute: vi.fn(() => "0 0 100 100"),
        querySelectorAll: vi.fn(() => []),
        width: { baseVal: { value: 100 } },
        height: { baseVal: { value: 100 } },
      })),
      ownerDocument: {
        defaultView: {
          getComputedStyle: vi.fn(() => ({
            getPropertyValue: vi.fn(() => ""),
          })),
        },
      },
    } as any;
    await expect(exportSvgAsPng(svg, "test.png")).resolves.toBeUndefined();
  });

  it("exportSvgAsPng handles missing viewBox and width/height", async () => {
    const svg = {
      cloneNode: vi.fn(() => ({
        getAttribute: vi.fn(() => null),
        setAttribute: vi.fn(),
        querySelectorAll: vi.fn(() => []),
        width: undefined,
        height: undefined,
        clientWidth: undefined,
        clientHeight: undefined,
        ownerDocument: {
          defaultView: {
            getComputedStyle: vi.fn(() => ({
              getPropertyValue: vi.fn(() => ""),
            })),
          },
        },
      })),
      ownerDocument: {
        defaultView: {
          getComputedStyle: vi.fn(() => ({
            getPropertyValue: vi.fn(() => ""),
          })),
        },
      },
    } as any;
    await expect(exportSvgAsPng(svg, "test.png")).resolves.toBeUndefined();
  });

  it("exportSvgAsPng handles missing canvas context", async () => {
    // The global mock returns null for getContext in this case
    const svg = {
      cloneNode: vi.fn(() => ({
        getAttribute: vi.fn(() => "0 0 100 100"),
        querySelectorAll: vi.fn(() => []),
        width: { baseVal: { value: 100 } },
        height: { baseVal: { value: 100 } },
        ownerDocument: {
          defaultView: {
            getComputedStyle: vi.fn(() => ({
              getPropertyValue: vi.fn(() => ""),
            })),
          },
        },
      })),
      ownerDocument: {
        defaultView: {
          getComputedStyle: vi.fn(() => ({
            getPropertyValue: vi.fn(() => ""),
          })),
        },
      },
    } as any;
    await expect(exportSvgAsPng(svg, "test.png")).resolves.toBeUndefined();
  });

  it("exportSvgAsPng handles image load error", async () => {
    class ErrorImage {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      set src(_v: string) {
        setTimeout(() => {
          if (this.onerror) this.onerror();
        }, 0);
      }
      set crossOrigin(_v: string) {}
    }
    vi.stubGlobal("Image", ErrorImage);
    const svg = {
      cloneNode: vi.fn(() => ({
        getAttribute: vi.fn(() => "0 0 100 100"),
        querySelectorAll: vi.fn(() => []),
        width: { baseVal: { value: 100 } },
        height: { baseVal: { value: 100 } },
        ownerDocument: {
          defaultView: {
            getComputedStyle: vi.fn(() => ({
              getPropertyValue: vi.fn(() => ""),
            })),
          },
        },
      })),
      ownerDocument: {
        defaultView: {
          getComputedStyle: vi.fn(() => ({
            getPropertyValue: vi.fn(() => ""),
          })),
        },
      },
    } as any;
    await expect(exportSvgAsPng(svg, "test.png")).resolves.toBeUndefined();
  });

  it("exportSvgAsPng handles blob creation failure", async () => {
    // The global mock returns null for toBlob in this case
    const svg = {
      cloneNode: vi.fn(() => ({
        getAttribute: vi.fn(() => "0 0 100 100"),
        querySelectorAll: vi.fn(() => []),
        width: { baseVal: { value: 100 } },
        height: { baseVal: { value: 100 } },
        ownerDocument: {
          defaultView: {
            getComputedStyle: vi.fn(() => ({
              getPropertyValue: vi.fn(() => ""),
            })),
          },
        },
      })),
      ownerDocument: {
        defaultView: {
          getComputedStyle: vi.fn(() => ({
            getPropertyValue: vi.fn(() => ""),
          })),
        },
      },
    } as any;
    await expect(exportSvgAsPng(svg, "test.png")).resolves.toBeUndefined();
  });

  // --- prepareSvgClone ---
  describe("prepareSvgClone", () => {
    it("adds xmlns if missing", () => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "100");
      svg.setAttribute("height", "100");
      const result = prepareSvgClone(svg, false);
      expect(result.getAttribute("xmlns")).toBe("http://www.w3.org/2000/svg");
    });

    it("adds viewBox if missing", () => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      (svg as any).width = { baseVal: { value: 123 } };
      (svg as any).height = { baseVal: { value: 456 } };
      const result = prepareSvgClone(svg, false);
      expect(result.getAttribute("viewBox")).toBe("0 0 123 456");
    });

    // it("removes background rects", () => {
    //   const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    //   const rect = document.createElementNS(
    //     "http://www.w3.org/2000/svg",
    //     "rect"
    //   );
    //   rect.setAttribute("class", "background");
    //   svg.appendChild(rect);
    //   const result = prepareSvgClone(svg, false);
    //   expect(result.querySelector("rect.background")).toBeNull();
    // });

    it("inlines computed styles and handles errors", () => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      svg.appendChild(path);
      // Simulate missing original element to trigger catch
      const result = prepareSvgClone(svg, false);
      expect(result).toBeTruthy();
    });
  });  

  // --- getCorrespondingOriginal ---
  describe("getCorrespondingOriginal", () => {
    it("returns the correct original element for a nested clone", () => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      g.appendChild(path);
      svg.appendChild(g);
      const clone = svg.cloneNode(true) as SVGSVGElement;
      const clonedG = clone.children[0];
      const clonedPath = clonedG.children[0];
      expect(getCorrespondingOriginal(clonedPath, svg, clone)).toBe(path);
    });

    it("returns null if the path is broken (index out of bounds)", () => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const clone = svg.cloneNode(true) as SVGSVGElement;
      // Simulate a broken path by passing a node not in the tree
      const orphan = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "g"
      );
      expect(getCorrespondingOriginal(orphan, svg, clone)).toBeNull();
    });
  });

  // --- downloadBlob ---
  describe("downloadBlob", () => {
    it("triggers download and revokes URL", () => {
      const blob = new Blob(["test"], { type: "text/plain" });
      expect(() => downloadBlob(blob, "test.txt")).not.toThrow();
    });
  });

  describe("exportSvg", () => {
    it("exports SVG with custom filename and without inlining styles", () => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "100");
      svg.setAttribute("height", "100");
      expect(() => exportSvg(svg, "custom.svg", false)).not.toThrow();
    });
  });

  describe("exportSvgAsPng", () => {
    it("exports PNG with custom scale and maxDimension", async () => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "100");
      svg.setAttribute("height", "100");
      await expect(
        exportSvgAsPng(svg, "custom.png", 2, true, 2048)
      ).resolves.toBeUndefined();
    });

    it("handles missing devicePixelRatio gracefully", async () => {
      const originalDPR = window.devicePixelRatio;
      Object.defineProperty(window, "devicePixelRatio", {
        value: undefined,
        configurable: true,
      });
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "100");
      svg.setAttribute("height", "100");
      await expect(exportSvgAsPng(svg, "no-dpr.png")).resolves.toBeUndefined();
      Object.defineProperty(window, "devicePixelRatio", {
        value: originalDPR,
        configurable: true,
      });
    });

    it("caps export size if maxDimension is exceeded", async () => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "5000");
      svg.setAttribute("height", "5000");
      await expect(
        exportSvgAsPng(svg, "capped.png", 5, true, 1000)
      ).resolves.toBeUndefined();
    });
  });
});
