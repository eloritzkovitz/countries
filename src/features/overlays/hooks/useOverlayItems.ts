import { useMemo } from "react";
import { getOverlayItems } from "@features/overlays/utils/overlayRender";
import type { Overlay } from "@types";

export function useOverlayItems(overlays: Overlay[]) {
  return useMemo(
    () => overlays.filter((o) => o.visible).flatMap(getOverlayItems),
    [overlays]
  );
}
