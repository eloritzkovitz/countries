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
    <li
      style={{
        marginBottom: 14,
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "#f5f6fa",
        borderRadius: 8,
        padding: "8px 10px",
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 22,
          height: 22,
          background: overlay.color,
          borderRadius: 6,
          marginRight: 2,
          border: "2px solid #ccc",
        }}
        title={overlay.name}
      />
      <strong style={{ flex: 1 }}>{overlay.name}</strong>
      <button
        onClick={() => onToggleVisibility(overlay.id)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: overlay.visible ? "#0078d4" : "#aaa",
          fontSize: 18,
          marginRight: 4,
        }}
        title={overlay.visible ? "Hide overlay" : "Show overlay"}
        aria-label={overlay.visible ? "Hide overlay" : "Show overlay"}
      >
        {overlay.visible ? <FaEye /> : <FaEyeSlash />}
      </button>
      <button
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#0078d4",
          fontSize: 18,
          marginRight: 4,
        }}
        onClick={() => onEdit(overlay)}
        title="Edit overlay"
        aria-label="Edit overlay"
      >
        <FaEdit />
      </button>
      <button
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#d32f2f",
          fontSize: 18,
        }}
        onClick={() => onRemove(overlay.id)}
        title="Remove overlay"
        aria-label="Remove overlay"
      >
        <FaTrash />
      </button>
    </li>
  );
}
