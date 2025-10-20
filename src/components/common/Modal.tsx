import type { ReactNode } from "react";
import ReactDOM from "react-dom";
import { useKeyHandler } from "@hooks/useKeyHandler";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  position?: "center" | "custom";
  containerClassName?: string;
  style?: React.CSSProperties;
  disableClose?: boolean;
};

export function Modal({
  isOpen,
  onClose,
  children,
  className = "",
  position = "center",
  containerClassName = "",
  style,
  disableClose = false,
}: ModalProps) {
  // Handle Escape key to close modal
  useKeyHandler(
    () => {
      if (!disableClose) onClose();
    },
    ["Escape"],
    isOpen
  );

  // Don't render anything if the modal is not open
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[9999]"
      onClick={() => {
        if (!disableClose) onClose();
      }}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={
          position === "center"
            ? `fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`
            : `fixed ${className} ${containerClassName}`
        }
        style={position === "custom" ? style : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
