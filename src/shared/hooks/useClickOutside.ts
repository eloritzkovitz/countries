import { useEffect } from "react";

export function useClickOutside<T extends HTMLElement>(
  refs: React.RefObject<T>[],
  onOutside: () => void,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return;

    // Handle click outside of all refs
    function handleClickOutside(e: MouseEvent) {
      if (
        refs.every(
          (ref) =>
            !ref.current ||
            !(e.target instanceof Node) ||
            !ref.current.contains(e.target)
        )
      ) {
        onOutside();
      }
    }

    // Handle scroll or resize outside of all refs
    function handleScrollOrResize(e: Event) {
      if (
        refs.every(
          (ref) =>
            !ref.current ||
            !(e.target instanceof Node) ||
            !ref.current.contains(e.target)
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
