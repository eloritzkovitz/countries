import type { ButtonHTMLAttributes, ReactNode } from "react";

type ActionButtonProps = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: () => void;
  ariaLabel?: string;
  title?: string;
  className?: string;
  icon?: ReactNode;
  children?: ReactNode;
  disabled?: boolean;
};

export function ActionButton({
  onClick,
  ariaLabel = "Action",
  title = "Action",
  className,
  icon,
  children,
  type = "button",
  disabled = false,
}: ActionButtonProps) {
  const defaultStyle = "action-btn";
  const buttonClass =
    className && className.trim().length > 0 ? className : defaultStyle;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex flex-row items-center justify-center gap-2 ${buttonClass}`}
      aria-label={ariaLabel}
      title={title}
      disabled={disabled}
    >
      {icon && <span className="inline-flex">{icon}</span>}
      {children}
    </button>
  );
}
