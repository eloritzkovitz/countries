import type { ReactNode } from "react";

type ZoomButtonProps = {
  onContinuousStart?: () => void;
  onContinuousStop?: () => void;
  onClick?: () => void;
  ariaLabel?: string;
  title?: string;
  className?: string;
  icon?: ReactNode;
  colorClass?: string;
  disabled?: boolean;
};

export function ZoomButton({
  onClick,
  onContinuousStart,
  onContinuousStop,
  ariaLabel,
  title,
  className,
  icon,
  colorClass,
  disabled,
}: ZoomButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      title={title}
      className={className + " " + (colorClass ?? "")}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={onContinuousStart}
      onMouseUp={onContinuousStop}
      onMouseLeave={onContinuousStop}
      onTouchStart={onContinuousStart}
      onTouchEnd={onContinuousStop}
    >
      {icon}
    </button>
  );
}