import { FaBars } from "react-icons/fa";
import { ActionButton } from "@components";

export function CollapsedPanelButton({
  onClick,
  visible,
  className = "",
}: {
  onClick: () => void;
  visible: boolean;
  className?: string;
}) {
  return (
    <ActionButton
      onClick={onClick}
      ariaLabel="Show menu"
      title="Show menu"
      className={`toolbar-btn toolbar-btn-action shadow-lg p-0
        transform transition-transform duration-300
        ${
          visible
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        }
        ${className}
      `}
      icon={<FaBars size={24} />}
    />
  );
}
