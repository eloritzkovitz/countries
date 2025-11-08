import { useState, useEffect, type RefObject } from "react";

export function useContainerDimensions(ref: RefObject<HTMLElement | null>) {
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Update dimensions on mount and when ref changes
  useEffect(() => {
    function updateSize() {
      if (ref.current) {
        setDimensions({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
        });
      }
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [ref]);

  return dimensions;
}