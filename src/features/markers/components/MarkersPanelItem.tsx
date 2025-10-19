import { FaCrosshairs, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { ActionButton } from "@components";
import type { Marker } from "@types";

export function MarkersPanelItem({
  marker,
  idx,
  draggedIndex,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  onCenter,
  onToggleVisibility,
  onRemove,
}: {
  marker: Marker;
  idx: number;
  draggedIndex: number | null;
  handleDragStart: (idx: number) => void;
  handleDragOver: (e: React.DragEvent<HTMLLIElement>, idx: number) => void;
  handleDragEnd: () => void;
  onCenter: () => void;
  onToggleVisibility: () => void;
  onRemove: () => void;
}) {
  return (
    <li
      className={`mb-4 flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 ${
        draggedIndex === idx ? "ring-2 ring-blue-400" : ""
      }`}
      draggable
      onDragStart={() => handleDragStart(idx)}
      onDragOver={(e) => handleDragOver(e, idx)}
      onDragEnd={handleDragEnd}
      style={{ cursor: draggedIndex === idx ? "grabbing" : "grab" }}
    >
      <span
        className="inline-block w-[22px] h-[22px] rounded-full border-2 border-none mr-1"
        style={{ background: marker.color }}
        title={marker.name}
      />
      <strong className="flex-1">{marker.name}</strong>
      <ActionButton
        onClick={onToggleVisibility}
        ariaLabel={marker.visible ? "Hide marker" : "Show marker"}
        title={marker.visible ? "Hide marker" : "Show marker"}
        className={`mx-1 text-lg ${
          marker.visible ? "text-blue-500" : "text-gray-400"
        }`}
        icon={marker.visible ? <FaEye /> : <FaEyeSlash />}
      />
      <ActionButton
        onClick={onCenter}
        ariaLabel="Center on map"
        title="Center on map"
        className="mx-1 text-lg text-blue-600 hover:text-blue-800"
        icon={<FaCrosshairs />}
      />
      <ActionButton
        onClick={onRemove}
        ariaLabel="Remove marker"
        title="Remove marker"
        className="mx-1 text-lg text-red-600 hover:text-red-800"
        icon={<FaTimes />}
      />
    </li>
  );
}
