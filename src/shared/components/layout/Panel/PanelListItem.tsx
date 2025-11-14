import {
  FaEye,
  FaEyeSlash,
  FaPenToSquare,
  FaTrash,
  FaCrosshairs,
  FaCircleInfo,
} from "react-icons/fa6";
import type { DragEvent } from "react";
import { ActionButton } from "@components";

interface PanelListItemProps {
  color: string;
  name: string;
  visible: boolean;
  onToggleVisibility?: () => void;
  onCenter?: () => void;
  onEdit?: () => void;
  onRemove?: () => void;
  removeDisabled?: boolean;
  dragged?: boolean;
  onDragStart?: () => void;
  handleDragOver?: (e: DragEvent<HTMLLIElement>) => void;
  handleDragEnd?: () => void;
}

export function PanelListItem({
  color,
  name,
  visible,
  onToggleVisibility,
  onCenter,
  onEdit,
  onRemove,
  removeDisabled = false,
  dragged,
  onDragStart,
  handleDragOver,
  handleDragEnd,
}: PanelListItemProps) {
  return (
    <li
      className={`panel-list-item ${dragged ? "ring-dashed" : ""}`}
      draggable={!!onDragStart}
      onDragStart={onDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      style={{ cursor: dragged ? "grabbing" : "grab" }}
    >
      <span
        className="inline-block w-[22px] h-[22px] rounded-full mr-1"
        style={{ background: color }}
        title={name}
      />
      <strong className="flex-1">{name}</strong>
      {onToggleVisibility && (
        <ActionButton
          onClick={onToggleVisibility}
          ariaLabel={visible ? "Hide" : "Show"}
          title={visible ? "Hide" : "Show"}
          className={`mx-1 text-lg ${
            visible ? "text-blue-500" : "text-gray-400"
          }`}
          icon={visible ? <FaEye /> : <FaEyeSlash />}
        />
      )}
      {onCenter && (
        <ActionButton
          onClick={onCenter}
          ariaLabel="Center"
          title="Center"
          className="mx-1 text-lg text-blue-600 hover:text-blue-800"
          icon={<FaCrosshairs />}
        />
      )}
      {onEdit && (
        <ActionButton
          onClick={onEdit}
          ariaLabel="Edit"
          title="Edit"
          className="mx-1 text-lg text-blue-600 hover:text-blue-800"
          icon={<FaPenToSquare />}
        />
      )}
      {onRemove && (
        <ActionButton
          onClick={onRemove}
          ariaLabel="Remove"
          title={removeDisabled ? "This item is managed automatically and cannot be removed" : "Remove"}
          className={`mx-1 text-lg text-red-600 hover:text-red-800 ${removeDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          icon={removeDisabled ? <FaCircleInfo /> : <FaTrash />}
          disabled={removeDisabled}
        />
      )}
    </li>
  );
}
