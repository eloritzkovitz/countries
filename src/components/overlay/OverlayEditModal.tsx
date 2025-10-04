import { createPortal } from "react-dom";
import { SketchPicker } from "react-color";
import Select from "react-select";
import { FaPlus, FaEdit, FaPalette } from "react-icons/fa";
import type { Overlay } from "../types/overlay";

export function OverlayEditModal({
  overlay,
  isNew,
  countryOptions,
  onChange,
  onSave,
  onCancel,
}: {
  overlay: Overlay;
  isNew: boolean;
  countryOptions: { value: string; label: string }[];
  onChange: (overlay: Overlay) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.4)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onCancel}
      aria-modal="true"
      role="dialog"
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
          padding: 32,
          minWidth: 400,
          maxWidth: 600,
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onCancel}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            fontSize: 24,
            cursor: "pointer",
            color: "#0078d4",
          }}
          aria-label="Close Overlay Modal"
        >
          ×
        </button>
        <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {isNew ? <FaPlus /> : <FaEdit />} {isNew ? "Add Overlay" : "Edit Overlay"}
        </h3>        
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          Name:
          <input
            type="text"
            value={overlay.name}
            onChange={e => onChange({ ...overlay, name: e.target.value })}
            style={{
              marginLeft: 8,
              padding: "4px 8px",
              borderRadius: 6,
              border: "1px solid #ccc",
              flex: 1,
            }}
          />
        </label>
        <br />
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FaPalette /> Color:
          <SketchPicker
            color={overlay.color}
            onChangeComplete={color =>
              onChange({ ...overlay, color: color.hex })
            }
            styles={{ default: { picker: { marginLeft: 8 } } }}
          />
        </label>
        <br />
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          Countries:
          <Select
            isMulti
            options={countryOptions}
            value={countryOptions.filter(opt =>
              overlay.countries.includes(opt.value)
            )}
            onChange={selected =>
              onChange({
                ...overlay,
                countries: selected.map(opt => opt.value),
              })
            }
            styles={{ container: base => ({ ...base, marginTop: 8, flex: 1 }) }}
          />
        </label>
        <br />
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          Tooltip:
          <input
            type="text"
            value={overlay.tooltip || ""}
            onChange={e =>
              onChange({ ...overlay, tooltip: e.target.value })
            }
            style={{
              marginLeft: 8,
              padding: "4px 8px",
              borderRadius: 6,
              border: "1px solid #ccc",
              flex: 1,
            }}
          />
        </label>
        <br />
        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <button
            style={{
              background: "#0078d4",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
            onClick={onSave}
          >
            {isNew ? <FaPlus /> : <FaEdit />} Save
          </button>
          <button
            style={{
              background: "#eee",
              color: "#333",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}