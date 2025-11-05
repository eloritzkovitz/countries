import { useEffect } from "react";

export function useClickOutside(
  refs: React.RefObject<HTMLElement>[],
  onOutside: () => void,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return;

    // Handle click outside of all refs
    function handleClickOutside(e: MouseEvent) {
      if (
        refs.every(
          (ref) => !ref.current || !ref.current.contains(e.target as Node)
        )
      ) {
        onOutside();
      }
    }

    function handleScrollOrResize(e: Event) {
      // Only close if the scroll event target is outside all refs
      if (
        refs.every(
          (ref) => !ref.current || !ref.current.contains(e.target as Node)
        )
      ) {
        onOutside();
      }
    }

    // Handle Escape key press
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onOutside();
    }

    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [refs, onOutside, enabled]);
}
