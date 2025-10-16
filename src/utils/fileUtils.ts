/**
 * Normalize an SVG clone for export:
 * - ensure xmlns and viewBox
 * - remove background rects (class 'background' or data-export-ignore)
 * - inline computed styles (basic) so exported image matches on-screen appearance
 */
function prepareSvgClone(original: SVGSVGElement, inlineStyles = true) {
  const clone = original.cloneNode(true) as SVGSVGElement;

  if (!clone.getAttribute("xmlns")) {
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  }

  // Ensure viewBox exists
  const vb = clone.getAttribute("viewBox");
  if (!vb) {
    const w =
      (original.width &&
        original.width.baseVal &&
        original.width.baseVal.value) ||
      original.clientWidth ||
      1200;
    const h =
      (original.height &&
        original.height.baseVal &&
        original.height.baseVal.value) ||
      original.clientHeight ||
      800;
    clone.setAttribute("viewBox", `0 0 ${w} ${h}`);
  }

  // Remove background rects (explicit markers)
  clone
    .querySelectorAll(
      "rect[data-export-ignore], rect.background, rect[data-background]"
    )
    .forEach((n) => n.remove());

  if (inlineStyles) {
    // Inline computed styles for a conservative set of elements
    const elements = Array.from(
      clone.querySelectorAll<SVGElement>(
        "path, circle, rect, line, polyline, polygon, text, g"
      )
    );
    const ownerDoc = original.ownerDocument || document;
    elements.forEach((el) => {
      try {
        const orig = getCorrespondingOriginal(el, original, clone);
        if (!orig) return;
        const cs = ownerDoc.defaultView?.getComputedStyle(orig as Element);
        if (!cs) return;
        const styleProps = [
          "fill",
          "stroke",
          "stroke-width",
          "opacity",
          "fill-opacity",
          "stroke-opacity",
          "font-family",
          "font-size",
          "text-anchor",
          "font-weight",
          "vector-effect",
        ];
        const inline: string[] = [];
        styleProps.forEach((p) => {
          const v = cs.getPropertyValue(p);
          if (v) inline.push(`${p}:${v}`);
        });
        const existing = el.getAttribute("style");
        el.setAttribute(
          "style",
          existing ? `${existing};${inline.join(";")}` : inline.join(";")
        );
      } catch {
        // ignore elements we can't compute
      }
    });
  }

  return clone;
}

/**
 * Attempt to map a cloned element to its original sibling by index.
 * This is a best-effort helper used when inlining computed styles.
 */
function getCorrespondingOriginal(
  clonedEl: Element,
  originalRoot: SVGSVGElement,
  cloneRoot: SVGSVGElement
): Element | null {
  // Walk up to find a unique selector path: fall back to using index mapping
  const path: number[] = [];
  let node: Element | null = clonedEl;
  while (node && node !== cloneRoot) {
    const parent: Element | null = node.parentElement;
    if (!parent) break;
    const idx = Array.prototype.indexOf.call(parent.children, node);
    path.unshift(idx);
    node = parent;
  }
  // Walk original using path
  let cur: Element | null = originalRoot;
  for (const i of path) {
    if (!cur || !cur.children || cur.children.length <= i) return null;
    cur = cur.children[i] as Element;
  }
  return cur;
}

/**
 * Trigger a download for a blob.
 */
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** 
 * Export SVG as normalized SVG file.
 * inlineStyles: optional, inlines computed styles into exported SVG (default true)
 */
export function exportSvg(
  svgElement: SVGSVGElement,
  filename = "map.svg",
  inlineStyles = true
) {
  if (!svgElement) return;

  const clone = prepareSvgClone(svgElement, inlineStyles);
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(clone);
  const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  downloadBlob(blob, filename);
}

/** 
 * Export SVG as high-quality PNG.
 * - scale: integer multiplier (1,2,4...), devicePixelRatio is applied automatically
 * - inlineStyles: whether to inline computed styles into the clone before rasterizing
 * - maxDimension: cap for largest canvas side to protect memory (default 8192)
 */
export async function exportSvgAsPng(
  svgElement: SVGSVGElement,
  filename = "map.png",
  scale = 3,
  inlineStyles = true,
  maxDimension = 8192
) {
  if (!svgElement) return;

  const clone = prepareSvgClone(svgElement, inlineStyles);
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(clone);

  // Derive source dimensions from viewBox or width/height
  const vb = clone.getAttribute("viewBox");
  let vw = 0;
  let vh = 0;
  if (vb) {
    const parts = vb
      .split(/\s+|,/)
      .map(Number)
      .filter((n) => !Number.isNaN(n));
    if (parts.length >= 4) {
      vw = parts[2];
      vh = parts[3];
    }
  }
  if (!vw || !vh) {
    vw =
      (clone.width && clone.width.baseVal && clone.width.baseVal.value) ||
      clone.clientWidth ||
      1200;
    vh =
      (clone.height && clone.height.baseVal && clone.height.baseVal.value) ||
      clone.clientHeight ||
      800;
  }

  const DPR = window.devicePixelRatio || 1;
  let canvasW = Math.round(vw * DPR * scale);
  let canvasH = Math.round(vh * DPR * scale);

  // Cap dimensions to avoid OOM; if capped, scale down proportionally
  const maxSide = Math.max(canvasW, canvasH);
  if (maxSide > maxDimension) {
    const factor = maxDimension / maxSide;
    canvasW = Math.round(canvasW * factor);
    canvasH = Math.round(canvasH * factor);
    console.warn(
      `Export capped to ${maxDimension}px max side; output scaled by ${factor.toFixed(
        2
      )}`
    );
  }

  const canvas = document.createElement("canvas");
  canvas.width = canvasW;
  canvas.height = canvasH;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.imageSmoothingEnabled = true;
    // @ts-ignore: imageSmoothingQuality may exist
    if (ctx.imageSmoothingQuality) ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, canvasW, canvasH);
  }

  const svgBlob = new Blob([svgString], {
    type: "image/svg+xml;charset=utf-8",
  });
  const url = URL.createObjectURL(svgBlob);
  const img = new Image();
  img.crossOrigin = "anonymous";

  try {
    await new Promise<void>((resolve, reject) => {
      img.onload = () => {
        try {
          if (ctx) ctx.drawImage(img, 0, 0, canvasW, canvasH);
          URL.revokeObjectURL(url);
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Failed to create PNG blob"));
                return;
              }
              downloadBlob(blob, filename);
              resolve();
            },
            "image/png",
            1
          );
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Failed to load SVG data URL as image"));
      };
      img.src = url;
    });
  } catch (err) {
    console.error("exportSvgAsPng error:", err);
  }
}
