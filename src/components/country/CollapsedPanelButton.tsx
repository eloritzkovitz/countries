import { FaBars } from "react-icons/fa";
import { ActionButton } from "../common/ActionButton";

export function CollapsedPanelButton({ onClick }: { onClick: () => void }) {
  return (
    <ActionButton
      onClick={onClick}
      ariaLabel="Show countries panel"
      title="Show countries panel"
      className="action-btn absolute left-4 top-4 w-12 h-12 justify-center shadow-lg p-0 rounded-full border-none"
      icon={<FaBars size={24} />}
    />
  );
}