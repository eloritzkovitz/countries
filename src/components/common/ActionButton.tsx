import type { ReactNode } from "react";

type ActionButtonProps = {
  onClick: () => void;
  ariaLabel?: string;
  title?: string;
  className?: string;
  icon?: ReactNode;
  children?: ReactNode;
  colorClass?: string;
};

export function ActionButton({
  onClick,
  ariaLabel = "Action",
  title = "Action",
  className = "",
  icon,
  children,
  colorClass = "bg-gray-200 text-blue-600",
}: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`py-1 px-2 rounded border-none font-bold cursor-pointer flex items-center gap-2 hover:bg-gray-300 transition-colors ${colorClass} ${className}`}
      aria-label={ariaLabel}
      title={title}
    >
      {icon}
      {children}
    </button>
  );
}