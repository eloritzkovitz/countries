import { useEffect } from "react";
import { useKeyHandler } from "@hooks/useKeyHandler";
import { useUI } from "@contexts/UIContext";

interface UsePanelHideOptions {
  show?: boolean;
  onHide?: () => void;
  isModal?: boolean;
  escEnabled?: boolean;
}

export function usePanelHide({
  show = true,
  onHide,
  isModal = false,
  escEnabled = false,
}: UsePanelHideOptions) {
  const { uiVisible, showShortcuts } = useUI();

  // Hide on Escape key
  useKeyHandler(
    () => {
      // Only hide the panel if it's a modal or shortcuts modal is not open
      if (
        show &&
        onHide &&
        escEnabled &&
        (isModal || (!isModal && !showShortcuts))
      ) {
        onHide();
      }
    },
    ["Escape"],
    show && escEnabled
  );

  // Hide when UI is hidden
  useEffect(() => {
    if (!uiVisible && show && onHide) {
      onHide();
    }
  }, [uiVisible, show, onHide]);
}
