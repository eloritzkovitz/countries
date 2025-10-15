import { useKeyHandler } from "../../hooks/useKeyHandler";
import { exportSvg, exportSvgAsPng } from "../../utils/fileUtils";

export function MapExportMenu({
  svgRef,
  showDialog,
  setShowDialog,
}: {
  svgRef: React.RefObject<SVGSVGElement | null>;
  showDialog: boolean;
  setShowDialog: (v: boolean) => void;
}) {
  // Handle "Escape" key to close the dialog
  useKeyHandler(() => {
    if (showDialog) setShowDialog(false);
  }, ["Escape"]);

  // Handle export action
  const handleExport = (type: "svg" | "png") => {
    if (!svgRef.current) return;
    if (type === "svg") exportSvg(svgRef.current, "map.svg");
    else exportSvgAsPng(svgRef.current, "map.png");
    setShowDialog(false);
  };

  return showDialog ? (
    <div className="absolute right-15 bottom-full mb-2 bg-white dark:bg-gray-900 rounded shadow z-50 min-w-[140px]">
      <button
        onClick={() => handleExport("svg")}
        className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Export as SVG
      </button>
      <button
        onClick={() => handleExport("png")}
        className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Export as PNG
      </button>
    </div>
  ) : null;
}
