import React, { useEffect, useRef } from "react";
import { FaMapPin, FaTimes } from "react-icons/fa";
import { Modal, PanelHeader, ActionButton } from "@components";
import type { Marker } from "@types";

interface CreateMarkerModalProps {
  open: boolean;
  coords: [number, number] | null;
  marker?: Marker;
  onSubmit: (name: string, color?: string, description?: string) => void;
  onClose: () => void;
}

export const CreateMarkerModal: React.FC<CreateMarkerModalProps> = ({
  open,
  coords,
  marker,
  onSubmit,
  onClose,
}) => {
  const nameRef = useRef<HTMLInputElement>(null);

  // Focus the name input when the modal opens
  useEffect(() => {
    if (open && nameRef.current) {
      nameRef.current.focus();
    }
  }, [open]);

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      position="center"
      className="min-w-[900px] max-w-[1200px] max-h-[90vh] bg-white rounded-xl shadow-2xl p-4 overflow-y-auto"
    >
      <PanelHeader
        title={
          <>
            <FaMapPin />
            {marker ? "Edit Marker" : "Add Marker"}
          </>
        }
      >
        <ActionButton onClick={onClose} ariaLabel="Close" title="Close">
          <FaTimes />
        </ActionButton>
      </PanelHeader>
      {open && (coords || marker) ? (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const fd = new FormData(form);
            const name = String(fd.get("name") || "");
            const color = fd.get("color") ? String(fd.get("color")) : undefined;
            const description = fd.get("description")
              ? String(fd.get("description"))
              : undefined;
            onSubmit(name, color, description);
          }}
        >
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              ref={nameRef}
              name="name"
              className="w-full border rounded px-2 py-1"
              placeholder="Marker name"
              required
              defaultValue={marker?.name || ""}
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Color</label>
            <input
              name="color"
              className="w-full border rounded px-2 py-1"
              placeholder="Color (optional)"
              type="color"
              defaultValue={marker?.color || "#e53e3e"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <input
              name="description"
              className="w-full border rounded px-2 py-1"
              placeholder="Description (optional)"
              defaultValue={marker?.description || ""}
            />
          </div>
          {coords && !marker && (
            <div className="text-xs text-gray-500">
              Location: {coords[0].toFixed(4)}, {coords[1].toFixed(4)}
            </div>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-3 py-1 rounded bg-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded bg-blue-600 text-white"
            >
              {marker ? "Save Changes" : "Add Marker"}
            </button>
          </div>
        </form>
      ) : null}
    </Modal>
  );
};
