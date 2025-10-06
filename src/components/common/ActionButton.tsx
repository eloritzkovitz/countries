import type { ButtonHTMLAttributes, ReactNode } from "react";

type ActionButtonProps = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];  
  onClick?: () => void;
  ariaLabel?: string;
  title?: string;
  className?: string;
  icon?: ReactNode;
  children?: ReactNode;
  colorClass?: string;
  disabled?: boolean;
};

export function ActionButton({
  onClick,
  ariaLabel = "Action",
  title = "Action",
  className = "",
  icon,
  children,
  colorClass = "action-button bg-gray-100 text-blue-800 hover:bg-gray-200 hover:text-blue-900 dark:text-gray-200 dark:hover:text-gray-300",
  type = "button",
  disabled = false,
}: ActionButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-1 px-2 rounded border-none font-bold cursor-pointer flex items-center gap-2 transition-colors ${colorClass} ${className}`}
      aria-label={ariaLabel}
      title={title}
      disabled={disabled}
    >
      {icon}
      {children}
    </button>
  );
}