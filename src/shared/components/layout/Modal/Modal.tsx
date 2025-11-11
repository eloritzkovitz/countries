import {
  useState,
  type ReactNode,
  type ReactElement,
  isValidElement,
} from "react";
import { usePanelHide } from "@hooks/usePanelHide";
import "./Modal.css";
import React from "react";

type FloatingButtonProps = {
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  floatingChildren?: ReactElement<FloatingButtonProps>;
  useFloatingHover?: boolean;
  className?: string;
  position?: "center" | "custom";
  containerClassName?: string;
  backdropClassName?: string;
  style?: React.CSSProperties;
  disableClose?: boolean;
  containerRef?: React.RefObject<HTMLDivElement | null>;
};

export function Modal({
  isOpen,
  onClose,
  children,
  floatingChildren,
  useFloatingHover = false,
  className = "",
  position = "center",
  containerClassName = "",
  backdropClassName = "",
  style,
  disableClose = false,
  containerRef,
}: ModalProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  // Handle panel hide logic
  usePanelHide({
    show: isOpen,
    onHide: onClose,
    escEnabled: disableClose ? false : true,
  });

  // Don't render anything if the modal is not open
  if (!isOpen) return null;

  return (
    <>
      <div
        className={`modal-backdrop ${backdropClassName ?? ""}`}
        onClick={() => {
          if (!disableClose) onClose();
        }}
        aria-modal="true"
        role="dialog"
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={
            "group " +
            (position === "center" ? "modal-center " : "modal-custom ") +
            "modal " +
            (isOpen ? "modal-show " : "modal-hide ") +
            className +
            " " +
            containerClassName
          }
          style={position === "custom" ? style : undefined}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
      {isOpen &&
        floatingChildren &&
        isValidElement(floatingChildren) &&
        (useFloatingHover
          ? (isHovered || isButtonHovered) &&
            React.cloneElement(floatingChildren, {
              onMouseEnter: () => setIsButtonHovered(true),
              onMouseLeave: () => setIsButtonHovered(false),
            })
          : floatingChildren)}
    </>
  );
}
