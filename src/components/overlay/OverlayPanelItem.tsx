import { FaEye, FaEyeSlash, FaEdit, FaTrash } from "react-icons/fa";
import { ActionButton } from "../common/ActionButton";
import type { Overlay } from "../../types/overlay";

type OverlayPanelItemProps = {
  overlay: Overlay;
  onToggleVisibility: (id: string) => void;
  onEdit: (overlay: Overlay) => void;
  onRemove: (id: string) => void;
};

export function OverlayPanelItem({
  overlay,
  onToggleVisibility,
  onEdit,
  onRemove,
}: OverlayPanelItemProps) {
  return (
    <li className="mb-4 flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
      <span
        className="inline-block w-[22px] h-[22px] rounded-md border-2 border-gray-300 mr-1"
        style={{ background: overlay.color }}
        title={overlay.name}
      />
      <strong className="flex-1">{overlay.name}</strong>
      <ActionButton
        onClick={() => onToggleVisibility(overlay.id)}
        ariaLabel={overlay.visible ? "Hide overlay" : "Show overlay"}
        title={overlay.visible ? "Hide overlay" : "Show overlay"}
        colorClass={overlay.visible ? "text-blue-500" : "text-gray-400"}
        className="mx-1 text-lg"
        icon={overlay.visible ? <FaEye /> : <FaEyeSlash />}
      />
      <ActionButton
        onClick={() => onEdit(overlay)}
        ariaLabel="Edit overlay"
        title="Edit overlay"
        colorClass="text-blue-600 hover:text-blue-800"
        className="mx-1 text-lg"
        icon={<FaEdit />}
      />
      <ActionButton
        onClick={() => onRemove(overlay.id)}
        ariaLabel="Remove overlay"
        title="Remove overlay"
        colorClass="text-red-600 hover:text-red-800"
        className="mx-1 text-lg"
        icon={<FaTrash />}
      />
    </li>
  );
}
