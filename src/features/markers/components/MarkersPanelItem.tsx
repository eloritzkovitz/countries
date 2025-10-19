import { PanelListItem } from "@components";
import type { Marker } from "@types";
import type { DragEvent } from "react";

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
    <PanelListItem
      color={marker.color || "gray"}
      name={marker.name}
      visible={marker.visible}      
      onToggleVisibility={onToggleVisibility}
      onCenter={onCenter}
      onEdit={onCenter}
      onRemove={onRemove}
      dragged={draggedIndex === idx}
      onDragStart={() => handleDragStart(idx)}
      handleDragOver={(e: DragEvent<HTMLLIElement>) => handleDragOver(e, idx)}
      handleDragEnd={handleDragEnd}      
    />
  );
}
