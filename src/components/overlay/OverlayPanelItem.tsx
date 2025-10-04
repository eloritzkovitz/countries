import { FaEye, FaEyeSlash, FaEdit, FaTrash } from "react-icons/fa";
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
    <li className="mb-4 flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
      <span
        className="inline-block w-[22px] h-[22px] rounded-md border-2 border-gray-300 mr-1"
        style={{ background: overlay.color }}
        title={overlay.name}
      />
      <strong className="flex-1">{overlay.name}</strong>
      <button
        onClick={() => onToggleVisibility(overlay.id)}
        className={`mx-1 text-lg transition-colors ${
          overlay.visible ? "text-blue-600" : "text-gray-400"
        }`}
        title={overlay.visible ? "Hide overlay" : "Show overlay"}
        aria-label={overlay.visible ? "Hide overlay" : "Show overlay"}
      >
        {overlay.visible ? <FaEye /> : <FaEyeSlash />}
      </button>
      <button
        className="mx-1 text-blue-600 text-lg hover:text-blue-800 transition-colors"
        onClick={() => onEdit(overlay)}
        title="Edit overlay"
        aria-label="Edit overlay"
      >
        <FaEdit />
      </button>
      <button
        className="mx-1 text-red-600 text-lg hover:text-red-800 transition-colors"
        onClick={() => onRemove(overlay.id)}
        title="Remove overlay"
        aria-label="Remove overlay"
      >
        <FaTrash />
      </button>
    </li>
  );
}
