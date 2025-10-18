import { useState } from "react";

export function useDragReorder<T>(
  items: T[],
  setItems: (newItems: T[]) => void
) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  function handleDragStart(index: number) {
    setDraggedIndex(index);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>, index: number) {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const updated = [...items];
    const [removed] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, removed);
    setDraggedIndex(index);
    setItems(updated);
  }

  function handleDragEnd() {
    setDraggedIndex(null);
  }

  return { draggedIndex, handleDragStart, handleDragOver, handleDragEnd };
}
