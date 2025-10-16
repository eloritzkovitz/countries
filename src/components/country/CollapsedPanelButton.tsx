import { FaBars } from "react-icons/fa";
import { ActionButton } from "../common/ActionButton";

export function CollapsedPanelButton({ onClick }: { onClick: () => void }) {
  return (
    <ActionButton
      onClick={onClick}
      ariaLabel="Show countries panel"
      title="Show countries panel"
      colorClass="bg-blue-800 text-white hover:bg-blue-900 active:bg-blue-800 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:active:bg-gray-600"
      className="absolute left-4 top-4 w-12 h-12 flex items-center justify-center shadow-lg p-0 rounded-full border-none"
      icon={<FaBars size={24} />}
    />
  );
}