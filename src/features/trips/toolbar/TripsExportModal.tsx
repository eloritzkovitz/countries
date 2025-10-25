import { FaFileCsv, FaFileAlt } from "react-icons/fa";

type TripsExportModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onExportCSV: () => void;
  onExportJSON: () => void;
};

export function TripsExportModal({
  isOpen,
  onClose,
  onExportCSV,
  onExportJSON,
}: TripsExportModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow min-w-[260px]">
        <h3 className="text-lg font-bold mb-4">Export Trips</h3>
        <button
          className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 rounded mb-2"
          onClick={onExportCSV}
        >
          <FaFileCsv className="text-blue-600" />
          <span>Export as CSV</span>
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 rounded"
          onClick={onExportJSON}
        >
          <FaFileAlt className="text-green-600" />
          <span>Export as JSON</span>
        </button>
        <button
          className="mt-4 px-4 py-2 w-full bg-gray-200 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
