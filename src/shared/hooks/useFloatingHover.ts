import { useState } from "react";

export function useFloatingHover(useFloatingHover: boolean) {
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  // Handlers for hover events
  const hoverHandlers = useFloatingHover
    ? {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
      }
    : {};

  // Handlers for floating button hover events
  const floatingHandlers = useFloatingHover
    ? {
        onMouseEnter: () => setIsButtonHovered(true),
        onMouseLeave: () => setIsButtonHovered(false),
      }
    : {};

  // Determine if the floating element should be shown
  const shouldShowFloating =
    !useFloatingHover || (useFloatingHover && (isHovered || isButtonHovered));

  return { hoverHandlers, floatingHandlers, shouldShowFloating };
}
