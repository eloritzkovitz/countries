import { useEffect, useRef } from "react";
import type { KeyHandler, ModifierKeys } from "@types";

/**
 * Generic hook for handling keyboard events with optional modifier keys.
 * @param handler - Function to call when a matching key is pressed.
 * @param keys - Array of key names to listen for (e.g., ["Escape", "ArrowLeft"]). Empty array means all keys.
 * @param enabled - If false, disables the handler.
 * @param modifiers - Object specifying required modifier keys (e.g., { ctrl: true }).
 */
export function useKeyHandler(
  handler: KeyHandler,
  keys: string[] = [],
  enabled: boolean = true,
  modifiers: ModifierKeys = {}
) {
  const handlerRef = useRef(handler);

  // Update the handler ref if it changes
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  // Set up the keydown event listener
  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(e: KeyboardEvent) {
      // Ignore if focus is on input, textarea, or contenteditable
      const tag = (document.activeElement?.tagName || "").toLowerCase();
      const isInput =
        tag === "input" ||
        tag === "textarea" ||
        (document.activeElement as HTMLElement)?.isContentEditable;

      if (isInput) return;

      const keyMatch = keys.length === 0 || keys.includes(e.key);
      const modifiersMatch =
        (modifiers.ctrl === undefined || modifiers.ctrl === e.ctrlKey) &&
        (modifiers.alt === undefined || modifiers.alt === e.altKey) &&
        (modifiers.shift === undefined || modifiers.shift === e.shiftKey) &&
        (modifiers.meta === undefined || modifiers.meta === e.metaKey);

      if (keyMatch && modifiersMatch) {
        handlerRef.current(e);
      }
    }

    // Attach the event listener
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keys, enabled, modifiers]);
}
