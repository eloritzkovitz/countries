import React, { useEffect, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export function useUiToggleHint(
  uiVisible: boolean,
  setUiVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setHintKey: React.Dispatch<React.SetStateAction<number>>,
  setHintMessage: (msg: React.ReactNode) => void
) {
  // Track previous value of uiVisible
  const prevUiVisible = useRef(uiVisible);

  // Show hint when uiVisible changes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      // Ignore if typing in input, textarea, or contenteditable
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }
      if (e.key.toLowerCase() === "u") {
        setUiVisible((v) => !v);
        if (!uiVisible) {
          setHintKey((k) => k + 1);
          setHintMessage(
            <span>
              <FaEye className="inline mr-2" />
              UI shown. Press U to hide the UI.
            </span>
          );
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [uiVisible, setUiVisible, setHintKey, setHintMessage]);

  // Show hint only when UI transitions from visible to hidden
  useEffect(() => {
    if (prevUiVisible.current && !uiVisible) {
      setHintKey((k) => k + 1);
      setHintMessage(
        <span>
          <FaEyeSlash className="inline mr-2" />
          UI hidden. Press U to show the UI.
        </span>
      );
    }
    prevUiVisible.current = uiVisible;
  }, [uiVisible, setHintKey, setHintMessage]);
}
