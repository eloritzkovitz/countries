import type { ReactNode } from "react";

interface ZoomButtonProps {
  onContinuousStart?: () => void;
  onContinuousStop?: () => void;
  onClick?: () => void;
  ariaLabel?: string;
  title?: string;
  className?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export function ZoomButton({
  onClick,
  onContinuousStart,
  onContinuousStop,
  ariaLabel,
  title,
  className,
  icon,
  disabled,
}: ZoomButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      title={title}
      className={className}
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
