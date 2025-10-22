import { useEffect } from "react";
import { useKeyHandler } from "@hooks/useKeyHandler";
import { useUI } from "@contexts/UIContext";

type UsePanelHideOptions = {
  show?: boolean;
  onHide?: () => void;
  escEnabled?: boolean;
};

export function usePanelHide({
  show = true,
  onHide,
  escEnabled = true,
}: UsePanelHideOptions) {
  const { uiVisible } = useUI();

  // Hide on Escape key
  useKeyHandler(
    () => {
      if (show && onHide && escEnabled) {
        onHide();
      }
    },
    ["Escape"],
    show
  );

  // Hide when UI is hidden
  useEffect(() => {
    if (!uiVisible && show && onHide) {
      onHide();
    }
  }, [uiVisible, show, onHide]);
}
