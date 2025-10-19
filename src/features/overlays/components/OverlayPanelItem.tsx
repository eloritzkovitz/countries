import { PanelListItem } from "@components";
import type { Overlay } from "@types";

type OverlayPanelItemProps = {
  overlay: Overlay;
  dragged?: boolean;
  onDragStart?: () => void;
  handleDragOver?: (e: React.DragEvent<HTMLLIElement>) => void;
  handleDragEnd?: () => void;
  onEdit: (overlay: Overlay) => void;
  onToggleVisibility: (id: string) => void;
  onRemove: (id: string) => void;
  showEdit?: boolean;
  showCenter?: boolean;
};

export function OverlayPanelItem({
  overlay,
  dragged,
  onDragStart,
  handleDragOver,
  handleDragEnd,
  onEdit,
  onToggleVisibility,
  onRemove,
}: OverlayPanelItemProps) {
  return (
    <PanelListItem
      color={overlay.color}
      name={overlay.name}
      visible={overlay.visible}
      onToggleVisibility={() => onToggleVisibility(overlay.id)}
      onEdit={() => onEdit(overlay)}
      onRemove={() => onRemove(overlay.id)}
      dragged={dragged}
      onDragStart={onDragStart}
      handleDragOver={handleDragOver}
      handleDragEnd={handleDragEnd}      
    />
  );
}
