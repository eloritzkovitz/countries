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
      className={
        position === "center"
          ? "fixed inset-0 flex items-center justify-center z-[9999]"
          : `fixed z-[9999] ${containerClassName}`
      }
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`relative ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
