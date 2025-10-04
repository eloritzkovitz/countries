import { useState } from "react";
import { FaLayerGroup, FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
import { LoadingSpinner } from "./common/LoadingSpinner";
import { ErrorMessage } from "./common/ErrorMessage";
import { useCountryData } from "../context/CountryDataContext";
import { useOverlayContext } from "../context/OverlayContext";
import type { Overlay } from "../types/overlay";
import { OverlayEditModal } from "./OverlayEditModal";

export default function OverlayManagerPanel() {
  const { countries, loading, error } = useCountryData();
  const { overlays, addOverlay, editOverlay, removeOverlay, toggleOverlayVisibility } = useOverlayContext();
  const [modalOverlay, setModalOverlay] = useState<Overlay | null>(null);
  const [isNew, setIsNew] = useState(false);

  // Country options for react-select
  const countryOptions = countries.map((c) => ({
    value: c.isoCode,
    label: c.name,
  }));

  // Open modal for adding
  const handleAddOverlay = () => {
    setModalOverlay({
      id: Math.random().toString(36).slice(2),
      name: "",
      color: "#FFD700",
      countries: [],
      tooltip: "",
      visible: true,
    });
    setIsNew(true);
  };

  // Open modal for editing
  const handleEditOverlay = (overlay: Overlay) => {
    setModalOverlay({ ...overlay });
    setIsNew(false);
  };

  // Save overlay (add or edit)
  const handleSaveOverlay = () => {
    if (!modalOverlay) return;
    if (isNew) {
      addOverlay(modalOverlay);
    } else {
      editOverlay(modalOverlay);
    }
    setModalOverlay(null);
    setIsNew(false);
  };

  // Remove overlay
  const handleRemoveOverlay = (id: string) => {
    removeOverlay(id);
    setModalOverlay(null);
    setIsNew(false);
  };  

  // Close modal
  const closeModal = () => {
    setModalOverlay(null);
    setIsNew(false);
  };

  // Show loading or error states
  if (loading) return <LoadingSpinner message="Loading countries..." />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h2 style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <FaLayerGroup style={{ color: "#0078d4" }} /> Overlays
      </h2>
      <button
        onClick={handleAddOverlay}
        style={{
          marginBottom: 18,
          background: "#0078d4",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "8px 16px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
        }}
      >
        <FaPlus /> Add Overlay
      </button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {overlays.map((overlay) => (
          <li key={overlay.id} style={{
            marginBottom: 14,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#f5f6fa",
            borderRadius: 8,
            padding: "8px 10px"
          }}>
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
              onClick={() => toggleOverlayVisibility(overlay.id)}
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
              onClick={() => handleEditOverlay(overlay)}
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
              onClick={() => handleRemoveOverlay(overlay.id)}
              title="Remove overlay"
              aria-label="Remove overlay"
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>

      {/* Modal for add/edit */}
      {modalOverlay && (
        <OverlayEditModal
          overlay={modalOverlay}
          isNew={isNew}
          countryOptions={countryOptions}
          onChange={setModalOverlay}
          onSave={handleSaveOverlay}
          onCancel={closeModal}
        />
      )}
    </div>
  );
}