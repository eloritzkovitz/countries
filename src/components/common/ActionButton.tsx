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
  colorClass = "bg-gray-100 text-blue-800 hover:bg-gray-200 hover:text-blue-900 dark:text-gray-200",
}: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`py-1 px-2 rounded border-none font-bold cursor-pointer flex items-center gap-2 transition-colors ${colorClass} ${className}`}
      aria-label={ariaLabel}
      title={title}
    >
      {icon}
      {children}
    </button>
  );
}