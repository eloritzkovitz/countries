import { FaFileCsv, FaFileAlt } from "react-icons/fa";

type ExportMenuProps = {
  onExportCSV: () => void;
  onExportJSON: () => void;
};

export function ExportMenu({ onExportCSV, onExportJSON }: ExportMenuProps) {
  return (
    <div className="absolute left-0 mt-2 bg-white shadow rounded z-10 min-w-[160px] flex flex-col">
      <button
        className="flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600"
        onClick={onExportCSV}
      >
        <FaFileCsv />
        <span>Export as CSV</span>
      </button>
      <button
        className="flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600"
        onClick={onExportJSON}
      >
        <FaFileAlt />
        <span>Export as JSON</span>
      </button>
    </div>
  );
}
