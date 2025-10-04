import { useEffect, useRef } from "react";

type KeyHandler = (event: KeyboardEvent) => void;

/**
 * Generic hook for handling keyboard events.
 * @param handler - Function to call when a matching key is pressed.
 * @param keys - Array of key names to listen for (e.g., ["Escape", "ArrowLeft"]). Empty array means all keys.
 * @param enabled - If false, disables the handler.
 */
export function useKeyHandler(
  handler: KeyHandler,
  keys: string[] = [],
  enabled: boolean = true
) {
  const handlerRef = useRef(handler);

  // Update ref if handler changes
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  // Attach keydown listener
  useEffect(() => {
    if (!enabled) return;

    // Handle keydown event
    function handleKeyDown(e: KeyboardEvent) {
      if (keys.length === 0 || keys.includes(e.key)) {
        handlerRef.current(e);
      }
    }

    // Attach and clean up event listener
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keys, enabled]);
}