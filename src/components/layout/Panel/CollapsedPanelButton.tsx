import { FaBars } from "react-icons/fa";
import { ActionButton } from "@components";

export function CollapsedPanelButton({
  onClick,
  visible,
}: {
  onClick: () => void;
  visible: boolean;
}) {
  return (
    <ActionButton
      onClick={onClick}
      ariaLabel="Show countries panel"
      title="Show countries panel"
      className={`toolbar-btn toolbar-btn-action absolute left-4 top-4 shadow-lg p-0
    transform transition-transform duration-300
    ${
      visible
        ? "translate-x-0 opacity-100"
        : "-translate-x-full opacity-0 pointer-events-none"
    }
  `}
      icon={<FaBars size={24} />}
    />
  );
}
