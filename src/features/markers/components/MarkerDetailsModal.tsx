import { Modal } from "@components/common/Modal";
import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import type { Marker } from "@types";

interface MarkerDetailsModalProps {
  marker: Marker | null;
  open: boolean;
  onClose: () => void;
}

export function MarkerDetailsModal({
  marker,
  open,
  onClose,
}: MarkerDetailsModalProps) {
  if (!marker) return null;

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      position="center"
      className="min-w-[400px] max-w-[600px] bg-white rounded-xl shadow-2xl p-6 overflow-y-auto"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt />
          <h2 className="text-xl font-bold">{marker.name}</h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          title="Close"
          className="action-btn text-gray-500 hover:text-red-600 text-xl"
        >
          <FaTimes />
        </button>
      </div>
      <div className="mb-4 text-gray-700">
        {marker.description || "No description provided."}
      </div>
    </Modal>
  );
}
