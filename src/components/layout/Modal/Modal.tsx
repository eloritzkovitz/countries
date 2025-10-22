import type { ReactNode } from "react";
import ReactDOM from "react-dom";
import { usePanelHide } from "@hooks/usePanelHide";
import "./Modal.css";

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
  usePanelHide({ show: isOpen, onHide: onClose });

  // Don't render anything if the modal is not open
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="modal-backdrop"
      onClick={() => {
        if (!disableClose) onClose();
      }}
      aria-modal="true"
      role="dialog"
      style={{ pointerEvents: isOpen ? "auto" : "none" }}
    >
      <div
        className={
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
    </div>,
    document.body
  );
}
