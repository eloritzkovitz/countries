import { useState } from "react";
import { FaDownload, FaTimes, FaFileCode, FaFileImage } from "react-icons/fa";
import { ActionButton } from "../common/ActionButton";
import { Modal } from "../common/Modal";
import { PanelHeader } from "../common/PanelHeader";
import { Separator } from "../common/Separator";
import { useUI } from "../../context/UIContext";
import { exportSvg, exportSvgAsPng } from "../../utils/fileUtils";

interface MapExportModalProps {
  svgRef: React.RefObject<SVGSVGElement | null>;
}

export function MapExportModal({ svgRef }: MapExportModalProps) {
  const { showExport, closePanel } = useUI();

  // Export options state
  const [svgInlineStyles, setSvgInlineStyles] = useState<boolean>(true);
  const [pngScale, setPngScale] = useState<number>(2);

  // Export SVG handler
  const handleExportSvg = () => {
    if (!svgRef?.current) return;
    exportSvg(svgRef.current, "map.svg", svgInlineStyles);
    closePanel();
  };

  // Export PNG handler
  const handleExportPng = (s = pngScale) => {
    if (!svgRef?.current) return;
    exportSvgAsPng(svgRef.current, `map@${s}x.png`, s);
    closePanel();
  };

  // Don't render if not visible
  if (!showExport) return null;

  return (
    <Modal
      isOpen={showExport}
      onClose={() => closePanel()}
      position="custom"
      containerClassName="right-30 bottom-[80px]"
      className="min-w-[220px] max-w-[600px] max-h-[90vh] bg-white rounded-xl shadow-2xl p-4 overflow-y-auto"
    >
      <PanelHeader
        title={
          <>
            <FaDownload />
            Export
          </>
        }
      >
        <ActionButton
          onClick={() => closePanel()}
          ariaLabel="Close export menu"
          title="Close"
        >
          <FaTimes />
        </ActionButton>
      </PanelHeader>

      <div className="p-2">
        {/* SVG export section */}
        <div className="mb-3">
          <div className="text-xs font-semibold mb-1 text-gray-600 dark:text-gray-300">
            SVG
          </div>
          <label className="flex items-center gap-2 mb-2 text-sm">
            <input
              type="checkbox"
              checked={svgInlineStyles}
              onChange={(e) => setSvgInlineStyles(e.target.checked)}
              className="accent-blue-600"
            />
            <span className="text-gray-700 dark:text-gray-200 whitespace-nowrap">
              Inline styles
            </span>
          </label>
          <div>
            <ActionButton
              onClick={handleExportSvg}
              className="w-full justify-start px-3 py-2 whitespace-nowrap"
              ariaLabel="Export as SVG"
              title="Export as SVG"
              colorClass="text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <FaFileCode className="mr-2" />
              Export as SVG
            </ActionButton>
          </div>
        </div>

        <Separator className="mb-4" />

        {/* PNG export section */}
        <div>
          <div className="text-xs font-semibold mb-1 text-gray-600 dark:text-gray-300">
            PNG
          </div>
          <div className="mb-2">
            <div className="text-xs mb-1 text-gray-500 dark:text-gray-400">
              Scale
            </div>
            <div className="flex gap-2">
              <ActionButton
                onClick={() => setPngScale(1)}
                className={`px-2 py-1 ${
                  pngScale === 1 ? "bg-gray-200 dark:bg-gray-800" : ""
                }`}
                ariaLabel="Scale 1x"
                title="1x"
                colorClass="bg-transparent text-gray-700 dark:text-gray-200"
              >
                1x
              </ActionButton>
              <ActionButton
                onClick={() => setPngScale(2)}
                className={`px-2 py-1 ${
                  pngScale === 2 ? "bg-gray-200 dark:bg-gray-800" : ""
                }`}
                ariaLabel="Scale 2x"
                title="2x"
                colorClass="bg-transparent text-gray-700 dark:text-gray-200"
              >
                2x
              </ActionButton>
              <ActionButton
                onClick={() => setPngScale(4)}
                className={`px-2 py-1 ${
                  pngScale === 4 ? "bg-gray-200 dark:bg-gray-800" : ""
                }`}
                ariaLabel="Scale 4x"
                title="4x"
                colorClass="bg-transparent text-gray-700 dark:text-gray-200"
              >
                4x
              </ActionButton>
              <ActionButton
                onClick={() => setPngScale(8)}
                className={`px-2 py-1 ${
                  pngScale === 8 ? "bg-gray-200 dark:bg-gray-800" : ""
                }`}
                ariaLabel="Scale 8x"
                title="8x"
                colorClass="bg-transparent text-gray-700 dark:text-gray-200"
              >
                8x
              </ActionButton>
            </div>
          </div>

          <ActionButton
            onClick={() => handleExportPng(pngScale)}
            className="w-full justify-start px-3 py-2 whitespace-nowrap"
            ariaLabel={`Export as PNG ${pngScale}x`}
            title={`Export as PNG (${pngScale}x)`}
            colorClass="text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <FaFileImage className="mr-2" />
            Export as PNG
          </ActionButton>
        </div>
      </div>
    </Modal>
  );
}
