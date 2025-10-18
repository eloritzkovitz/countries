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
};

export function Modal({
  isOpen,
  onClose,
  children,
  className = "",
  position = "center",
  containerClassName = "",
}: ModalProps) {
  useKeyHandler(onClose, ["Escape"], isOpen);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[9999]"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={
          position === "center"
            ? `fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`
            : `fixed ${className} ${containerClassName}`
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
