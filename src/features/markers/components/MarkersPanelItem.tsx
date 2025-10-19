import { PanelListItem } from "@components";
import type { Marker } from "@types";
import type { DragEvent } from "react";

export function MarkersPanelItem({
  marker,
  idx,
  onToggleVisibility,  
  onCenter,
  onEdit,
  onRemove,
  draggedIndex,
  handleDragStart,
  handleDragOver,
  handleDragEnd,  
}: {
  marker: Marker;
  idx: number;
  onToggleVisibility: () => void;
  onCenter: () => void;
  onEdit: () => void;
  onRemove: () => void;
  draggedIndex: number | null;
  handleDragStart: (idx: number) => void;
  handleDragOver: (e: React.DragEvent<HTMLLIElement>, idx: number) => void;
  handleDragEnd: () => void;  
}) {
  return (
    <PanelListItem
      color={marker.color || "gray"}
      name={marker.name}
      visible={marker.visible}      
      onToggleVisibility={onToggleVisibility}
      onCenter={onCenter}
      onEdit={onEdit}
      onRemove={onRemove}
      dragged={draggedIndex === idx}
      onDragStart={() => handleDragStart(idx)}
      handleDragOver={(e: DragEvent<HTMLLIElement>) => handleDragOver(e, idx)}
      handleDragEnd={handleDragEnd}      
    />
  );
}
